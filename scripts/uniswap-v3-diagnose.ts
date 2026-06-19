import dotenv from "dotenv";
import { ethers } from "ethers";

dotenv.config({ path: ".env.uniswap" });

const RPC_URL = process.env.BSC_RPC_URL || "https://bsc-dataseed.binance.org/";
const PRIVATE_KEY = process.env.UNISWAP_LP_PRIVATE_KEY || "";

const TOKENONE = "0x5591a8E9a5001f6052D9d749518AE1e6287b7955";
const BSC_USDT = "0x55d398326f99059fF775485246999027B3197955";

const UNISWAP_V3_FACTORY = "0xdB1d10011AD0Ff90774D0C6Bb92e5C5c8b4461F7";
const NONFUNGIBLE_POSITION_MANAGER = "0x7b8A01B39D58278b5DE7e48c8449c9f4F5170613";

const FEE = Number(process.env.UNIV3_FEE || "3000");
const TOKENONE_AMOUNT_HUMAN = process.env.UNIV3_TOKENONE_AMOUNT || "10";
const USDT_AMOUNT_HUMAN = process.env.UNIV3_USDT_AMOUNT || "10";

const ERC20_ABI = [
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function decimals() view returns (uint8)",
  "function balanceOf(address) view returns (uint256)",
  "function allowance(address owner,address spender) view returns (uint256)"
];

const FACTORY_ABI = [
  "function getPool(address tokenA,address tokenB,uint24 fee) external view returns (address pool)",
  "function feeAmountTickSpacing(uint24 fee) external view returns (int24)"
];

const NPM_ABI = [
  "function factory() external view returns (address)",
  "function WETH9() external view returns (address)",
  "function createAndInitializePoolIfNecessary(address token0,address token1,uint24 fee,uint160 sqrtPriceX96) payable returns (address pool)",
  "function mint((address token0,address token1,uint24 fee,int24 tickLower,int24 tickUpper,uint256 amount0Desired,uint256 amount1Desired,uint256 amount0Min,uint256 amount1Min,address recipient,uint256 deadline)) payable returns (uint256 tokenId,uint128 liquidity,uint256 amount0,uint256 amount1)"
];

function sortTokens(a: string, b: string): [string, string] {
  return a.toLowerCase() < b.toLowerCase() ? [a, b] : [b, a];
}

function sqrtBigInt(value: bigint): bigint {
  if (value < 0n) throw new Error("negative sqrt");
  if (value < 2n) return value;
  let x0 = value / 2n;
  let x1 = (x0 + value / x0) / 2n;
  while (x1 < x0) {
    x0 = x1;
    x1 = (x0 + value / x0) / 2n;
  }
  return x0;
}

function encodeSqrtRatioX96(amount1: bigint, amount0: bigint): bigint {
  if (amount0 === 0n || amount1 === 0n) throw new Error("zero amount");
  return sqrtBigInt((amount1 << 192n) / amount0);
}

function fullRangeTicks(fee: number): { tickLower: number; tickUpper: number } {
  if (fee === 100) return { tickLower: -887272, tickUpper: 887272 };
  if (fee === 500) return { tickLower: -887270, tickUpper: 887270 };
  if (fee === 3000) return { tickLower: -887220, tickUpper: 887220 };
  if (fee === 10000) return { tickLower: -887200, tickUpper: 887200 };
  throw new Error("Unsupported fee");
}

function minAmount(amount: bigint): bigint {
  return (amount * 95n) / 100n;
}

function printError(label: string, err: any) {
  console.log("");
  console.log(label, "FAILED");
  console.log("shortMessage:", err?.shortMessage);
  console.log("reason:", err?.reason);
  console.log("revert:", err?.revert);
  console.log("data:", err?.data);
  console.log("message:", err?.message);
  console.log("");
}

async function main() {
  if (!PRIVATE_KEY || !PRIVATE_KEY.startsWith("0x")) {
    throw new Error("UNISWAP_LP_PRIVATE_KEY missing or invalid");
  }

  const provider = new ethers.JsonRpcProvider(RPC_URL);
  const wallet = new ethers.Wallet(PRIVATE_KEY, provider);

  const network = await provider.getNetwork();
  console.log("chainId:", network.chainId.toString());
  console.log("wallet:", wallet.address);

  const factoryCode = await provider.getCode(UNISWAP_V3_FACTORY);
  const npmCode = await provider.getCode(NONFUNGIBLE_POSITION_MANAGER);

  console.log("factory code exists:", factoryCode !== "0x");
  console.log("position manager code exists:", npmCode !== "0x");

  const tokenOne = new ethers.Contract(TOKENONE, ERC20_ABI, wallet);
  const usdt = new ethers.Contract(BSC_USDT, ERC20_ABI, wallet);
  const factory = new ethers.Contract(UNISWAP_V3_FACTORY, FACTORY_ABI, wallet);
  const npm = new ethers.Contract(NONFUNGIBLE_POSITION_MANAGER, NPM_ABI, wallet);

  const npmFactory: string = await npm.factory();
  const weth9: string = await npm.WETH9();

  console.log("NPM factory:", npmFactory);
  console.log("NPM WETH9:", weth9);
  console.log("expected factory:", UNISWAP_V3_FACTORY);
  console.log("factory match:", npmFactory.toLowerCase() === UNISWAP_V3_FACTORY.toLowerCase());

  const spacing: bigint = await factory.feeAmountTickSpacing(FEE);
  console.log("fee:", FEE);
  console.log("tick spacing:", spacing.toString());

  const tokenOneDecimals: number = await tokenOne.decimals();
  const usdtDecimals: number = await usdt.decimals();

  const tokenOneAmount = ethers.parseUnits(TOKENONE_AMOUNT_HUMAN, tokenOneDecimals);
  const usdtAmount = ethers.parseUnits(USDT_AMOUNT_HUMAN, usdtDecimals);

  const [token0, token1] = sortTokens(TOKENONE, BSC_USDT);

  const amount0Desired =
    token0.toLowerCase() === TOKENONE.toLowerCase() ? tokenOneAmount : usdtAmount;

  const amount1Desired =
    token1.toLowerCase() === TOKENONE.toLowerCase() ? tokenOneAmount : usdtAmount;

  const sqrtPriceX96 = encodeSqrtRatioX96(amount1Desired, amount0Desired);
  const ticks = fullRangeTicks(FEE);

  console.log("token0:", token0);
  console.log("token1:", token1);
  console.log("amount0Desired:", amount0Desired.toString());
  console.log("amount1Desired:", amount1Desired.toString());
  console.log("sqrtPriceX96:", sqrtPriceX96.toString());

  const existingPool: string = await factory.getPool(token0, token1, FEE);
  console.log("existing pool:", existingPool);

  const tokenOneAllowance: bigint = await tokenOne.allowance(wallet.address, NONFUNGIBLE_POSITION_MANAGER);
  const usdtAllowance: bigint = await usdt.allowance(wallet.address, NONFUNGIBLE_POSITION_MANAGER);

  console.log("TokenOne allowance:", tokenOneAllowance.toString());
  console.log("USDT allowance:", usdtAllowance.toString());

  console.log("");
  console.log("Testing create/init with staticCall...");
  try {
    const simulatedPool: string = await npm.createAndInitializePoolIfNecessary.staticCall(
      token0,
      token1,
      FEE,
      sqrtPriceX96
    );
    console.log("create/init staticCall OK:", simulatedPool);
  } catch (err: any) {
    printError("create/init staticCall", err);
  }

  console.log("Testing create/init gas estimate...");
  try {
    const gas: bigint = await npm.createAndInitializePoolIfNecessary.estimateGas(
      token0,
      token1,
      FEE,
      sqrtPriceX96
    );
    console.log("create/init gas estimate OK:", gas.toString());
    console.log("suggested gas limit 150%:", ((gas * 150n) / 100n).toString());
  } catch (err: any) {
    printError("create/init estimateGas", err);
  }

  const deadline = Math.floor(Date.now() / 1000) + 60 * 20;

  const mintParams = {
    token0,
    token1,
    fee: FEE,
    tickLower: ticks.tickLower,
    tickUpper: ticks.tickUpper,
    amount0Desired,
    amount1Desired,
    amount0Min: minAmount(amount0Desired),
    amount1Min: minAmount(amount1Desired),
    recipient: wallet.address,
    deadline
  };

  console.log("Testing mint staticCall...");
  try {
    const mintResult = await npm.mint.staticCall(mintParams);
    console.log("mint staticCall OK:", mintResult);
  } catch (err: any) {
    printError("mint staticCall", err);
  }

  console.log("Diagnosis finished. No transaction was sent.");
}

main().catch((err) => {
  console.error("ERROR:", err);
  process.exit(1);
});
