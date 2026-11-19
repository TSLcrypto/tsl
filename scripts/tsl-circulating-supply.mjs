// tsl-circulating-supply.mjs
// Read-only: computes TSL (BSC) total and circulating supply for CoinMarketCap.
// Circulating = totalSupply - balances of project allocation wallets (Annex A).
// No private key, no transactions. Requires Node 18+ and ethers v6.
//
//   npm i ethers@6
//   node tsl-circulating-supply.mjs            -> report + Annex A table
//   node tsl-circulating-supply.mjs --total    -> total supply number only
//   node tsl-circulating-supply.mjs --circ     -> circulating supply number only
//
// Optional: BSC_RPC=https://your-rpc node tsl-circulating-supply.mjs

import { JsonRpcProvider, Contract, formatUnits } from "ethers";

const RPC = process.env.BSC_RPC || "https://bsc-dataseed.bnbchain.org";
const TOKEN = "0xD12ECbD5f508106ec242881530767FF15A6A7549";

// From docs/TSL-MAJOR-WALLET-ALLOCATIONS.md (project allocation labels).
const EXCLUDED = [
  ["0x066abb08910f6faf95d04901b0eda9529cd9ca78", "Project allocation reserve"],
  ["0x26af782a99be79c443b845e63b96d3c878bc88f5", "Ecosystem reserve"],
  ["0xda3c31013d105a46d5b936cc41a696bf96a77e42", "Liquidity planning"],
  ["0xf384a27c9fb1d1f6f3ed5fc989515ec9b25f2735", "Community distribution"],
  ["0x038567b9a489c83774f0c1d368d5b4756891a46a", "Development reserve"],
  ["0x43aa551ab2c12fd10ce46258bd7b049fd80a8abc", "Marketing reserve"],
  ["0x81b6dad1f68548b1472881d04e64268d614db011", "Partnership reserve"],
  ["0xa2d30d9dac6a3b7d7bd953f94596504de89fdb0b", "Treasury"],
  ["0xbd1263782e7d3b4f739ba8a09ee843375e573cdf", "Team / founder allocation"],
  ["0xdab105a2de91acc4ee2c8b2cf40c44e88b9ec3b7", "Deployer / project owner"],
];

const ABI = [
  "function totalSupply() view returns (uint256)",
  "function decimals() view returns (uint8)",
  "function balanceOf(address) view returns (uint256)",
];

async function main() {
  const provider = new JsonRpcProvider(RPC, 56);
  const token = new Contract(TOKEN, ABI, provider);
  const [total, decimals, block] = await Promise.all([
    token.totalSupply(),
    token.decimals(),
    provider.getBlockNumber(),
  ]);

  const rows = [];
  let excluded = 0n;
  for (const [addr, label] of EXCLUDED) {
    const bal = await token.balanceOf(addr);
    excluded += bal;
    rows.push({ addr, label, bal });
  }
  const circ = total - excluded;
  const fmt = (v) => formatUnits(v, decimals);

  if (process.argv.includes("--total")) return console.log(fmt(total));
  if (process.argv.includes("--circ")) return console.log(fmt(circ));

  const pct = (v) => (Number((v * 1000000n) / total) / 10000).toFixed(4) + "%";
  console.log(`TSL on BSC - block ${block} - ${new Date().toISOString()}`);
  console.log(`Decimals:            ${decimals}`);
  console.log(`Total supply:        ${fmt(total)}`);
  console.log(`Excluded (Annex A):  ${fmt(excluded)} (${pct(excluded)})`);
  console.log(`Circulating supply:  ${fmt(circ)} (${pct(circ)})`);
  console.log("\nAnnex A - Rich List & Reserve Addresses");
  console.log("| Address | Label | Balance (TSL) | Share |");
  console.log("|---|---|---:|---:|");
  for (const r of rows) {
    console.log(`| ${r.addr} | ${r.label} | ${fmt(r.bal)} | ${pct(r.bal)} |`);
  }
}

main().catch((e) => {
  console.error("Error:", e.shortMessage || e.message);
  process.exit(1);
});
