'use strict';

require('dotenv').config();

const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');
const express = require('express');
const helmet = require('helmet');

const app = express();
const PORT = Number(process.env.PORT || 3000);
const PUBLIC_BASE_URL = (process.env.PUBLIC_BASE_URL || 'https://tslcrypto.com').replace(/\/+$/, '');
const HOT_PAY_ITEM_ID = process.env.HOT_PAY_ITEM_ID || '';
const HOT_PAY_WEBHOOK_SECRET = process.env.HOT_PAY_WEBHOOK_SECRET || '';
const HOT_PAY_WEBHOOK_MODE = process.env.HOT_PAY_WEBHOOK_MODE || 'diagnostic';
const DATA_FILE = path.join(__dirname, 'data', 'orders.json');
const WEBHOOK_LOG_FILE = path.join(__dirname, 'logs', 'hotpay-webhooks.log');

app.set('trust proxy', 1);
app.use(helmet({ contentSecurityPolicy: false }));
app.use(express.json({ limit: '100kb' }));
app.use(express.static(path.join(__dirname, 'public')));

function readOrders() {
  try { return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8')); }
  catch (error) { if (error.code === 'ENOENT') return {}; throw error; }
}
function writeOrders(orders) {
  const temp = `${DATA_FILE}.tmp`;
  fs.writeFileSync(temp, JSON.stringify(orders, null, 2), 'utf8');
  fs.renameSync(temp, DATA_FILE);
}
function safeString(value, maxLength = 500) {
  return typeof value === 'string' ? value.trim().slice(0, maxLength) : '';
}
function makeOrderId() {
  return `TSL-${Date.now()}-${crypto.randomBytes(5).toString('hex').toUpperCase()}`;
}
function timingSafeTextEqual(a, b) {
  const left = Buffer.from(String(a));
  const right = Buffer.from(String(b));
  return left.length === right.length && crypto.timingSafeEqual(left, right);
}
function findDirectSecretHeader(headers) {
  if (!HOT_PAY_WEBHOOK_SECRET) return null;
  for (const [name, rawValue] of Object.entries(headers)) {
    const values = Array.isArray(rawValue) ? rawValue : [rawValue];
    for (const value of values) {
      if (typeof value !== 'string') continue;
      const plain = value.trim();
      const bearer = plain.replace(/^Bearer\s+/i, '').trim();
      if (timingSafeTextEqual(plain, HOT_PAY_WEBHOOK_SECRET) || timingSafeTextEqual(bearer, HOT_PAY_WEBHOOK_SECRET)) return name;
    }
  }
  return null;
}
function appendDiagnosticLog(req, body, directSecretHeader) {
  const entry = {
    receivedAt: new Date().toISOString(),
    ip: req.ip,
    headerNames: Object.keys(req.headers).sort(),
    directSecretMatched: Boolean(directSecretHeader),
    directSecretHeader: directSecretHeader || null,
    body
  };
  fs.appendFileSync(WEBHOOK_LOG_FILE, `${JSON.stringify(entry)}\n`, 'utf8');
}

app.get('/health', (_req, res) => res.json({ ok: true, service: 'tsl-hotpay-node' }));

app.post('/api/hotpay/create-order', (_req, res) => {
  if (!HOT_PAY_ITEM_ID) return res.status(503).json({ error: 'HOT_PAY_ITEM_ID is not configured.' });
  const memo = makeOrderId();
  const orders = readOrders();
  orders[memo] = {
    memo, status: 'PENDING', itemId: HOT_PAY_ITEM_ID,
    expectedAmount: 0.1, expectedToken: 'USDT',
    createdAt: new Date().toISOString(), nearTrx: null
  };
  writeOrders(orders);
  const redirectUrl = `${PUBLIC_BASE_URL}/payment-success.html?memo=${encodeURIComponent(memo)}`;
  const paymentUrl = new URL('https://pay.hot-labs.org/payment');
  paymentUrl.searchParams.set('item_id', HOT_PAY_ITEM_ID);
  paymentUrl.searchParams.set('memo', memo);
  paymentUrl.searchParams.set('redirect_url', redirectUrl);
  res.status(201).json({ memo, paymentUrl: paymentUrl.toString() });
});

app.post('/api/hotpay/webhook', (req, res) => {
  const body = req.body && typeof req.body === 'object' ? req.body : {};
  const directSecretHeader = findDirectSecretHeader(req.headers);
  appendDiagnosticLog(req, body, directSecretHeader);

  const itemId = safeString(body.item_id, 200);
  const status = safeString(body.status, 50).toUpperCase();
  const memo = safeString(body.memo, 200);
  const nearTrx = safeString(body.near_trx, 300);
  const amountFloat = Number(body.amount_float);

  if (!itemId || !status || !memo || !nearTrx || !Number.isFinite(amountFloat)) {
    return res.status(400).json({ ok: false, error: 'Invalid webhook payload.' });
  }
  if (itemId !== HOT_PAY_ITEM_ID) return res.status(403).json({ ok: false, error: 'Unexpected item_id.' });

  const orders = readOrders();
  const order = orders[memo];
  if (!order) return res.status(404).json({ ok: false, error: 'Unknown order memo.' });

  const duplicate = Object.values(orders).some(entry => entry.nearTrx && entry.nearTrx === nearTrx && entry.memo !== memo);
  if (duplicate) return res.status(409).json({ ok: false, error: 'Duplicate transaction hash.' });

  if (HOT_PAY_WEBHOOK_MODE === 'diagnostic') {
    order.status = 'WEBHOOK_RECEIVED';
    order.webhookStatus = status;
    order.webhookAmount = amountFloat;
    order.nearTrx = nearTrx;
    order.webhookReceivedAt = new Date().toISOString();
    order.directSecretMatched = Boolean(directSecretHeader);
    orders[memo] = order;
    writeOrders(orders);
    return res.status(200).json({ ok: true, mode: 'diagnostic', message: 'Webhook recorded; payment was not finalized.' });
  }

  if (!directSecretHeader) return res.status(401).json({ ok: false, error: 'Webhook authentication failed.' });
  if (status !== 'SUCCESS') return res.status(202).json({ ok: true, message: 'Non-success status ignored.' });
  if (Math.abs(amountFloat - order.expectedAmount) > 1e-9) return res.status(409).json({ ok: false, error: 'Unexpected payment amount.' });

  order.status = 'PAID';
  order.nearTrx = nearTrx;
  order.paidAmount = amountFloat;
  order.paidAt = new Date().toISOString();
  order.authenticatedByHeader = directSecretHeader;
  orders[memo] = order;
  writeOrders(orders);
  res.status(200).json({ ok: true });
});

app.get('/api/hotpay/order/:memo', (req, res) => {
  const memo = safeString(req.params.memo, 200);
  const order = readOrders()[memo];
  if (!order) return res.status(404).json({ error: 'Order not found.' });
  res.json({
    memo: order.memo, status: order.status,
    expectedAmount: order.expectedAmount, expectedToken: order.expectedToken,
    nearTrx: order.nearTrx || null, createdAt: order.createdAt, paidAt: order.paidAt || null
  });
});

app.use((error, _req, res, _next) => {
  console.error(error);
  res.status(500).json({ error: 'Internal server error.' });
});

app.listen(PORT, () => {
  console.log(`TSL HOT Pay server listening on http://127.0.0.1:${PORT}`);
  console.log(`Webhook mode: ${HOT_PAY_WEBHOOK_MODE}`);
});
