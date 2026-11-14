import { createServer } from 'node:http';
import { pathToFileURL } from 'node:url';
import { createDataSource, UpstreamError } from './data.mjs';

export function createApiServer({ dataSource = createDataSource() } = {}) {
  return createServer(async (req, res) => {
    const origin = req.headers.origin;
    if (origin === 'https://tslcrypto.com' || origin === 'https://www.tslcrypto.com') {
      res.setHeader('Access-Control-Allow-Origin', origin);
      res.setHeader('Vary', 'Origin');
    }
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    const url = new URL(req.url || '/', 'http://localhost');
    const send = (status, body) => {
      res.statusCode = status;
      res.end(JSON.stringify(body));
    };

    if (req.method !== 'GET') {
      res.setHeader('Allow', 'GET');
      return send(405, { error: 'Method not allowed' });
    }
    if (url.pathname === '/api/v1/health') {
      res.setHeader('Cache-Control', 'no-store');
      return send(200, { status: 'ok' });
    }
    if (url.pathname !== '/api/v1/tsl') return send(404, { error: 'Not found' });

    try {
      const data = await dataSource.get();
      res.setHeader('Cache-Control', 'public, max-age=15');
      return send(200, data);
    } catch (error) {
      res.setHeader('Cache-Control', 'no-store');
      res.setHeader('Retry-After', '30');
      if (!(error instanceof UpstreamError)) console.error('Unexpected API error:', error);
      return send(503, { error: 'Market data temporarily unavailable' });
    }
  });
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const port = Number(process.env.PORT || 8787);
  const host = process.env.HOST || '127.0.0.1';
  if (!Number.isInteger(port) || port < 1 || port > 65535) throw new Error('Invalid PORT');
  createApiServer().listen(port, host, () => console.log(`TSL API listening on ${host}:${port}`));
}
