# TSL liquidity addition and DexScan visibility — 2026-10-24

## Confirmed on-chain liquidity addition

[Transaction receipt](https://bscscan.com/tx/0x061989eeeec0cd6e97c4e916965b3be631709329ffc7eb9350abf70af9d0e92f)

| Field | Confirmed value |
| --- | --- |
| Status | Success |
| Network | BNB Smart Chain, chain ID 56 |
| Block | 129559816 |
| Time (UTC) | 2026-10-24 18:13:08 |
| Time (Asia/Tehran) | 2026-10-24 21:43:08 |
| Sender / LP recipient | `0xdAb105a2DE91ACC4ee2c8b2CF40C44e88b9ec3b7` |
| Router | PancakeSwap V2, `0x10ED43C718714eb63d5aA57B78B54704E256024E` |
| Pool / LP token | `0x47ea61fef003c1212fbcd3acc03208cb7a92cad1` |
| USDT deposited | 1000 |
| TSL deposited | 10028.917896610772865490 |
| LP minted to sender | 2787.451503386236003580 |
| LP minted to protocol fee recipient | 8.267283504198754995 |
| Transaction fee | 0.00000795455 BNB |

Token identities: TSL `0xD12ECbD5f508106ec242881530767FF15A6A7549`; Binance-Peg USDT (BscScan label BSC-USD) `0x55d398326f99059ff775485246999027b3197955`.

These are actual transfer amounts in the receipt, not the earlier interface preview. The addition is to the [team-designated V2 pool](TSL-POOL-NOTICE.md); it is not evidence of a new pool deployment.

The newly minted LP was sent to the sender's wallet. This transaction does **not** lock that LP. The historical 99.02% lock figure must not be presented as current coverage after LP supply changes. Current lock coverage requires a fresh comparison of active locked LP and total LP supply at the same block. See the [lock record](TSL-LIQUIDITY-LOCK-RECORD.md).

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

## CoinMarketCap DexScan visibility

[TSL on CoinMarketCap DexScan](https://dex.coinmarketcap.com/token/bsc/0xd12ecbd5f508106ec242881530767ff15a6a7549/)

Evidence: project-owner screenshot supplied on 2026-10-24, showing the canonical token URL, TSL logo, price chart and trade history. The following rounded values are a **screenshot snapshot**, not a live feed or independently audited market metrics:

| Displayed metric | Screenshot value |
| --- | --- |
| Price | $0.09942 |
| Liquidity | approximately $4.4K |
| 24-hour volume | approximately $1.8K |
| Fully diluted valuation (FDV) | approximately $99.4M |
| Security scan | Unknown |

DexScan visibility is distinct from acceptance into CoinMarketCap's main tracked/ranked asset listing. It does not establish an exchange listing or endorsement. FDV is a valuation based on supply and price, not cash reserves or realizable proceeds. The screenshot does not establish a locked-liquidity percentage, and “Unknown” is not a security approval.

Market values vary with time, trading, pool selection and data-provider methodology. Do not attribute the displayed aggregate figures solely to this liquidity addition.

## Summary

On October 24, 2026, 1,000 USDT and approximately 10,028.9179 TSL were added to the team-designated pool. Approximately 2,787.4515 LP tokens were received by the sender's wallet; that transaction alone did not lock the liquidity. In a separate successful transaction at 22:30:27 Asia/Tehran, 2,773.5142458693 LP were added to the existing lock after the 0.5% fee. Total locked LP increased to 3,825.7295338165, and the certificate displayed 62.15% that day. The unlock time remained September 5, 2027 at 01:46:01 Asia/Tehran.

The screenshot supplied that day shows the TSL logo, price and chart in CoinMarketCap DexScan. This is distinct from acceptance into CoinMarketCap's main listings. Market figures in this report are only the values displayed in that screenshot.
