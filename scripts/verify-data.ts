import { ethers } from "ethers";

const IMPLEMENTATION_ADDRESS = "0x87313388276a317539BB96297523353Ed3eF5149";
const OWNER_ADDRESS = "0x3cf25AB11d1E46A6e91083f0C1e06607e846Ac2C";

const TOKEN_NAME = "Tether USD";
const TOKEN_SYMBOL = "USDT";
const TOKEN_DECIMALS = 18;
const INITIAL_SUPPLY = ethers.parseUnits("1000000000", TOKEN_DECIMALS);
const MAX_SUPPLY = ethers.parseUnits("1000000000", TOKEN_DECIMALS);

const META_URI =
  "ipfs://bafkreifeexpmy64bs6i6ltarl7kehhuakiiypjoethinrlhx7rofgc3swa";

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

const proxyConstructorArgs = ethers.AbiCoder.defaultAbiCoder().encode(
  ["address", "bytes"],
  [IMPLEMENTATION_ADDRESS, initData]
);

console.log("initData: - verify-data.ts:34");
console.log(initData);

console.log("\nProxy constructor args: - verify-data.ts:37");
console.log(proxyConstructorArgs);