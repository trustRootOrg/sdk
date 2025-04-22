# Schemas

This document describes the schemas used in the TrustRoot protocol for autonomous agents to attest and verify counterparties. Each schema defines a structured format for attestations, ensuring trust and interoperability in agent interactions. Schemas are registered on the EAS SchemaRegistry and used to create attestations for agent identities, code audits, and approvals.

## Overview

The system uses seven schemas to support the verification of autonomous agents and their auditors:
1. **Autonomous Agent Schema**: Attests an agent’s identity, code, and runtime environment.
2. **Approved Agent List Schema**: Attests that an agent is approved for interactions.
3. **Audited Agent Code List Schema**: Attests that an agent’s code has been audited.
4. **Approved Auditors List Schema**: Attests that an auditor is approved to audit code.
5. **Trusted Root Agent Approval Schema**: Attests that a trusted root attestor approved an agent.
6. **Trusted Root Auditor Approval Schema**: Attests that a trusted root attestor approved an auditor.
7. **DAO Agent Approval Schema**: Attests that a DAO approved an agent via governance.
8. **DAO Auditor Approval Schema**: Attests that a DAO approved an auditor via governance.

**Remark on Governance Transition**: During the initial **guardant period** (a transitional phase to establish the system), the **Trusted Root Agent Approval** and **Trusted Root Auditor Approval** schemas are used, with approvals attested by a single trusted root attestor (e.g., TrustRoot organization). After the guardant period, the system transitions to decentralized governance, using the **DAO Agent Approval** and **DAO Auditor Approval** schemas, with attestations created by a DAO (via its governance contract) and enforced by a resolver contract to ensure only authorized entities create approvals.


Schemas are designed to ensure:
- **Consistency**: Fields like `nostrPubkey` and `codeCid` align across schemas for cross-verification.
- **Revocability**: All schemas support revocation to invalidate outdated or compromised attestations.
- **Security**: Approval schemas use a resolver contract to restrict attestation creation to authorized entities (trusted root attestor or DAO).
- **Transparency**: Approval reasons and proposal references provide auditability.

## Schema Details

### 1. Autonomous Agent Schema

**Purpose**: Attests the identity, code, and runtime environment of an autonomous agent, enabling counterparties to verify its trustworthiness before interaction.

**Schema**: `string nostrPubkey, string codeCid, string teeType, bytes32 teeAttestationHash`

**Fields**:
- `nostrPubkey` (string): The Nostr public key identifying the agent (e.g., 64-character hex or `npub` format).
- `codeCid` (string): The IPFS Content Identifier (CID) referencing the agent’s code (e.g., `bafybei...`).
- `teeType` (string): The type of Trusted Execution Environment (TEE) running the agent (e.g., "AWS Nitro Enclave").
- `teeAttestationHash` (bytes32): The hash of the TEE’s attestation document, verifying the runtime environment.

**Usage**:
- Created by the agent or its operator to declare its identity and code.
- Verified by counterparties to ensure the agent’s `nostrPubkey` and `codeCid` match approved and audited registries.
- Revocable to invalidate if the agent’s code or TEE is compromised.

**Resolver**: None (open to any attester, as the agent self-attests).

### 2. Approved Agent List Schema

**Purpose**: Attests that an agent is approved for interactions, typically by a trusted authority or DAO, ensuring only vetted agents are trusted.

**Schema**: `string nostrPubkey, string approvalReason, uint64 validUntil`

**Fields**:
- `nostrPubkey` (string): The Nostr public key of the approved agent, matching the Autonomous Agent schema.
- `approvalReason` (string): A description of why the agent is approved (e.g., "Passed security audit by XYZ").
- `validUntil` (uint64): Unix timestamp (seconds) when the approval expires (0 for perpetual validity).

**Usage**:
- Created by an authorized attester (e.g., trusted root or DAO) to list approved agents.
- Verified by counterparties to confirm the agent’s `nostrPubkey` is approved and not expired.
- Revocable to remove approval if the agent becomes untrusted.

**Resolver**: None (assumes separate approval schemas enforce authorization).

### 3. Audited Agent Code List Schema

**Purpose**: Attests that an agent’s code (referenced by IPFS CID) has been audited by an approved auditor, ensuring code integrity.

**Schema**: `string codeCid, string auditReport, string auditor`

**Fields**:
- `codeCid` (string): The IPFS CID of the audited code, matching the Autonomous Agent schema.
- `auditReport` (string): A description or reference to the audit report (e.g., "No vulnerabilities found, audited by XYZ").
- `auditor` (string): The Nostr public key of the auditor, matching the Approved Auditors List schema.

**Usage**:
- Created by an approved auditor to certify the agent’s code.
- Verified by counterparties to ensure the `codeCid` is audited and the `auditor` is approved.
- Revocable if the audit is found to be invalid.

**Resolver**: None (relies on Approved Auditors List for auditor trust).

### 4. Approved Auditors List Schema

**Purpose**: Attests that an auditor is approved to audit agent code, ensuring only trusted auditors certify code.

**Schema**: `string auditorPubkey, string approvalReason, uint64 validUntil`

**Fields**:
- `auditorPubkey` (string): The Nostr public key of the approved auditor, matching the `auditor` in the Audited Agent Code List.
- `approvalReason` (string): A description of why the auditor is approved (e.g., "Certified by XYZ Security").
- `validUntil` (uint64): Unix timestamp when the auditor’s approval expires (0 for perpetual).

**Usage**:
- Created by an authorized attester (e.g., trusted root or DAO) to list approved auditors.
- Verified to ensure the auditor’s `auditorPubkey` is approved and not expired.
- Revocable to remove approval if the auditor becomes untrusted.

**Resolver**: None (assumes separate approval schemas enforce authorization).

### 5. Trusted Root Agent Approval Schema

**Purpose**: Attests that a trusted root attestor (a single trusted entity) has approved an agent for inclusion in the Approved Agent List.

**Schema**: `address attestor, string nostrPubkey, string approvalReason, uint64 validUntil`

**Fields**:
- `attestor` (address): The Ethereum address of the trusted root attestor (e.g., `0xTrustedAttestorAddress`).
- `nostrPubkey` (string): The Nostr public key of the approved agent, matching the Approved Agent List.
- `approvalReason` (string): A description of why the agent is approved (e.g., "Verified by TrustedOrg").
- `validUntil` (uint64): Unix timestamp when the approval expires (0 for perpetual).

**Usage**:
- Created by the trusted root attestor to authorize an agent’s inclusion in the Approved Agent List.
- Verified to confirm the `attestor` matches the known trusted address and the `nostrPubkey` is approved.
- Revocable to invalidate if the agent or attestor is compromised.

**Resolver**: `ApprovalResolver` contract, restricting attestation creation to the `attestor` address.

### 6. Trusted Root Auditor Approval Schema

**Purpose**: Attests that a trusted root attestor has approved an auditor for inclusion in the Approved Auditors List.

**Schema**: `address attestor, string auditorPubkey, string approvalReason, uint64 validUntil`

**Fields**:
- `attestor` (address): The Ethereum address of the trusted root attestor.
- `auditorPubkey` (string): The Nostr public key of the approved auditor, matching the Approved Auditors List.
- `approvalReason` (string): A description of why the auditor is approved (e.g., "Certified by TrustedOrg").
- `validUntil` (uint64): Unix timestamp when the approval expires (0 for perpetual).

**Usage**:
- Created by the trusted root attestor to authorize an auditor.
- Verified to confirm the `attestor` is trusted and the `auditorPubkey` is approved.
- Revocable to invalidate if the auditor or attestor is compromised.

**Resolver**: `ApprovalResolver` contract, restricting attestation creation to the `attestor` address.

### 7. DAO Agent Approval Schema

**Purpose**: Attests that a decentralized autonomous organization (DAO) has approved an agent for inclusion in the Approved Agent List via governance.

**Schema**: `address daoAddress, string nostrPubkey, string approvalReason, uint64 validUntil, string proposalReference`

**Fields**:
- `daoAddress` (address): The Ethereum address of the DAO’s multisig or governance contract (e.g., `0xDAOMultisigAddress`).
- `nostrPubkey` (string): The Nostr public key of the approved agent.
- `approvalReason` (string): A description of why the DAO approved the agent (e.g., "Approved via DAO vote, Proposal #123").
- `validUntil` (uint64): Unix timestamp when the approval expires (0 for perpetual).
- `proposalReference` (string): A reference to the DAO’s proposal (e.g., IPFS CID `ipfs://Qm...`, or "Proposal #123").

**Usage**:
- Created by the DAO to authorize an agent’s inclusion in the Approved Agent List.
- Verified to confirm the `daoAddress` matches the DAO and the `proposalReference` is valid (e.g., via IPFS or governance contract).
- Revocable to invalidate if the agent or DAO decision is overturned.

**Resolver**: `ApprovalResolver` contract, restricting attestation creation to the `daoAddress`.

### 8. DAO Auditor Approval Schema

**Purpose**: Attests that a DAO has approved an auditor for inclusion in the Approved Auditors List via governance.

**Schema**: `address daoAddress, string auditorPubkey, string approvalReason, uint64 validUntil, string proposalReference`

**Fields**:
- `daoAddress` (address): The Ethereum address of the DAO’s multisig or governance contract.
- `auditorPubkey` (string): The Nostr public key of the approved auditor.
- `approvalReason` (string): A description of why the DAO approved the auditor (e.g., "Approved via DAO vote, Proposal #124").
- `validUntil` (uint64): Unix timestamp when the approval expires (0 for perpetual).
- `proposalReference` (string): A reference to the DAO’s proposal.

**Usage**:
- Created by the DAO to authorize an auditor.
- Verified to confirm the `daoAddress` and validate the `proposalReference`.
- Revocable to invalidate if the auditor or DAO decision is overturned.

**Resolver**: `ApprovalResolver` contract, restricting attestation creation to the `daoAddress`.

## Schema Design Principles

- **Consistency**: `nostrPubkey`, `auditorPubkey`, and `codeCid` fields align across schemas to enable cross-verification.
- **Revocability**: All schemas are revocable to handle trust changes.
- **Authorization**: Approval schemas (Trusted Root and DAO) use a resolver to restrict attestation creation to authorized entities.
- **Transparency**: `approvalReason` and `proposalReference` fields provide context for approvals, enhancing auditability.
- **Time-Bound Approvals**: `validUntil` allows expiration of approvals, supporting temporary trust.
- **Extensibility**: Schemas support both Trusted Root and DAO governance models, adaptable to future governance mechanisms.

## Usage Guidelines

- **Verification**: Counterparties verify attestations by checking schema fields, ensuring non-revocation, non-expiration, and consistency across schemas.
- **Resolver Enforcement**: Approval schemas rely on the `ApprovalResolver` contract to ensure only the trusted root attestor or DAO can create attestations.
- **Proposal Validation**: For DAO schemas, validate `proposalReference` to confirm the governance decision (e.g., via IPFS or governance contract).
- **Security**: Validate `attestor` or `daoAddress` against known values, and ensure off-chain verifications (Nostr, TEE) are performed.

See [Attestation Flow](./attestation-flow.md) for the verification process and [Best Practices](./best-practices.md) for security guidelines.