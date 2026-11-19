export const TOKEN = Object.freeze({
  name: 'TSL',
  symbol: 'TSL',
  chainId: 56,
  decimals: 18,
  contractAddress: '0xD12ECbD5f508106ec242881530767FF15A6A7549',
  logoUrl: 'https://tslcrypto.com/assets/logo.png',
});

export const POOL = '0x47ea61fef003c1212fbcd3acc03208cb7a92cad1';
const DEFAULT_RPC = 'https://bsc-dataseed-public.bnbchain.org';
const CACHE_MS = 60_000;

export class UpstreamError extends Error {
  constructor(message) {
    super(message);
    this.name = 'UpstreamError';
  }
}

async function jsonResponse(fetcher, url, options = {}) {
  let response;
  try {
    response = await fetcher(url, { ...options, signal: AbortSignal.timeout(8000) });
  } catch {
    throw new UpstreamError('Upstream service unavailable');
  }
  if (!response.ok) throw new UpstreamError(`Upstream HTTP ${response.status}`);
  try {
    return await response.json();
  } catch {
    throw new UpstreamError('Invalid upstream JSON');
  }
}

function decimalUnits(raw, decimals) {
  const base = 10n ** BigInt(decimals);
  const whole = raw / base;
  const fraction = (raw % base).toString().padStart(decimals, '0').replace(/0+$/, '');
  return fraction ? `${whole}.${fraction}` : whole.toString();
}

function positiveDecimal(value) {
  return typeof value === 'string' && /^(?:0|[1-9]\d*)(?:\.\d+)?$/.test(value) && Number(value) > 0;
}

export function createDataSource({ fetcher = fetch, rpcUrl = process.env.BSC_RPC_URL || DEFAULT_RPC, now = () => Date.now() } = {}) {
  const marketUrl = `https://api.geckoterminal.com/api/v2/networks/bsc/pools/${POOL}?include=base_token,quote_token`;
  let cached;
  let expiresAt = 0;
  let pending;

  async function load() {
    const [poolJson, supplyJson] = await Promise.all([
      jsonResponse(fetcher, marketUrl, { headers: { accept: 'application/json' } }),
      jsonResponse(fetcher, rpcUrl, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ jsonrpc: '2.0', id: 1, method: 'eth_call', params: [{ to: TOKEN.contractAddress, data: '0x18160ddd' }, 'latest'] }),
      }),
    ]);

    const pool = poolJson?.data;
    const attrs = pool?.attributes;
    if (pool?.id?.toLowerCase() !== `bsc_${POOL}` || !attrs) throw new UpstreamError('Unexpected pool');

    const baseId = pool.relationships?.base_token?.data?.id?.toLowerCase();
    const quoteId = pool.relationships?.quote_token?.data?.id?.toLowerCase();
    const tslId = `bsc_${TOKEN.contractAddress.toLowerCase()}`;
    if (baseId !== tslId && quoteId !== tslId) throw new UpstreamError('Pool does not contain TSL');
    const priceUsd = baseId === tslId ? attrs.base_token_price_usd : attrs.quote_token_price_usd;
    if (!positiveDecimal(priceUsd)) throw new UpstreamError('Invalid TSL price');

    const rawSupply = supplyJson?.result;
    if (supplyJson?.error || typeof rawSupply !== 'string' || !/^0x[0-9a-f]+$/i.test(rawSupply)) {
      throw new UpstreamError('Invalid on-chain supply');
    }
    const supply = decimalUnits(BigInt(rawSupply), TOKEN.decimals);
    const liquidityUsd = attrs.reserve_in_usd;
    const volume24hUsd = attrs.volume_usd?.h24;

    return {
      token: { ...TOKEN, totalSupply: supply },
      market: {
        priceUsd,
        liquidityUsd: positiveDecimal(liquidityUsd) ? liquidityUsd : null,
        volume24hUsd: typeof volume24hUsd === 'string' && /^\d+(?:\.\d+)?$/.test(volume24hUsd) ? volume24hUsd : null,
        poolAddress: POOL,
        priceSource: 'GeckoTerminal / PancakeSwap V2 TSL-USDT',
        sourceUrl: marketUrl,
        fetchedAt: new Date(now()).toISOString(),
      },
    };
  }

  return {
    async get() {
      if (cached && now() < expiresAt) return cached;
      if (!pending) {
        pending = load().then(result => {
          cached = result;
          expiresAt = now() + CACHE_MS;
          return result;
        }).finally(() => { pending = undefined; });
      }
      return pending;
    },
  };
}
