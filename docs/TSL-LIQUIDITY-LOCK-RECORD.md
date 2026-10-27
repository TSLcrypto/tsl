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

## Additional liquidity — October 27, 2026 (unlocked)

**Verified and recorded:** October 27, 2026 (Asia/Tehran).

[Successful BscScan transaction receipt](https://bscscan.com/tx/0x6ae041aaa596b6ee9ed9cb1b8263e20e910dc3d02a09c19e1918b3447aa2b1fd) — **2026-10-27 17:11:42 UTC / 20:41:42 Asia/Tehran**.

Liquidity was added to the existing team-designated PancakeSwap V2 TSL/USDT pool on BNB Smart Chain, `0x47ea61fef003c1212fbcd3acc03208cb7a92cad1`.

| Receipt field | Exact amount / value |
| --- | --- |
| Status | Success |
| USDT transferred to the pool | 1499.156803182113591611 USDT |
| TSL transferred to the pool | 15024.633538656637886154 TSL |
| New Cake-LP minted to the project wallet | 4171.747485216469959364 LP |
| LP recipient | `0xdAb105a2DE91ACC4ee2c8b2CF40C44e88b9ec3b7` |
| Network transaction fee | 0.00000798035 BNB |
| New LP lock status at this addition | **Unlocked; received by the project wallet, not deposited into a locker** |

The prepared USDT amount was 1500; the receipt's actual transfer was 1499.156803182113591611 USDT. The exact receipt amounts above take precedence over rounded previews.

**This addition is separate from the previously recorded locked liquidity.** The October 24 lock-increase record remains **3825.729533816538905289 locked LP**, with the recorded unlock time **2027-09-04 22:16:01 UTC / 2027-09-05 01:46:01 Asia/Tehran**. This October 27 transaction does not increase that lock or extend its unlock time. The owner chose to leave the new LP unlocked. This is a dated transaction record, not a claim about subsequent transfers.

The historical **62.15%** (October 24) and earlier **99.02%** lock-coverage figures must not be presented as current after this addition. The block-pinned October 27 coverage calculation below supersedes those percentages for its stated observation block.

## LP lock coverage — verified October 27, 2026

**Block-pinned observation:** BNB Smart Chain block [130130686](https://bscscan.com/block/130130686), timestamp **2026-10-27 17:37:59 UTC / 21:07:59 Asia/Tehran**. Read and published October 27, 2026. Block hash: `0xdbf3c696760b39db1f53f84c597d2bc01728524923335622702f4ab1e12aebad`.

**Verified Mudra-locked coverage: 37.08099981%. Outside this lock: 62.91900019%.** Percentages are rounded to eight decimal places; the LP amounts below retain all 18 token decimals.

| LP classification at this block | Exact LP amount | Share of total LP supply |
| --- | ---: | ---: |
| Total LP supply | 10317.223249165239099674 | 100% |
| Active Mudra lock #112541 | 3825.729533816538905289 | 37.08099981% |
| Unlocked LP in the project wallet | 6478.037147687337328301 | 62.78857200% |
| LP held by PancakeSwap factory feeTo | 13.456567661362865084 | 0.13042819% |
| Zero-address minimum-liquidity balance | 0.000000000000001000 | Less than 0.00000001% |
| Total outside the verified Mudra lock (includes the zero-address balance) | 6491.493715348700194385 | 62.91900019% |

**Unlocked / outside-lock LP excluding the zero-address balance totals 6491.493715348700193385 LP (62.91900019%, rounded).** Of this, 6478.037147687337328301 LP belongs to the project wallet; the separate 13.456567661362865084 LP feeTo balance is not project-controlled liquidity and is not a claim about the fee recipient's withdrawal policy. The zero-address balance is not spendable and must not be described as freely withdrawable.

The project wallet is [`0xdAb105a2DE91ACC4ee2c8b2CF40C44e88b9ec3b7`](https://bscscan.com/address/0xdAb105a2DE91ACC4ee2c8b2CF40C44e88b9ec3b7). Its balance includes the **4171.747485216469959364 LP** received in the October 27 addition and earlier unlocked LP. The factory-reported fee recipient is [`0x0ed943ce24baebf257488771759f9bf482c39706`](https://bscscan.com/address/0x0ed943ce24baebf257488771759f9bf482c39706).

### Lock and calculation evidence

- Pair: [`0x47ea61fef003c1212fbcd3acc03208cb7a92cad1`](https://bscscan.com/address/0x47ea61fef003c1212fbcd3acc03208cb7a92cad1#readContract); 18 LP decimals.
- Locker: [`0xAe7e6CAbad8d80f0b4E1C4DDE2a5dB7201eF1252`](https://bscscan.com/address/0xAe7e6CAbad8d80f0b4E1C4DDE2a5dB7201eF1252#readContract).
- Direct, read-only JSON-RPC calls to `https://bsc-dataseed.binance.org/`, with every `eth_call` pinned to block tag `0x7c1a2fe`: pair `totalSupply()`, `decimals()`, `balanceOf(address)`, `factory()`; factory `feeTo()`; locker `lpLocksLength(pair)`, `lpLockAt(pair,0)`, `tokenLocks(112541)`.
- Exactly one Mudra lock was returned. Its LP token and owner match the designated pool and project wallet; its amount equals the locker's LP balance: **3825.729533816538905289 LP**. The future unlock timestamp is **1820096161**, or **September 4, 2027 22:16:01 UTC / September 5, 2027 01:46:01 Asia/Tehran**.
- The locked, project-wallet, feeTo and zero-address balances sum exactly to total supply. The dead-address and former Mudra fee-recipient LP balances were zero at this block.
- Exact coverage formula in raw LP units: `3825729533816538905289 / 10317223249165239099674 * 100`. No rounded certificate value was used in this calculation.
- The [Mudra certificate](https://mudra.website/?certificate=yes&type=0&lp=0x47ea61fef003c1212fbcd3acc03208cb7a92cad1), separately viewed on October 27, displayed **37.08%**, consistent with the calculation. The certificate is a live view, not a historical block query.

This is a dated LP ownership and lock-coverage snapshot, not a permanent percentage, a USD valuation or a guarantee of price. Adding or removing liquidity can change coverage without changing the old locked LP amount. No new LP lock, approval or wallet transaction was performed for this calculation. Historical **62.15%** and **99.02%** figures remain dated historical evidence.

## Notes

This liquidity-lock record was created after Blockaid requested evidence addressing liquidity-lock or burn status for the primary TSL/USDT PancakeSwap V2 pool.

The initial 99.02% figure above is historical. The October 24 liquidity addition minted LP to the owner's wallet; a separate confirmed lock-increase transaction subsequently deposited the net new LP into the existing lock, as recorded above. The October 27 addition is separate and remained unlocked at receipt, as recorded in its own section.

See the [confirmed liquidity addition and DexScan report](TSL-LIQUIDITY-UPDATE-2026-10-24.md) for the transaction and exact amounts.

This document is provided for transparency and public verification. It should be reviewed together with the major-wallet allocation transparency record:

https://github.com/TSLcrypto/tsl/blob/main/docs/TSL-MAJOR-WALLET-ALLOCATIONS.md

