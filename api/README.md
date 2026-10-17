# TSL public API

Small read-only Node.js 20+ service with no npm dependencies. It exposes the official TSL identity, current `totalSupply()` from BNB Smart Chain, and USD market data for the specifically identified PancakeSwap V2 TSL/USDT pool. Price is attributed to GeckoTerminal; this service does not set a token price in any wallet or indexer.

## Local run

```sh
cd api
npm test
npm start
curl http://127.0.0.1:8787/api/v1/health
curl http://127.0.0.1:8787/api/v1/tsl
```

`GET /api/v1/tsl` returns JSON with `token` and `market`. Monetary fields are decimal **strings**, not floating-point numbers. `market.sourceUrl`, `poolAddress`, and `fetchedAt` document exactly where and when the quote was read. Supply is fetched with `eth_call` and returned as a decimal string. If either upstream is unavailable or the pool identity/price cannot be verified, the API returns HTTP 503; it does not invent a price. Upstream calls are cached for 60 seconds and concurrent calls share one fetch. `GET /api/v1/health` checks only that this process is serving requests.

Optional environment variables: `PORT` (default `8787`), `HOST` (default `127.0.0.1`), `BSC_RPC_URL` (default `https://bsc-dataseed-public.bnbchain.org`). Configure RPC credentials, if any, only in server environment, never in repository or front-end code.

## Production connection

The current public site responds from Microsoft IIS 10 / Plesk for Windows. Deploy this service **outside the public `httpdocs` directory** on that server, run it as a managed process using Node.js 20+, and reverse proxy `https://tslcrypto.com/api/v1/*` to `http://127.0.0.1:8787/api/v1/*`. Confirm the actual website `web.config` and take a backup before editing. IIS URL Rewrite and Application Request Routing (ARR) must be installed, with proxy enabled at the IIS server level. Insert this rule near the top of the existing `<rewrite><rules>` collection, before catch-all/static-site rules; do not replace the entire `web.config`:

```xml
<rule name="TSL API reverse proxy" stopProcessing="true">
  <match url="^api/v1/(.*)$" />
  <action type="Rewrite" url="http://127.0.0.1:8787/api/v1/{R:1}" appendQueryString="true" />
</rule>
```

The current `httpdocs/web.config` has no `<rewrite>` section. Once a standalone API process is confirmed healthy on `127.0.0.1:8787` and URL Rewrite/ARR proxy are confirmed enabled, the site's existing configuration can be extended as follows. Preserve the existing compilation and module settings exactly; do not deploy this example before those checks:

```xml
<?xml version="1.0" encoding="utf-8"?>
<configuration>
  <system.web>
    <compilation tempDirectory="C:\Inetpub\vhosts\tslcrypto.com\tmp" />
  </system.web>
  <system.webServer>
    <modules>
      <remove name="ModSecurity IIS (64bits)" />
      <remove name="ModSecurity IIS (32bits)" />
    </modules>
    <rewrite>
      <rules>
        <rule name="TSL API reverse proxy" stopProcessing="true">
          <match url="^api/v1/(.*)$" />
          <action type="Rewrite" url="http://127.0.0.1:8787/api/v1/{R:1}" appendQueryString="true" />
        </rule>
      </rules>
    </rewrite>
  </system.webServer>
</configuration>
```

Check `http://127.0.0.1:8787/api/v1/health` and `/api/v1/tsl` locally on the host before applying the rule. Then check both public HTTPS endpoints and verify the `token.contractAddress`, `market.poolAddress`, `market.sourceUrl` and `market.fetchedAt` fields. Add an ingress rate limit, logs, and process restart monitoring. Do not expose the Node port publicly. On rollback, remove only this rule and stop the service. The API code or this GitHub repository alone cannot change the live website configuration.

The fixed pool is `0x47ea61fef003c1212fbcd3acc03208cb7a92cad1`. This is a market quote from one pool, not a guaranteed redemption price or a wallet valuation. Thin liquidity can yield a quote far from execution price. Change the pool only after verifying the contract identity, pool tokens and liquidity. Public BSC RPC and GeckoTerminal endpoints have usage limits; use a suitable provider if traffic grows.
