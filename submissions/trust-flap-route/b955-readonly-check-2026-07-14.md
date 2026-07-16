# B955 Read-only Contract Check

Date:
2026-07-14

Contract:
0x55DC1cc22BbEcA50c5FD179A1BA0bF7208c6B955

Type:
EIP1967 proxy detected

Implementation:
0x990ae07FEef5697d6dCEfD354c08a15437E68394

Name:
Tether USD

Symbol:
USDT

Decimals:
18

Owner:
0x3cf25AB11d1E46A6e91083f0C1e06607e846Ac2C

Total Supply Raw:
9184992539513839000000000000

Total Supply Visible:
9,184,992,539.513839

Max Supply Raw:
9184992539513839000000000000

Mint Selector Scan:
mint(address,uint256): not found
mint(uint256): not found
mintTo(address,uint256): not found

Implementation Selector Scan:
mint(address,uint256): not found
mint(uint256): not found
mintTo(address,uint256): not found
owner(): FOUND
maxSupply(): FOUND
MINTER_ROLE(): not found

Conclusion:
No standard external mint selector was detected on the proxy or implementation.
totalSupply equals maxSupply.
The contract is upgradeable through an EIP1967 implementation slot, so future behavior may depend on upgrade authority.
Read-only check only. No transaction sent.
