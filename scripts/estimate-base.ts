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

  console.log("Address: - estimate-base.ts:20", wallet.address);

  const balance = await provider.getBalance(wallet.address);
  const feeData = await provider.getFeeData();

  console.log("BNB balance: - estimate-base.ts:25", ethers.formatEther(balance));
  console.log("Gas price: - estimate-base.ts:26", ethers.formatUnits(feeData.gasPrice || 0n, "gwei"), "gwei");

  const tokenArtifact = loadArtifact(
    "artifacts/contracts/TokenOneBEP20Upgradeable.sol/TokenOneBEP20Upgradeable.json"
  );

  const factoryArtifact = loadArtifact(
    "artifacts/contracts/VanityProxyFactory.sol/VanityProxyFactory.json"
  );

  const tokenFactory = new ethers.ContractFactory(
    tokenArtifact.abi,
    tokenArtifact.bytecode,
    wallet
  );

  const vanityFactory = new ethers.ContractFactory(
    factoryArtifact.abi,
    factoryArtifact.bytecode,
    wallet
  );

  const tokenDeployTx = await tokenFactory.getDeployTransaction();
  const factoryDeployTx = await vanityFactory.getDeployTransaction();

  const tokenGas = await provider.estimateGas({
    from: wallet.address,
    data: tokenDeployTx.data,
  });

  const factoryGas = await provider.estimateGas({
    from: wallet.address,
    data: factoryDeployTx.data,
  });

  const gasPrice = feeData.gasPrice || 3_000_000_000n;

  const tokenCost = tokenGas * gasPrice;
  const factoryCost = factoryGas * gasPrice;
  const totalCost = tokenCost + factoryCost;

  console.log("\nEstimated gas: - estimate-base.ts:67");
  console.log("Implementation gas: - estimate-base.ts:68", tokenGas.toString());
  console.log("Factory gas: - estimate-base.ts:69", factoryGas.toString());

  console.log("\nEstimated cost: - estimate-base.ts:71");
  console.log("Implementation BNB: - estimate-base.ts:72", ethers.formatEther(tokenCost));
  console.log("Factory BNB: - estimate-base.ts:73", ethers.formatEther(factoryCost));
  console.log("Total BNB: - estimate-base.ts:74", ethers.formatEther(totalCost));

  if (balance < totalCost) {
    console.log("\nStatus: NOT ENOUGH BNB - estimate-base.ts:77");
  } else {
    console.log("\nStatus: Enough BNB for base deploy - estimate-base.ts:79");
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});