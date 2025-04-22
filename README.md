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

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.