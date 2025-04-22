# @trustroot/sdk

A TypeScript SDK for interacting with the Ethereum Attestation Service (EAS). This SDK supports registering schemas, creating attestations, and validating attestations across multiple EAS-supported networks (e.g., Ethereum Mainnet, Sepolia, Optimism, Arbitrum, Base).

## Features
- **Schema Registration**: Register custom schemas with the EAS SchemaRegistry.
- **Attestation Creation**: Create onchain attestations with flexible schema support.
- **Attestation Validation**: Verify attestation existence, schema, revocation, and data.
- **Attestation Revocation**: Revoke existing attestations (if marked revocable).
- **Multi-Network Support**: Operate on Ethereum Mainnet, Sepolia (testnet), Optimism, Arbitrum, Base, Linea, and Scroll.
- **Type-Safe**: Built with TypeScript for robust development.

## Installation

1. **Clone the Repository**:
   Clone the repository to your local machine:
   ```bash
   git clone https://github.com/trustRootOrg/sdk.git
   cd trustRoot-sdk
   ```

2. **Install Dependencies**:
   Install the required dependencies using npm:
   ```bash
   npm install

## Build

To build the SDK, run the following command:
```bash
npm run build
```

## Run Tests

Execute the unit tests using the following command:
```bash
npm run test
```
## Quick Start
```typescript
import { SDK } from '@trustroot/sdk';
import { Wallet } from '@ijstech/eth-wallet';
import * as dotenv from 'dotenv';

dotenv.config();

const wallet = new Wallet(process.env.RPC_URL!, { privateKey: process.env.PRIVATE_KEY! });
const sdk = new SDK(wallet);
```

## Documentation
Detailed documentation is available in the docs/ directory:
- [Getting Started](./docs/getting-started.md): Installation and basic usage.
- [API Reference](./docs/api-reference.md): SDK methods and interfaces.
- [Schemas](./docs/schemas.md): Details about schema registration and usage.
- [Attestation Flow](./docs/attestation-flow.md): Overview of the attestation process.
- [Sequence Diagram](./docs/sequence-diagram.md): Visual representation of the attestation flow.

## Supported Networks
- Ethereum Mainnet (Chain ID: 1)
- Sepolia Testnet (Chain ID: 11155111)
- Optimism (Chain ID: 10)
- Arbitrum One (Chain ID: 42161)
- Base (Chain ID: 8453)

See [networks.ts](./src/networks.ts) for contract addresses and details.


## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.