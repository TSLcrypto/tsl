# TokenOne Trust Wallet Post-MetaURI Test

After updating TokenOne metaURI to Flap-style metadata, Trust Wallet Extension was checked again.

New metaURI:
https://blush-active-quokka-393.mypinata.cloud/ipfs/bafkreicjzfext2gh5zry3mg2q7zl7ejsjvpngu5ybq7qv63e56fzmbhvni

Image CID inside metadata:
bafybeigti7yxp77dsocvzmemhf7ltqye5rwgyatvu4bd5v7vkzicjf3hfu

Observed in Trust Wallet Network:
- No ipfs.sintral.me hit
- No bafybeigti7 hit
- No ticker/price hit in current resource scan
- Trust still requests:
  assets-cdn.trustwallet.com/blockchains/smartchain/assets/0x5591a8E9a5001f6052D9d749518AE1e6287b7955/logo.png

Conclusion:
Changing on-chain metaURI to Flap-style metadata is not enough for Trust Wallet to switch TokenOne to the Flap/sintral logo route.
Flap visibility depends on a separate discovery/feed path, likely cmcdex/Trust discovery.
