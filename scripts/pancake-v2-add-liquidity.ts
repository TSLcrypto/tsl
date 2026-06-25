import { ethers } from "ethers";
import dotenv from "dotenv";

dotenv.config({ path: ".env.pancake-lp" });

const RPC = process.env.BSC_MAINNET_RPC || "";
const PRIVATE_KEY = process.env.PANCAKE_LP_PRIVATE_KEY || "";

const EXECUTE_APPROVE = process.env.EXECUTE_PANCAKE_APPROVE === "true";
const EXECUTE_ADD_LP = process.env.EXECUTE_PANCAKE_ADD_LP === "true";

const TOKENONE = process.env.TOKENONE_ADDRESS || "0x5591a8E9a5001f6052D9d749518AE1e6287b7955";
const USDT = process.env.BSC_USDT_ADDRESS || "0x55d398326f99059fF775485246999027B3197955";
const ROUTER = process.env.PANCAKE_V2_ROUTER || "0x10ED43C718714eb63d5aA57B78B54704E256024E";
const FACTORY = process.env.PANCAKE_V2_FACTORY || "0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73";
const EXPECTED_PAIR = process.env.PANCAKE_V2_PAIR || "0x46d776A2F759718A9F86642f52a7FBb2B475b22F";

const USDT_AMOUNT_HUMAN = process.env.PANCAKE_LP_USDT_AMOUNT || "1000";
const SLIPPAGE_BPS = BigInt(process.env.PANCAKE_LP_SLIPPAGE_BPS || "500");

const ERC20_ABI = [
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function decimals() view returns (uint8)",
  "function balanceOf(address) view returns (uint256)",
  "function allowance(address owner, address spender) view returns (uint256)",
  "function approve(address spender, uint256 amount) returns (bool)"
];

const FACTORY_ABI = [
  "function getPair(address tokenA, address tokenB) view returns (address)"
];

const PAIR_ABI = [
  "function token0() view returns (address)",
  "function token1() view returns (address)",
  "function getReserves() view returns (uint112 reserve0, uint112 reserve1, uint32 blockTimestampLast)"
];

const ROUTER_ABI = [
  "function addLiquidity(address tokenA,address tokenB,uint amountADesired,uint amountBDesired,uint amountAMin,uint amountBMin,address to,uint deadline) returns (uint amountA,uint amountB,uint liquidity)"
];

function minWithSlippage(x: bigint) {
  return (x * (10000n - SLIPPAGE_BPS)) / 10000n;
}

async function main() {
  if (!RPC) throw new Error("BSC_MAINNET_RPC missing in .env.pancake-lp");
  if (!PRIVATE_KEY || !PRIVATE_KEY.startsWith("0x")) {
    throw new Error("PANCAKE_LP_PRIVATE_KEY missing or invalid in .env.pancake-lp");
  }

  const provider = new ethers.JsonRpcProvider(RPC);
  const wallet = new ethers.Wallet(PRIVATE_KEY, provider);

  const token = new ethers.Contract(TOKENONE, ERC20_ABI, wallet);
  const usdt = new ethers.Contract(USDT, ERC20_ABI, wallet);
  const factory = new ethers.Contract(FACTORY, FACTORY_ABI, provider);
  const router = new ethers.Contract(ROUTER, ROUTER_ABI, wallet);

  const chain = await provider.getNetwork();

  const tokenDecimals = await token.decimals();
  const usdtDecimals = await usdt.decimals();

  const pairAddress = await factory.getPair(TOKENONE, USDT);

  console.log("chainId:", chain.chainId.toString());
  console.log("wallet:", wallet.address);
  console.log("EXECUTE_PANCAKE_APPROVE:", EXECUTE_APPROVE);
  console.log("EXECUTE_PANCAKE_ADD_LP:", EXECUTE_ADD_LP);
  console.log("");

  console.log("Expected Pancake V2 Pair:", EXPECTED_PAIR);
  console.log("Factory Pair:", pairAddress);

  if (pairAddress.toLowerCase() !== EXPECTED_PAIR.toLowerCase()) {
    throw new Error("Factory pair does not match expected Pancake V2 pair.");
  }

  const pair = new ethers.Contract(pairAddress, PAIR_ABI, provider);
  const token0 = await pair.token0();
  const token1 = await pair.token1();
  const reserves = await pair.getReserves();

  const reserve0 = BigInt(reserves.reserve0.toString());
  const reserve1 = BigInt(reserves.reserve1.toString());

  const tokenIs0 = token0.toLowerCase() === TOKENONE.toLowerCase();

  const reserveToken = tokenIs0 ? reserve0 : reserve1;
  const reserveUsdt = tokenIs0 ? reserve1 : reserve0;

  const amountUsdtDesired = ethers.parseUnits(USDT_AMOUNT_HUMAN, usdtDecimals);
  const amountTokenDesired = (amountUsdtDesired * reserveToken) / reserveUsdt;

  const amountTokenMin = minWithSlippage(amountTokenDesired);
  const amountUsdtMin = minWithSlippage(amountUsdtDesired);

  const tokenBal = await token.balanceOf(wallet.address);
  const usdtBal = await usdt.balanceOf(wallet.address);
  const bnbBal = await provider.getBalance(wallet.address);

  const tokenAllowance = await token.allowance(wallet.address, ROUTER);
  const usdtAllowance = await usdt.allowance(wallet.address, ROUTER);

  console.log("");
  console.log("Pair reserves:");
  console.log("TokenOne reserve:", ethers.formatUnits(reserveToken, tokenDecimals));
  console.log("USDT reserve:", ethers.formatUnits(reserveUsdt, usdtDecimals));

  console.log("");
  console.log("Target LP add:");
  console.log("USDT desired:", ethers.formatUnits(amountUsdtDesired, usdtDecimals));
  console.log("TokenOne desired:", ethers.formatUnits(amountTokenDesired, tokenDecimals));
  console.log("USDT min:", ethers.formatUnits(amountUsdtMin, usdtDecimals));
  console.log("TokenOne min:", ethers.formatUnits(amountTokenMin, tokenDecimals));

  console.log("");
  console.log("Balances:");
  console.log("BNB:", ethers.formatEther(bnbBal));
  console.log("TokenOne:", ethers.formatUnits(tokenBal, tokenDecimals));
  console.log("USDT:", ethers.formatUnits(usdtBal, usdtDecimals));

  console.log("");
  console.log("Allowances:");
  console.log("TokenOne allowance:", ethers.formatUnits(tokenAllowance, tokenDecimals));
  console.log("USDT allowance:", ethers.formatUnits(usdtAllowance, usdtDecimals));

  if (tokenBal < amountTokenDesired) {
    throw new Error("Not enough TokenOne balance for desired LP.");
  }

  if (usdtBal < amountUsdtDesired) {
    throw new Error("Not enough USDT balance for desired LP.");
  }

  if (tokenAllowance < amountTokenDesired) {
    console.log("");
    console.log("TokenOne approval needed.");

    if (!EXECUTE_APPROVE) {
      console.log("DRY RUN: approval not sent. Set EXECUTE_PANCAKE_APPROVE=true to approve.");
      return;
    }

    const tx = await token.approve(ROUTER, amountTokenDesired);
    console.log("TokenOne approve tx:", tx.hash);
    await tx.wait();
    console.log("TokenOne approval confirmed.");
    return;
  }

  if (usdtAllowance < amountUsdtDesired) {
    console.log("");
    console.log("USDT approval needed.");

    if (!EXECUTE_APPROVE) {
      console.log("DRY RUN: approval not sent. Set EXECUTE_PANCAKE_APPROVE=true to approve.");
      return;
    }

    const tx = await usdt.approve(ROUTER, amountUsdtDesired);
    console.log("USDT approve tx:", tx.hash);
    await tx.wait();
    console.log("USDT approval confirmed.");
    return;
  }

  const deadline = Math.floor(Date.now() / 1000) + 20 * 60;

  console.log("");
  console.log("Simulating addLiquidity...");
  const sim = await router.addLiquidity.staticCall(
    TOKENONE,
    USDT,
    amountTokenDesired,
    amountUsdtDesired,
    amountTokenMin,
    amountUsdtMin,
    wallet.address,
    deadline
  );

  console.log("staticCall OK");
  console.log("sim amountToken:", ethers.formatUnits(sim[0], tokenDecimals));
  console.log("sim amountUSDT:", ethers.formatUnits(sim[1], usdtDecimals));
  console.log("sim liquidity:", sim[2].toString());

  const gas = await router.addLiquidity.estimateGas(
    TOKENONE,
    USDT,
    amountTokenDesired,
    amountUsdtDesired,
    amountTokenMin,
    amountUsdtMin,
    wallet.address,
    deadline
  );

  const gasLimit = (gas * 150n) / 100n;

  console.log("gas estimate:", gas.toString());
  console.log("gas limit:", gasLimit.toString());

  if (!EXECUTE_ADD_LP) {
    console.log("");
    console.log("DRY RUN ONLY. No liquidity transaction sent.");
    console.log("To execute, set EXECUTE_PANCAKE_ADD_LP=true in .env.pancake-lp");
    return;
  }

  console.log("");
  console.log("Sending addLiquidity transaction...");
  const tx = await router.addLiquidity(
    TOKENONE,
    USDT,
    amountTokenDesired,
    amountUsdtDesired,
    amountTokenMin,
    amountUsdtMin,
    wallet.address,
    deadline,
    { gasLimit }
  );

  console.log("addLiquidity tx:", tx.hash);
  const receipt = await tx.wait();
  console.log("confirmed block:", receipt?.blockNumber);
  console.log("gas used:", receipt?.gasUsed?.toString());
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
