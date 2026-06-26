# Trust Wallet PR Status

Date: 2026-06-26

TokenOneBEP20Upgradeable Trust Wallet submission status.

## Current PR

- PR: https://github.com/trustwallet/assets/pull/37192
- Title: Add Tether USD (BEP20)
- Status: Open
- Files changed:
  - blockchains/smartchain/assets/0x5591a8E9a5001f6052D9d749518AE1e6287b7955/info.json
  - blockchains/smartchain/assets/0x5591a8E9a5001f6052D9d749518AE1e6287b7955/logo.png

## Previous PR

- Old PR: https://github.com/trustwallet/assets/pull/37124
- Status: Closed due to inactivity
- A follow-up comment was posted requesting reopen or guidance.

## Fee Decision

Trust Wallet merge-fee-bot requested:

- 500 TWT on BEP20, or
- 2.5 BNB

Decision: Do not pay at this time.

Reason:
- The token uses the name/symbol Tether USD / USDT.
- This may create a high rejection risk under Trust Wallet asset acceptance criteria.
- The requested fee is non-refundable.
- The PR is kept as a documented research/educational submission attempt.

## Strategy

Do not submit duplicate Trust Wallet PRs for the same TokenOne contract unless the strategy changes.

For a higher-probability Trust Wallet submission in the future, use an independent token name and symbol instead of Tether USD / USDT.
