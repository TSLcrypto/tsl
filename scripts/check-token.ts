import "dotenv/config";
import { ethers } from "ethers";
import fs from "fs";

const RPC_URL = process.env.BSC_MAINNET_RPC || "https://bsc-dataseed.binance.org/";
const PROXY_ADDRESS = "0x5591a8E9a5001f6052D9d749518AE1e6287b7955";

function loadArtifact(path: string) {
  return JSON.parse(fs.readFileSync(path, "utf8"));
}

async function main() {
  const provider = new ethers.JsonRpcProvider(RPC_URL);

  const tokenArtifact = loadArtifact(
    "artifacts/contracts/TokenOneBEP20Upgradeable.sol/TokenOneBEP20Upgradeable.json"
  );

  const token = new ethers.Contract(
    PROXY_ADDRESS,
    tokenArtifact.abi,
    provider
  );

  console.log("Proxy: - check-token.ts:25", PROXY_ADDRESS);
  console.log("name: - check-token.ts:26", await token.name());
  console.log("symbol: - check-token.ts:27", await token.symbol());
  console.log("decimals: - check-token.ts:28", await token.decimals());
  console.log("totalSupply: - check-token.ts:29", ethers.formatUnits(await token.totalSupply(), 18));
  console.log("maxSupply: - check-token.ts:30", ethers.formatUnits(await token.maxSupply(), 18));
  console.log("owner: - check-token.ts:31", await token.owner());
  console.log("metaURI: - check-token.ts:32", await token.metaURI());
  console.log("buySellEnabled: - check-token.ts:33", await token.buySellEnabled());
  console.log("lpV1: - check-token.ts:34", await token.lpV1());
  console.log("lpV2: - check-token.ts:35", await token.lpV2());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});