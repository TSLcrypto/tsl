# Archived TRON metadata proposal — NOT ACTIVE

Status: **Proposal only; not approved for activation.** Recorded 19 November 2026 (Asia/Tehran).

The project owner explicitly chose to preserve the public TRON token identity **TSL Crypto / TSL** and archive this supplied metadata separately. Do not ingest this folder into production token lists, wallet metadata or website asset manifests.

## Provenance

- Supplied metadata URI: `ipfs://bafkreicsibkujps77s5xp5djcjdslwlopt3qh4e73gak7ohl7chlxl5sau`
- [Browser gateway used to read the JSON](https://bafkreicsibkujps77s5xp5djcjdslwlopt3qh4e73gak7ohl7chlxl5sau.ipfs.inbrowser.link/)
- [Readable local JSON transcription](metadata.proposed.json): parsed field values transcribed from the browser, with formatting added. This is not claimed to be byte-identical to the IPFS object or to reproduce its CID.
- Both `image` and `logo` reference `ipfs://bafkreib6xv75g65c7rqxrlnltlzfmbdf3eilka5nfb2bd5xz65dj2caf5q`.
- [Archived logo binary](logo.proposed.png): original PNG bytes retrieved and visually inspected on 19 November 2026 via gateway.pinata.cloud. Size: 250 x 250 pixels; 30,261 bytes. SHA-256: 3ebd7fd37ba2fc6178adab9af2560465d910b503ad287411f6f9f7469d0805ec. The SHA-256 matches the raw CID referenced by both image and logo fields. The image is archived unchanged for this proposal only; it is not approved as the canonical TSL logo.

## Identity mismatch and decision

| Field | Recorded TRON identity | Supplied proposal |
| --- | --- | --- |
| Name | TSL Crypto | Tetner USD |
| Symbol | TSL | USDT |
| Decimals | 6 | 6 |

The proposal describes a token for the game “Masoud Tahrim” and explicitly disclaims connection with Tether. This is the supplied description, not independently verified game functionality. The JSON contains no contract address, so it does not independently establish an on-chain association.

The name and USDT ticker could still be confused with Tether where wallets do not display the description. The proposal is not a new canonical identity, a dollar peg, Tether affiliation, or a wallet-price integration.

This archive does not call `setName`, `setSymbol` or `setMetaURI`; it does not replace the existing TSL logo or metadata. Read-only verification on 19 November 2026 confirmed that the live TRON contract references a different JSON object identifying TSL Crypto / TSL. The two JSON objects reference the same image; that does not activate this proposal or endorse the image as a wallet logo.

The earlier TRONSCAN Overview-only support request is separate; retaining this proposal does not submit, approve, withdraw or resend that request.

See the [TRON reference record](../../TSL-TRON-REFERENCE-2026-11-19.md) for contract addresses, dated market evidence and limitations.
