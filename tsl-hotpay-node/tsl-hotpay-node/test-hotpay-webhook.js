'use strict';
require('dotenv').config();
const itemId = process.env.HOT_PAY_ITEM_ID;
if (!itemId) { console.error('HOT_PAY_ITEM_ID is missing from .env'); process.exit(1); }
async function main() {
  const url = `https://api.hot-labs.org/partners/merchant_item/${encodeURIComponent(itemId)}/test_webhook`;
  const response = await fetch(url, { method: 'POST', headers: { accept: 'application/json' } });
  const text = await response.text();
  console.log(`HTTP ${response.status}`);
  console.log(text || '(empty response)');
  if (!response.ok) process.exitCode = 1;
}
main().catch(error => { console.error(error); process.exit(1); });
