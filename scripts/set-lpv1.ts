import "dotenv/config";
import { ethers } from "ethers";
import fs from "fs";

const RPC_URL = process.env.BSC_MAINNET_RPC || "https://bsc-dataseed.binance.org/";
const PRIVATE_KEY = process.env.PRIVATE_KEY || "";

const TOKEN_PROXY = "0x5591a8E9a5001f6052D9d749518AE1e6287b7955";
const LP_V1 = "0x46d776A2F759718A9F86642f52a7FBb2B475b22F";

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

  console.log("Owner wallet:", wallet.address);
  console.log("Current lpV1:", await token.lpV1());

  const tx = await token.setLpV1(LP_V1);
  console.log("TX:", tx.hash);

  await tx.wait();

  console.log("New lpV1:", await token.lpV1());
  console.log("buySellEnabled:", await token.buySellEnabled());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});