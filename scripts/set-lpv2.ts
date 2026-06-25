import { ethers } from "ethers";
import dotenv from "dotenv";

dotenv.config();

const RPC = process.env.BSC_MAINNET_RPC || "";
const PRIVATE_KEY = process.env.PRIVATE_KEY || "";
const EXECUTE = process.env.EXECUTE_SET_LPV2 === "true";

const TOKEN = "0x5591a8E9a5001f6052D9d749518AE1e6287b7955";
const NEW_LPV2 = "0xc9D69885d0F3D5DA6e625c49923f4d876b54cB43";

const ABI = [
  "function owner() view returns (address)",
  "function lpV2() view returns (address)",
  "function setLpV2(address newLp) external"
];

async function main() {
  if (!RPC) throw new Error("BSC_MAINNET_RPC missing in .env");
  if (!PRIVATE_KEY || !PRIVATE_KEY.startsWith("0x")) {
    throw new Error("PRIVATE_KEY missing or invalid in .env");
  }

  const provider = new ethers.JsonRpcProvider(RPC);
  const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
  const token = new ethers.Contract(TOKEN, ABI, wallet);

  const chain = await provider.getNetwork();
  const owner = await token.owner();
  const currentLpV2 = await token.lpV2();

  console.log("chainId:", chain.chainId.toString());
  console.log("wallet:", wallet.address);
  console.log("owner:", owner);
  console.log("EXECUTE_SET_LPV2:", EXECUTE);
  console.log("");
  console.log("Current lpV2:", currentLpV2);
  console.log("New lpV2:", NEW_LPV2);
  console.log("");

  if (owner.toLowerCase() !== wallet.address.toLowerCase()) {
    throw new Error("Connected wallet is not token owner. Do not continue.");
  }

  if (currentLpV2.toLowerCase() === NEW_LPV2.toLowerCase()) {
    console.log("lpV2 is already updated. No transaction needed.");
    return;
  }

  console.log("Simulating setLpV2...");
  await token.setLpV2.staticCall(NEW_LPV2);
  console.log("staticCall OK");

  const gas = await token.setLpV2.estimateGas(NEW_LPV2);
  const gasLimit = (gas * 150n) / 100n;

  console.log("gas estimate:", gas.toString());
  console.log("gas limit:", gasLimit.toString());

  if (!EXECUTE) {
    console.log("");
    console.log("DRY RUN ONLY. No transaction sent.");
    console.log("To execute, set EXECUTE_SET_LPV2=true in .env");
    return;
  }

  console.log("");
  console.log("Sending transaction...");
  const tx = await token.setLpV2(NEW_LPV2, { gasLimit });
  console.log("tx:", tx.hash);

  const receipt = await tx.wait();
  console.log("confirmed block:", receipt?.blockNumber);
  console.log("gas used:", receipt?.gasUsed?.toString());

  console.log("");
  console.log("Updated lpV2:", await token.lpV2());
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
