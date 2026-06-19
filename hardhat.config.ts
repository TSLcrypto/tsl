import { defineConfig } from "hardhat/config";
import hardhatVerify from "@nomicfoundation/hardhat-verify";
import dotenv from "dotenv";

dotenv.config();

const privateKey = process.env.PRIVATE_KEY || "";
const bscRpcUrl =
  process.env.BSC_MAINNET_RPC || "https://bsc-dataseed.binance.org/";

const bscMainnetConfig = {
  type: "http" as const,
  chainType: "l1" as const,
  url: bscRpcUrl,
  accounts: privateKey ? [privateKey] : [],
  chainId: 56,
};

export default defineConfig({
  plugins: [hardhatVerify],

  solidity: {
    version: "0.8.28",
  },

  networks: {
    // اسم کوتاه‌تر برای دستورها
    bsc: bscMainnetConfig,

    // اسم قبلی خودت هم حفظ شد
    bscMainnet: bscMainnetConfig,
  },

  verify: {
    etherscan: {
      apiKey: process.env.ETHERSCAN_API_KEY || "",
    },
  },
});