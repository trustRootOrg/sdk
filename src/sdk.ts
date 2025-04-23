import { EAS, REGISTRY } from "./contracts/index";
import { IWallet } from "@ijstech/eth-wallet";
import { INetworkConfig, getNetworkConfig } from "./networks";

// Interfaces for type safety
export interface ISchemaConfig {
    schema: string; // Schema definition (e.g., "string message")
    revocable: boolean; // Whether attestations are revocable
    resolverAddress?: string; // Optional resolver contract address
};
interface ISchema {
    uid: string; // Schema UID
    schema: string; // Schema definition (e.g., "string message")
    resolver: string; // Resolver contract address
    revocable: boolean; // Whether attestations are revocable
};
export interface IAttestationData {
    schemaTypes: string[]; // Schema types (e.g., ["string"])
    values: any[]; // Data values matching schema types (e.g., ["Hello, EAS!"])
    recipient?: string; // Recipient address (default: zero address)
    expirationTime?: number; // Expiration timestamp (default: 0)
    revocable?: boolean; // Whether attestation is revocable (default: true)
    refUID?: string; // Referenced attestation UID (default: zero bytes32)
    // value?: number; // ETH value to send (default: 0)
};
export interface IAttestation {
    uid: string;
    schemaUID: string;
    recipient: string;
    attester: string;
    time: Date; // ISO timestamp
    neverExpires: boolean; // true if expirationTime is 0
    expirationTime: Date; // ISO timestamp    
    revocated: boolean; // true if revocationTime is not 0
    revocationTime: Date; // ISO timestamp
    refUID: string;
    revocable: boolean;
    data: any; // Decoded data based on schema
};

export class SDK {
    private wallet: IWallet;
    private network: INetworkConfig;
    private easContract: EAS;
    private schemaRegistryContract: REGISTRY;

    constructor(wallet: IWallet) {
        this.wallet = wallet;
        let network = getNetworkConfig(wallet.chainId)
        // Initialize contracts
        this.easContract = new EAS(wallet, network.easContractAddress);
        this.schemaRegistryContract = new REGISTRY(wallet, network.schemaRegistryAddress);
    };
    // Register a schema
    async registerSchema(config: ISchemaConfig): Promise<{ uid: string, transactionHash: string }> {
        try {
            const { schema, resolverAddress = '0x0000000000000000000000000000000000000000', revocable } = config;
            // Validate inputs
            if (!schema || typeof schema !== 'string') {
                throw new Error('Invalid schema definition');
            };

            // Send transaction
            const receipt = await this.schemaRegistryContract.register({
                schema: schema,
                resolver: resolverAddress,
                revocable: revocable,
            });
            const result = this.schemaRegistryContract.parseRegisteredEvent(receipt);

            const schemaUID = result[0].uid;
            if (!schemaUID) {
                throw new Error('Failed to retrieve schema UID');
            };
            return {
                uid: schemaUID,
                transactionHash: receipt.transactionHash,
            };
        } catch (error) {
            throw new Error(`Failed to register schema: ${error.message}`);
        };
    };
    // Get schema details
    async getSchema(schemaUID: string): Promise<ISchema> {
        try {
            // Validate input
            if (!schemaUID.match(/^0x[a-fA-F0-9]{64}$/)) {
                throw new Error('Invalid schema UID');
            }

            // Fetch schema
            const schemaData = await this.schemaRegistryContract.getSchema(schemaUID);

            // Check if schema exists
            if (
                schemaData.uid === '0x0000000000000000000000000000000000000000000000000000000000000000' &&
                schemaData.schema === ''
            ) {
                throw new Error('Schema does not exist');
            }

            // Construct schema object
            const schemaDetails: ISchema = {
                uid: schemaData.uid,
                schema: schemaData.schema,
                resolver: schemaData.resolver,
                revocable: schemaData.revocable
            };
            return schemaDetails;
        } catch (error) {
            throw new Error(`Failed to retrieve schema: ${error.message}`);
        }
    };
    // Create an attestation
    async createAttestation(schemaUID: string, data: IAttestationData): Promise<{ transactionHash: string, uid: string }> {
        try {
            const {
                schemaTypes,
                values,
                recipient = '0x0000000000000000000000000000000000000000',
                expirationTime = 0,
                revocable = true,
                refUID = '0x0000000000000000000000000000000000000000000000000000000000000000',
            } = data;

            // Validate inputs
            if (!schemaUID.match(/^0x[a-fA-F0-9]{64}$/)) {
                throw new Error('Invalid schema UID');
            };
            if (schemaTypes.length !== values.length) {
                throw new Error('Schema types and data values length mismatch');
            };

            // Encode attestation data
            const encodedData = this.wallet.encodeParameters(schemaTypes, values);

            // Construct attestation request
            const attestationRequest = {
                schema: schemaUID,
                data: {
                    recipient,
                    expirationTime,
                    revocable,
                    refUID,
                    data: encodedData,
                    value: 0, // No ETH sent with attestation
                },
            };

            // Send transaction
            const receipt = await this.easContract.attest(attestationRequest)
            const result = this.easContract.parseAttestedEvent(receipt);

            const attestationUID = result[0].uid;
            if (!attestationUID) {
                throw new Error('Failed to retrieve attestation UID');
            };
            return { transactionHash: receipt.transactionHash, uid: attestationUID };
        } catch (error) {
            throw new Error(`Failed to create attestation: ${error.message}`);
        };
    };
    async getAttestation(attestationUID: string): Promise<IAttestation> {
        try {
            // Validate input
            if (!attestationUID.match(/^0x[a-fA-F0-9]{64}$/)) {
                throw new Error('Invalid attestation UID');
            };

            // Fetch attestation
            const attestation = await this.easContract.getAttestation(attestationUID);

            // Check existence
            if (attestation.schema === '0x0000000000000000000000000000000000000000000000000000000000000000') {
                throw new Error('Attestation does not exist');
            }
            // Decode data
            const decodedData = this.wallet.decodeParameters(['string'], attestation.data);
            const dataValues = Object.values(decodedData).slice(0, 1); // Exclude __length__ property
            const attestationDetails: IAttestation = {
                uid: attestation.uid,
                schemaUID: attestation.schema,
                recipient: attestation.recipient,
                attester: attestation.attester,
                time: new Date(Number(attestation.time) * 1000),
                neverExpires: attestation.expirationTime.toString() === '0',
                expirationTime: new Date(attestation.expirationTime.toNumber() * 1000),
                revocated: attestation.revocationTime.toString() !== '0',
                revocationTime: new Date(attestation.revocationTime.toNumber() * 1000),
                refUID: attestation.refUID,
                revocable: attestation.revocable,
                data: dataValues
            }
            return attestationDetails;
        } catch (error) {
            throw new Error(`Failed to fetch attestation: ${error.message}`);
        }
    };
    // Revoke an attestation
    async revokeAttestation(attestationUID: string, schemaUID: string): Promise<string> {
        try {
            // Validate inputs
            if (!attestationUID.match(/^0x[a-fA-F0-9]{64}$/)) {
                throw new Error('Invalid attestation UID');
            }
            if (!schemaUID.match(/^0x[a-fA-F0-9]{64}$/)) {
                throw new Error('Invalid schema UID');
            }

            // Construct revocation request
            const revocationRequest = {
                schema: schemaUID,
                data: {
                    uid: attestationUID,
                    value: 0
                }
            };

            // Send transaction
            const receipt = await this.easContract.revoke(revocationRequest)
            return receipt.transactionHash;
        } catch (error) {
            throw new Error(`Failed to revoke attestation: ${error.message}`);
        }
    };
    // Validate an attestation
    async validateAttestation(
        attestationUID: string,
        schemaUID: string,
        schemaTypes: string[],
        expectedData: any[]
    ): Promise<boolean> {
        try {
            if (!schemaUID.match(/^0x[a-fA-F0-9]{64}$/)) {
                throw new Error('Invalid schema UID');
            };
            // Fetch attestation
            const attestation = await this.getAttestation(attestationUID);

            // Validate schema
            if (attestation.schemaUID !== schemaUID) {
                throw new Error(`Schema mismatch: expected ${schemaUID}, got ${attestation.schemaUID}`);
            };

            // Check revocation
            if (attestation.revocated) {
                throw new Error('Attestation has been revoked');
            };

            // Check expiration
            if (
                !attestation.neverExpires &&
                Number(attestation.expirationTime.getTime()) < new Date().getTime()
            ) {
                throw new Error('Attestation has expired');
            };

            // Decode and validate data
            const decodedData = this.wallet.decodeParameters(schemaTypes, attestation.data);
            const dataValues = Object.values(decodedData).slice(0, schemaTypes.length); // Exclude __length__ property

            if (dataValues.length !== expectedData.length || !dataValues.every((val, i) => String(val) === String(expectedData[i]))) {
                throw new Error(`Data mismatch: expected ${JSON.stringify(expectedData)}, got ${JSON.stringify(dataValues)}`);
            };

            return true;
        } catch (error) {
            throw new Error(`Failed to validate attestation: ${error.message}`);
        };
    };
};