# Trust Wallet / Flap Route Evidence

## Confirmed Finding

Flap-created tokens can appear in Trust Wallet Extension with logo and price very fast without using the classic trustwallet/assets GitHub path.

## Price Route

Trust Wallet ticker response showed:

Provider:
cmcdex

Example Flap asset id:
c20000714_t0x2fCD7e7E94c2Bb65D651550242EEb3B2cf1D8888

Example price:
0.000018602302846966813

Conclusion:
Flap token price is routed to Trust Wallet through cmcdex / Trust Wallet tickers.

## Logo Route

Flap backend metadata uses pure CID in metadata.image.

Example 1:

Contract:
0x2fCD7e7E94c2Bb65D651550242EEb3B2cf1D8888

Name:
TSL

Symbol:
TSL

Flap image CID:
bafkreibon7asr3tornpsarvwmtrvs46xwqgl4cc5n34gtwbqp35lehpwgu

Trust logo route:
ipfs.sintral.me

Example 2:

Contract:
0x0C26A22863F461ED8B0B1219976f1e18081B8888

Name:
Tether USD

Symbol:
USDT $

Flap image CID:
bafkreibn4y611leughtp5pgu371ve7mymvcffpo5i2h6iw4t4iwo6z5ocu

Trust logo route:
ipfs.sintral.me

## TokenOne Difference

TokenOne:
0x5591a8E9a5001f6052D9d749518AE1e6287b7955

Trust Wallet tried classic logo path:

https://assets-cdn.trustwallet.com/blockchains/smartchain/assets/0x5591a8E9a5001f6052D9d749518AE1e6287b7955/logo.png

Result:
404 Not Found

Conclusion:
TokenOne is not using the Flap/sintral logo route. Trust Wallet is trying the classic Trust assets CDN route for TokenOne.

## Practical Conclusion

Flap route:
Flap metadata.image CID
-> ipfs.sintral.me
-> Trust Wallet logo

Flap price:
cmcdex
-> Trust Wallet tickers
-> Trust Wallet price

Classic TokenOne route:
assets-cdn.trustwallet.com
-> 404 for logo

Next goal:
Prepare TokenOne/TSL metadata in Flap-style format and request/index through cmcdex / Trust discovery compatible route.
