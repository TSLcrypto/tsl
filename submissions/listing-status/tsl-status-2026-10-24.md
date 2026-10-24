# TSL Liquidity, Wallet and Listing Status

Documentation date: 2026-10-24. This is a dated evidence register, not a live price feed.

## Identity

- Project: TSL Crypto; symbol: TSL.
- Network: BNB Smart Chain; chain ID: 56; decimals: 18.
- Contract: `0xD12ECbD5f508106ec242881530767FF15A6A7549`.
- [Official website](https://tslcrypto.com/).
- [BscScan token](https://bscscan.com/token/0xD12ECbD5f508106ec242881530767FF15A6A7549).

## New liquidity report

On 2026-10-24, the project owner reported new LP/liquidity. In a follow-up on the same date, the owner identified `0x47ea61fef003c1212fbcd3acc03208cb7a92cad1`, matching the existing PancakeSwap V2 TSL/USDT pair already recorded in this repository. The report therefore refers to the existing pair, not evidence of a newly created pool. The addition transaction, amount and any new lock coverage remain unverified.

Existing repository references remain:
- PancakeSwap V2 TSL/USDT: `0x47ea61fef003c1212fbcd3acc03208cb7a92cad1`.
- PancakeSwap V3 TSL/USDT 0.25%: `0xc147e16732ce090ca3ad22057a5914d1dc9bcde8`.

To close this evidence gap, record the liquidity-addition transaction hash, verify its amounts and association with the identified V2 pair, and record any separate lock transaction. Public API checks were unavailable during this review; this does not establish that the reported liquidity is absent.

The historical Mudra certificate percentage for the V2 pair must not be applied to additional liquidity, the V3 pool, or any new pool. See [the lock record](../../docs/TSL-LIQUIDITY-LOCK-RECORD.md).

## Screenshot evidence supplied on 2026-10-24

The owner supplied a screenshot of PancakeSwap's liquidity positions page alongside the Trust Wallet browser extension. The receipt date is recorded here; the capture time and application versions are not established.

- A TSL/USDT V2 0.25% position shows a displayed liquidity value of $828.75.
- A separate TSL/USDT V3 0.25% position is also visible.
- The screenshot is position-level UI evidence, not a transaction receipt, proof of total pool liquidity, or proof that $828.75 was newly deposited.
- The pool contract is not visible in the screenshot; association with the existing V2 pair relies on the owner's separately supplied address.
- The Trust Wallet panel visibly shows a TSL logo and a nonzero fiat holding value. This supersedes the earlier placeholder-icon/zero-value observation for the illustrated session.
- The screenshot is not Binance evidence. It does not establish the provider of the wallet price, accuracy of its valuation, or acceptance of the Trust Wallet assets PR.
- The V3 panel's displayed unit price and the valuation implied by the Trust Wallet holding do not align. These UI values must not be promoted as a single independently verified TSL market price.

Only the relevant observations are transcribed. The full screenshot, including unrelated wallet holdings, is not published.

## Wallet and platform visibility

Logo, chart, unit price, and fiat balance are separate observations. These rows describe evidence supplied by the project owner; they are not independently reproduced current application tests.

| Surface | Last supplied evidence | Observed/reported behavior | Limit |
| --- | --- | --- | --- |
| Binance (product not yet specified) | Owner report, 2026-10-24 | TSL logo and price displayed | Exact product, URL/app version, screenshot and contract mapping still needed; no Binance spot/futures listing or endorsement asserted |
| SafePal | Screenshots supplied before this revision | Logo, unit price and fiat holding value displayed | Historical observation; price and sellable value are not guaranteed |
| MetaMask | Screenshots supplied before this revision | Logo and chart displayed; fiat holding value displayed as zero | No verified root cause or resolution |
| Trust Wallet browser extension | Screenshot supplied 2026-10-24 | TSL logo and nonzero fiat holding value now displayed | Improvement observed in this session; price accuracy, contract mapping within the app, provider and persistence still require verification |

A zero fiat display does not by itself mean zero on-chain balance or zero market value. A displayed wallet valuation does not prove that the entire position can be sold at that price.

## Submission history

These are last-known records, not current live ticket statuses.

- Trust Wallet assets [PR #38091](https://github.com/trustwallet/assets/pull/38091): the owner supplied a merge-fee-bot notice stating closure for inactivity. Reopening, payment or acceptance has not been confirmed. The notice says not to pay a closed PR. No payment is authorized by this document.
- CoinMarketCap #1408395: historical DEX discovery inquiry, followed by metadata update request #1414123.
- CoinMarketCap #1459969: supplied correspondence records a free-track listing request and a submitted public verification post; no final acceptance evidenced in this review.
- CoinGecko CL0110260008: supplied portal screenshot records rejection citing insufficient organic attention, considering liquidity, volume and social engagement. It requests resubmission after 14 days or substantial traction. No later approval is asserted.
- CoinGecko support #139110: supplied response identifies the account-access mismatch for the above request; it is not a listing approval.

## Public reference directory

- [PancakeSwap swap route](https://pancakeswap.finance/swap?chain=bsc&outputCurrency=0xD12ECbD5f508106ec242881530767FF15A6A7549)
- [DexScreener V2 pair](https://dexscreener.com/bsc/0x47ea61fef003c1212fbcd3acc03208cb7a92cad1)
- [GeckoTerminal token](https://www.geckoterminal.com/bsc/tokens/0xD12ECbD5f508106ec242881530767FF15A6A7549)
- [CoinMarketCap DEXScan](https://dex.coinmarketcap.com/token/bsc/0xd12ecbd5f508106ec242881530767ff15a6a7549/)
- [CoinPaprika reference](https://coinpaprika.com/coin/tsl-tsl/)
- [Public metadata](https://tslcrypto.com/assets/tsl.metadata.json)
- [Public token list](https://tslcrypto.com/assets/tsl.tokenlist.json)

A DEX data page or wallet display is not equivalent to a centralized-exchange listing. Verify network and full contract address on each destination.

## Evidence still required

1. Liquidity-addition transaction for the owner-identified existing V2 pair; current liquidity and lock coverage.
2. Exact Binance product/page and dated logo/price evidence.
3. Fresh MetaMask check; verify Trust Wallet price accuracy and in-app contract mapping. The new Trust Wallet screenshot establishes logo/fiat display in that session, not universal resolution.

Private email headers, wallet credentials, API keys and payment details must not be added to this public record.
