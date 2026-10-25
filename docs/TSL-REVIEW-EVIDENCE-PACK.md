# TSL Reviewer Evidence Package

Last updated: October 25, 2026 (liquidity-reference reconciliation; historical review dates retained)

This document provides a concise verification package for exchanges, wallets, security providers, indexers, and token-listing reviewers evaluating TSL on BNB Smart Chain.

## 1. Token Identity

- Project: TSL Crypto
- Token: TSL
- Network: BNB Smart Chain
- Chain ID: 56
- Contract: `0xD12ECbD5f508106ec242881530767FF15A6A7549`
- Decimals: 18
- Total Supply: 1,000,000,000 TSL
- Architecture: Direct, non-upgradeable deployment
- Website: https://tslcrypto.com/
- GitHub: https://github.com/TSLcrypto/tsl

Verified contract:

https://bscscan.com/address/0xD12ECbD5f508106ec242881530767FF15A6A7549#code

Token page:

https://bscscan.com/token/0xD12ECbD5f508106ec242881530767FF15A6A7549

## 2. Primary Market

Primary PancakeSwap V2 TSL/USDT pair:

`0x47eA61fEF003C1212FbCD3ACc03208Cb7A92CAD1`

On-chain verification:

https://bscscan.com/address/0x47eA61fEF003C1212FbCD3ACc03208Cb7A92CAD1

## 3. Liquidity Lock

The primary TSL/USDT LP position has publicly verifiable liquidity-lock evidence.

### Historical initial lock evidence

The following figures describe the initial lock and are superseded by the October 24 increase recorded below.

- Locked LP tokens: `1052.215287947234081726`
- Total LP supply shown on certificate: `1062.6559`
- Locked percentage: **99.02%**
- Unlock date: **September 5, 2027**

Mudra certificate:

https://mudra.website/?certificate=yes&type=0&lp=0x47ea61fef003c1212fbcd3acc03208cb7a92cad1

BscScan lock transaction:

https://bscscan.com/tx/0xfdf1400e4543c61e2536b5889d2c05f5b0b33729824ea021c9f9694a0f705aa8

Repository record:

https://github.com/TSLcrypto/tsl/blob/main/docs/TSL-LIQUIDITY-LOCK-RECORD.md

### Latest documented lock increase — October 24, 2026

- Total locked after the increase: **3825.729533816538905289 LP**.
- Net LP added to the existing Mudra lock: **2773.514245869304823563 LP**, after a **0.5% LP fee**.
- Certificate snapshot read on October 24: **3825.7295 locked LP / 6155.5009 total LP = 62.15%** (rounded).
- Unchanged unlock time: **September 4, 2027 at 22:16:01 UTC / September 5, 2027 at 01:46:01 Asia/Tehran**.
- [Successful lock-increase transaction](https://bscscan.com/tx/0xee04516fd634bbffec3c90b57918884aaa000ac1bba305d202366147649ab66f).
- [Subsequent LP allowance revocation](https://bscscan.com/tx/0x726ecb6bde0bcbbaa55c19ee07c5673f152620e87741af610e99621ce8fb4aa8), October 24 at 19:07:28 UTC. Revocation did not withdraw locked LP or change its amount or unlock time.
- [Full liquidity-lock record and receipts](https://github.com/TSLcrypto/tsl/blob/main/docs/TSL-LIQUIDITY-LOCK-RECORD.md).

These figures are dated evidence, not a fresh measurement of current lock coverage. The initial **99.02%** figure is historical; coverage changes with LP supply. An LP lock does not prevent token sales or guarantee price, liquidity depth or investment returns.

## 4. Major Wallet Allocation Transparency

TSL maintains a public record covering major allocation wallets and their stated purposes.

https://github.com/TSLcrypto/tsl/blob/main/docs/TSL-MAJOR-WALLET-ALLOCATIONS.md

## 5. Blockaid Review Outcome

Following an appeal and submission of additional transparency and liquidity evidence, Blockaid completed a further review of the TSL contract.

On September 6, 2026, Blockaid informed the TSL team that its investigation concluded that the previous flagging was incorrect and that the flagging had been modified accordingly.

Blockaid support request:

`#1401964`

Dedicated public review record:

https://github.com/TSLcrypto/tsl/blob/main/docs/security/BLOCKAID-REVIEW-2026.md

## 6. Consolidated Security Evidence

Security & Transparency Evidence Index:

https://github.com/TSLcrypto/tsl/blob/main/docs/security/SECURITY-EVIDENCE-INDEX.md

## 7. Public Market References

GeckoTerminal:

https://www.geckoterminal.com/bsc/tokens/0xD12ECbD5f508106ec242881530767FF15A6A7549

CoinMarketCap DEX:

https://dex.coinmarketcap.com/token/bsc/0xd12ecbd5f508106ec242881530767ff15a6a7549/

## 8. Official Contact

TSL Crypto

Website: https://tslcrypto.com/

Email: info@tslcrypto.com

## Verification Notice

Reviewers should independently verify blockchain-related claims using the referenced contracts, transactions, liquidity-lock certificate, and other public records.

This package is intended as a verification aid and does not constitute an endorsement by any third party or a guarantee of token value, liquidity, or future market activity.
