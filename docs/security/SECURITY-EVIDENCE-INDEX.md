# TSL Security & Transparency Evidence Index

Last updated: October 25, 2026 (liquidity-reference reconciliation; historical review dates retained)

This document provides a consolidated index of public security, liquidity, allocation, and third-party review evidence for the TSL token on BNB Smart Chain.

## 1. Token Identity

- Project: TSL
- Token: TSL
- Network: BNB Smart Chain (BSC)
- Chain ID: 56
- Contract Address: `0xD12ECbD5f508106ec242881530767FF15A6A7549`
- Official Website: https://tslcrypto.com/
- Official GitHub: https://github.com/TSLcrypto/tsl

## 2. Primary Liquidity Pool

- DEX: PancakeSwap V2
- Pair: TSL / USDT
- Pair Contract:
  `0x47eA61fEF003C1212FbCD3ACc03208Cb7A92CAD1`

Public on-chain verification:

https://bscscan.com/address/0x47eA61fEF003C1212FbCD3ACc03208Cb7A92CAD1

## 3. Liquidity Lock Evidence

A substantial portion of the LP tokens for the primary TSL/USDT PancakeSwap V2 pool has been publicly locked through Mudra Liquidity Locker.

### Historical initial lock evidence

The following figures describe the initial lock and are superseded by the October 24 increase recorded below.

- Locked LP Tokens: `1052.215287947234081726`
- Total LP Token Supply shown on certificate: `1062.6559`
- Locked Percentage: `99.02%`
- Unlock Date: September 5, 2027

Mudra public certificate:

https://mudra.website/?certificate=yes&type=0&lp=0x47ea61fef003c1212fbcd3acc03208cb7a92cad1

BscScan lock transaction:

https://bscscan.com/tx/0xfdf1400e4543c61e2536b5889d2c05f5b0b33729824ea021c9f9694a0f705aa8

Repository liquidity-lock record:

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

TSL maintains a public record describing major token allocation wallets and their stated allocation purposes.

Public allocation record:

https://github.com/TSLcrypto/tsl/blob/main/docs/TSL-MAJOR-WALLET-ALLOCATIONS.md

The record is intended to provide reviewers with transparent references for evaluating token distribution and major-wallet allocations.

## 5. Blockaid Security Review

The TSL contract was previously flagged by Blockaid.

Following an appeal and submission of additional transparency evidence, including the major-wallet allocation record and verifiable liquidity-lock evidence, Blockaid completed a further review.

On September 6, 2026, Blockaid informed the TSL team that its investigation concluded that the previous flagging was incorrect and that the flagging had been modified accordingly.

Blockaid support request:

`#1401964`

The correspondence is retained by the TSL team as supporting review evidence.

A dedicated review summary is maintained at:

`docs/security/BLOCKAID-REVIEW-2026.md`

## 6. Verification Principle

Reviewers should independently verify all blockchain-related claims using the referenced public on-chain records.

This evidence index does not replace independent due diligence and does not represent a guarantee regarding token value, market price, liquidity depth, or future project activity.

## 7. Official Contact

TSL Crypto

Website: https://tslcrypto.com/

Email: info@tslcrypto.com
