import "dotenv/config";
import { ethers } from "ethers";

const TOKEN = "0x5591a8E9a5001f6052D9d749518AE1e6287b7955";

const NEW_META_URI =
  "https://blush-active-quokka-393.mypinata.cloud/ipfs/bafkreicjzfext2gh5zry3mg2q7zl7ejsjvpngu5ybq7qv63e56fzmbhvni";

const RPC_URL =
  process.env.BSC_RPC_URL ||
  process.env.RPC_URL ||
  process.env.BNB_RPC_URL ||
  process.env.MAINNET_RPC_URL;

const PRIVATE_KEY =
  process.env.PRIVATE_KEY ||
  process.env.OWNER_PRIVATE_KEY ||
  process.env.DEPLOYER_PRIVATE_KEY;

if (!RPC_URL) {
  throw new Error("Missing RPC URL in .env");
}

if (!PRIVATE_KEY) {
  throw new Error("Missing PRIVATE_KEY / OWNER_PRIVATE_KEY / DEPLOYER_PRIVATE_KEY in .env");
}

const ABI = [
  "function owner() view returns (address)",
  "function metaURI() view returns (string)",
  "function setMetaURI(string newURI) external",
];

async function main() {
  const provider = new ethers.JsonRpcProvider(RPC_URL);
  const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
  const token = new ethers.Contract(TOKEN, ABI, wallet);

  console.log("Token:", TOKEN);
  console.log("Signer:", wallet.address);

  const owner = await token.owner();
  console.log("Owner:", owner);

  if (wallet.address.toLowerCase() !== owner.toLowerCase()) {
    throw new Error("Signer is not token owner");
  }

  const before = await token.metaURI();
  console.log("metaURI before:", before);
  console.log("metaURI new:", NEW_META_URI);

  if (before === NEW_META_URI) {
    console.log("Already updated.");
    return;
  }

  const tx = await token.setMetaURI(NEW_META_URI);
  console.log("Tx hash:", tx.hash);

  const receipt = await tx.wait();
  console.log("Confirmed block:", receipt.blockNumber);

  const after = await token.metaURI();
  console.log("metaURI after:", after);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

