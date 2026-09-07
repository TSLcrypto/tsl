# Authentication and Key Management

## Scope

This document explains how identity, authorization, credentials, and token permissions are handled by the TSL repository and the published `contracts/TSL.sol` reference implementation.

The repository is a public token-source, metadata, and verification repository. It is not an application backend and does not implement a user login system, password database, session cookies, OAuth flow, JWT issuance, refresh tokens, or an API-key authentication layer.

## Authentication model

TSL uses the native authentication model of BNB Smart Chain / EVM transactions.

1. A wallet or signing service holds a private key outside the contract.
2. The signer creates and signs a transaction.
3. BNB Smart Chain validates the transaction signature and derives the sender address.
4. Inside the contract, the authenticated caller is exposed as `msg.sender`.
5. The contract uses `msg.sender` for authorization decisions.

No private key, seed phrase, password, or authentication secret is stored in the TSL contract.

## Owner authorization

At deployment, the constructor sets:

```solidity
owner = msg.sender;
```

The contract protects owner-only operations with:

```solidity
modifier onlyOwner() {
    require(msg.sender == owner, "NOT_OWNER");
    _;
}
```

The owner-only functions in the published reference source are:

- `transferOwnership(address newOwner)` — transfers the administrative owner role to another non-zero address.
- `rescueERC20(address token, address to, uint256 amount)` — recovers unrelated ERC-20/BEP-20 tokens accidentally sent to the contract.

`rescueERC20` explicitly rejects `address(this)`, so it cannot be used to recover TSL from the TSL contract itself.

The owner has no mint, burn, blacklist, freeze, pause, confiscation, tax, or upgrade capability in the published fixed-supply implementation.

## ERC-20 delegated authorization

Standard token delegation is handled through the ERC-20 allowance model.

- `approve(spender, value)` records an allowance for a spender.
- `transferFrom(from, to, value)` verifies that `allowance[from][msg.sender]` is sufficient before transferring tokens.
- If the allowance is `type(uint256).max`, the implementation treats it as an unlimited approval and does not decrement it.

An ERC-20 allowance is an on-chain authorization grant. It is not an authentication token, API token, or login session.

## Credential and token handling

The repository must not contain live credentials. In particular, contributors must never commit:

- private keys;
- seed phrases or mnemonics;
- wallet keystore files;
- passwords;
- API keys;
- access tokens or bearer tokens;
- production `.env` files;
- signing-service credentials;
- cloud-provider or CI secrets.

The repository `.gitignore` excludes common environment, key, keystore, wallet, and credential artifacts. This is a preventive control only; it is not a substitute for secret scanning or secure key storage.

GitHub Actions workflows should use the minimum required permissions. The current repository-integrity workflow uses read-only repository contents access and does not require a project API key or externally supplied secret.

## Key-management expectations

Operational signing keys should be managed outside this public repository. Recommended controls include:

- use a hardware wallet or dedicated signing system for privileged accounts where practical;
- never copy a seed phrase or raw private key into repository files, Issues, Pull Requests, CI logs, or support tickets;
- separate deployer/owner credentials from ordinary operational wallets when practical;
- verify the destination address before any ownership transfer;
- keep an auditable record of ownership-transfer transactions;
- rotate any credential immediately if accidental disclosure is suspected;
- revoke or replace exposed API/access tokens at the issuing service rather than relying only on deleting the committed file.

Deleting a secret from the latest branch does not make a previously committed secret safe. A credential that has ever been committed should be treated as compromised and rotated.

## Repository security controls

The repository currently uses:

- `CODEOWNERS` coverage for contract, token-list, security-policy, and `.github` paths;
- a repository-integrity GitHub Actions workflow with `contents: read` permission;
- `.gitignore` rules for common local secret artifacts;
- `SECURITY.md` guidance prohibiting sensitive credentials in vulnerability reports.

## Audit note

A review of the current default-branch source and workflow configuration found no application login/JWT stack and no plaintext project credential reference in the inspected code-search results. The workflow does not reference `secrets.*`, a private key, or an external API key.

This review is not equivalent to a forensic scan of every historical Git object or GitHub's private secret-scanning alert database. For release or security-review assurance, the repository should also use GitHub secret scanning where available and/or an approved history-aware scanner such as Gitleaks or TruffleHog in a controlled environment. Scanner output must never publish a discovered live secret.

## Reviewer summary

TSL authentication is blockchain-native:

```text
wallet/private signing key
        |
        | signs transaction
        v
BNB Smart Chain validates signature
        |
        v
     msg.sender
        |
        +--> standard token operations
        |
        +--> onlyOwner authorization
        |
        +--> ERC-20 allowance authorization
```

There is no repository-level TSL login credential or JWT mechanism. Private signing credentials remain off-chain and must remain outside this public repository.
