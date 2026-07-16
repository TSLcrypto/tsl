import { ethers } from "ethers";
import "dotenv/config";

const RPC = process.env.BSC_RPC_URL || "https://bsc-dataseed.binance.org/";
const TARGET = "0x55DC1cc22BbEcA50c5FD179A1BA0bF7208c6B955";

const provider = new ethers.JsonRpcProvider(RPC);

const ERC20_ABI = [
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function decimals() view returns (uint8)",
  "function totalSupply() view returns (uint256)",
  "function owner() view returns (address)",
  "function maxSupply() view returns (uint256)",
  "function cap() view returns (uint256)"
];

const selectors: Record<string, string> = {
  "mint(address,uint256)": "0x40c10f19",
  "mint(uint256)": "0xa0712d68",
  "mintTo(address,uint256)": "0x449a52f8",
  "owner()": "0x8da5cb5b",
  "maxSupply()": "0xd5abeb01",
  "cap()": "0x355274ea",
  "MINTER_ROLE()": "0xd5391393",
};

const EIP1967_IMPL_SLOT =
  "0x360894A13BA1A3210667C828492DB98DCA3E2076CC3735A920A3CA505D382BBC";

function hasSelector(bytecode: string, selector: string) {
  return bytecode.toLowerCase().includes(selector.toLowerCase().replace("0x", ""));
}

async function tryRead(label: string, fn: () => Promise<any>) {
  try {
    const v = await fn();
    console.log(`${label}:`, v?.toString?.() ?? v);
  } catch {
    console.log(`${label}: n/a`);
  }
}

async function main() {
  console.log("B955 read-only contract check");
  console.log("Target:", TARGET);
  console.log("RPC:", RPC);

  const code = await provider.getCode(TARGET);
  console.log("Contract code exists:", code !== "0x");
  console.log("Code length:", code.length);

  const c = new ethers.Contract(TARGET, ERC20_ABI, provider);

  await tryRead("name", () => c.name());
  await tryRead("symbol", () => c.symbol());
  await tryRead("decimals", () => c.decimals());
  await tryRead("totalSupply", () => c.totalSupply());
  await tryRead("owner", () => c.owner());
  await tryRead("maxSupply", () => c.maxSupply());
  await tryRead("cap", () => c.cap());

  console.log("\nSelector scan on target bytecode:");
  for (const [sig, selector] of Object.entries(selectors)) {
    console.log(`${sig} ${selector}:`, hasSelector(code, selector) ? "FOUND" : "not found");
  }

  const rawImpl = await provider.getStorage(TARGET, EIP1967_IMPL_SLOT);
  const impl = ethers.getAddress("0x" + rawImpl.slice(-40));

  if (impl !== ethers.ZeroAddress) {
    console.log("\nPossible EIP1967 implementation:", impl);
    const implCode = await provider.getCode(impl);
    console.log("Implementation code exists:", implCode !== "0x");
    console.log("Implementation code length:", implCode.length);

    console.log("\nSelector scan on implementation bytecode:");
    for (const [sig, selector] of Object.entries(selectors)) {
      console.log(`${sig} ${selector}:`, hasSelector(implCode, selector) ? "FOUND" : "not found");
    }
  } else {
    console.log("\nNo EIP1967 implementation detected.");
  }

  console.log("\nREAD ONLY ✅ No transaction sent.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
