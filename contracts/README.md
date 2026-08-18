# TSL smart contract documentation

## Deployment identity

| Field | Value |
| --- | --- |
| Contract | `0xD12ECbD5f508106ec242881530767FF15A6A7549` |
| Network | BNB Smart Chain |
| Chain ID | 56 |
| Source | [`TSL.sol`](TSL.sol) |
| Contract type | Fixed-supply fungible token |
| Architecture | Direct deployment; not a proxy and not upgradeable |
| On-chain name | TSL |
| Symbol | TSL |
| Decimals | 18 |
| Total supply | 1,000,000,000 TSL |

- Verified source: https://bscscan.com/address/0xD12ECbD5f508106ec242881530767FF15A6A7549#code
- Token page: https://bscscan.com/token/0xD12ECbD5f508106ec242881530767FF15A6A7549

## Token behavior

The contract creates the complete supply in its constructor and assigns it to the deployer. It exposes the standard token functions `transfer`, `approve`, `transferFrom`, `balanceOf`, `allowance`, and `totalSupply`.

The published source contains no function for:

- minting or increasing total supply;
- burning supply;
- blacklisting, freezing, or confiscating balances;
- pausing transfers;
- transfer taxes or fee-on-transfer behavior;
- rebasing;
- restricting buys or sells;
- changing a router or liquidity-pool address;
- upgrading contract logic.

## Ownership and privileged functions

The contract stores an `owner` address and exposes two owner-only functions:

1. `transferOwnership(address newOwner)` transfers ownership to a non-zero address.
2. `rescueERC20(address token, address to, uint256 amount)` recovers unrelated ERC-20/BEP-20 tokens held by the contract.

`rescueERC20` explicitly rejects the TSL contract as the token being recovered, so it cannot be used to withdraw TSL held by the TSL contract. Ownership cannot be renounced through the published interface.

## Build and verification record

The source declares `pragma solidity ^0.8.20`. The exact compiler patch version, optimizer settings, EVM target, constructor transaction, and build artifacts used for the deployed bytecode are not currently recorded on the `main` branch.

Do not infer byte-for-byte reproducibility from the pragma alone. For exact deployed compiler settings and bytecode verification, use the verified contract record on BscScan. A future reproducible-build record should add the following without changing the deployed contract:

- exact Solidity compiler version;
- optimizer enabled/disabled state and run count;
- EVM target and `viaIR` setting;
- constructor/deployment transaction hash;
- ABI, creation bytecode, and deployed bytecode hash;
- deterministic compilation command and verification result.

## Security status

This repository publication is not a substitute for an independent audit. The source is intentionally small, but integrations should still test transfers, allowance changes, zero-value transfers, maximum allowance behavior, insufficient-balance reverts, ownership checks, and token rescue behavior.

Security reports should follow [`../SECURITY.md`](../SECURITY.md).
