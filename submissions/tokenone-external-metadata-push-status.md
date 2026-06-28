# TokenOne External Metadata Push Status

Date: 2026-06-29

Token:
0x5591a8E9a5001f6052D9d749518AE1e6287b7955

## Completed Today

### Moralis
Status:
Submitted support chat request for logo / thumbnail / metadata resync.

Files:
- submissions/moralis/moralis-logo-update-request.md
- submissions/moralis/moralis-logo-update-request-status.md

Next:
Wait for Moralis response, then rerun:
npx tsx scripts\moralis-tokenone-refresh.ts

### Binplorer / Ethplorer
Status:
Submitted token description update form.

Files:
- submissions/binplorer-logo-update-request.md
- submissions/binplorer-logo-update-request-status.md

Next:
Wait for review, then rerun:
npx tsx scripts\check-binplorer.ts

### BscScan
Status:
Existing tickets only. No duplicate submitted.

Tickets:
- #824628 via Gmail
- #825637 via info@tslcrypto.com

Next:
Wait for BscScan review response.

### GeckoTerminal
Status:
Approved.

Ticket:
GTIU1906260002

### Trust Wallet
Status:
PR open, merge fee requested, payment deferred because rejection risk is high.

PR:
https://github.com/trustwallet/assets/pull/37192

## Current Known External Data

Moralis:
- price: available
- pair: available
- logo: null
- thumbnail: null
- possible_spam: false
- verified_contract: false

Binplorer:
- holders: 6807
- transfers: 18038
- logo: Not available
- website: Not available
- price: Not available

## Next Manual Check

Run these after waiting for external review/sync:

npx tsx scripts\moralis-tokenone-refresh.ts
npx tsx scripts\check-binplorer.ts
npx tsx scripts\check-token.ts
