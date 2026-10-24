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

## خلاصه فارسی

در ۲۴ اکتبر ۲۰۲۶، مقدار ۱٬۰۰۰ USDT و حدود ۱۰٬۰۲۸٫۹۱۷۹ TSL به استخر مورد تأیید تیم اضافه شد. حدود ۲٬۷۸۷٫۴۵۱۵ توکن LP به کیف پول فرستنده رسید؛ این تراکنش قفل نقدینگی نیست و درصد قفل قبلی باید دوباره محاسبه شود.

تصویر ارائه‌شده در همان روز، لوگو، قیمت و نمودار TSL را در بخش DexScan کوین‌مارکت‌کپ نشان می‌دهد. این وضعیت با پذیرش در فهرست اصلی کوین‌مارکت‌کپ متفاوت است. ارقام بازار در این گزارش فقط مقادیر همان تصویر هستند.
