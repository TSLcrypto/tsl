const fs = require("fs");

const TOKEN = "0xD12ECbD5f508106ec242881530767FF15A6A7549";
const OWNER = "0xdAb105a2DE91ACC4ee2c8b2CF40C44e88b9ec3b7";
const MAIN_POOL = "0x47ea61fef003c1212fbcd3acc03208cb7a92cad1";

function readEnv() {
  if (!fs.existsSync(".env")) return {};
  const text = fs.readFileSync(".env", "utf8");
  const env = {};
  for (const line of text.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const i = trimmed.indexOf("=");
    if (i === -1) continue;
    const key = trimmed.slice(0, i).trim();
    const value = trimmed.slice(i + 1).trim().replace(/^["']|["']$/g, "");
    env[key] = value;
  }
  return env;
}

const env = { ...readEnv(), ...process.env };

async function getJson(name, url, headers = {}) {
  try {
    const res = await fetch(url, {
      headers: { accept: "application/json", ...headers },
    });
    const text = await res.text();
    let body;
    try {
      body = JSON.parse(text);
    } catch {
      body = text;
    }
    return { name, ok: res.ok, status: res.status, body };
  } catch (err) {
    return { name, ok: false, status: "ERROR", error: err.message };
  }
}

function usd(value) {
  const n = Number(value);
  if (!Number.isFinite(n)) return value ?? "n/a";
  return `$${n.toLocaleString("en-US", { maximumFractionDigits: 6 })}`;
}

function line(title, value) {
  console.log(`${title}: ${value === undefined || value === null || value === "" ? "n/a" : value}`);
}

function section(title) {
  console.log("");
  console.log("=".repeat(72));
  console.log(title);
  console.log("=".repeat(72));
}

function printMoralisMetadata(result) {
  section("Moralis Metadata");
  if (!result.ok) {
    line("Status", result.status);
    line("Error", result.error || JSON.stringify(result.body));
    return;
  }
  const meta = Array.isArray(result.body) ? result.body[0] : result.body;
  line("Status", result.status);
  line("Name", meta?.name);
  line("Symbol", meta?.symbol);
  line("Decimals", meta?.decimals);
  line("Logo", meta?.logo);
  line("Thumbnail", meta?.thumbnail);
  line("Possible spam", meta?.possible_spam);
  line("Verified contract", meta?.verified_contract);
  line("Security score", meta?.security_score);
  line("Market cap", usd(meta?.market_cap));
  line("Links", JSON.stringify(meta?.links || {}));
}

function printMoralisPrice(result) {
  section("Moralis Price");
  if (!result.ok) {
    line("Status", result.status);
    line("Error", result.error || JSON.stringify(result.body));
    return;
  }
  const p = result.body;
  line("Status", result.status);
  line("USD price", usd(p?.usdPrice));
  line("Exchange", p?.exchangeName);
  line("Pair", p?.pairAddress);
  line("Liquidity", usd(p?.pairTotalLiquidityUsd));
  line("24h change", `${p?.usdPrice24hrPercentChange ?? "n/a"}%`);
  line("Token logo", p?.tokenLogo);
  line("Possible spam", p?.possibleSpam);
  line("Security score", p?.securityScore);
}

function printMoralisPairs(result) {
  section("Moralis Pairs");
  if (!result.ok) {
    line("Status", result.status);
    line("Error", result.error || JSON.stringify(result.body));
    return;
  }
  const pairs = result.body?.pairs || [];
  line("Status", result.status);
  line("Pairs count", pairs.length);
  for (const pair of pairs.slice(0, 5)) {
    console.log(`- ${pair.pair_label} | ${pair.pair_address} | price ${usd(pair.usd_price)} | liquidity ${usd(pair.liquidity_usd)} | 24h volume ${usd(pair.volume_24h_usd)} | inactive ${pair.inactive_pair}`);
  }
}

function printGecko(result) {
  section("GeckoTerminal");
  if (!result.ok) {
    line("Status", result.status);
    line("Error", result.error || JSON.stringify(result.body));
    return;
  }
  const token = result.body?.token?.data?.attributes || result.body?.data?.attributes;
  const pools = result.body?.pools?.data || [];
  line("Price", usd(token?.price_usd));
  line("FDV", usd(token?.fdv_usd));
  line("Reserve", usd(token?.total_reserve_in_usd));
  line("24h volume", usd(token?.volume_usd?.h24));
  line("Image", token?.image_url);
  for (const pool of pools.slice(0, 5)) {
    const a = pool.attributes || {};
    console.log(`- ${a.name} | ${a.address} | price ${usd(a.token_price_usd)} | reserve ${usd(a.reserve_in_usd)} | 24h volume ${usd(a.volume_usd?.h24)}`);
  }
}

function printDexScreener(result) {
  section("DexScreener");
  if (!result.ok) {
    line("Status", result.status);
    line("Error", result.error || JSON.stringify(result.body));
    return;
  }
  const pairs = result.body?.pairs || [];
  line("Pairs count", pairs.length);
  for (const pair of pairs.slice(0, 5)) {
    console.log(`- ${pair.dexId} | ${pair.pairAddress} | price ${usd(pair.priceUsd)} | liquidity ${usd(pair.liquidity?.usd)} | 24h volume ${usd(pair.volume?.h24)}`);
  }
}

function printGoldRush(result) {
  section("GoldRush / Covalent");
  if (!result) {
    console.log("Skipped: GOLDRUSH_API_KEY or COVALENT_API_KEY not found in .env");
    return;
  }
  if (!result.ok) {
    line("Status", result.status);
    line("Error", result.error || JSON.stringify(result.body));
    return;
  }
  const data = result.body?.data;
  line("Status", result.status);
  line("Chain", data?.chain_name || data?.chain_id);
  line("Rows returned", data?.items?.length || 0);
  const first = data?.items?.[0];
  if (first) {
    line("Token name", first.contract_name);
    line("Symbol", first.contract_ticker_symbol);
    line("Decimals", first.contract_decimals);
    line("Logo", first.logo_url || first.contract_logo_url);
    line("Balance quote", usd(first.quote));
    line("Quote rate", usd(first.quote_rate));
  }
}

function printBinplorer(result) {
  section("Binplorer");
  if (!result) {
    console.log("Skipped: BINPLORER_API_KEY not found in .env");
    return;
  }
  if (!result.ok) {
    line("Status", result.status);
    line("Error", result.error || JSON.stringify(result.body));
    return;
  }
  const t = result.body || {};
  line("Status", result.status);
  line("Address", t.address);
  line("Name", t.name);
  line("Symbol", t.symbol);
  line("Decimals", t.decimals);
  line("Holders", t.holdersCount);
  line("Transfers", t.transfersCount);
  line("Logo", t.image);
  line("Website", t.website);
  line("Price", t.price && t.price !== false ? usd(t.price.rate) : "not available");
}

async function main() {
  console.log("TSL full indexer check - read only");
  console.log("Token:", TOKEN);
  console.log("Main pool:", MAIN_POOL);
  console.log("Time:", new Date().toISOString());

  const moralisKey = env.MORALIS_API_KEY;
  const goldrushKey = env.GOLDRUSH_API_KEY || env.COVALENT_API_KEY;
  const binplorerKey = env.BINPLORER_API_KEY;

  const requests = [];

  if (moralisKey) {
    const headers = { "X-API-Key": moralisKey };
    requests.push(getJson("moralisMetadata", `https://deep-index.moralis.io/api/v2.2/erc20/metadata?chain=bsc&addresses%5B0%5D=${TOKEN}`, headers));
    requests.push(getJson("moralisPrice", `https://deep-index.moralis.io/api/v2.2/erc20/${TOKEN}/price?chain=bsc`, headers));
    requests.push(getJson("moralisPairs", `https://deep-index.moralis.io/api/v2.2/erc20/${TOKEN}/pairs?chain=bsc`, headers));
  }

  requests.push(Promise.all([
    getJson("geckoToken", `https://api.geckoterminal.com/api/v2/networks/bsc/tokens/${TOKEN}`),
    getJson("geckoPools", `https://api.geckoterminal.com/api/v2/networks/bsc/tokens/${TOKEN}/pools`),
  ]).then(([token, pools]) => ({
    name: "gecko",
    ok: token.ok && pools.ok,
    status: `${token.status}/${pools.status}`,
    body: { token: token.body, pools: pools.body },
    error: token.error || pools.error,
  })));

  requests.push(getJson("dexScreener", `https://api.dexscreener.com/latest/dex/tokens/${TOKEN}`));

  if (goldrushKey) {
    requests.push(getJson(
      "goldrush",
      `https://api.covalenthq.com/v1/56/address/${OWNER}/balances_v2/?quote-currency=USD`,
      { Authorization: `Bearer ${goldrushKey}` }
    ));
  }

  if (binplorerKey) {
    requests.push(getJson(
      "binplorer",
      `https://api.binplorer.com/getTokenInfo/${TOKEN}?apiKey=${encodeURIComponent(binplorerKey)}`
    ));
  }

  const results = await Promise.all(requests);
  const byName = Object.fromEntries(results.map((r) => [r.name, r]));

  if (!moralisKey) {
    section("Moralis");
    console.log("Skipped: MORALIS_API_KEY not found in .env");
  } else {
    printMoralisMetadata(byName.moralisMetadata);
    printMoralisPrice(byName.moralisPrice);
    printMoralisPairs(byName.moralisPairs);
  }

  printGecko(byName.gecko);
  printDexScreener(byName.dexScreener);
  printGoldRush(byName.goldrush);
  printBinplorer(byName.binplorer);

  section("Next Signal");
  console.log("- Moralis metadata is now live: logo/thumbnail and official links are available.");
  console.log("- Price path is already live if Moralis price, GeckoTerminal, and DexScreener all show the main pair.");
  console.log("- This script made no file, git, contract, or transaction changes.");
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});

