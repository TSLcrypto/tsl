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

Deploy this service on your existing server, run it as a managed process, and reverse proxy `https://tslcrypto.com/api/v1/*` to `http://127.0.0.1:8787/api/v1/*`. For IIS, enable a reverse proxy (ARR and URL Rewrite) with a rule scoped to `^api/v1/(.*)$`, preserving the path and forwarding to `http://127.0.0.1:8787/api/v1/{R:1}`. Add HTTPS, an ingress rate limit, logs, and process restart monitoring. Confirm your site's actual hosting setup before changing IIS rules. Do not expose the Node process itself publicly.

The fixed pool is `0x47ea61fef003c1212fbcd3acc03208cb7a92cad1`. This is a market quote from one pool, not a guaranteed redemption price or a wallet valuation. Thin liquidity can yield a quote far from execution price. Change the pool only after verifying the contract identity, pool tokens and liquidity. Public BSC RPC and GeckoTerminal endpoints have usage limits; use a suitable provider if traffic grows.
