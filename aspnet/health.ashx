<%@ WebHandler Language="C#" Class="TslHealthHandler" %>

using System;
using System.Web;

public class TslHealthHandler : IHttpHandler
{
    public bool IsReusable { get { return true; } }

    public void ProcessRequest(HttpContext context)
    {
        var response = context.Response;
        response.ContentType = "application/json; charset=utf-8";
        response.AddHeader("X-Content-Type-Options", "nosniff");
        response.Cache.SetCacheability(HttpCacheability.NoCache);
        if (context.Request.HttpMethod != "GET")
        {
            response.StatusCode = 405;
            response.AddHeader("Allow", "GET");
            response.Write("{\"error\":\"Method not allowed\"}");
            return;
        }
        response.Write("{\"status\":\"ok\"}");
    }
}
