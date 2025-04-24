# API Reference

## Interfaces

### ISchemaConfig
Configuration for registering a schema.

- `schema`: `string` - Schema definition (e.g., "string message").
- `revocable`: `boolean` - Whether attestations are revocable.
- `resolverAddress?`: `string` - Optional resolver contract address (default: zero address).

### ISchema
Schema details.

- `uid`: `string` - Schema UID.
- `schema`: `string` - Schema definition (e.g., "string message").
- `resolver`: `string` - Resolver contract address.
- `revocable`: `boolean` - Whether attestations are revocable.

### IAttestationData
Data for creating an attestation.

- `schemaTypes`: `string[]` - Schema types (e.g., ["string"]).
- `values`: `any[]` - Data values matching schema types (e.g., ["Hello, EAS!"]).
- `recipient?`: `string` - Recipient address (default: zero address).
- `expirationTime?`: `number` - Expiration timestamp (default: 0).
- `revocable?`: `boolean` - Whether attestation is revocable (default: true).
- `refUID?`: `string` - Referenced attestation UID (default: zero bytes32).

### IAttestation
Attestation details.

- `uid`: `string` - Attestation UID.
- `schemaUID`: `string` - Schema UID.
- `recipient`: `string` - Recipient address.
- `attester`: `string` - Attester address.
- `time`: `Date` - ISO timestamp of attestation creation.
- `neverExpires`: `boolean` - True if expirationTime is 0.
- `expirationTime`: `Date` - ISO timestamp of expiration.
- `revocated`: `boolean` - True if revocationTime is not 0.
- `revocationTime`: `Date` - ISO timestamp of revocation.
- `refUID`: `string` - Referenced attestation UID.
- `revocable`: `boolean` - Whether attestation is revocable.
- `data`: `any` - Decoded data based on schema.

## Class: SDK

### Constructor
Initializes the SDK with a wallet and network configuration.

- `constructor(wallet: Wallet)`
  - `wallet`: `Wallet` - Wallet instance for signing transactions.

### Methods

#### registerSchema
Registers a new schema.

- `async registerSchema(config: ISchemaConfig): Promise<{ uid: string, transactionHash: string }>`
  - `config`: `ISchemaConfig` - Schema configuration.
  - Returns: Object containing `uid` (schema UID) and `transactionHash`.
  - Throws: Error if schema is invalid or registration fails.
```typescript
const schemaConfig: ISchemaConfig = {
    schema: "string message",
    revocable: true
};
const result = await sdk.registerSchema(schemaConfig);
console.log(result.uid, result.transactionHash);
```

#### getSchema
Retrieves schema details.

- `async getSchema(schemaUID: string): Promise<ISchema>`
  - `schemaUID`: `string` - Schema UID (must be a valid 32-byte hex string).
  - Returns: `ISchema` object with schema details.
  - Throws: Error if schema UID is invalid or schema does not exist.
```typescript
const schema = await sdk.getSchema("0x1234...5678");
console.log(schema.uid, schema.schema, schema.revocable);
```

#### createAttestation
Creates a new attestation.

- `async createAttestation(schemaUID: string, data: IAttestationData): Promise<{ transactionHash: string, uid: string }>`
  - `schemaUID`: `string` - Schema UID (must be a valid 32-byte hex string).
  - `data`: `IAttestationData` - Attestation data.
  - Returns: Object containing `transactionHash` and `uid` (attestation UID).
  - Throws: Error if inputs are invalid or attestation creation fails.
```typescript
const attestationData: IAttestationData = {
    schemaTypes: ["string"],
    values: ["Hello, EAS!"],
    recipient: "0xRecipientAddress",
    expirationTime: 0,
    revocable: true
};
const result = await sdk.createAttestation("0x1234...5678", attestationData);
console.log(result.uid, result.transactionHash);
```

#### getAttestation
Retrieves attestation details.

- `async getAttestation(attestationUID: string): Promise<IAttestation>`
  - `attestationUID`: `string` - Attestation UID (must be a valid 32-byte hex string).
  - Returns: `IAttestation` object with attestation details.
  - Throws: Error if attestation UID is invalid or attestation does not exist.
```typescript
const attestation = await sdk.getAttestation("0x1234...5678");
console.log(attestation.uid, attestation.recipient, attestation.data);
```

#### revokeAttestation
Revokes an existing attestation.

- `async revokeAttestation(attestationUID: string, schemaUID: string): Promise<string>`
  - `attestationUID`: `string` - Attestation UID (must be a valid 32-byte hex string).
  - `schemaUID`: `string` - Schema UID (must be a valid 32-byte hex string).
  - Returns: Transaction hash of the revocation.
  - Throws: Error if inputs are invalid or revocation fails.
```typescript
const txHash = await sdk.revokeAttestation("0x1234...5678", "0x9012...3456");
console.log(txHash);
```

#### validateAttestation
Validates an attestation against expected schema and data.

- `async validateAttestation(attestationUID: string, schemaUID: string, schemaTypes: string[], expectedData: any[]): Promise<boolean>`
  - `attestationUID`: `string` - Attestation UID (must be a valid 32-byte hex string).
  - `schemaUID`: `string` - Schema UID (must be a valid 32-byte hex string).
  - `schemaTypes`: `string[]` - Expected schema types.
  - `expectedData`: `any[]` - Expected data values.
  - Returns: `true` if attestation is valid.
  - Throws: Error if attestation is invalid, revoked, expired, or data mismatches.
```typescript
const isValid = await sdk.validateAttestation(
    "0x1234...5678",
    "0x9012...3456",
    ["string"],
    ["Hello, EAS!"]
);
console.log(isValid);
```
