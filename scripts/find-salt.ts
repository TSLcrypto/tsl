import { ethers } from "ethers";
import fs from "fs";

const FACTORY_ADDRESS = "0x5715Ea371B11EE0BD2Ea217A881097eC18169936";
const IMPLEMENTATION_ADDRESS = "0x87313388276a317539BB96297523353Ed3eF5149";

const TARGET_PREFIX = "0x55";
const TARGET_SUFFIX = "7955";

const TOKEN_NAME = "Tether USD";
const TOKEN_SYMBOL = "USDT";
const TOKEN_DECIMALS = 18;

const INITIAL_SUPPLY = ethers.parseUnits("1000000000", TOKEN_DECIMALS);
const MAX_SUPPLY = ethers.parseUnits("1000000000", TOKEN_DECIMALS);

const META_URI =
  "ipfs://bafkreifeexpmy64bs6i6ltarl7kehhuakiiypjoethinrlhx7rofgc3swa";

const OWNER_ADDRESS = "0x3cf25AB11d1E46A6e91083f0C1e06607e846Ac2C";

const PROXY_ARTIFACT_PATH =
  "artifacts/contracts/ProxyImport.sol/ProxyImport.json";

async function main() {
  const proxyArtifact = JSON.parse(
    fs.readFileSync(PROXY_ARTIFACT_PATH, "utf8")
  );

  const proxyCreationCode = proxyArtifact.bytecode;

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

  const constructorArgs = ethers.AbiCoder.defaultAbiCoder().encode(
    ["address", "bytes"],
    [IMPLEMENTATION_ADDRESS, initData]
  );

  const fullBytecode = ethers.concat([proxyCreationCode, constructorArgs]);
  const bytecodeHash = ethers.keccak256(fullBytecode);

  console.log("Searching salt... - find-salt.ts:54");
  console.log("Target: - find-salt.ts:55", `${TARGET_PREFIX}...${TARGET_SUFFIX}`);

  let i = 0n;

  while (true) {
    const salt = ethers.zeroPadValue(ethers.toBeHex(i), 32);

    const predicted = ethers.getCreate2Address(
      FACTORY_ADDRESS,
      salt,
      bytecodeHash
    );

    if (
      predicted.toLowerCase().startsWith(TARGET_PREFIX.toLowerCase()) &&
      predicted.toLowerCase().endsWith(TARGET_SUFFIX.toLowerCase())
    ) {
      console.log("\nFOUND! - find-salt.ts:72");
      console.log("Salt number: - find-salt.ts:73", i.toString());
      console.log("Salt bytes32: - find-salt.ts:74", salt);
      console.log("Predicted proxy: - find-salt.ts:75", predicted);
      break;
    }

    if (i % 100000n === 0n) {
      console.log("Checked: - find-salt.ts:80", i.toString(), "Last:", predicted);
    }

    i++;
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});