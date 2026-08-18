# TSL deployment record

## Confirmed public identity

| Field | Value |
| --- | --- |
| Network | BNB Smart Chain |
| Chain ID | 56 |
| Contract | `0xD12ECbD5f508106ec242881530767FF15A6A7549` |
| On-chain name | TSL |
| Symbol | TSL |
| Decimals | 18 |
| Total supply | 1,000,000,000 TSL |
| Architecture | Direct deployment; non-upgradeable |
| Repository source | [`../contracts/TSL.sol`](../contracts/TSL.sol) |
| Explorer | https://bscscan.com/address/0xD12ECbD5f508106ec242881530767FF15A6A7549#code |

## Reproducible-build status

The repository source declares `pragma solidity ^0.8.20`, but `main` does not yet contain enough build metadata to independently reproduce the exact deployed bytecode.

The following evidence should be added only after it is read from the verified deployment record or original build output; values must not be guessed:

- deployment transaction hash and block number;
- deployer address;
- exact Solidity compiler version;
- optimizer state and run count;
- EVM target and `viaIR` setting;
- constructor arguments, if any;
- ABI and compiler metadata;
- creation-bytecode and runtime-bytecode hashes;
- a deterministic compile-and-compare command.

Until that record is complete, BscScan is the authoritative reference for verified compiler settings and deployed bytecode. The contract address remains the canonical token identity.
