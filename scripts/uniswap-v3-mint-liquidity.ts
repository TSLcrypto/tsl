import dotenv from "dotenv";
import { ethers } from "ethers";

dotenv.config({ path: ".env.uniswap" });

const RPC_URL = process.env.BSC_RPC_URL || "https://bsc-dataseed.binance.org/";
const PRIVATE_KEY = process.env.UNISWAP_LP_PRIVATE_KEY || "";
const EXECUTE_MINT_LP = process.env.EXECUTE_UNIV3_MINT_LP === "true";

const TOKENONE = "0x5591a8E9a5001f6052D9d749518AE1e6287b7955";
const BSC_USDT = "0x55d398326f99059fF775485246999027B3197955";

const UNISWAP_V3_FACTORY = "0xdB1d10011AD0Ff90774D0C6Bb92e5C5c8b4461F7";
const NONFUNGIBLE_POSITION_MANAGER = "0x7b8A01B39D58278b5DE7e48c8449c9f4F5170613";

const FEE = Number(process.env.UNIV3_FEE || "3000");
const TOKENONE_AMOUNT_HUMAN = process.env.UNIV3_TOKENONE_AMOUNT || "10";
const USDT_AMOUNT_HUMAN = process.env.UNIV3_USDT_AMOUNT || "10";
const SLIPPAGE_BPS = BigInt(process.env.UNIV3_SLIPPAGE_BPS || "500");

const ERC20_ABI = [
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function decimals() view returns (uint8)",
  "function balanceOf(address) view returns (uint256)",
  "function allowance(address owner,address spender) view returns (uint256)",
  "function approve(address spender,uint256 amount) returns (bool)"
];

const FACTORY_ABI = [
  "function getPool(address tokenA,address tokenB,uint24 fee) external view returns (address pool)"
];

const POOL_ABI = [
  "function slot0() external view returns (uint160 sqrtPriceX96,int24 tick,uint16 observationIndex,uint16 observationCardinality,uint16 observationCardinalityNext,uint8 feeProtocol,bool unlocked)",
  "function liquidity() external view returns (uint128)"
];

const POSITION_MANAGER_ABI = [
  "function mint((address token0,address token1,uint24 fee,int24 tickLower,int24 tickUpper,uint256 amount0Desired,uint256 amount1Desired,uint256 amount0Min,uint256 amount1Min,address recipient,uint256 deadline)) payable returns (uint256 tokenId,uint128 liquidity,uint256 amount0,uint256 amount1)"
];

function sortTokens(a: string, b: string): [string, string] {
  return a.toLowerCase() < b.toLowerCase() ? [a, b] : [b, a];
}

function fullRangeTicks(fee: number): { tickLower: number; tickUpper: number } {
  if (fee === 100) return { tickLower: -887272, tickUpper: 887272 };
  if (fee === 500) return { tickLower: -887270, tickUpper: 887270 };
  if (fee === 3000) return { tickLower: -887220, tickUpper: 887220 };
  if (fee === 10000) return { tickLower: -887200, tickUpper: 887200 };

  throw new Error("Unsupported fee tier. Use 100, 500, 3000, or 10000.");
}

function minAmount(amount: bigint): bigint {
  return (amount * (10000n - SLIPPAGE_BPS)) / 10000n;
}

async function approveIfNeeded(
  token: ethers.Contract,
  owner: string,
  spender: string,
  amount: bigint,
  label: string
) {
  const allowance: bigint = await token.allowance(owner, spender);
  console.log(`${label} allowance:`, allowance.toString());

  if (allowance >= amount) {
    console.log(`${label} approval OK`);
    return;
  }

  if (!EXECUTE_MINT_LP) {
    console.log(`[DRY RUN] ${label} needs approve for:`, amount.toString());
    return;
  }

  console.log(`Approving ${label}...`);
  const tx = await token.approve(spender, amount);
  console.log(`${label} approve tx:`, tx.hash);
  await tx.wait();
  console.log(`${label} approved`);
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
  console.log("EXECUTE_MINT_LP:", EXECUTE_MINT_LP);

  const bnbBalance = await provider.getBalance(wallet.address);
  console.log("BNB balance:", ethers.formatEther(bnbBalance));

  const tokenOne = new ethers.Contract(TOKENONE, ERC20_ABI, wallet);
  const usdt = new ethers.Contract(BSC_USDT, ERC20_ABI, wallet);
  const factory = new ethers.Contract(UNISWAP_V3_FACTORY, FACTORY_ABI, wallet);
  const positionManager = new ethers.Contract(
    NONFUNGIBLE_POSITION_MANAGER,
    POSITION_MANAGER_ABI,
    wallet
  );

  const tokenOneName: string = await tokenOne.name();
  const tokenOneSymbol: string = await tokenOne.symbol();
  const tokenOneDecimals: number = await tokenOne.decimals();

  const usdtName: string = await usdt.name();
  const usdtSymbol: string = await usdt.symbol();
  const usdtDecimals: number = await usdt.decimals();

  const tokenOneBalance: bigint = await tokenOne.balanceOf(wallet.address);
  const usdtBalance: bigint = await usdt.balanceOf(wallet.address);

  const tokenOneAmount = ethers.parseUnits(TOKENONE_AMOUNT_HUMAN, tokenOneDecimals);
  const usdtAmount = ethers.parseUnits(USDT_AMOUNT_HUMAN, usdtDecimals);

  console.log("");
  console.log("TokenOne:", tokenOneName, tokenOneSymbol, tokenOneDecimals);
  console.log("USDT:", usdtName, usdtSymbol, usdtDecimals);
  console.log("TokenOne balance:", ethers.formatUnits(tokenOneBalance, tokenOneDecimals));
  console.log("USDT balance:", ethers.formatUnits(usdtBalance, usdtDecimals));
  console.log("Desired TokenOne:", TOKENONE_AMOUNT_HUMAN);
  console.log("Desired USDT:", USDT_AMOUNT_HUMAN);
  console.log("");

  if (bnbBalance === 0n) {
    throw new Error("No BNB balance for gas");
  }

  if (tokenOneBalance < tokenOneAmount) {
    throw new Error("Not enough TokenOne balance");
  }

  if (usdtBalance < usdtAmount) {
    throw new Error("Not enough USDT balance");
  }

  const [token0, token1] = sortTokens(TOKENONE, BSC_USDT);

  const amount0Desired =
    token0.toLowerCase() === TOKENONE.toLowerCase() ? tokenOneAmount : usdtAmount;

  const amount1Desired =
    token1.toLowerCase() === TOKENONE.toLowerCase() ? tokenOneAmount : usdtAmount;

  const ticks = fullRangeTicks(FEE);

  const poolAddress: string = await factory.getPool(token0, token1, FEE);
  console.log("pool:", poolAddress);

  if (poolAddress === ethers.ZeroAddress) {
    throw new Error("Pool does not exist. Create pool first.");
  }

  const pool = new ethers.Contract(poolAddress, POOL_ABI, provider);
  const slot0 = await pool.slot0();
  const currentLiquidity = await pool.liquidity();

  console.log("pool sqrtPriceX96:", slot0[0].toString());
  console.log("pool tick:", slot0[1].toString());
  console.log("pool liquidity:", currentLiquidity.toString());

  console.log("token0:", token0);
  console.log("token1:", token1);
  console.log("fee:", FEE);
  console.log("tickLower:", ticks.tickLower);
  console.log("tickUpper:", ticks.tickUpper);
  console.log("amount0Desired:", amount0Desired.toString());
  console.log("amount1Desired:", amount1Desired.toString());
  console.log("amount0Min:", minAmount(amount0Desired).toString());
  console.log("amount1Min:", minAmount(amount1Desired).toString());

  await approveIfNeeded(
    tokenOne,
    wallet.address,
    NONFUNGIBLE_POSITION_MANAGER,
    tokenOneAmount,
    "TokenOne"
  );

  await approveIfNeeded(
    usdt,
    wallet.address,
    NONFUNGIBLE_POSITION_MANAGER,
    usdtAmount,
    "USDT"
  );

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

  console.log("");
  console.log("Simulating mint...");
  const simulated = await positionManager.mint.staticCall(mintParams);

  console.log("mint staticCall OK");
  console.log("simulated tokenId:", simulated[0].toString());
  console.log("simulated liquidity:", simulated[1].toString());
  console.log("simulated amount0:", simulated[2].toString());
  console.log("simulated amount1:", simulated[3].toString());

  console.log("Estimating gas for mint...");
  const gasEstimate: bigint = await positionManager.mint.estimateGas(mintParams);
  const gasLimit = (gasEstimate * 150n) / 100n;

  console.log("mint gas estimate:", gasEstimate.toString());
  console.log("mint gas limit:", gasLimit.toString());

  if (!EXECUTE_MINT_LP) {
    console.log("");
    console.log("DRY RUN finished. No transaction was sent.");
    console.log("To mint the LP position, set EXECUTE_UNIV3_MINT_LP=true in .env.uniswap.");
    return;
  }

  console.log("");
  console.log("Sending mint transaction...");
  const tx = await positionManager.mint(mintParams, { gasLimit });

  console.log("mint tx:", tx.hash);

  const receipt = await tx.wait();

  console.log("confirmed block:", receipt.blockNumber);
  console.log("gas used:", receipt.gasUsed.toString());
  console.log("LP position minted successfully.");
}

main().catch((err) => {
  console.error("ERROR:", err);
  process.exit(1);
});
