import "dotenv/config";
import { ethers } from "ethers";
import fs from "fs";

const RPC_URL = process.env.BSC_MAINNET_RPC || "https://bsc-dataseed.binance.org/";
const PRIVATE_KEY = process.env.PRIVATE_KEY || "";

if (!PRIVATE_KEY) {
  throw new Error("PRIVATE_KEY is missing in .env");
}

function loadArtifact(path: string) {
  return JSON.parse(fs.readFileSync(path, "utf8"));
}

async function main() {
  const provider = new ethers.JsonRpcProvider(RPC_URL);
  const wallet = new ethers.Wallet(PRIVATE_KEY, provider);

  console.log("Deployer: - deploy-factory.ts:20", wallet.address);
  console.log("Balance: - deploy-factory.ts:21", ethers.formatEther(await provider.getBalance(wallet.address)));

  const factoryArtifact = loadArtifact(
    "artifacts/contracts/VanityProxyFactory.sol/VanityProxyFactory.json"
  );

  const VanityFactory = new ethers.ContractFactory(
    factoryArtifact.abi,
    factoryArtifact.bytecode,
    wallet
  );

  console.log("Deploying new VanityProxyFactory... - deploy-factory.ts:33");

  const factory = await VanityFactory.deploy();
  await factory.waitForDeployment();

  const factoryAddress = await factory.getAddress();

  console.log("New VanityProxyFactory: - deploy-factory.ts:40", factoryAddress);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});