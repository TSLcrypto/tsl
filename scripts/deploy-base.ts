import "dotenv/config";
import { ethers } from "ethers";
import fs from "fs";

const RPC_URL = process.env.BSC_MAINNET_RPC || "https://bsc-dataseed.binance.org/";
const PRIVATE_KEY = process.env.PRIVATE_KEY || "";

if (!PRIVATE_KEY) {
  throw new Error("PRIVATE_KEY is missing in .env");
}

async function loadArtifact(path: string) {
  return JSON.parse(fs.readFileSync(path, "utf8"));
}

async function main() {
  const provider = new ethers.JsonRpcProvider(RPC_URL);
  const wallet = new ethers.Wallet(PRIVATE_KEY, provider);

  console.log("Deployer: - deploy-base.ts:20", wallet.address);

  const balance = await provider.getBalance(wallet.address);
  console.log("BNB balance: - deploy-base.ts:23", ethers.formatEther(balance));

  const tokenArtifact = await loadArtifact(
    "artifacts/contracts/TokenOneBEP20Upgradeable.sol/TokenOneBEP20Upgradeable.json"
  );

  const factoryArtifact = await loadArtifact(
    "artifacts/contracts/VanityProxyFactory.sol/VanityProxyFactory.json"
  );

  console.log("Deploying implementation... - deploy-base.ts:33");
  const TokenFactory = new ethers.ContractFactory(
    tokenArtifact.abi,
    tokenArtifact.bytecode,
    wallet
  );

  const implementation = await TokenFactory.deploy();
  await implementation.waitForDeployment();

  const implementationAddress = await implementation.getAddress();
  console.log("Implementation: - deploy-base.ts:44", implementationAddress);

  console.log("Deploying VanityProxyFactory... - deploy-base.ts:46");
  const VanityFactory = new ethers.ContractFactory(
    factoryArtifact.abi,
    factoryArtifact.bytecode,
    wallet
  );

  const vanityFactory = await VanityFactory.deploy();
  await vanityFactory.waitForDeployment();

  const vanityFactoryAddress = await vanityFactory.getAddress();
  console.log("VanityProxyFactory: - deploy-base.ts:57", vanityFactoryAddress);

  console.log("DONE - deploy-base.ts:59");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});