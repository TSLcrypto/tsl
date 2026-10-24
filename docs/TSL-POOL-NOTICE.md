# TSL team-designated pool and third-party pool notice

Published: 2026-10-24. This notice records the TSL project owner's designation.

## Pool designated by the TSL team

- Network: BNB Smart Chain (chain ID 56).
- Venue and version: PancakeSwap V2.
- Pair: TSL / USDT.
- **Pool address: `0x47ea61fef003c1212fbcd3acc03208cb7a92cad1`**
- TSL contract: `0xD12ECbD5f508106ec242881530767FF15A6A7549`.
- USDT contract: `0x55d398326f99059ff775485246999027b3197955`.
- [Verify the designated pool on BscScan](https://bscscan.com/address/0x47ea61fef003c1212fbcd3acc03208cb7a92cad1).
- [View the designated pool on DEXTools](https://www.dextools.io/app/bnb/pair-explorer/0x47ea61fef003c1212fbcd3acc03208cb7a92cad1).

Team designation identifies the project's published liquidity reference. It does not guarantee a fixed price, liquidity depth, investment returns, or the route selected by a swap aggregator. Before signing, check the network, token addresses, route, fees, price impact, and minimum received. A token-only swap link does not force this pool.

## Third-party pools not created or endorsed by the TSL team

The project owner confirms that the four Uniswap V4 pools listed below were not created by the TSL team and are not endorsed by the team. Their fees, liquidity, prices, and trading activity must not be attributed to the team merely because they contain TSL.

Permissionless protocols allow third parties to create pools for a token without the issuer's approval. The use of the TSL contract, name, or logo is not proof of affiliation.

These are **32-byte Uniswap V4 pool IDs**, not separate 20-byte token or wallet addresses.

| Pool ID / page | Base LP fee at initialization | DEXTools displayed fee, observed 2026-10-24 | On-chain creation evidence |
| --- | --- | --- | --- |
| [`0x0b5835debf7c2859ae8420f04cb29dcea5400bcd7df1704749bccbce75dd8a24`](https://www.dextools.io/app/bnb/pair-explorer/0x0b5835debf7c2859ae8420f04cb29dcea5400bcd7df1704749bccbce75dd8a24) | 25% | 25.075% | [Initialize transaction](https://bscscan.com/tx/0xcbfbf20de675b8b408e0695009955d4784ed629a5393afcd247b0e0f4422ac20#eventlog) |
| [`0xcad1ab84ced1e5acf899a4bae5b262c8e1bf636a6ba91ad88a223eca223f44ce`](https://www.dextools.io/app/bnb/pair-explorer/0xcad1ab84ced1e5acf899a4bae5b262c8e1bf636a6ba91ad88a223eca223f44ce) | 90.45% | 90.4596% | [Initialize transaction](https://bscscan.com/tx/0x0b628bb1b138628a5020a4883398b6b4a5c051c5022e3b85d72f722a9443e838#eventlog) |
| [`0xf5da402609662ba4ce0a92a3d0a16833551e3a007bcf585e4adf586ae5460ac1`](https://www.dextools.io/app/bnb/pair-explorer/0xf5da402609662ba4ce0a92a3d0a16833551e3a007bcf585e4adf586ae5460ac1) | 98.99% | 98.99% | [Initialize transaction](https://bscscan.com/tx/0x5a969c83fa6069c0677dea0e26bf057aa0643ed0fc6dcab11338de46f35558db#eventlog) |
| [`0x39092eee0bcd4d82e7f7ba344b459adad2294a157f6ee63d9684e7a9080cc139`](https://www.dextools.io/app/bnb/pair-explorer/0x39092eee0bcd4d82e7f7ba344b459adad2294a157f6ee63d9684e7a9080cc139) | 51% | 51% | [Initialize transaction](https://bscscan.com/tx/0x55c6462faee0004bc61a14508f89329197d00da06233c35dfff4527203884fda#eventlog) |

The base LP fees above were read from Initialize event logs. Interface-displayed total fees can differ; neither column is an APR or a promised yield. These fee levels can consume a substantial part of a swap's input. This list is a dated identification record, not an exhaustive list of third-party pools.

The reviewed creation logs identify the canonical TSL and USDT contracts and a zero hook address. This notice makes no allegation about the creators' identities, intent, or involvement in any separate incident.

The older PancakeSwap V3 pool `0xc147e16732ce090ca3ad22057a5914d1dc9bcde8` remains a historical reference; it is not the V2 pool designated above.

## Liquidity and lock scope

Pool prices and liquidity change with trading. Adding liquidity does not prevent token holders from selling. Historical LP-lock percentages apply only to their documented snapshot; newly minted LP tokens are not automatically covered by an earlier lock. See the [liquidity lock record](TSL-LIQUIDITY-LOCK-RECORD.md).

Official website: https://tslcrypto.com/  
Questions or corrections: info@tslcrypto.com

## اطلاعیه فارسی

استخر مورد تأیید تیم TSL، جفت TSL/USDT در پنکیک‌سواپ نسخهٔ ۲ روی شبکهٔ BNB Smart Chain با آدرس زیر است:

`0x47ea61fef003c1212fbcd3acc03208cb7a92cad1`

چهار استخر یونی‌سواپ نسخهٔ ۴ که در جدول بالا آمده‌اند، به تأیید مالک پروژه توسط تیم TSL ایجاد نشده‌اند و مورد تأیید تیم نیستند. کارمزد، قیمت و فعالیت آن‌ها نباید صرفاً به دلیل استفاده از توکن TSL به تیم نسبت داده شود. ساخت استخر در یک پروتکل بدون نیاز به مجوز، به معنی همکاری با پروژه نیست.

درصدهای جدول کارمزد استخر هستند، نه سود سالانه. این اطلاعیه ادعایی دربارهٔ هویت، قصد یا ارتباط سازندگان با رویدادهای دیگر مطرح نمی‌کند. تأیید یک استخر توسط تیم نیز تضمین قیمت، سود یا امنیت سرمایه نیست. پیش از تأیید معامله، آدرس‌ها، مسیر، کارمزد و حداقل مبلغ دریافتی را بررسی کنید.
