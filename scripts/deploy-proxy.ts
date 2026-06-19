import "dotenv/config";
import { ethers } from "ethers";
import fs from "fs";

const RPC_URL = process.env.BSC_MAINNET_RPC || "https://bsc-dataseed.binance.org/";
const PRIVATE_KEY = process.env.PRIVATE_KEY || "";

const FACTORY_ADDRESS = "0x5715Ea371B11EE0BD2Ea217A881097eC18169936";
const IMPLEMENTATION_ADDRESS = "0x87313388276a317539BB96297523353Ed3eF5149";

const SALT =
  "0x00000000000000000000000000000000000000000000000000000000000fab26";

const EXPECTED_PROXY = "0x5591a8E9a5001f6052D9d749518AE1e6287b7955";

const TOKEN_NAME = "Tether USD";
const TOKEN_SYMBOL = "USDT";
const TOKEN_DECIMALS = 18;

const INITIAL_SUPPLY = ethers.parseUnits("1000000000", TOKEN_DECIMALS);
const MAX_SUPPLY = ethers.parseUnits("1000000000", TOKEN_DECIMALS);

const META_URI =
  "ipfs://bafkreifeexpmy64bs6i6ltarl7kehhuakiiypjoethinrlhx7rofgc3swa";

const OWNER_ADDRESS = "0x3cf25AB11d1E46A6e91083f0C1e06607e846Ac2C";

function loadArtifact(path: string) {
  return JSON.parse(fs.readFileSync(path, "utf8"));
}

async function main() {
  if (!PRIVATE_KEY) {
    throw new Error("PRIVATE_KEY missing");
  }

  const provider = new ethers.JsonRpcProvider(RPC_URL);
  const wallet = new ethers.Wallet(PRIVATE_KEY, provider);

  const factoryArtifact = loadArtifact(
    "artifacts/contracts/VanityProxyFactory.sol/VanityProxyFactory.json"
  );

  const factory = new ethers.Contract(
    FACTORY_ADDRESS,
    factoryArtifact.abi,
    wallet
  );

  const tokenInterface = new ethers.Interface([
    "function initialize(string,string,uint8,uint256,uint256,string,address)",
  ]);

  const initData = tokenInterface.encodeFunctionData("initialize", [
    TOKEN_NAME,
    TOKEN_SYMBOL,
    TOKEN_DECIMALS,
    INITIAL_SUPPLY,
    MAX_SUPPLY,
    META_URI,
    OWNER_ADDRESS,
  ]);

  const predicted = await factory.predictProxyAddress(
    IMPLEMENTATION_ADDRESS,
    SALT,
    initData
  );

  console.log("Deployer: - deploy-proxy.ts:70", wallet.address);
  console.log("Balance: - deploy-proxy.ts:71", ethers.formatEther(await provider.getBalance(wallet.address)));
  console.log("Predicted: - deploy-proxy.ts:72", predicted);
  console.log("Expected: - deploy-proxy.ts:73", EXPECTED_PROXY);

  if (predicted.toLowerCase() !== EXPECTED_PROXY.toLowerCase()) {
    throw new Error("Predicted proxy does not match expected proxy");
  }

  console.log("Deploying proxy... - deploy-proxy.ts:79");

  const tx = await factory.deployProxy(
    IMPLEMENTATION_ADDRESS,
    SALT,
    initData
  );

  console.log("TX: - deploy-proxy.ts:87", tx.hash);

  const receipt = await tx.wait();

  console.log("Confirmed in block: - deploy-proxy.ts:91", receipt.blockNumber);
  console.log("Proxy deployed: - deploy-proxy.ts:92", EXPECTED_PROXY);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});