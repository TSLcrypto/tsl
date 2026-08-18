# TSL Crypto (TSL)

**Technology · Sustainability · Liquidity**

TSL Crypto is the public project brand for the TSL token on BNB Smart Chain. The canonical identity of the token is its on-chain contract address.

## Official token identity

| Field | Value |
| --- | --- |
| Project brand | TSL Crypto |
| On-chain token name | TSL |
| Symbol | TSL |
| Network | BNB Smart Chain |
| Chain ID | 56 |
| Standard | BEP-20 / ERC-20 compatible |
| Decimals | 18 |
| Total supply | 1,000,000,000 TSL |
| Contract | `0xD12ECbD5f508106ec242881530767FF15A6A7549` |
| Architecture | Direct, non-upgradeable deployment |

- [Verified contract on BscScan](https://bscscan.com/address/0xD12ECbD5f508106ec242881530767FF15A6A7549#code)
- [Token page on BscScan](https://bscscan.com/token/0xD12ECbD5f508106ec242881530767FF15A6A7549)

Always verify the full contract address before interacting with TSL. A name, symbol, logo, or social profile alone does not prove token identity.

## Contract properties

The published [`contracts/TSL.sol`](contracts/TSL.sol) source implements a minimal fixed-supply token:

- the full supply is created once in the constructor;
- no mint or burn function;
- no blacklist, freeze, confiscation, pause, transfer tax, or rebase logic;
- no proxy or upgrade function;
- standard transfer, approval, and allowance behavior;
- ownership can be transferred to a non-zero address;
- the owner can recover unrelated ERC-20/BEP-20 tokens sent to the contract, but cannot recover TSL from the TSL contract.

The repository source is provided for transparency. Final verification of deployed behavior must use the verified on-chain source and bytecode shown by BscScan.

## Official project resources

- Website: https://tslcrypto.com/
- Telegram: https://t.me/TSLcrypt
- X (Twitter): https://x.com/tsl_token
- YouTube: https://www.youtube.com/@TSL_crypto
- Facebook: https://www.facebook.com/profile.php?id=61579891263999
- LinkedIn: https://www.linkedin.com/in/tslcrypto/
- Contact: [info@tslcrypto.com](mailto:info@tslcrypto.com)

## Metadata and token lists

- Logo: https://tslcrypto.com/assets/logo.png
- Canonical metadata: https://tslcrypto.com/assets/tsl.metadata.json
- Canonical hosted token list: https://tslcrypto.com/assets/tsl.tokenlist.json
- Repository token list: [`tokenlist.json`](tokenlist.json)

The hosted token list and repository token list should use the same contract address, name, symbol, decimals, logo, and official links.

## Liquidity and access references

- PancakeSwap route: https://pancakeswap.finance/swap?outputCurrency=0xD12ECbD5f508106ec242881530767FF15A6A7549
- PancakeSwap V2 TSL/USDT pair: `0x47ea61fef003c1212fbcd3acc03208cb7a92cad1`
- PancakeSwap V3 TSL/USDT 0.25% pool: `0xc147e16732ce090ca3ad22057a5914d1dc9bcde8`
- GeckoTerminal: https://www.geckoterminal.com/bsc/tokens/0xD12ECbD5f508106ec242881530767FF15A6A7549
- CoinMarketCap DEX page: https://dex.coinmarketcap.com/token/bsc/0xd12ecbd5f508106ec242881530767ff15a6a7549/

Liquidity, prices, holders, and trading availability are external and can change. Verify current information directly on-chain before any transaction.

## Repository scope

This repository is dedicated to the TSL token and its official public documentation, source reference, metadata, and verification records. Unrelated research tokens and experiments should be maintained in separate repositories to keep TSL identity unambiguous.

## Security

See [`SECURITY.md`](SECURITY.md) for responsible disclosure guidance. Do not publish private keys, seed phrases, API keys, active exploits, or other sensitive material in Issues or Pull Requests.

## Disclaimer

TSL is not an investment product or financial advice. Digital assets involve technical, market, liquidity, and counterparty risks. Users are responsible for verifying addresses and making their own decisions.
