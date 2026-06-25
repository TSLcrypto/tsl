import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const API_KEY = process.env.MORALIS_API_KEY || "";
const CHAIN = "bsc";
const TOKEN = "0x5591a8E9a5001f6052D9d749518AE1e6287b7955";
const OWNER = "0x3cf25AB11d1E46A6e91083f0C1e06607e846Ac2C";

const OUT_DIR = "submissions/moralis";
const OUT_FILE = path.join(OUT_DIR, "moralis-tokenone-refresh.json");
const STATUS_FILE = path.join(OUT_DIR, "moralis-tokenone-refresh-status.md");

if (!API_KEY) {
  throw new Error("MORALIS_API_KEY missing in .env");
}

async function moralisGet(url: string) {
  const res = await fetch(url, {
    headers: {
      accept: "application/json",
      "X-API-Key": API_KEY,
    },
  });

  const text = await res.text();

  let body: any;
  try {
    body = JSON.parse(text);
  } catch {
    body = text;
  }

  return {
    ok: res.ok,
    status: res.status,
    url,
    body,
  };
}

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });

  const base = "https://deep-index.moralis.io/api/v2.2";

  const urls = {
    metadata: `${base}/erc20/metadata?chain=${CHAIN}&addresses%5B0%5D=${TOKEN}`,
    price: `${base}/erc20/${TOKEN}/price?chain=${CHAIN}`,
    pairs: `${base}/erc20/${TOKEN}/pairs?chain=${CHAIN}`,
    holders: `${base}/erc20/${TOKEN}/holders?chain=${CHAIN}`,
    transfers: `${base}/erc20/${TOKEN}/transfers?chain=${CHAIN}&limit=10`,
    ownerBalances: `${base}/${OWNER}/erc20?chain=${CHAIN}&token_addresses%5B0%5D=${TOKEN}`,
  };

  console.log("Refreshing Moralis TokenOne data...");
  console.log("Token:", TOKEN);
  console.log("Chain:", CHAIN);
  console.log("");

  const result: Record<string, any> = {
    checkedAt: new Date().toISOString(),
    token: TOKEN,
    chain: CHAIN,
    endpoints: {},
  };

  for (const [name, url] of Object.entries(urls)) {
    console.log("Calling:", name);
    const r = await moralisGet(url);
    result.endpoints[name] = r;
    console.log("status:", r.status, r.ok ? "OK" : "FAILED");
  }

  fs.writeFileSync(OUT_FILE, JSON.stringify(result, null, 2), "utf8");

  const meta = result.endpoints.metadata?.body?.[0] || {};
  const price = result.endpoints.price?.body || {};

  const lines = [
    "TokenOne Moralis Refresh Status",
    "================================",
    "",
    `Checked At: ${result.checkedAt}`,
    "",
    `Token: ${TOKEN}`,
    `Chain: ${CHAIN}`,
    "",
    "Endpoint Status:",
    `- Metadata: ${result.endpoints.metadata?.status}`,
    `- Price: ${result.endpoints.price?.status}`,
    `- Pairs: ${result.endpoints.pairs?.status}`,
    `- Holders: ${result.endpoints.holders?.status}`,
    `- Transfers: ${result.endpoints.transfers?.status}`,
    `- Owner Balances: ${result.endpoints.ownerBalances?.status}`,
    "",
    "Metadata Snapshot:",
    `- Name: ${meta.name ?? ""}`,
    `- Symbol: ${meta.symbol ?? ""}`,
    `- Decimals: ${meta.decimals ?? ""}`,
    `- Logo: ${meta.logo ?? "null"}`,
    `- Thumbnail: ${meta.thumbnail ?? "null"}`,
    `- Logo Hash: ${meta.logo_hash ?? "null"}`,
    `- Possible Spam: ${meta.possible_spam ?? ""}`,
    `- Verified Contract: ${meta.verified_contract ?? ""}`,
    "",
    "Market Snapshot:",
    `- USD Price: ${price.usdPrice ?? price.usd_price ?? ""}`,
    `- Exchange: ${price.exchangeName ?? price.exchange_name ?? ""}`,
    `- Pair Address: ${price.pairAddress ?? price.pair_address ?? ""}`,
    "",
    "Notes:",
    "- This script calls Moralis metadata, price, pairs, holders, transfers, and balance endpoints to refresh/check TokenOne visibility.",
    "- Moralis cache/logo propagation is not guaranteed immediately.",
    "- Keep MORALIS_API_KEY only in .env and never commit it.",
    "",
  ];

  fs.writeFileSync(STATUS_FILE, lines.join("\n"), "utf8");

  console.log("");
  console.log("Saved:");
  console.log(OUT_FILE);
  console.log(STATUS_FILE);
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
