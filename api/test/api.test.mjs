import assert from 'node:assert/strict';
import { test } from 'node:test';
import { createDataSource, POOL, TOKEN, UpstreamError } from '../src/data.mjs';
import { createApiServer } from '../src/server.mjs';

const pool = {
  data: {
    id: `bsc_${POOL}`,
    attributes: {
      base_token_price_usd: '0.05704660475',
      quote_token_price_usd: '1.00',
      reserve_in_usd: '1200.15',
      volume_usd: { h24: '52.31' },
    },
    relationships: {
      base_token: { data: { id: `bsc_${TOKEN.contractAddress.toLowerCase()}` } },
      quote_token: { data: { id: 'bsc_0x55d398326f99059ff775485246999027b3197955' } },
    },
  },
};

function fixture(value = pool) {
  let calls = 0;
  const fetcher = async (_url, options) => {
    calls++;
    return new Response(JSON.stringify(options.method === 'POST'
      ? { result: `0x${(1_000_000_000n * 10n ** 18n).toString(16)}` }
      : value), { status: 200, headers: { 'content-type': 'application/json' } });
  };
  return { source: createDataSource({ fetcher, now: () => Date.parse('2026-10-17T00:00:00Z') }), calls: () => calls };
}

test('returns pool-specific price and on-chain supply with provenance; caches upstream calls', async () => {
  const f = fixture();
  const [first, second] = await Promise.all([f.source.get(), f.source.get()]);
  assert.deepEqual(first, second);
  assert.equal(first.token.totalSupply, '1000000000');
  assert.equal(first.market.priceUsd, '0.05704660475');
  assert.equal(first.market.poolAddress, POOL);
  assert.equal(first.market.fetchedAt, '2026-10-17T00:00:00.000Z');
  await f.source.get();
  assert.equal(f.calls(), 2);
});

test('rejects a response that does not identify TSL in the chosen pool', async () => {
  const fake = structuredClone(pool);
  fake.data.relationships.base_token.data.id = 'bsc_0x0000000000000000000000000000000000000001';
  await assert.rejects(fixture(fake).source.get(), /Pool does not contain TSL/);
});

test('uses the quote-side price when TSL is the quote token', async () => {
  const swapped = structuredClone(pool);
  [swapped.data.relationships.base_token, swapped.data.relationships.quote_token] =
    [swapped.data.relationships.quote_token, swapped.data.relationships.base_token];
  assert.equal((await fixture(swapped).source.get()).market.priceUsd, '1.00');
});

test('HTTP status, content type and upstream failure', async () => {
  const server = createApiServer({ dataSource: { get: async () => { throw new UpstreamError('offline'); } } });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  try {
    const base = `http://127.0.0.1:${server.address().port}`;
    assert.equal((await fetch(`${base}/api/v1/health`)).status, 200);
    const failed = await fetch(`${base}/api/v1/tsl`);
    assert.equal(failed.status, 503);
    assert.equal(failed.headers.get('cache-control'), 'no-store');
    assert.equal((await fetch(`${base}/api/v1/nope`)).status, 404);
    assert.equal((await fetch(`${base}/api/v1/tsl`, { method: 'POST' })).status, 405);
  } finally {
    await new Promise(resolve => server.close(resolve));
  }
});
