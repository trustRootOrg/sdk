# Attestation Flow

This document describes the attestation verification flow for autonomous agents using the TrustRoot protocol to verify a counterparty agent’s identity (`nostrPubkey`) and code (`codeCid`) against approved and audited registries. The flow focuses on the verification process, excluding schema registration and attestation creation. It leverages the schemas defined in [Schemas](./schemas.md) and incorporates resolver enforcement and proposal validation for approvals.

** **Remark on Governance Transition**: During the initial **guardant period** (a transitional phase to bootstrap the system), approvals are managed using the **Trusted Agent Approval** and **Trusted Auditor Approval** schemas, attested by a single trusted attestor without a resolver contract. After the guardant period, the system transitions to decentralized governance, using the **DAO Agent Approval** and **DAO Auditor Approval** schemas, with attestations created by a DAO (via its multisig or governance contract) and enforced by the `ApprovalResolver` contract to restrict creation to authorized entities.

## Overview

The attestation flow enables an **Initiating Agent (Agent A)** to verify a **Counterparty Agent (Agent B)** before interaction (e.g., data exchange via Nostr). The process ensures:
- Agent B’s identity (`nostrPubkey`) is approved.
- Agent B’s code (`codeCid`) is audited by an approved auditor.
- Approvals are authorized by a trusted attestor (during guardant period) or a DAO with resolver enforcement (post-guardant period).
- DAO approvals are validated via governance proposals.

The flow involves querying attestations on the EAS network (e.g., Sepolia), performing off-chain verifications (Nostr, TEE), and validating DAO proposals (via IPFS or governance contracts). If any step fails, the interaction is rejected.

## Actors

- **Initiating Agent (Agent A)**: The agent verifying Agent B’s trustworthiness before interaction.
- **Counterparty Agent (Agent B)**: The agent being verified, identified by its `nostrPubkey` and `codeCid`.
- **TrustRoot SDK**: A client-side interface for querying EAS attestations, validating proposals, and performing off-chain verifications.
- **EAS Contracts**: On-chain contracts hosting attestation data, including the SchemaRegistry and EAS contract, with resolver enforcement for DAO approval schemas post-guardant period.
- **Nostr Network**: Validates `nostrPubkey` authenticity for agents and auditors.
- **TEE Provider**: Provides TEE attestation documents (e.g., AWS Nitro Enclave) to verify the agent’s runtime environment.
- **Governance Contract**: Stores DAO proposal data for validation (if contract-based, post-guardant period).

## Attestation Verification Flow

The verification flow is a sequential process with conditional checks. Agent A rejects the interaction if any step fails (e.g., attestation is invalid, revoked, expired, or proposal is invalid). The flow adapts based on whether the system is in the guardant period (Trusted) or post-guardant period (DAO with resolver).

### 1. Validate Autonomous Agent Attestation
- **Purpose**: Confirm Agent B’s identity, code, and runtime environment.
- **Schema**: Autonomous Agent (`string nostrPubkey, string codeCid, string teeType, bytes32 teeAttestationHash`).
- **Steps**:
  - Agent A uses the TrustRoot SDK to query the Autonomous Agent attestation by its UID.
  - The SDK calls the EAS contract’s `getAttestation` function to retrieve attestation details.
  - The SDK verifies:
    - The attestation exists, is not revoked, and is not expired (if an expiration is set).
    - The `nostrPubkey` matches Agent B’s claimed identity.
    - The `codeCid`, `teeType`, and `teeAttestationHash` are present for later verification.
  - If valid, Agent A extracts `nostrPubkey` and `codeCid` and proceeds; otherwise, the interaction is rejected.

### 2. Validate Approved Agent Attestation
- **Purpose**: Confirm Agent B is approved for interactions.
- **Schema**: Approved Agent List (`string nostrPubkey, string approvalReason, uint64 validUntil`).
- **Steps**:
  - Agent A queries the Approved Agent List attestation by its UID.
  - The SDK retrieves attestation details and verifies:
    - The attestation is valid, not revoked, and not expired (`validUntil` is 0 or greater than the current timestamp).
    - The `nostrPubkey` matches the one from the Autonomous Agent attestation.
  - If valid, Agent A proceeds to verify the approval’s authorization; otherwise, the interaction is rejected.

### 3. Validate Agent Approval (Trusted Attestor or DAO)
- **Purpose**: Confirm the agent’s approval was authorized by a trusted attestor (guardant period) or a DAO (post-guardant period).
- **Schemas**:
  - Trusted Agent Approval (`address attestor, string nostrPubkey, string approvalReason, uint64 validUntil`).
  - DAO Agent Approval (`address daoAddress, string nostrPubkey, string approvalReason, uint64 validUntil, string proposalReference`).
- **Steps**:
  - Agent A determines whether to check Trusted Attestor (guardant period) or DAO (post-guardant period) approval.
  - **Trusted (Guardant Period)**:
    - Query the Trusted Agent Approval attestation by its UID.
    - Verify the attestation is valid, not revoked, and not expired (`validUntil`).
    - Confirm the `attestor` matches the known trusted attestor address (e.g., `0xTrustedAttestorAddress`).
    - Ensure the `nostrPubkey` matches the Approved Agent List and Autonomous Agent attestations.
    - No resolver contract is used, as the trusted attestor is assumed secure.
  - **DAO (Post-Guardant Period)**:
    - Query the DAO Agent Approval attestation by its UID.
    - Verify the attestation is valid, not revoked, and not expired (`validUntil`).
    - Confirm the `daoAddress` matches the DAO’s multisig or governance contract address (e.g., `0xDAOMultisigAddress`).
    - Ensure the `nostrPubkey` matches the Approved Agent List and Autonomous Agent attestations.
    - The `ApprovalResolver` contract ensures the attestation was created by the `daoAddress`.
  - If valid, proceed to proposal validation (DAO only) or audited code verification (Trusted Auditor); otherwise, reject.

### 4. Validate DAO Agent Proposal (DAO Only, Post-Guardant Period)
- **Purpose**: Confirm the DAO’s approval is backed by a legitimate governance proposal.
- **Schema**: DAO Agent Approval (includes `proposalReference`).
- **Steps**:
  - Agent A extracts the `proposalReference` (e.g., `ipfs://Qm...` or "Proposal #123").
  - The SDK validates the proposal:
    - **IPFS-Based**:
      - Fetch the JSON document from IPFS using the CID.
      - Verify the document contains:
        - A `pubkey` field matching the `nostrPubkey`.
        - An `approvalReason` matching the attestation’s `approvalReason`.
        - A `status` field set to "approved".
    - **Governance Contract-Based**:
      - Query the DAO’s governance contract (e.g., Compound Governor) using the proposal ID.
      - Confirm the proposal passed (e.g., executed status).
      - Verify proposal metadata (stored off-chain or on-chain) matches the `nostrPubkey` and `approvalReason`.
  - If the proposal is valid, proceed; otherwise, reject.

### 5. Validate Audited Agent Code Attestation
- **Purpose**: Confirm Agent B’s code is audited by an approved auditor.
- **Schema**: Audited Agent Code List (`string codeCid, string auditReport, string auditor`).
- **Steps**:
  - Agent A queries the Audited Agent Code List attestation by its UID.
  - The SDK verifies:
    - The attestation is valid, not revoked, and not expired (if applicable).
    - The `codeCid` matches the Autonomous Agent attestation.
    - The `auditor` is a valid Nostr public key.
  - If valid, Agent A extracts the `auditor` and proceeds; otherwise, reject.

### 6. Validate Approved Auditor Attestation
- **Purpose**: Confirm the auditor is approved to audit code.
- **Schema**: Approved Auditors List (`string auditorPubkey, string approvalReason, uint64 validUntil`).
- **Steps**:
  - Agent A queries the Approved Auditors List attestation by its UID.
  - The SDK verifies:
    - The attestation is valid, not revoked, and not expired (`validUntil`).
    - The `auditorPubkey` matches the `auditor` from the Audited Agent Code List.
  - If valid, proceed to auditor approval verification; otherwise, reject.

### 7. Validate Auditor Approval (Trusted or DAO)
- **Purpose**: Confirm the auditor’s approval was authorized.
- **Schemas**:
  - Trusted Auditor Approval (`address attestor, string auditorPubkey, string approvalReason, uint64 validUntil`).
  - DAO Auditor Approval (`address daoAddress, string auditorPubkey, string approvalReason, uint64 validUntil, string proposalReference`).
- **Steps**:
  - **Trusted (Guardant Period)**:
    - Query the Trusted Auditor Approval attestation.
    - Verify validity, non-revocation, and non-expiration (`validUntil`).
    - Confirm the `attestor` matches the trusted attestor address.
    - Ensure the `auditorPubkey` matches the Approved Auditors List.
    - No resolver contract is used.
  - **DAO (Post-Guardant Period)**:
    - Query the DAO Auditor Approval attestation.
    - Verify validity, non-revocation, and non-expiration (`validUntil`).
    - Confirm the `daoAddress` matches the DAO’s address.
    - Ensure the `auditorPubkey` matches the Approved Auditors List.
    - The `ApprovalResolver` contract ensures the attestation was created by the `daoAddress`.
  - If valid, proceed to proposal validation (DAO only) or off-chain verification (Trusted); otherwise, reject.

### 8. Validate DAO Auditor Proposal (DAO Only, Post-Guardant Period)
- **Purpose**: Confirm the DAO’s auditor approval is backed by a legitimate proposal.
- **Schema**: DAO Auditor Approval (includes `proposalReference`).
- **Steps**:
  - Extract and validate the `proposalReference` as described in Step 4 (IPFS or governance contract).
  - Ensure the proposal’s `pubkey` matches the `auditorPubkey`, `approvalReason` matches, and status is "approved".
  - If valid, proceed; otherwise, reject.

### 9. Off-Chain Verification
- **Purpose**: Validate agent and auditor identities and TEE environment outside the blockchain.
- **Steps**:
  - **Nostr Pubkey Verification**:
    - The SDK queries a Nostr relay to validate Agent B’s `nostrPubkey` (from Autonomous Agent and Approved Agent List) and the auditor’s `auditorPubkey` (from Audited Agent Code List and Approved Auditors List).
    - Confirm the pubkeys are authentic and associated with the expected entities.
  - **TEE Attestation Verification**:
    - The SDK requests the TEE attestation document from the TEE provider (e.g., AWS Nitro Enclave).
    - Compute the document’s hash and compare it to the `teeAttestationHash` from the Autonomous Agent attestation.
  - If both verifications succeed, proceed; otherwise, reject.

### 10. Interaction Decision
- **Purpose**: Decide whether to interact with Agent B.
- **Steps**:
  - If all attestations, proposals (post-guardant period), and off-chain verifications are valid, Agent A initiates interaction with Agent B (e.g., sends a data exchange request via Nostr).
  - Agent B responds, completing the interaction.
  - If any step fails (e.g., attestation is invalid, proposal is invalid, Nostr/TEE verification fails), Agent A rejects the interaction.

## Security Considerations

- **Resolver Enforcement (Post-Guardant Period)**: The `ApprovalResolver` contract ensures only the DAO can create DAO approval attestations, preventing unauthorized approvals.
- **Trusted Security (Guardant Period)**: Verify the `attestor` address matches the known trusted attestor, and secure its private key.
- **Proposal Validation (Post-Guardant Period)**: Validate `proposalReference` using trusted IPFS nodes or verified governance contracts to ensure DAO approvals reflect legitimate decisions.
- **Cross-Schema Consistency**:
  - Match `nostrPubkey` across Autonomous Agent, Approved Agent List, and Trusted/DAO Agent Approval schemas.
  - Match `codeCid` across Autonomous Agent and Audited Agent Code List schemas.
  - Match `auditorPubkey` across Audited Agent Code List, Approved Auditors List, and Trusted/DAO Auditor Approval schemas.
- **Revocation and Expiration**: Check all attestations for revocation and ensure `validUntil` is current.
- **Off-Chain Verification**: Use secure Nostr relays and TEE providers to prevent spoofing or tampering.
- **Trusted Addresses**: Verify `attestor` (guardant period) or `daoAddress` (post-guardant period) against known values.
- **Error Handling**: Handle failures gracefully (e.g., invalid UIDs, network issues, unreachable IPFS content).