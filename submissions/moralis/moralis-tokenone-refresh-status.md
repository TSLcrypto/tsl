TokenOne Moralis Refresh Status
================================

Checked At: 2026-06-28T23:01:04.820Z

Token: 0x5591a8E9a5001f6052D9d749518AE1e6287b7955
Chain: bsc

Endpoint Status:
- Metadata: 200
- Price: 200
- Pairs: 200
- Holders: 200
- Transfers: 200
- Owner Balances: 200

Metadata Snapshot:
- Name: Tether USD
- Symbol: USDT
- Decimals: 18
- Logo: null
- Thumbnail: null
- Logo Hash: null
- Possible Spam: false
- Verified Contract: false

Market Snapshot:
- USD Price: 1.0031237126587207
- Exchange: PancakeSwap v2
- Pair Address: 0x46d776a2f759718a9f86642f52a7fbb2b475b22f

Notes:
- This script calls Moralis metadata, price, pairs, holders, transfers, and balance endpoints to refresh/check TokenOne visibility.
- Moralis cache/logo propagation is not guaranteed immediately.
- Keep MORALIS_API_KEY only in .env and never commit it.
