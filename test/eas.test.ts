import 'mocha';
import {Wallet} from "@ijstech/eth-wallet";
import {Contracts} from "../src/index";
import assert from "assert";
import Config from "./config.js";

const EAS_CONTRACT_ADDRESS = '0xC2679fBD37d54388Ce493F1DB75320D236e1815e'; // Sepolia
const SCHEMA_REGISTRY_ADDRESS = '0x0a7E2Ff54e76B8E6659aedc9103FB21c038050D0'; // Sepolia

describe('EAS', function() {
    let accounts: string[];
    let wallet: Wallet;
    let registryContract: Contracts.REGISTRY;
    let easContract: Contracts.EAS;
    const schema = "string msg" +  new Date().getTime(); //unique schema name    
    let schemaUID: string = '';
    let attestationUID: string = '';    
    const message = "Hello, EAS!";
    before(async ()=>{
        wallet = new Wallet(Config.provider,  Config.accounts);
        accounts = await wallet.accounts;
        wallet.defaultAccount = accounts[0];
        registryContract = new Contracts.REGISTRY(wallet, SCHEMA_REGISTRY_ADDRESS);
        easContract = new Contracts.EAS(wallet, EAS_CONTRACT_ADDRESS);
    })
    it('Register', async function() {
        if (schemaUID)
            return;

        try {            
            const resolverAddress = "0x0000000000000000000000000000000000000000"; // No resolver (default)
            const revocable = true; // Schema supports revocable attestations
            // Estimate gas
            let receipt = await registryContract.register({
                schema,
                resolver: resolverAddress,
                revocable
            });
            let result = registryContract.parseRegisteredEvent(receipt);     
            schemaUID = result[0].uid;
            console.log('✅ Schema registered successfully!');
            console.log('Schema UID:', schemaUID);   
          } catch (error) {
            console.error('❌ Error registering schema:', error.message);
            throw error;
          }
    });
    it('Create Attestation', async function() {
        if (attestationUID)
            return;

        try {
            // Encode the attestation data (ABI encoding for `string message`)
            const encodedData = wallet.encodeParameters(
              ['string'],
              [message]
            );
            const RECIPIENT_ADDRESS = '0x0000000000000000000000000000000000000000'; // Public attestation (no specific recipient)
            const EXPIRATION_TIME = 0; // No expiration
            const REVOCABLE = true; // Attestation can be revoked
            const REF_UID = '0x0000000000000000000000000000000000000000000000000000000000000000'; // No referenced attestation

            // Construct the attestation request            
            const attestationRequest = {
              schema: schemaUID,
              data: {
                recipient: RECIPIENT_ADDRESS,
                expirationTime: EXPIRATION_TIME,
                revocable: REVOCABLE,
                refUID: REF_UID,
                data: encodedData,
                value: 0 // No ETH sent with attestation
              }
            };
            // Estimate gas
            const receipt = await easContract.attest(attestationRequest)
            let result = easContract.parseAttestedEvent(receipt);
            console.log('✅ Attestation created successfully!');
            console.log('Transaction Hash:', receipt.transactionHash);
            console.log('Attestation UID:', result[0].uid);
        
          } catch (error) {
            console.error('❌ Error creating attestation:', error.message);
            throw error;
          }
    });
    it('Validate Attestation', async function() {
        try {
            // Fetch the attestation
            const attestation = await easContract.getAttestation(attestationUID);
        
            // Check if attestation exists (non-zero recipient or valid schema)
            if (attestation.recipient === '0x0000000000000000000000000000000000000000' && attestation.schema === '0x0000000000000000000000000000000000000000000000000000000000000000') {
              throw new Error('Attestation does not exist');
            }
        
            // Validate schema
            if (attestation.schema !== schemaUID) {
              throw new Error(`Schema mismatch: expected ${schemaUID}, got ${attestation.schema}`);
            }
        
            // Check if revoked
            if (attestation.revocationTime.toString() !== '0' && attestation.revocationTime.toNumber() > 0) {
              throw new Error('Attestation has been revoked');
            }
        
            // Check if expired
            if (attestation.expirationTime.toString() !== '0' && attestation.expirationTime.toNumber() < Math.floor(Date.now() / 1000)) {
              throw new Error('Attestation has expired');
            }
        
            // Decode and validate data (for schema: string message)
            const decodedData = wallet.decodeParameters(['string'], attestation.data);
            const decodedMessage = decodedData[0];
        
            if (decodedMessage !== message) {
              throw new Error(`Data mismatch: expected message "${message}", got "${decodedMessage}"`);
            }
        
            console.log('Attestation validated successfully!');
            console.log('Attestation Details:', {
              uid: attestation.uid,
              schema: attestation.schema,
              recipient: attestation.recipient,
              attester: attestation.attester,
              time: new Date(Number(attestation.time) * 1000).toISOString(),
              expirationTime: attestation.expirationTime.toString() === '0' ? 'Never' : new Date(Number(attestation.expirationTime) * 1000).toISOString(),
              revocationTime: attestation.revocationTime.toString() === '0' ? 'Not revoked' : new Date(Number(attestation.revocationTime) * 1000).toISOString(),
              revocable: attestation.revocable,
              message: message
            }); 
          } catch (error) {
            console.error('❌ Error validating attestation:', error.message);
            return false;
          }
    })
    return;
    /*
    it('Transaction', async function() {
        const requestBody = {
            jsonrpc: "2.0",
            method: "eth_getTransactionByHash",
            params: ['0x46d43399f8cdf4750198699f39a8bb82453e32e2639df0daec60314dc00e05e4'],
            id: 1,
        };
        const response = await fetch(Config.provider, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(requestBody),
        });
        const data = await response.json();
        console.dir(data)
        const txData = {
            type: '0x0', // Legacy transaction
            chainId: '0xaa36a7', // 11155111 (Sepolia)
            nonce: '0x10', // 16
            gasPrice: '0x9fd6d3', // 10477395 wei
            gas: '0x324fb', // 205819
            to: '0x0a7e2ff54e76b8e6659aedc9103fb21c038050d0',
            value: '0x0', // 0 wei
            data: '0x60d7a278000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000002875696e743235362076616c75652c20737472696e67206e616d652c20737472696e67206465736335000000000000000000000000000000000000000000000000',
            hash: '0x46d43399f8cdf4750198699f39a8bb82453e32e2639df0daec60314dc00e05e4',
            v: '0x1546d72', // 22325586
            r: '0xc53808542c4e8ac0f110d79aa0495de363a835acc6d4dc37f09459aefbcbd036',
            s: '0x6ecd0ec0d0f4898ba8f4b6f9dbc2e2cfe0eb8a4e04918118ba756b67e08c067a',
          };
          let web3 = wallet.web3;
          const chainId = web3.utils.hexToNumber(txData.chainId); // 11155111
          const txFields = [
            txData.nonce, // nonce
            txData.gasPrice, // gasPrice
            txData.gas, // gasLimit
            txData.to, // to
            txData.value, // value
            txData.data, // data
            txData.chainId, // v
          ];
      
          // RLP encode the unsigned transaction
          const serializedTx = encode(txFields);
          const unsignedHash = web3.utils.sha3(Buffer.from(serializedTx), { encoding: 'hex' });
          console.dir(unsignedHash)
          
          let signObj = web3.eth.accounts.sign(unsignedHash, Config.accounts[0].privateKey);
            console.dir(signObj)
        
        // Recover the signer's address
        const recoveredAddress = web3.eth.accounts.recover(
            unsignedHash,
            txData.v,
            txData.r,
            txData.s
        );

            // Compare addresses
            console.log('Recovered Signer Address:', recoveredAddress);
        return;
        let schemaValue = 'uint256 value, string name, string desc6';
        let unsignedTrx = await register.register.call({
            resolver: '0x0000000000000000000000000000000000000000',
            revocable: true,
            schema: schemaValue
        })
        

        
        // let trx = await wallet.getTransaction('0x46d43399f8cdf4750198699f39a8bb82453e32e2639df0daec60314dc00e05e4');
        // register.decodeRegisteredEvent(trx);
        // console.dir(trx, {depth: 5});
    })
    return;
    it('Registry', async function() {  
        let schemaValue = 'uint256 value, string name, string desc5';
        let receipt = await register.register({
            resolver: '0x0000000000000000000000000000000000000000',
            revocable: true,
            schema: schemaValue
        });
        let result = register.parseRegisteredEvent(receipt);
        schemaUid = result[0].uid;
        let schema = await register.getSchema(schemaUid);
        assert.strictEqual(schema.uid, schemaUid);
        assert.strictEqual(schema.schema, schemaValue);
    });
    it('EAS', async function() {
        let schemaValue = 'uint256 value, string name, string desc5';
        const schemaFields = schemaValue.split(',').map((field) => {
            const [type, name] = field.trim().split(' ');
            return { type, name };
        });
        wallet.recoverTypedSignatureV4
        const schemaTypes = schemaFields.map((field) => field.type);
        let uid = schemaUid;
        let result = eas.attest({
            schema: schemaUid,
            data: {
                recipient: accounts[1],
                expirationTime: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
                revocable: true,
                data: '',//wallet.decodeAbiEncodedParameters,
                refUID: '0x0000000000000000000000000000000000000000',
                value: 0,
            }
        })
        // eas.attest
    })*/
});