import { ethers } from "ethers";
import dotenv from "dotenv";

dotenv.config();

const RPC = process.env.BSC_MAINNET_RPC || "";
const PRIVATE_KEY = process.env.PRIVATE_KEY || "";
const EXECUTE = process.env.EXECUTE_SET_META_URI === "true";

const TOKEN = "0x5591a8E9a5001f6052D9d749518AE1e6287b7955";

const NEW_META_URI =
  "https://blush-active-quokka-393.mypinata.cloud/ipfs/bafkreiewcwmeatwa4bnzrfjlsqjdrcz664gos2o27uc4v2ispamfmgvsz4";

const ABI = [
  "function setMetaURI(string newURI) external",
  "function metaURI() view returns (string)",
  "function owner() view returns (address)"
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
  const current = await token.metaURI();

  console.log("chainId:", chain.chainId.toString());
  console.log("wallet:", wallet.address);
  console.log("owner:", owner);
  console.log("EXECUTE_SET_META_URI:", EXECUTE);
  console.log("");
  console.log("Current metaURI:");
  console.log(current);
  console.log("");
  console.log("New metaURI:");
  console.log(NEW_META_URI);
  console.log("");

  if (owner.toLowerCase() !== wallet.address.toLowerCase()) {
    throw new Error("Connected wallet is not token owner. Do not continue.");
  }

  if (current === NEW_META_URI) {
    console.log("metaURI is already updated. No transaction needed.");
    return;
  }

  console.log("Simulating setMetaURI...");
  await token.setMetaURI.staticCall(NEW_META_URI);
  console.log("staticCall OK");

  const gas = await token.setMetaURI.estimateGas(NEW_META_URI);
  const gasLimit = (gas * 150n) / 100n;

  console.log("gas estimate:", gas.toString());
  console.log("gas limit:", gasLimit.toString());

  if (!EXECUTE) {
    console.log("");
    console.log("DRY RUN ONLY. No transaction sent.");
    console.log("To execute, set EXECUTE_SET_META_URI=true in .env");
    return;
  }

  console.log("");
  console.log("Sending transaction...");
  const tx = await token.setMetaURI(NEW_META_URI, { gasLimit });
  console.log("tx:", tx.hash);

  const receipt = await tx.wait();
  console.log("confirmed block:", receipt?.blockNumber);
  console.log("gas used:", receipt?.gasUsed?.toString());

  console.log("");
  console.log("Updated metaURI:");
  console.log(await token.metaURI());
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
