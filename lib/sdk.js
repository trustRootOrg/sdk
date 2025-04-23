"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SDK = void 0;
const index_1 = require("./contracts/index");
const networks_1 = require("./networks");
;
;
;
;
class SDK {
    constructor(wallet) {
        this.wallet = wallet;
        let network = (0, networks_1.getNetworkConfig)(wallet.chainId);
        this.easContract = new index_1.EAS(wallet, network.easContractAddress);
        this.schemaRegistryContract = new index_1.REGISTRY(wallet, network.schemaRegistryAddress);
    }
    ;
    async registerSchema(config) {
        try {
            const { schema, resolverAddress = '0x0000000000000000000000000000000000000000', revocable } = config;
            if (!schema || typeof schema !== 'string') {
                throw new Error('Invalid schema definition');
            }
            ;
            const receipt = await this.schemaRegistryContract.register({
                schema: schema,
                resolver: resolverAddress,
                revocable: revocable,
            });
            const result = this.schemaRegistryContract.parseRegisteredEvent(receipt);
            const schemaUID = result[0].uid;
            if (!schemaUID) {
                throw new Error('Failed to retrieve schema UID');
            }
            ;
            return {
                uid: schemaUID,
                transactionHash: receipt.transactionHash,
            };
        }
        catch (error) {
            throw new Error(`Failed to register schema: ${error.message}`);
        }
        ;
    }
    ;
    async getSchema(schemaUID) {
        try {
            if (!schemaUID.match(/^0x[a-fA-F0-9]{64}$/)) {
                throw new Error('Invalid schema UID');
            }
            const schemaData = await this.schemaRegistryContract.getSchema(schemaUID);
            if (schemaData.uid === '0x0000000000000000000000000000000000000000000000000000000000000000' &&
                schemaData.schema === '') {
                throw new Error('Schema does not exist');
            }
            const schemaDetails = {
                uid: schemaData.uid,
                schema: schemaData.schema,
                resolver: schemaData.resolver,
                revocable: schemaData.revocable
            };
            return schemaDetails;
        }
        catch (error) {
            throw new Error(`Failed to retrieve schema: ${error.message}`);
        }
    }
    ;
    async createAttestation(schemaUID, data) {
        try {
            const { schemaTypes, values, recipient = '0x0000000000000000000000000000000000000000', expirationTime = 0, revocable = true, refUID = '0x0000000000000000000000000000000000000000000000000000000000000000', } = data;
            if (!schemaUID.match(/^0x[a-fA-F0-9]{64}$/)) {
                throw new Error('Invalid schema UID');
            }
            ;
            if (schemaTypes.length !== values.length) {
                throw new Error('Schema types and data values length mismatch');
            }
            ;
            const encodedData = this.wallet.encodeParameters(schemaTypes, values);
            const attestationRequest = {
                schema: schemaUID,
                data: {
                    recipient,
                    expirationTime,
                    revocable,
                    refUID,
                    data: encodedData,
                    value: 0,
                },
            };
            const receipt = await this.easContract.attest(attestationRequest);
            const result = this.easContract.parseAttestedEvent(receipt);
            const attestationUID = result[0].uid;
            if (!attestationUID) {
                throw new Error('Failed to retrieve attestation UID');
            }
            ;
            return { transactionHash: receipt.transactionHash, uid: attestationUID };
        }
        catch (error) {
            throw new Error(`Failed to create attestation: ${error.message}`);
        }
        ;
    }
    ;
    async getAttestation(attestationUID) {
        try {
            if (!attestationUID.match(/^0x[a-fA-F0-9]{64}$/)) {
                throw new Error('Invalid attestation UID');
            }
            ;
            const attestation = await this.easContract.getAttestation(attestationUID);
            if (attestation.schema === '0x0000000000000000000000000000000000000000000000000000000000000000') {
                throw new Error('Attestation does not exist');
            }
            const decodedData = this.wallet.decodeParameters(['string'], attestation.data);
            const dataValues = Object.values(decodedData).slice(0, 1);
            const attestationDetails = {
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
            };
            return attestationDetails;
        }
        catch (error) {
            throw new Error(`Failed to fetch attestation: ${error.message}`);
        }
    }
    ;
    async revokeAttestation(attestationUID, schemaUID) {
        try {
            if (!attestationUID.match(/^0x[a-fA-F0-9]{64}$/)) {
                throw new Error('Invalid attestation UID');
            }
            if (!schemaUID.match(/^0x[a-fA-F0-9]{64}$/)) {
                throw new Error('Invalid schema UID');
            }
            const revocationRequest = {
                schema: schemaUID,
                data: {
                    uid: attestationUID,
                    value: 0
                }
            };
            const receipt = await this.easContract.revoke(revocationRequest);
            return receipt.transactionHash;
        }
        catch (error) {
            throw new Error(`Failed to revoke attestation: ${error.message}`);
        }
    }
    ;
    async validateAttestation(attestationUID, schemaUID, schemaTypes, expectedData) {
        try {
            if (!schemaUID.match(/^0x[a-fA-F0-9]{64}$/)) {
                throw new Error('Invalid schema UID');
            }
            ;
            const attestation = await this.getAttestation(attestationUID);
            if (attestation.schemaUID !== schemaUID) {
                throw new Error(`Schema mismatch: expected ${schemaUID}, got ${attestation.schemaUID}`);
            }
            ;
            if (attestation.revocated) {
                throw new Error('Attestation has been revoked');
            }
            ;
            if (!attestation.neverExpires &&
                Number(attestation.expirationTime.getTime()) < new Date().getTime()) {
                throw new Error('Attestation has expired');
            }
            ;
            const decodedData = this.wallet.decodeParameters(schemaTypes, attestation.data);
            const dataValues = Object.values(decodedData).slice(0, schemaTypes.length);
            if (dataValues.length !== expectedData.length || !dataValues.every((val, i) => String(val) === String(expectedData[i]))) {
                throw new Error(`Data mismatch: expected ${JSON.stringify(expectedData)}, got ${JSON.stringify(dataValues)}`);
            }
            ;
            return true;
        }
        catch (error) {
            throw new Error(`Failed to validate attestation: ${error.message}`);
        }
        ;
    }
    ;
}
exports.SDK = SDK;
;
