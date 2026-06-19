import { ethers } from "ethers";
import dotenv from "dotenv";

dotenv.config();

const RPC = process.env.BSC_MAINNET_RPC!;
const PRIVATE_KEY = process.env.PRIVATE_KEY!;

const TOKEN =
  "0x5591a8E9a5001f6052D9d749518AE1e6287b7955";

const NEW_META_URI =
  "https://gateway.pinata.cloud/ipfs/bafkreic2cczk4jcsezxgcmmlo4bgjj3spxeafvrmd5wfmuqjbmtouo2cx4";

const ABI = [
  "function setMetaURI(string newURI) external",
  "function metaURI() view returns (string)"
];

async function main() {
  const provider = new ethers.JsonRpcProvider(RPC);
  const wallet = new ethers.Wallet(PRIVATE_KEY, provider);

  const token = new ethers.Contract(TOKEN, ABI, wallet);

  console.log("Current: - set-meta-uri.ts:26", await token.metaURI());

  const tx = await token.setMetaURI(NEW_META_URI);
  console.log("TX: - set-meta-uri.ts:29", tx.hash);

  await tx.wait();

  console.log("New: - set-meta-uri.ts:33", await token.metaURI());
}

main().catch(console.error);