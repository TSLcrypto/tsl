import dotenv from "dotenv";
import { ethers } from "ethers";

dotenv.config({ path: ".env.uniswap" });

const RPC_URL = process.env.BSC_RPC_URL || "https://bsc-dataseed.binance.org/";
const PRIVATE_KEY = process.env.UNISWAP_LP_PRIVATE_KEY || "";
const EXECUTE_CREATE_POOL = process.env.EXECUTE_UNIV3_CREATE_POOL === "true";

const TOKENONE = "0x5591a8E9a5001f6052D9d749518AE1e6287b7955";
const BSC_USDT = "0x55d398326f99059fF775485246999027B3197955";

const UNISWAP_V3_FACTORY = "0xdB1d10011AD0Ff90774D0C6Bb92e5C5c8b4461F7";
const NONFUNGIBLE_POSITION_MANAGER = "0x7b8A01B39D58278b5DE7e48c8449c9f4F5170613";

const FEE = Number(process.env.UNIV3_FEE || "3000");
const TOKENONE_AMOUNT_HUMAN = process.env.UNIV3_TOKENONE_AMOUNT || "10";
const USDT_AMOUNT_HUMAN = process.env.UNIV3_USDT_AMOUNT || "10";

const ERC20_ABI = [
  "function decimals() view returns (uint8)",
  "function balanceOf(address) view returns (uint256)"
];

const FACTORY_ABI = [
  "function getPool(address tokenA,address tokenB,uint24 fee) external view returns (address pool)",
  "function feeAmountTickSpacing(uint24 fee) external view returns (int24)"
];

const POSITION_MANAGER_ABI = [
  "function factory() external view returns (address)",
  "function createAndInitializePoolIfNecessary(address token0,address token1,uint24 fee,uint160 sqrtPriceX96) payable returns (address pool)"
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
  if (amount0 === 0n || amount1 === 0n) {
    throw new Error("amount0 and amount1 must be greater than zero");
  }

  return sqrtBigInt((amount1 << 192n) / amount0);
}

async function main() {
  if (!PRIVATE_KEY || !PRIVATE_KEY.startsWith("0x")) {
    throw new Error("UNISWAP_LP_PRIVATE_KEY missing or invalid");
  }

  const provider = new ethers.JsonRpcProvider(RPC_URL);
  const wallet = new ethers.Wallet(PRIVATE_KEY, provider);

  const network = await provider.getNetwork();
  console.log("chainId:", network.chainId.toString());

  if (network.chainId !== 56n) {
    throw new Error("Wrong network. Expected BNB Smart Chain mainnet chainId 56.");
  }

  console.log("wallet:", wallet.address);
  console.log("EXECUTE_CREATE_POOL:", EXECUTE_CREATE_POOL);

  const bnbBalance = await provider.getBalance(wallet.address);
  console.log("BNB balance:", ethers.formatEther(bnbBalance));

  const factoryCode = await provider.getCode(UNISWAP_V3_FACTORY);
  const positionManagerCode = await provider.getCode(NONFUNGIBLE_POSITION_MANAGER);

  console.log("factory code exists:", factoryCode !== "0x");
  console.log("position manager code exists:", positionManagerCode !== "0x");

  if (factoryCode === "0x") throw new Error("Uniswap V3 Factory code not found");
  if (positionManagerCode === "0x") throw new Error("Position Manager code not found");

  const tokenOne = new ethers.Contract(TOKENONE, ERC20_ABI, wallet);
  const usdt = new ethers.Contract(BSC_USDT, ERC20_ABI, wallet);
  const factory = new ethers.Contract(UNISWAP_V3_FACTORY, FACTORY_ABI, wallet);
  const positionManager = new ethers.Contract(
    NONFUNGIBLE_POSITION_MANAGER,
    POSITION_MANAGER_ABI,
    wallet
  );

  const npmFactory: string = await positionManager.factory();
  console.log("NPM factory:", npmFactory);
  console.log("factory match:", npmFactory.toLowerCase() === UNISWAP_V3_FACTORY.toLowerCase());

  const tickSpacing = await factory.feeAmountTickSpacing(FEE);
  console.log("fee:", FEE);
  console.log("tick spacing:", tickSpacing.toString());

  const tokenOneDecimals: number = await tokenOne.decimals();
  const usdtDecimals: number = await usdt.decimals();

  const tokenOneAmount = ethers.parseUnits(TOKENONE_AMOUNT_HUMAN, tokenOneDecimals);
  const usdtAmount = ethers.parseUnits(USDT_AMOUNT_HUMAN, usdtDecimals);

  const [token0, token1] = sortTokens(TOKENONE, BSC_USDT);

  const amount0 =
    token0.toLowerCase() === TOKENONE.toLowerCase() ? tokenOneAmount : usdtAmount;

  const amount1 =
    token1.toLowerCase() === TOKENONE.toLowerCase() ? tokenOneAmount : usdtAmount;

  const sqrtPriceX96 = encodeSqrtRatioX96(amount1, amount0);

  console.log("token0:", token0);
  console.log("token1:", token1);
  console.log("amount0:", amount0.toString());
  console.log("amount1:", amount1.toString());
  console.log("sqrtPriceX96:", sqrtPriceX96.toString());

  const existingPool: string = await factory.getPool(token0, token1, FEE);
  console.log("existing pool:", existingPool);

  if (existingPool !== ethers.ZeroAddress) {
    console.log("Pool already exists. No create transaction needed.");
    return;
  }

  console.log("Simulating create/init pool...");
  const simulatedPool: string =
    await positionManager.createAndInitializePoolIfNecessary.staticCall(
      token0,
      token1,
      FEE,
      sqrtPriceX96
    );

  console.log("simulated pool:", simulatedPool);

  console.log("Estimating gas...");
  const gasEstimate: bigint =
    await positionManager.createAndInitializePoolIfNecessary.estimateGas(
      token0,
      token1,
      FEE,
      sqrtPriceX96
    );

  const gasLimit = (gasEstimate * 150n) / 100n;

  console.log("gas estimate:", gasEstimate.toString());
  console.log("gas limit:", gasLimit.toString());

  if (!EXECUTE_CREATE_POOL) {
    console.log("DRY RUN finished. No transaction was sent.");
    console.log("To create the pool, set EXECUTE_UNIV3_CREATE_POOL=true in .env.uniswap.");
    return;
  }

  console.log("Sending create/init transaction...");
  const tx = await positionManager.createAndInitializePoolIfNecessary(
    token0,
    token1,
    FEE,
    sqrtPriceX96,
    { gasLimit }
  );

  console.log("create/init tx:", tx.hash);
  const receipt = await tx.wait();

  console.log("confirmed block:", receipt.blockNumber);
  console.log("gas used:", receipt.gasUsed.toString());

  const finalPool: string = await factory.getPool(token0, token1, FEE);
  console.log("final pool:", finalPool);

  if (finalPool === ethers.ZeroAddress) {
    throw new Error("Pool creation transaction confirmed but pool is still zero address");
  }

  console.log("Pool created successfully.");
}

main().catch((err) => {
  console.error("ERROR:", err);
  process.exit(1);
});
