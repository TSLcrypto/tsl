# TSL on TRON: identity, contract, liquidity and integration record

Record assembled: **19 November 2026 (Asia/Tehran)**. Each observation below has its own evidence date. This is a public reference, not a live price feed, audit, listing approval or transaction instruction.

## Identity and network separation

| Field | TRON asset |
| --- | --- |
| Project | TSL Crypto |
| Recorded token name / symbol | TSLCrypto / TSL |
| Network / standard | TRON mainnet / TRC-20 |
| Decimals | 6 (one TSL = 1,000,000 raw units) |
| Contract | `TR7oJeAFikXwjndsAn4L6LfeyzneRdLj6t` |
| Recorded supply, 13 November 2026 | 100,000,000 TSL; not a fresh totalSupply reading |
| Recorded deployer / transaction owner | `THPbx9iAd2PmpGdj27n94YKJpYUozRn5YC` |
| Designated SunSwap V2 pair | `TUL4ZbkhkpiB4V2X12QADASxFiq4CeF5Cb` |
| Pair quote token: TRON USDT | `TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t` |
| Router observed in the swap below | `TNJVzGqKBWkJxJB5XYSqGAwUTV15U24pPq` |

The TRON contract and supply are independent of the BNB Smart Chain TSL contract `0xD12ECbD5f508106ec242881530767FF15A6A7549` (18 decimals). A shared ticker does not establish a bridge, redemption right, shared price or shared supply. BSC liquidity-lock evidence does not establish a TRON LP lock. No TRON LP-lock evidence is established in this record.

TSL is independent of Tether. It is not USDT and has no established dollar peg or Tether backing. The USDT address above is the quote asset, not the TSL contract.

## Public references and assets

- [Contract and verified-code page](https://tronscan.org/#/contract/TR7oJeAFikXwjndsAn4L6LfeyzneRdLj6t/code)
- [Token page](https://tronscan.org/#/token20/TR7oJeAFikXwjndsAn4L6LfeyzneRdLj6t)
- [SunSwap V2 pool](https://sun.io/?lang=en-US#/scan/pairDetail?pairAddress=TUL4ZbkhkpiB4V2X12QADASxFiq4CeF5Cb&version=v2)
- [GeckoTerminal pool](https://www.geckoterminal.com/tron/pools/TUL4ZbkhkpiB4V2X12QADASxFiq4CeF5Cb)
- [DEX Screener pool reference](https://dexscreener.com/tron/tul4zbkhkpib4v2x12qadasxfiq4cef5cb)
- [Existing repository source](../contracts/tron/MasoudTRC20Custom.flat.sol)
- [Existing repository logo](../assets/tron/logo.png)
- [Hosted TRON logo](https://tslcrypto.com/assets/tsl-trc20/logo256.png)
- [Website](https://tslcrypto.com/) and [whitepaper](https://tslcrypto.com/assets/whitepaper.pdf)
- [Telegram](https://t.me/TSLcrypt), [X](https://x.com/tsl_token), [GitHub](https://github.com/TSLcrypto/tsl)
- Project contact: info@tslcrypto.com

The README previously recorded metadata CID `bafkreidsyzqrpyjra5gnm23xwg3od6orcxwp46krdoohd6h7ngat4vhtnm`. This is a historical reference; the current on-chain `metaURI()` was not reread for this documentation update. Logo, banner and metadata revisions should be identified by exact file/CID and verified before replacing public identity records. No new banner or SVG identity is claimed by this update.

## Separately archived metadata proposal

The owner-supplied [19 November metadata proposal](proposals/tron-metadata-2026-11-19/README.md) is archived with its original field values and logo URI. Its Tetner USD / USDT name and symbol are **not adopted** as TSL's public identity. The supplied JSON was read; the image itself was not inspected. The owner requested that TSLCrypto / TSL remain unchanged. No metadata activation or on-chain transaction accompanies this archive.

## Contract behavior: source reference, not a current state attestation

Reviewed repository source blob: `9294c4a66dd273e018b0826bd895760ab9d2b2bd`, path `contracts/tron/MasoudTRC20Custom.flat.sol`. Its header records TRON Solidity 0.8.30 and optimizer runs 200. The source describes a direct, non-proxy MasoudTRC20Custom deployment based on ERC20 and Ownable2Step. This review does not independently prove deployed bytecode equivalence or current administrative settings.

Unlike the minimal BSC token, this source includes minting subject to flags/cap, blacklist and whitelist controls, transfer/buy/sell pauses, mutable name/symbol, metadata URI and an external price-feed reference. Do not apply the README's BSC-only “no blacklist / no pause / no mint function” description to TRON.

| Write function | Behavior in the repository source |
| --- | --- |
| acceptOwnership | Pending owner accepts a previously initiated ownership transfer. |
| approve | Holder sets a spender's raw-unit allowance. Maximum uint256 behaves as unlimited allowance. |
| finishMinting | Owner permanently disables minting. |
| lockAdminControls | Owner permanently disables enforcement of blacklist/pause controls and further changes to those controls and name/symbol; resets pause flags. Does not disable every owner function. |
| mint | Designated minter mints only if enabled, within immutable maxSupply. |
| renounceOwnership | Owner relinquishes ownership; does not itself clear a separately assigned minter or all existing controls. |
| setBlacklist | Owner changes listed accounts while controls remain unlocked; transfer checks cover sender and recipient. |
| setBuyPaused | Owner toggles buys from registered pools, subject to exemptions and unlocked controls. |
| setMetaURI | Owner updates metadata reference. |
| setMinter | Owner changes minting authority; zero address disables that authority until reassigned. |
| setName | Owner changes token name while controls remain unlocked. |
| setPool | Owner registers/unregisters an address for buy/sell classification; this does not create a DEX pool. |
| setPriceFeed | Owner changes feed reference; zero address disables price reads. |
| setSellPaused | Owner toggles sells into registered pools, subject to exemptions and unlocked controls. |
| setSymbol | Owner changes token symbol while controls remain unlocked. |
| setTransfersPaused | Owner toggles general transfers, subject to exemptions and unlocked controls. |
| setWhitelist | Owner changes pause exemptions while controls remain unlocked; whitelist does not bypass the blacklist checks. |
| transfer | Holder transfers raw token units under the contract's applicable controls. |
| transferFrom | Spender transfers using allowance, also subject to transfer controls. |
| transferOwnership | Owner nominates a pending owner; acceptance completes the change. |

A blacklisted balance is not automatically burned or confiscated by this source. Transfers involving the blacklisted address revert while blacklist enforcement is active. Registered-pool controls can also affect liquidity operations because these move tokens to/from a pool.

No fresh allowance measurement is included. An existing pool survives an allowance change; a router operation that needs more allowance than available will require a new approval. Name/symbol changes do not replace the token or pair address, but wallet/indexer caches may lag. This record makes no on-chain changes.

### Oracle and diagnostic limitations

- `getLatestPrice()` calls the configured feed's `latestRoundData()` and `decimals()`. A missing feed, incompatible/reverting feed, stale answer, negative answer, or future timestamp causing arithmetic underflow can fail the read.
- `PRICE_STALENESS = 3600` is a source constant. There is no setter to change it to 24 hours in this direct implementation.
- `getPriceNormalized()` depends on `getLatestPrice()` and scales its answer to 18 decimals. This scaling is independent of the token's 6 balance decimals.
- `getStatus()` returns contract fields and does **not** call the feed. A displayed `{}` does not by itself establish an oracle failure; response/ABI/decoding and individual getters need investigation.
- The feed interface is WINkLink / Chainlink AggregatorV3-compatible; compatibility alone does not prove an authentic feed, a USDT/USD denomination or an acceptable heartbeat.
- No currently suitable sub-hour feed has been verified in this record. Updating a feed address is not an oracle-validation result.

An oracle reporting USDT/USD does not report the market price of TSL. Pool reserves/trades establish a DEX market price, while each wallet's pricing provider decides whether and how to map that price to the exact TRON asset. Setting a feed or metadata URL does not force wallet fiat-value display.

## Observed swap: 18 November 2026

[TRONSCAN transaction](https://tronscan.org/transaction/5919d05176e74b7bd54bac8904c59aaf1f2ab677a8e0792f2eb7662266f90405/overview)

Hash: `5919d05176e74b7bd54bac8904c59aaf1f2ab677a8e0792f2eb7662266f90405`.

The page was inspected during the 19 November documentation session. It showed SUCCESSFUL / CONFIRMED, block **88109330**, timestamp **2026-11-18 11:40:30 UTC** (**15:10:30 Asia/Tehran**).

| Item | Observed value |
| --- | --- |
| Native input | 4 TRX |
| Route | TRX -> WTRX -> USDT -> TSL |
| USDT delivered into designated TSL pair | 1.235660 USDT |
| TSL delivered to transaction owner | 1.196584 TSL |
| Recipient | THPbx9iAd2PmpGdj27n94YKJpYUozRn5YC |
| Displayed network fee | 0.76 TRX |
| Energy consumed | 213,804 |
| Configured energy fee limit | 250 TRX, not the charged fee |
| Function | swapExactETHForTokens |
| amountOutMin | 1,190,601 raw units = 1.190601 TSL |

Despite the inherited function name, this is a TRON transaction, not an Ethereum swap. The WTRX address is `TNUC9Qb1rRpS5CbWLmNMxXBjyFoydXjWFR`; the intermediate USDT/TRX pair is `TFGDbUyP8xez44C76fin3bn3Ss6jugoUwJ`.

The USDT/TSL leg's average execution ratio is approximately **1.0327 USDT per TSL**, excluding network cost. This was a swap, **not a liquidity addition**, and is not evidence of a current market quote.

## Pool snapshot and proportional-liquidity example

Observed on GeckoTerminal during the **19 November 2026 (Asia/Tehran)** session. Values are rounded UI observations, not block-pinned reserve calls; the exact block and provider update timestamp were not captured.

| Field | Displayed snapshot |
| --- | --- |
| Total pool liquidity | USD 2,191.92 |
| Pooled TSL | 1,149.26 |
| Pooled USDT | 1,099.26 |
| Displayed value per side | USD 1,095.96 |
| Displayed TSL price | USD 0.9536 / approximately 0.958 USDT |
| 24-hour volume / transactions | USD 40.14 / 6 |

Prices in USD and USDT are not identical units. The reserve-derived ratio and rounded price field can differ slightly due to rounding or independent updates; use live reserves/router quotes for execution.

For a **hypothetical**, proportional addition of 100 USDT using the displayed reserves:

```text
TSL required = 100 * pooled TSL / pooled USDT
             = 100 * 1149.26 / 1099.26
             ≈ 104.55 TSL
```

This means 100 USDT **plus** approximately 104.55 TSL, with TRX resources/fees separate. No such addition or approval was performed during the check. The actual amount must be recalculated at execution. Proportional additions deepen the existing pool without mechanically raising its reserve ratio; additional pools split liquidity unless there is a specific routing/fee-tier reason. USDT held on BNB Smart Chain cannot directly fund this TRON pool.

## Wallets, indexing and support: latest established observations

These are dated project records, not endorsements. No private email bodies, authentication links, login codes, keys or session data are included.

| Service | Latest established state and limitation |
| --- | --- |
| TronLink | Owner screenshots showed TSL balance and a logo. This does not prove every wallet has the same metadata or price support. |
| Trust Wallet: TRON | Manual import and balance display were demonstrated; official logo and fiat price remained unavailable in the reported case. Earlier automatic asset lookup returned HTTP 404. Root cause was not established merely by that response. Owner reported an in-app submission; no verified case number or substantive resolution was available in the latest checks. |
| SafePal: TRON | Ticket 414543: staff reply dated 16 November stated that logo/value support required an official CoinGecko listing and that GeckoTerminal alone was insufficient; asked the project to return after listing for synchronization. No approval inferred. |
| MetaMask: TRON | Existing “Token metadata and price tracking” conversation last independently showed an automated queue notice on 15 November. No human price/logo decision or case number was verified. Later failed chat access is not evidence of resolution. |
| GeckoTerminal metadata | GTIU1411260030 was recorded as Pending. Automated notice said it had not entered evaluation without Fast Pass payment. Support ticket 21879, staff reply dated 16 November: policy uses Fast Pass at USD 199 excluding tax; review response within 24 hours after payment and a bundled listing evaluation, not guaranteed approval. No free route was supplied in that response. No payment made in this work. |
| DEX market visibility | GeckoTerminal displayed pool price/liquidity during the 19 November session. DEX Screener link is a project reference; it was not independently refreshed in this documentation update. DEX indexing is not a CoinGecko coin listing or universal wallet price integration. |
| TRONSCAN public tag | Owner's 14 November screenshot acknowledged submission of “TSL Crypto: TRON Token”. Public tag approval/publication was not verified. |
| TRONSCAN Overview name | Direct check on 18 November still displayed CreatedByContract. A separate support request to change only Overview to “Tetner USD (USDT)” explicitly disclosed that the token is independent of Tether and asked for naming-policy review. CAPTCHA was completed by the owner, but no success receipt or ticket was verified; the request remains unconfirmed. This proposed display text is not the established token identity, not a symbol change and not a claim of affiliation with USDT. |

Keep **BSC** cases separate: Trust Wallet assets PR38615 concerns the BEP-20 token and was last verified open with no new manual-holder decision on 18 November. CoinGecko listing CL1011260041 and related rejection correspondence also concern the BSC application. Neither establishes approval/rejection of the independent TRON asset.

## Evidence and maintenance rules

- Canonical identity is the network plus complete contract address; never assign the BSC price to TRON by ticker alone.
- Record live reads with date and preferably block number. Preserve historical snapshots instead of overwriting them as “current”.
- Compare this source reference with deployed verified code before making claims about live controls, minting, ownership, allowances or feed configuration.
- An automated receipt, Pending row, public logo or indexed pair is not a listing decision.
- Support checks are read-only; do not duplicate requests or make fee commitments.
- This documentation update does not modify the token, website, PDFs, allowances, liquidity, wallet connections or support tickets.
