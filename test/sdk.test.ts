import 'mocha';
import { Wallet } from "@ijstech/eth-wallet";
import { SDK, getNetworkConfig, IAttestationData } from "../src/index";
import assert from "assert";
import Config from "./config.js";

describe('SDK', function () {
    let accounts: string[];
    let wallet: Wallet;
    let sdk: SDK;
    //unique schema name
    const schema = "string msg" +  new Date().getTime();   
    const message = "Hello, EAS!";
    let schemaUID: string = '';
    let attestationUID: string = '';

    before(async () => {
        wallet = new Wallet(Config.provider, Config.accounts);
        await wallet.getChainId();
        accounts = await wallet.accounts;
        wallet.defaultAccount = accounts[0];
        sdk = new SDK(wallet);        
    })
    it('Register', async function () {
        try {
            const resolverAddress = "0x0000000000000000000000000000000000000000"; // No resolver (default)
            const revocable = true; // Schema supports revocable attestations
            // Estimate gas
            let result = await sdk.registerSchema({
                schema,
                resolverAddress,
                revocable
            });
            schemaUID = result.uid;
            console.log('✅ Schema registered successfully!');
            console.log('Schema UID:', schemaUID);
            console.log('Transaction Hash:', result.transactionHash);
        } catch (error) {
            console.error('❌ Error registering schema:', error.message);
            throw error;
        }
    });
    it('Get Schema', async function () {
        try {
            // Fetch the schema
            const result = await sdk.getSchema(schemaUID);
            console.log('✅ Schema fetched successfully!');
            console.log('Schema:', result);
            assert.strictEqual(result.schema, schema, 'Schema name does not match');
        } catch (error) {
            console.error('❌ Error fetching schema:', error.message);
            throw error;
        }
    });
    it('Create Attestation', async function () {
        try {
            const RECIPIENT_ADDRESS = '0x0000000000000000000000000000000000000000'; // Public attestation (no specific recipient)
            const EXPIRATION_TIME = 0; // No expiration
            const REVOCABLE = true; // Attestation can be revoked
            const REF_UID = '0x0000000000000000000000000000000000000000000000000000000000000000'; // No referenced attestation

            // Construct the attestation request            
            const attestationRequest: IAttestationData = {
                schemaTypes: ['string'],
                recipient: RECIPIENT_ADDRESS,
                expirationTime: EXPIRATION_TIME,
                revocable: REVOCABLE,
                refUID: REF_UID,
                values: [message],
            };
            // Estimate gas
            const result = await sdk.createAttestation(schemaUID, attestationRequest)
            attestationUID = result.uid;
            console.log('✅ Attestation created successfully!');
            console.log('Transaction Hash:', result.transactionHash);
            console.log('Attestation UID:', result.uid);

        } catch (error) {
            console.error('❌ Error creating attestation:', error.message);
            throw error;
        }
    });
    it('Get Attestation', async function () {
        try {
            // Fetch the attestation
            const result = await sdk.getAttestation(attestationUID);
            console.log('✅ Attestation fetched successfully!');
            console.log('Attestation:', result);
            assert.strictEqual(result.uid, attestationUID, 'Attestation UID does not match');
            assert.strictEqual(result.schemaUID, schemaUID, 'Schema UID does not match');
            assert.strictEqual(result.data[0], message, 'Attestation value does not match');
        }
        catch (error) {
            console.error('❌ Error fetching attestation:', error.message);
            throw error;
        }
    });
    it('Validate Attestation', async function () {
        try {
            // Fetch the attestation
            const result = await sdk.validateAttestation(attestationUID, schemaUID, ['string'], [message]);
        } catch (error) {
            console.error('❌ Error validating attestation:', error.message);
            return false;
        }
    });
    it('Revoke Attestation', async function () {
        try {
            // Revoke the attestation
            const result = await sdk.revokeAttestation(attestationUID, schemaUID);
            console.log('✅ Attestation revoked successfully!');
            console.log('Transaction Hash:', result);
        }
        catch (error) {
            console.error('❌ Error revoking attestation:', error.message);
            throw error;
        }
        // Verify revocation
        try {
            await sdk.validateAttestation(attestationUID, schemaUID, ['string'], [message]);
        } catch (error) {
            console.log('✅ Validation failed as expected:', error.message); // Should fail due to revocation
        }
    });    
});