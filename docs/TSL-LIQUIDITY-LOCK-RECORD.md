# TSL Liquidity Lock Record

This document records the public liquidity-lock evidence for the primary TSL/USDT PancakeSwap V2 liquidity pool on BNB Smart Chain.

## Token

- Project: TSL Crypto

- Token symbol: TSL

- Network: BNB Smart Chain

- Chain ID: 56

- Token contract: `0xD12ECbD5f508106ec242881530767FF15A6A7549`

- Official website: https://tslcrypto.com/

- Official GitHub repository: https://github.com/TSLcrypto/tsl

## Primary Liquidity Pool

- DEX: PancakeSwap V2

- Pair: TSL/USDT

- LP token / pair address: `0x47eA61fEF003C1212FbCD3ACc03208Cb7A92CAD1`

- BscScan pair page: https://bscscan.com/address/0x47eA61fEF003C1212FbCD3ACc03208Cb7A92CAD1

- DexScreener pair page: https://dexscreener.com/bsc/0x47ea61fef003c1212fbcd3acc03208cb7a92cad1

## Historical initial liquidity lock

- Locker platform: Mudra Liquidity Locker

- Locked LP tokens: `1052.215287947234081726`

- Total LP token supply shown on the Mudra certificate: `1062.6559`

- Locked percentage shown on the Mudra certificate: `99.02%`

- Unlock time: `Sep 05, 2027`

- Public lock certificate: https://mudra.website/?certificate=yes&type=0&lp=0x47ea61fef003c1212fbcd3acc03208cb7a92cad1

- BscScan lock transaction: https://bscscan.com/tx/0xfdf1400e4543c61e2536b5889d2c05f5b0b33729824ea021c9f9694a0f705aa8

## Confirmed lock increase — 2026-10-24

[Successful increase transaction](https://bscscan.com/tx/0xee04516fd634bbffec3c90b57918884aaa000ac1bba305d202366147649ab66f), block **129566124**, **2026-10-24 19:00:27 UTC** (22:30:27 Asia/Tehran).

| Field | Amount / value |
| --- | --- |
| LP token | `0x47ea61fef003c1212fbcd3acc03208cb7a92cad1` |
| Existing locker | `0xAe7e6CAbad8d80f0b4E1C4DDE2a5dB7201eF1252` |
| Gross LP submitted | 2787.451503386236003580 |
| LP fee (0.5%, deducted from submitted LP) | 13.937257516931180017 |
| Net LP added to existing lock | 2773.514245869304823563 |
| Previously locked LP | 1052.215287947234081726 |
| Total locked LP after increase | 3825.729533816538905289 |
| BNB service fee | 0 |
| Network transaction fee | 0.00000439175 BNB |
| Existing unlock time, unchanged | 2027-09-04 22:16:01 UTC / 2027-09-05 01:46:01 Asia/Tehran |

The receipt records the LP fee transfer to `0x5Bd1774063dA6836738fcAb9131E34AeadA4968f` and the net transfer to the existing locker. This is an increase to the existing lock, not a new pool or an extension of its unlock time.

The [Mudra public certificate](https://mudra.website/?certificate=yes&type=0&lp=0x47ea61fef003c1212fbcd3acc03208cb7a92cad1), read after confirmation on 2026-10-24, displayed **3825.7295 locked LP / 6155.5009 total LP = 62.15%**. These rounded values and the percentage are a dated certificate snapshot, not a block-pinned independent supply calculation or a permanent coverage guarantee. The earlier 99.02% certificate figure is historical, not current. Liquidity locks do not prevent token sales or guarantee price.

## Confirmed LP allowance revocation — 2026-10-24

After the lock increase, the owner revoked Mudra's allowance to spend this pool's Cake-LP from the owner's wallet.

- [Successful revocation receipt](https://bscscan.com/tx/0x726ecb6bde0bcbbaa55c19ee07c5673f152620e87741af610e99621ce8fb4aa8)
- Status: **Success**; BscScan action: **Revoke Cake-LP**.
- Block: **129567059**.
- Timestamp: **2026-10-24 19:07:28 UTC** / **22:37:28 Asia/Tehran**.
- Owner: `0xdAb105a2DE91ACC4ee2c8b2CF40C44e88b9ec3b7`.
- LP token: `0x47ea61fef003c1212fbcd3acc03208cb7a92cad1`.
- Spender whose allowance was revoked: `0xAe7e6CAbad8d80f0b4E1C4DDE2a5dB7201eF1252` (Mudra).
- Network transaction fee: **0.0000012129 BNB**.
- Evidence: BscScan transaction receipt supplied by the owner, showing the above status, action, block, timestamp and fee.

This revocation removes the wallet's spending permission for this LP token and spender. It does not withdraw locked LP, change the locked amount, or change the unlock time. The previously recorded **3825.729533816538905289 locked LP** and **2027-09-04 22:16:01 UTC** unlock time remain the lock-increase record. A future lock increase may require a new LP approval. This receipt records the revocation at that time, not a guarantee that no later approval will be granted.

### Revocation summary

After the liquidity-lock increase, Mudra's allowance to spend Cake-LP from the owner's wallet was revoked in the successful transaction above at 22:37:28 Asia/Tehran. The network fee was 0.0000012129 BNB. This revocation does not withdraw locked liquidity or change the locked amount or unlock time.

## Notes

This liquidity-lock record was created after Blockaid requested evidence addressing liquidity-lock or burn status for the primary TSL/USDT PancakeSwap V2 pool.

The initial 99.02% figure above is historical. The liquidity addition minted LP to the owner's wallet; a separate confirmed lock-increase transaction subsequently deposited the net new LP into the existing lock, as recorded above.

See the [confirmed liquidity addition and DexScan report](TSL-LIQUIDITY-UPDATE-2026-10-24.md) for the transaction and exact amounts.

This document is provided for transparency and public verification. It should be reviewed together with the major-wallet allocation transparency record:

https://github.com/TSLcrypto/tsl/blob/main/docs/TSL-MAJOR-WALLET-ALLOCATIONS.md

