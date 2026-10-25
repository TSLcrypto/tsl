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
- instagram: https://www.instagram.com/TSL.CRP/

## Metadata and token lists

- Logo: https://tslcrypto.com/assets/logo.png
- Canonical metadata: https://tslcrypto.com/assets/tsl.metadata.json
- Canonical hosted token list: https://tslcrypto.com/assets/tsl.tokenlist.json
- Repository token list: [`tokenlist.json`](tokenlist.json)

The hosted token list and repository token list should use the same contract address, name, symbol, decimals, logo, and official links.

## Team-designated pool and third-party pools

**The TSL team designates PancakeSwap V2 TSL/USDT on BNB Smart Chain as its published liquidity reference:**

`0x47ea61fef003c1212fbcd3acc03208cb7a92cad1`

The four Uniswap V4 pools identified in the [third-party pool notice](docs/TSL-POOL-NOTICE.md) were not created or endorsed by the TSL team, as confirmed by the project owner. Their fees, prices and activity must not be attributed to the team. Pool creation is permissionless; use of the TSL token or logo does not establish affiliation. The notice includes full pool IDs and on-chain fee evidence.

Team designation does not guarantee price, liquidity or returns. Check the actual route and fees before signing; a token-only swap link does not force the designated pool.

## Liquidity update — October 24, 2026

[Confirmed liquidity addition and CoinMarketCap DexScan visibility](docs/TSL-LIQUIDITY-UPDATE-2026-10-24.md): 1,000 USDT and 10,028.917896610772865490 TSL added to the designated V2 pool. A separate [confirmed lock increase](docs/TSL-LIQUIDITY-LOCK-RECORD.md#confirmed-lock-increase--2026-10-24) subsequently added 2773.514245869304823563 net LP to the existing Mudra lock. Total locked LP became 3825.729533816538905289; the post-confirmation certificate displayed 62.15% coverage. DexScan logo/price visibility is documented separately from a main CoinMarketCap listing.

## Liquidity and access references

- PancakeSwap route: https://pancakeswap.finance/swap?outputCurrency=0xD12ECbD5f508106ec242881530767FF15A6A7549
- PancakeSwap V2 TSL/USDT pair: `0x47ea61fef003c1212fbcd3acc03208cb7a92cad1`
- PancakeSwap V3 TSL/USDT 0.25% pool: `0xc147e16732ce090ca3ad22057a5914d1dc9bcde8`
- GeckoTerminal: https://www.geckoterminal.com/bsc/tokens/0xD12ECbD5f508106ec242881530767FF15A6A7549
- CoinMarketCap DEX page: https://dex.coinmarketcap.com/token/bsc/0xd12ecbd5f508106ec242881530767ff15a6a7549/

Liquidity, prices, holders, and trading availability are external and can change. Verify current information directly on-chain before any transaction.

## Platform information and follow-up status

[Platform status report — October 25, 2026](docs/TSL-PLATFORM-STATUS-2026-10-25.md) distinguishes observed public information from submitted corrections, pending replies and unconfirmed integrations. It includes the evidence dates, support references and follow-up policy; submission acknowledgements are not treated as listing approvals.

## Repository scope

This repository is dedicated to the TSL token and its official public documentation, source reference, metadata, and verification records. Unrelated research tokens and experiments should be maintained in separate repositories to keep TSL identity unambiguous.

## Security

See [`SECURITY.md`](SECURITY.md) for responsible disclosure guidance and [`docs/AUTHENTICATION-AND-KEY-MANAGEMENT.md`](docs/AUTHENTICATION-AND-KEY-MANAGEMENT.md) for the repository's blockchain-native authentication, authorization, credential-handling, and key-management model. Do not publish private keys, seed phrases, API keys, active exploits, or other sensitive material in Issues or Pull Requests.

## Disclaimer

TSL is not an investment product or financial advice. Digital assets involve technical, market, liquidity, and counterparty risks. Users are responsible for verifying addresses and making their own decisions.
## Security & Transparency

TSL maintains public security and transparency records to support independent verification by wallets, exchanges, security providers, and token-listing reviewers.

### Security Evidence

- [TSL Security & Transparency Evidence Index](docs/security/SECURITY-EVIDENCE-INDEX.md)
- [Authentication & Key Management](docs/AUTHENTICATION-AND-KEY-MANAGEMENT.md)
- [Blockaid Security Review Record](docs/security/BLOCKAID-REVIEW-2026.md)
- [Liquidity Lock Record](docs/TSL-LIQUIDITY-LOCK-RECORD.md)
- [Major Wallet Allocation Record](docs/TSL-MAJOR-WALLET-ALLOCATIONS.md)

### Key Verification Information

- Primary liquidity pool: PancakeSwap V2 TSL/USDT
- LP lock certificate snapshot, October 24, 2026 after the confirmed increase: **62.15%**, with **3825.729533816538905289 LP** locked. The older 99.02% figure is historical.
- Liquidity unlock date: **September 5, 2027**
- Liquidity lock evidence is publicly verifiable on-chain.
- Blockaid completed a further review after additional transparency evidence was provided.

All blockchain-related claims should be independently verified using the public on-chain references contained in the evidence documents.
