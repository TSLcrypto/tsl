<%@ WebHandler Language="C#" Class="TslApiHandler" %>
<%@ Assembly Name="System.Numerics" %>
<%@ Assembly Name="System.Web.Extensions" %>

using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Globalization;
using System.IO;
using System.Net;
using System.Numerics;
using System.Text;
using System.Text.RegularExpressions;
using System.Web;
using System.Web.Script.Serialization;

public class TslApiHandler : IHttpHandler
{
    private const string Contract = "0xD12ECbD5f508106ec242881530767FF15A6A7549";
    private const string Pool = "0x47ea61fef003c1212fbcd3acc03208cb7a92cad1";
    private const string RpcUrl = "https://bsc-dataseed-public.bnbchain.org";
    private const string MarketUrl = "https://api.geckoterminal.com/api/v2/networks/bsc/pools/" + Pool + "?include=base_token,quote_token";
    private static readonly object CacheLock = new object();
    private static string cachedJson;
    private static DateTime cacheUntilUtc = DateTime.MinValue;

    public bool IsReusable { get { return true; } }

    public void ProcessRequest(HttpContext context)
    {
        var response = context.Response;
        response.ContentType = "application/json; charset=utf-8";
        response.Headers["X-Content-Type-Options"] = "nosniff";
        if (context.Request.HttpMethod != "GET")
        {
            response.StatusCode = 405;
            response.Headers["Allow"] = "GET";
            response.Cache.SetCacheability(HttpCacheability.NoCache);
            response.Write("{\"error\":\"Method not allowed\"}");
            return;
        }

        try
        {
            string json;
            lock (CacheLock)
            {
                if (cachedJson == null || DateTime.UtcNow >= cacheUntilUtc)
                {
                    json = LoadAndValidate();
                    cachedJson = json;
                    cacheUntilUtc = DateTime.UtcNow.AddSeconds(60);
                }
                else json = cachedJson;
            }
            response.Cache.SetCacheability(HttpCacheability.Public);
            response.Cache.SetMaxAge(TimeSpan.FromSeconds(15));
            response.Write(json);
        }
        catch (Exception ex)
        {
            Trace.TraceError("TSL API upstream failure: " + ex.GetType().Name + ": " + ex.Message);
            response.StatusCode = 503;
            response.Cache.SetCacheability(HttpCacheability.NoCache);
            response.Headers["Retry-After"] = "30";
            response.Write("{\"error\":\"Market data temporarily unavailable\"}");
        }
    }

    private static string LoadAndValidate()
    {
        var serializer = new JavaScriptSerializer();
        var poolJson = ObjectMap(serializer.DeserializeObject(Download(MarketUrl, null)));
        var rpcBody = "{\"jsonrpc\":\"2.0\",\"id\":1,\"method\":\"eth_call\",\"params\":[{\"to\":\"" + Contract + "\",\"data\":\"0x18160ddd\"},\"latest\"]}";
        var supplyJson = ObjectMap(serializer.DeserializeObject(Download(RpcUrl, rpcBody)));

        var pool = ObjectMap(Get(poolJson, "data"));
        if (!Same(Text(Get(pool, "id")), "bsc_" + Pool)) throw new InvalidDataException("Unexpected pool");
        var attrs = ObjectMap(Get(pool, "attributes"));
        var relations = ObjectMap(Get(pool, "relationships"));
        var baseId = Text(Get(ObjectMap(Get(ObjectMap(Get(relations, "base_token")), "data")), "id"));
        var quoteId = Text(Get(ObjectMap(Get(ObjectMap(Get(relations, "quote_token")), "data")), "id"));
        var tslId = "bsc_" + Contract;
        if (!Same(baseId, tslId) && !Same(quoteId, tslId)) throw new InvalidDataException("Pool does not contain TSL");
        var price = Text(Get(attrs, Same(baseId, tslId) ? "base_token_price_usd" : "quote_token_price_usd"));
        if (!PositiveDecimal(price)) throw new InvalidDataException("Invalid price");

        if (Get(supplyJson, "error") != null) throw new InvalidDataException("RPC error");
        var hex = Text(Get(supplyJson, "result"));
        if (hex == null || !Regex.IsMatch(hex, "^0x[0-9a-fA-F]{1,64}$")) throw new InvalidDataException("Invalid supply");
        var rawSupply = BigInteger.Parse("0" + hex.Substring(2), NumberStyles.AllowHexSpecifier, CultureInfo.InvariantCulture);
        var unit = BigInteger.Pow(new BigInteger(10), 18);
        var fraction = (rawSupply % unit).ToString(CultureInfo.InvariantCulture).PadLeft(18, '0').TrimEnd('0');
        var supply = (rawSupply / unit).ToString(CultureInfo.InvariantCulture) + (fraction.Length == 0 ? "" : "." + fraction);
        var liquidity = Text(Get(attrs, "reserve_in_usd"));
        var volume = Text(Get(ObjectMap(Get(attrs, "volume_usd")), "h24"));

        return serializer.Serialize(new {
            token = new {
                name = "TSL", symbol = "TSL", chainId = 56, decimals = 18,
                contractAddress = Contract, logoUrl = "https://tslcrypto.com/assets/logo.png", totalSupply = supply
            },
            market = new {
                priceUsd = price,
                liquidityUsd = PositiveDecimal(liquidity) ? liquidity : null,
                volume24hUsd = DecimalString(volume) ? volume : null,
                poolAddress = Pool,
                priceSource = "GeckoTerminal / PancakeSwap V2 TSL-USDT",
                sourceUrl = MarketUrl,
                fetchedAt = DateTime.UtcNow.ToString("yyyy-MM-ddTHH:mm:ss.fffZ", CultureInfo.InvariantCulture)
            }
        });
    }

    private static string Download(string url, string postBody)
    {
        var request = (HttpWebRequest)WebRequest.Create(url);
        request.Method = postBody == null ? "GET" : "POST";
        request.Accept = "application/json";
        request.UserAgent = "TSL-public-API/1.0";
        request.Timeout = 8000;
        request.ReadWriteTimeout = 8000;
        if (postBody != null)
        {
            var payload = Encoding.UTF8.GetBytes(postBody);
            request.ContentType = "application/json";
            request.ContentLength = payload.Length;
            using (var stream = request.GetRequestStream()) stream.Write(payload, 0, payload.Length);
        }
        using (var response = (HttpWebResponse)request.GetResponse())
        using (var stream = response.GetResponseStream())
        using (var reader = new StreamReader(stream)) return reader.ReadToEnd();
    }

    private static Dictionary<string, object> ObjectMap(object value)
    {
        var map = value as Dictionary<string, object>;
        if (map == null) throw new InvalidDataException("Invalid upstream JSON");
        return map;
    }

    private static object Get(Dictionary<string, object> map, string key)
    {
        object value;
        return map.TryGetValue(key, out value) ? value : null;
    }

    private static string Text(object value) { return value as string; }
    private static bool Same(string a, string b) { return string.Equals(a, b, StringComparison.OrdinalIgnoreCase); }
    private static bool DecimalString(string value)
    {
        return value != null && Regex.IsMatch(value, @"^(?:0|[1-9][0-9]*)(?:\.[0-9]+)?$");
    }
    private static bool PositiveDecimal(string value)
    {
        return DecimalString(value) && Regex.IsMatch(value, "[1-9]");
    }
}
