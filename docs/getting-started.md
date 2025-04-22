# Getting Started with EAS SDK

This guide covers the installation, setup, and basic usage of the TrustRoot SDK for interacting with the Ethereum Attestation Service (EAS).

## Installation

```bash
  npm install @trustroot/sdk
```

## Setup

All examples assume the SDK is initialized with a wallet and environment variables for the provider and private key.

```typescript
import { SDK } from '@trustroot/sdk';
import { Wallet } from '@ijstech/eth-wallet';
import * as dotenv from 'dotenv';

dotenv.config();

const wallet = new Wallet(process.env.RPC_URL, { privateKey: process.env.PRIVATE_KEY });
const sdk = new SDK(wallet);
```

## Registering a Schema
Registers a schema for a string message, with no resolver and revocable attestations.

```typescript
async function registerSchema() {
  try {
    const schema = `string message`; 
    const resolverAddress = '0x0000000000000000000000000000000000000000'; // No resolver
    const revocable = true;

    const result = await sdk.registerSchema({
      schema,
      resolverAddress,
      revocable
    });

    console.log('✅ Schema registered successfully!');
    console.log('Schema UID:', result.uid);
    console.log('Transaction Hash:', result.transactionHash);
  } catch (error) {
    console.error('❌ Error registering schema:', error.message);
  }
}
```

## Fetching a Schema
Retrieves a schema’s details by its UID.
```typescript
async function getSchema() {
  try {
    const schemaUID = '0xYourSchemaUID'; // Replace with actual UID
    const result = await sdk.getSchema(schemaUID);

    console.log('✅ Schema fetched successfully!');
    console.log('Schema:', result);
  } catch (error) {
    console.error('❌ Error fetching schema:', error.message);
  }
}
```

## Creating an Attestation
Creates an attestation for a string message, with no recipient, no expiration, and revocable.
```typescript
async function createAttestation() {
  try {
    const schemaUID = '0xYourSchemaUID'; // Replace with actual UID
    const RECIPIENT_ADDRESS = '0x0000000000000000000000000000000000000000'; // Public attestation
    const EXPIRATION_TIME = 0; // No expiration
    const REVOCABLE = true;
    const REF_UID = '0x0000000000000000000000000000000000000000000000000000000000000000'; // No reference
    const message = 'Hello, EAS!';

    const attestationRequest = {
      schemaTypes: ['string'],
      recipient: RECIPIENT_ADDRESS,
      expirationTime: EXPIRATION_TIME,
      revocable: REVOCABLE,
      refUID: REF_UID,
      values: [message],
    };

    const result = await sdk.createAttestation(schemaUID, attestationRequest);

    console.log('✅ Attestation created successfully!');
    console.log('Attestation UID:', result.uid);
    console.log('Transaction Hash:', result.transactionHash);
  } catch (error) {
    console.error('❌ Error creating attestation:', error.message);
  }
}
```

## Fetching an Attestation
Retrieves an attestation’s details by its UID.
```typescript
async function validateAttestation() {
  try {
    const attestationUID = '0xYourAttestationUID'; // Replace with actual UID
    const schemaUID = '0xYourSchemaUID'; // Replace with actual UID
    const message = 'Hello, EAS!';

    const result = await sdk.validateAttestation(attestationUID, schemaUID, ['string'], [message]);

    console.log('✅ Attestation validated successfully!');
    console.log('Validation Result:', result);
  } catch (error) {
    console.error('❌ Error validating attestation:', error.message);
  }
}
```

## Revoking an Attestation
Revokes an attestation and verifies that it’s no longer valid.
```typescript
async function revokeAttestation() {
  try {
    const attestationUID = '0xYourAttestationUID'; // Replace with actual UID
    const schemaUID = '0xYourSchemaUID'; // Replace with actual UID

    const result = await sdk.revokeAttestation(attestationUID, schemaUID);

    console.log('✅ Attestation revoked successfully!');
    console.log('Transaction Hash:', result);

    // Verify revocation
    try {
      await sdk.validateAttestation(attestationUID, schemaUID, ['string'], ['Hello, EAS!']);
      console.error('❌ Validation should have failed');
    } catch (error) {
      console.log('✅ Validation failed as expected:', error.message);
    }
  } catch (error) {
    console.error('❌ Error revoking attestation:', error.message);
  }
}
```
