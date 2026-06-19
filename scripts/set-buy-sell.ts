import "dotenv/config";
import { ethers } from "ethers";
import fs from "fs";

const RPC_URL = process.env.BSC_MAINNET_RPC || "https://bsc-dataseed.binance.org/";
const PRIVATE_KEY = process.env.PRIVATE_KEY || "";

const TOKEN_PROXY = "0x5591a8E9a5001f6052D9d749518AE1e6287b7955";
const ENABLED = true;

function loadArtifact(path: string) {
  return JSON.parse(fs.readFileSync(path, "utf8"));
}

async function main() {
  if (!PRIVATE_KEY) throw new Error("PRIVATE_KEY missing");

  const provider = new ethers.JsonRpcProvider(RPC_URL);
  const wallet = new ethers.Wallet(PRIVATE_KEY, provider);

  const tokenArtifact = loadArtifact(
    "artifacts/contracts/TokenOneBEP20Upgradeable.sol/TokenOneBEP20Upgradeable.json"
  );

  const token = new ethers.Contract(TOKEN_PROXY, tokenArtifact.abi, wallet);

  console.log("Owner wallet: - set-buy-sell.ts:27", wallet.address);
  console.log("Current buySellEnabled: - set-buy-sell.ts:28", await token.buySellEnabled());

  const tx = await token.setBuySellEnabled(ENABLED);
  console.log("TX: - set-buy-sell.ts:31", tx.hash);

  await tx.wait();

  console.log("New buySellEnabled: - set-buy-sell.ts:35", await token.buySellEnabled());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});