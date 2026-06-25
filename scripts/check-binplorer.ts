import dotenv from "dotenv";

dotenv.config();

const API_KEY = process.env.BINPLORER_API_KEY;
const TOKEN = "0x5591a8E9a5001f6052D9d749518AE1e6287b7955";

if (!API_KEY) {
  throw new Error("BINPLORER_API_KEY is missing from .env");
}

const url =
  `https://api.binplorer.com/getTokenInfo/${TOKEN}` +
  `?apiKey=${encodeURIComponent(API_KEY)}`;

const response = await fetch(url);

if (!response.ok) {
  throw new Error(`Binplorer API error: ${response.status}`);
}

const token = await response.json();

console.log("Binplorer TokenOne status - check-binplorer.ts:24");
console.log("");
console.log("Address: - check-binplorer.ts:26", token.address);
console.log("Name: - check-binplorer.ts:27", token.name);
console.log("Symbol: - check-binplorer.ts:28", token.symbol);
console.log("Decimals: - check-binplorer.ts:29", token.decimals);
console.log("Total supply: - check-binplorer.ts:30", token.totalSupply);
console.log("Owner: - check-binplorer.ts:31", token.owner);
console.log("Holders: - check-binplorer.ts:32", token.holdersCount);
console.log("Transfers: - check-binplorer.ts:33", token.transfersCount);
console.log("Logo: - check-binplorer.ts:34", token.image ?? "Not available");
console.log("Website: - check-binplorer.ts:35", token.website ?? "Not available");

if (token.price && token.price !== false) {
  console.log("Price USD: - check-binplorer.ts:38", token.price.rate);
  console.log("Market cap USD: - check-binplorer.ts:39", token.price.marketCapUsd);
  console.log("24h volume: - check-binplorer.ts:40", token.price.volume24h);
} else {
  console.log("Price: Not available - check-binplorer.ts:42");
}