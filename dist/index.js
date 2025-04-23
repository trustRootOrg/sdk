define("@trustroot/sdk/contracts/EAS.json.ts", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    ///<amd-module name='@trustroot/sdk/contracts/EAS.json.ts'/> 
    exports.default = {
        "abi": [
            { "inputs": [{ "internalType": "contract ISchemaRegistry", "name": "registry", "type": "address" }], "stateMutability": "nonpayable", "type": "constructor" },
            { "inputs": [], "name": "AccessDenied", "type": "error" },
            { "inputs": [], "name": "AlreadyRevoked", "type": "error" },
            { "inputs": [], "name": "AlreadyRevokedOffchain", "type": "error" },
            { "inputs": [], "name": "AlreadyTimestamped", "type": "error" },
            { "inputs": [], "name": "InsufficientValue", "type": "error" },
            { "inputs": [], "name": "InvalidAttestation", "type": "error" },
            { "inputs": [], "name": "InvalidAttestations", "type": "error" },
            { "inputs": [], "name": "InvalidExpirationTime", "type": "error" },
            { "inputs": [], "name": "InvalidLength", "type": "error" },
            { "inputs": [], "name": "InvalidOffset", "type": "error" },
            { "inputs": [], "name": "InvalidRegistry", "type": "error" },
            { "inputs": [], "name": "InvalidRevocation", "type": "error" },
            { "inputs": [], "name": "InvalidRevocations", "type": "error" },
            { "inputs": [], "name": "InvalidSchema", "type": "error" },
            { "inputs": [], "name": "InvalidSignature", "type": "error" },
            { "inputs": [], "name": "InvalidVerifier", "type": "error" },
            { "inputs": [], "name": "Irrevocable", "type": "error" },
            { "inputs": [], "name": "NotFound", "type": "error" },
            { "inputs": [], "name": "NotPayable", "type": "error" },
            { "inputs": [], "name": "WrongSchema", "type": "error" },
            { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "recipient", "type": "address" }, { "indexed": true, "internalType": "address", "name": "attester", "type": "address" }, { "indexed": false, "internalType": "bytes32", "name": "uid", "type": "bytes32" }, { "indexed": true, "internalType": "bytes32", "name": "schema", "type": "bytes32" }], "name": "Attested", "type": "event" },
            { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "recipient", "type": "address" }, { "indexed": true, "internalType": "address", "name": "attester", "type": "address" }, { "indexed": false, "internalType": "bytes32", "name": "uid", "type": "bytes32" }, { "indexed": true, "internalType": "bytes32", "name": "schema", "type": "bytes32" }], "name": "Revoked", "type": "event" },
            { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "revoker", "type": "address" }, { "indexed": true, "internalType": "bytes32", "name": "data", "type": "bytes32" }, { "indexed": true, "internalType": "uint64", "name": "timestamp", "type": "uint64" }], "name": "RevokedOffchain", "type": "event" },
            { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "bytes32", "name": "data", "type": "bytes32" }, { "indexed": true, "internalType": "uint64", "name": "timestamp", "type": "uint64" }], "name": "Timestamped", "type": "event" },
            { "inputs": [], "name": "VERSION", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" },
            { "inputs": [{ "components": [{ "internalType": "bytes32", "name": "schema", "type": "bytes32" }, { "components": [{ "internalType": "address", "name": "recipient", "type": "address" }, { "internalType": "uint64", "name": "expirationTime", "type": "uint64" }, { "internalType": "bool", "name": "revocable", "type": "bool" }, { "internalType": "bytes32", "name": "refUID", "type": "bytes32" }, { "internalType": "bytes", "name": "data", "type": "bytes" }, { "internalType": "uint256", "name": "value", "type": "uint256" }], "internalType": "struct AttestationRequestData", "name": "data", "type": "tuple" }], "internalType": "struct AttestationRequest", "name": "request", "type": "tuple" }], "name": "attest", "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "stateMutability": "payable", "type": "function" },
            { "inputs": [{ "components": [{ "internalType": "bytes32", "name": "schema", "type": "bytes32" }, { "components": [{ "internalType": "address", "name": "recipient", "type": "address" }, { "internalType": "uint64", "name": "expirationTime", "type": "uint64" }, { "internalType": "bool", "name": "revocable", "type": "bool" }, { "internalType": "bytes32", "name": "refUID", "type": "bytes32" }, { "internalType": "bytes", "name": "data", "type": "bytes" }, { "internalType": "uint256", "name": "value", "type": "uint256" }], "internalType": "struct AttestationRequestData", "name": "data", "type": "tuple" }, { "components": [{ "internalType": "uint8", "name": "v", "type": "uint8" }, { "internalType": "bytes32", "name": "r", "type": "bytes32" }, { "internalType": "bytes32", "name": "s", "type": "bytes32" }], "internalType": "struct EIP712Signature", "name": "signature", "type": "tuple" }, { "internalType": "address", "name": "attester", "type": "address" }], "internalType": "struct DelegatedAttestationRequest", "name": "delegatedRequest", "type": "tuple" }], "name": "attestByDelegation", "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "stateMutability": "payable", "type": "function" },
            { "inputs": [], "name": "getAttestTypeHash", "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "stateMutability": "pure", "type": "function" },
            { "inputs": [{ "internalType": "bytes32", "name": "uid", "type": "bytes32" }], "name": "getAttestation", "outputs": [{ "components": [{ "internalType": "bytes32", "name": "uid", "type": "bytes32" }, { "internalType": "bytes32", "name": "schema", "type": "bytes32" }, { "internalType": "uint64", "name": "time", "type": "uint64" }, { "internalType": "uint64", "name": "expirationTime", "type": "uint64" }, { "internalType": "uint64", "name": "revocationTime", "type": "uint64" }, { "internalType": "bytes32", "name": "refUID", "type": "bytes32" }, { "internalType": "address", "name": "recipient", "type": "address" }, { "internalType": "address", "name": "attester", "type": "address" }, { "internalType": "bool", "name": "revocable", "type": "bool" }, { "internalType": "bytes", "name": "data", "type": "bytes" }], "internalType": "struct Attestation", "name": "", "type": "tuple" }], "stateMutability": "view", "type": "function" },
            { "inputs": [], "name": "getDomainSeparator", "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "stateMutability": "view", "type": "function" },
            { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }], "name": "getNonce", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" },
            { "inputs": [{ "internalType": "address", "name": "revoker", "type": "address" }, { "internalType": "bytes32", "name": "data", "type": "bytes32" }], "name": "getRevokeOffchain", "outputs": [{ "internalType": "uint64", "name": "", "type": "uint64" }], "stateMutability": "view", "type": "function" },
            { "inputs": [], "name": "getRevokeTypeHash", "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "stateMutability": "pure", "type": "function" },
            { "inputs": [], "name": "getSchemaRegistry", "outputs": [{ "internalType": "contract ISchemaRegistry", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" },
            { "inputs": [{ "internalType": "bytes32", "name": "data", "type": "bytes32" }], "name": "getTimestamp", "outputs": [{ "internalType": "uint64", "name": "", "type": "uint64" }], "stateMutability": "view", "type": "function" },
            { "inputs": [{ "internalType": "bytes32", "name": "uid", "type": "bytes32" }], "name": "isAttestationValid", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" },
            { "inputs": [{ "components": [{ "internalType": "bytes32", "name": "schema", "type": "bytes32" }, { "components": [{ "internalType": "address", "name": "recipient", "type": "address" }, { "internalType": "uint64", "name": "expirationTime", "type": "uint64" }, { "internalType": "bool", "name": "revocable", "type": "bool" }, { "internalType": "bytes32", "name": "refUID", "type": "bytes32" }, { "internalType": "bytes", "name": "data", "type": "bytes" }, { "internalType": "uint256", "name": "value", "type": "uint256" }], "internalType": "struct AttestationRequestData[]", "name": "data", "type": "tuple[]" }], "internalType": "struct MultiAttestationRequest[]", "name": "multiRequests", "type": "tuple[]" }], "name": "multiAttest", "outputs": [{ "internalType": "bytes32[]", "name": "", "type": "bytes32[]" }], "stateMutability": "payable", "type": "function" },
            { "inputs": [{ "components": [{ "internalType": "bytes32", "name": "schema", "type": "bytes32" }, { "components": [{ "internalType": "address", "name": "recipient", "type": "address" }, { "internalType": "uint64", "name": "expirationTime", "type": "uint64" }, { "internalType": "bool", "name": "revocable", "type": "bool" }, { "internalType": "bytes32", "name": "refUID", "type": "bytes32" }, { "internalType": "bytes", "name": "data", "type": "bytes" }, { "internalType": "uint256", "name": "value", "type": "uint256" }], "internalType": "struct AttestationRequestData[]", "name": "data", "type": "tuple[]" }, { "components": [{ "internalType": "uint8", "name": "v", "type": "uint8" }, { "internalType": "bytes32", "name": "r", "type": "bytes32" }, { "internalType": "bytes32", "name": "s", "type": "bytes32" }], "internalType": "struct EIP712Signature[]", "name": "signatures", "type": "tuple[]" }, { "internalType": "address", "name": "attester", "type": "address" }], "internalType": "struct MultiDelegatedAttestationRequest[]", "name": "multiDelegatedRequests", "type": "tuple[]" }], "name": "multiAttestByDelegation", "outputs": [{ "internalType": "bytes32[]", "name": "", "type": "bytes32[]" }], "stateMutability": "payable", "type": "function" },
            { "inputs": [{ "components": [{ "internalType": "bytes32", "name": "schema", "type": "bytes32" }, { "components": [{ "internalType": "bytes32", "name": "uid", "type": "bytes32" }, { "internalType": "uint256", "name": "value", "type": "uint256" }], "internalType": "struct RevocationRequestData[]", "name": "data", "type": "tuple[]" }], "internalType": "struct MultiRevocationRequest[]", "name": "multiRequests", "type": "tuple[]" }], "name": "multiRevoke", "outputs": [], "stateMutability": "payable", "type": "function" },
            { "inputs": [{ "components": [{ "internalType": "bytes32", "name": "schema", "type": "bytes32" }, { "components": [{ "internalType": "bytes32", "name": "uid", "type": "bytes32" }, { "internalType": "uint256", "name": "value", "type": "uint256" }], "internalType": "struct RevocationRequestData[]", "name": "data", "type": "tuple[]" }, { "components": [{ "internalType": "uint8", "name": "v", "type": "uint8" }, { "internalType": "bytes32", "name": "r", "type": "bytes32" }, { "internalType": "bytes32", "name": "s", "type": "bytes32" }], "internalType": "struct EIP712Signature[]", "name": "signatures", "type": "tuple[]" }, { "internalType": "address", "name": "revoker", "type": "address" }], "internalType": "struct MultiDelegatedRevocationRequest[]", "name": "multiDelegatedRequests", "type": "tuple[]" }], "name": "multiRevokeByDelegation", "outputs": [], "stateMutability": "payable", "type": "function" },
            { "inputs": [{ "internalType": "bytes32[]", "name": "data", "type": "bytes32[]" }], "name": "multiRevokeOffchain", "outputs": [{ "internalType": "uint64", "name": "", "type": "uint64" }], "stateMutability": "nonpayable", "type": "function" },
            { "inputs": [{ "internalType": "bytes32[]", "name": "data", "type": "bytes32[]" }], "name": "multiTimestamp", "outputs": [{ "internalType": "uint64", "name": "", "type": "uint64" }], "stateMutability": "nonpayable", "type": "function" },
            { "inputs": [{ "components": [{ "internalType": "bytes32", "name": "schema", "type": "bytes32" }, { "components": [{ "internalType": "bytes32", "name": "uid", "type": "bytes32" }, { "internalType": "uint256", "name": "value", "type": "uint256" }], "internalType": "struct RevocationRequestData", "name": "data", "type": "tuple" }], "internalType": "struct RevocationRequest", "name": "request", "type": "tuple" }], "name": "revoke", "outputs": [], "stateMutability": "payable", "type": "function" },
            { "inputs": [{ "components": [{ "internalType": "bytes32", "name": "schema", "type": "bytes32" }, { "components": [{ "internalType": "bytes32", "name": "uid", "type": "bytes32" }, { "internalType": "uint256", "name": "value", "type": "uint256" }], "internalType": "struct RevocationRequestData", "name": "data", "type": "tuple" }, { "components": [{ "internalType": "uint8", "name": "v", "type": "uint8" }, { "internalType": "bytes32", "name": "r", "type": "bytes32" }, { "internalType": "bytes32", "name": "s", "type": "bytes32" }], "internalType": "struct EIP712Signature", "name": "signature", "type": "tuple" }, { "internalType": "address", "name": "revoker", "type": "address" }], "internalType": "struct DelegatedRevocationRequest", "name": "delegatedRequest", "type": "tuple" }], "name": "revokeByDelegation", "outputs": [], "stateMutability": "payable", "type": "function" },
            { "inputs": [{ "internalType": "bytes32", "name": "data", "type": "bytes32" }], "name": "revokeOffchain", "outputs": [{ "internalType": "uint64", "name": "", "type": "uint64" }], "stateMutability": "nonpayable", "type": "function" },
            { "inputs": [{ "internalType": "bytes32", "name": "data", "type": "bytes32" }], "name": "timestamp", "outputs": [{ "internalType": "uint64", "name": "", "type": "uint64" }], "stateMutability": "nonpayable", "type": "function" }
        ]
    };
});
define("@trustroot/sdk/contracts/EAS.ts", ["require", "exports", "@ijstech/eth-contract", "@trustroot/sdk/contracts/EAS.json.ts"], function (require, exports, eth_contract_1, EAS_json_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.EAS = void 0;
    class EAS extends eth_contract_1.Contract {
        constructor(wallet, address) {
            super(wallet, address, EAS_json_1.default.abi, undefined);
            this.assign();
        }
        parseAttestedEvent(receipt) {
            return this.parseEvents(receipt, "Attested").map(e => this.decodeAttestedEvent(e));
        }
        decodeAttestedEvent(event) {
            let result = event.data;
            return {
                recipient: result.recipient,
                attester: result.attester,
                uid: result.uid,
                schema: result.schema,
                _event: event
            };
        }
        parseRevokedEvent(receipt) {
            return this.parseEvents(receipt, "Revoked").map(e => this.decodeRevokedEvent(e));
        }
        decodeRevokedEvent(event) {
            let result = event.data;
            return {
                recipient: result.recipient,
                attester: result.attester,
                uid: result.uid,
                schema: result.schema,
                _event: event
            };
        }
        parseRevokedOffchainEvent(receipt) {
            return this.parseEvents(receipt, "RevokedOffchain").map(e => this.decodeRevokedOffchainEvent(e));
        }
        decodeRevokedOffchainEvent(event) {
            let result = event.data;
            return {
                revoker: result.revoker,
                data: result.data,
                timestamp: new eth_contract_1.BigNumber(result.timestamp),
                _event: event
            };
        }
        parseTimestampedEvent(receipt) {
            return this.parseEvents(receipt, "Timestamped").map(e => this.decodeTimestampedEvent(e));
        }
        decodeTimestampedEvent(event) {
            let result = event.data;
            return {
                data: result.data,
                timestamp: new eth_contract_1.BigNumber(result.timestamp),
                _event: event
            };
        }
        assign() {
            let VERSION_call = async (options) => {
                let result = await this.call('VERSION', [], options);
                return result;
            };
            this.VERSION = VERSION_call;
            let getAttestTypeHash_call = async (options) => {
                let result = await this.call('getAttestTypeHash', [], options);
                return result;
            };
            this.getAttestTypeHash = getAttestTypeHash_call;
            let getAttestation_call = async (uid, options) => {
                let result = await this.call('getAttestation', [this.wallet.utils.stringToBytes32(uid)], options);
                return ({
                    uid: result.uid,
                    schema: result.schema,
                    time: new eth_contract_1.BigNumber(result.time),
                    expirationTime: new eth_contract_1.BigNumber(result.expirationTime),
                    revocationTime: new eth_contract_1.BigNumber(result.revocationTime),
                    refUID: result.refUID,
                    recipient: result.recipient,
                    attester: result.attester,
                    revocable: result.revocable,
                    data: result.data
                });
            };
            this.getAttestation = getAttestation_call;
            let getDomainSeparator_call = async (options) => {
                let result = await this.call('getDomainSeparator', [], options);
                return result;
            };
            this.getDomainSeparator = getDomainSeparator_call;
            let getNonce_call = async (account, options) => {
                let result = await this.call('getNonce', [account], options);
                return new eth_contract_1.BigNumber(result);
            };
            this.getNonce = getNonce_call;
            let getRevokeOffchainParams = (params) => [params.revoker, this.wallet.utils.stringToBytes32(params.data)];
            let getRevokeOffchain_call = async (params, options) => {
                let result = await this.call('getRevokeOffchain', getRevokeOffchainParams(params), options);
                return new eth_contract_1.BigNumber(result);
            };
            this.getRevokeOffchain = getRevokeOffchain_call;
            let getRevokeTypeHash_call = async (options) => {
                let result = await this.call('getRevokeTypeHash', [], options);
                return result;
            };
            this.getRevokeTypeHash = getRevokeTypeHash_call;
            let getSchemaRegistry_call = async (options) => {
                let result = await this.call('getSchemaRegistry', [], options);
                return result;
            };
            this.getSchemaRegistry = getSchemaRegistry_call;
            let getTimestamp_call = async (data, options) => {
                let result = await this.call('getTimestamp', [this.wallet.utils.stringToBytes32(data)], options);
                return new eth_contract_1.BigNumber(result);
            };
            this.getTimestamp = getTimestamp_call;
            let isAttestationValid_call = async (uid, options) => {
                let result = await this.call('isAttestationValid', [this.wallet.utils.stringToBytes32(uid)], options);
                return result;
            };
            this.isAttestationValid = isAttestationValid_call;
            let attest_send = async (request, options) => {
                let result = await this.send('attest', [[this.wallet.utils.stringToBytes32(request.schema), [request.data.recipient, this.wallet.utils.toString(request.data.expirationTime), request.data.revocable, this.wallet.utils.stringToBytes32(request.data.refUID), this.wallet.utils.stringToBytes(request.data.data), this.wallet.utils.toString(request.data.value)]]], options);
                return result;
            };
            let attest_call = async (request, options) => {
                let result = await this.call('attest', [[this.wallet.utils.stringToBytes32(request.schema), [request.data.recipient, this.wallet.utils.toString(request.data.expirationTime), request.data.revocable, this.wallet.utils.stringToBytes32(request.data.refUID), this.wallet.utils.stringToBytes(request.data.data), this.wallet.utils.toString(request.data.value)]]], options);
                return result;
            };
            this.attest = Object.assign(attest_send, {
                call: attest_call
            });
            let attestByDelegation_send = async (delegatedRequest, options) => {
                let result = await this.send('attestByDelegation', [[this.wallet.utils.stringToBytes32(delegatedRequest.schema), [delegatedRequest.data.recipient, this.wallet.utils.toString(delegatedRequest.data.expirationTime), delegatedRequest.data.revocable, this.wallet.utils.stringToBytes32(delegatedRequest.data.refUID), this.wallet.utils.stringToBytes(delegatedRequest.data.data), this.wallet.utils.toString(delegatedRequest.data.value)], [this.wallet.utils.toString(delegatedRequest.signature.v), this.wallet.utils.stringToBytes32(delegatedRequest.signature.r), this.wallet.utils.stringToBytes32(delegatedRequest.signature.s)], delegatedRequest.attester]], options);
                return result;
            };
            let attestByDelegation_call = async (delegatedRequest, options) => {
                let result = await this.call('attestByDelegation', [[this.wallet.utils.stringToBytes32(delegatedRequest.schema), [delegatedRequest.data.recipient, this.wallet.utils.toString(delegatedRequest.data.expirationTime), delegatedRequest.data.revocable, this.wallet.utils.stringToBytes32(delegatedRequest.data.refUID), this.wallet.utils.stringToBytes(delegatedRequest.data.data), this.wallet.utils.toString(delegatedRequest.data.value)], [this.wallet.utils.toString(delegatedRequest.signature.v), this.wallet.utils.stringToBytes32(delegatedRequest.signature.r), this.wallet.utils.stringToBytes32(delegatedRequest.signature.s)], delegatedRequest.attester]], options);
                return result;
            };
            this.attestByDelegation = Object.assign(attestByDelegation_send, {
                call: attestByDelegation_call
            });
            let multiAttest_send = async (multiRequests, options) => {
                let result = await this.send('multiAttest', [multiRequests.map(e => ([this.wallet.utils.stringToBytes32(e.schema), e.data.map(e => ([e.recipient, this.wallet.utils.toString(e.expirationTime), e.revocable, this.wallet.utils.stringToBytes32(e.refUID), this.wallet.utils.stringToBytes(e.data), this.wallet.utils.toString(e.value)]))]))], options);
                return result;
            };
            let multiAttest_call = async (multiRequests, options) => {
                let result = await this.call('multiAttest', [multiRequests.map(e => ([this.wallet.utils.stringToBytes32(e.schema), e.data.map(e => ([e.recipient, this.wallet.utils.toString(e.expirationTime), e.revocable, this.wallet.utils.stringToBytes32(e.refUID), this.wallet.utils.stringToBytes(e.data), this.wallet.utils.toString(e.value)]))]))], options);
                return result;
            };
            this.multiAttest = Object.assign(multiAttest_send, {
                call: multiAttest_call
            });
            let multiAttestByDelegation_send = async (multiDelegatedRequests, options) => {
                let result = await this.send('multiAttestByDelegation', [multiDelegatedRequests.map(e => ([this.wallet.utils.stringToBytes32(e.schema), e.data.map(e => ([e.recipient, this.wallet.utils.toString(e.expirationTime), e.revocable, this.wallet.utils.stringToBytes32(e.refUID), this.wallet.utils.stringToBytes(e.data), this.wallet.utils.toString(e.value)])), e.signatures.map(e => ([this.wallet.utils.toString(e.v), this.wallet.utils.stringToBytes32(e.r), this.wallet.utils.stringToBytes32(e.s)])), e.attester]))], options);
                return result;
            };
            let multiAttestByDelegation_call = async (multiDelegatedRequests, options) => {
                let result = await this.call('multiAttestByDelegation', [multiDelegatedRequests.map(e => ([this.wallet.utils.stringToBytes32(e.schema), e.data.map(e => ([e.recipient, this.wallet.utils.toString(e.expirationTime), e.revocable, this.wallet.utils.stringToBytes32(e.refUID), this.wallet.utils.stringToBytes(e.data), this.wallet.utils.toString(e.value)])), e.signatures.map(e => ([this.wallet.utils.toString(e.v), this.wallet.utils.stringToBytes32(e.r), this.wallet.utils.stringToBytes32(e.s)])), e.attester]))], options);
                return result;
            };
            this.multiAttestByDelegation = Object.assign(multiAttestByDelegation_send, {
                call: multiAttestByDelegation_call
            });
            let multiRevoke_send = async (multiRequests, options) => {
                let result = await this.send('multiRevoke', [multiRequests.map(e => ([this.wallet.utils.stringToBytes32(e.schema), e.data.map(e => ([this.wallet.utils.stringToBytes32(e.uid), this.wallet.utils.toString(e.value)]))]))], options);
                return result;
            };
            let multiRevoke_call = async (multiRequests, options) => {
                let result = await this.call('multiRevoke', [multiRequests.map(e => ([this.wallet.utils.stringToBytes32(e.schema), e.data.map(e => ([this.wallet.utils.stringToBytes32(e.uid), this.wallet.utils.toString(e.value)]))]))], options);
                return;
            };
            this.multiRevoke = Object.assign(multiRevoke_send, {
                call: multiRevoke_call
            });
            let multiRevokeByDelegation_send = async (multiDelegatedRequests, options) => {
                let result = await this.send('multiRevokeByDelegation', [multiDelegatedRequests.map(e => ([this.wallet.utils.stringToBytes32(e.schema), e.data.map(e => ([this.wallet.utils.stringToBytes32(e.uid), this.wallet.utils.toString(e.value)])), e.signatures.map(e => ([this.wallet.utils.toString(e.v), this.wallet.utils.stringToBytes32(e.r), this.wallet.utils.stringToBytes32(e.s)])), e.revoker]))], options);
                return result;
            };
            let multiRevokeByDelegation_call = async (multiDelegatedRequests, options) => {
                let result = await this.call('multiRevokeByDelegation', [multiDelegatedRequests.map(e => ([this.wallet.utils.stringToBytes32(e.schema), e.data.map(e => ([this.wallet.utils.stringToBytes32(e.uid), this.wallet.utils.toString(e.value)])), e.signatures.map(e => ([this.wallet.utils.toString(e.v), this.wallet.utils.stringToBytes32(e.r), this.wallet.utils.stringToBytes32(e.s)])), e.revoker]))], options);
                return;
            };
            this.multiRevokeByDelegation = Object.assign(multiRevokeByDelegation_send, {
                call: multiRevokeByDelegation_call
            });
            let multiRevokeOffchain_send = async (data, options) => {
                let result = await this.send('multiRevokeOffchain', [this.wallet.utils.stringToBytes32(data)], options);
                return result;
            };
            let multiRevokeOffchain_call = async (data, options) => {
                let result = await this.call('multiRevokeOffchain', [this.wallet.utils.stringToBytes32(data)], options);
                return new eth_contract_1.BigNumber(result);
            };
            this.multiRevokeOffchain = Object.assign(multiRevokeOffchain_send, {
                call: multiRevokeOffchain_call
            });
            let multiTimestamp_send = async (data, options) => {
                let result = await this.send('multiTimestamp', [this.wallet.utils.stringToBytes32(data)], options);
                return result;
            };
            let multiTimestamp_call = async (data, options) => {
                let result = await this.call('multiTimestamp', [this.wallet.utils.stringToBytes32(data)], options);
                return new eth_contract_1.BigNumber(result);
            };
            this.multiTimestamp = Object.assign(multiTimestamp_send, {
                call: multiTimestamp_call
            });
            let revoke_send = async (request, options) => {
                let result = await this.send('revoke', [[this.wallet.utils.stringToBytes32(request.schema), [this.wallet.utils.stringToBytes32(request.data.uid), this.wallet.utils.toString(request.data.value)]]], options);
                return result;
            };
            let revoke_call = async (request, options) => {
                let result = await this.call('revoke', [[this.wallet.utils.stringToBytes32(request.schema), [this.wallet.utils.stringToBytes32(request.data.uid), this.wallet.utils.toString(request.data.value)]]], options);
                return;
            };
            this.revoke = Object.assign(revoke_send, {
                call: revoke_call
            });
            let revokeByDelegation_send = async (delegatedRequest, options) => {
                let result = await this.send('revokeByDelegation', [[this.wallet.utils.stringToBytes32(delegatedRequest.schema), [this.wallet.utils.stringToBytes32(delegatedRequest.data.uid), this.wallet.utils.toString(delegatedRequest.data.value)], [this.wallet.utils.toString(delegatedRequest.signature.v), this.wallet.utils.stringToBytes32(delegatedRequest.signature.r), this.wallet.utils.stringToBytes32(delegatedRequest.signature.s)], delegatedRequest.revoker]], options);
                return result;
            };
            let revokeByDelegation_call = async (delegatedRequest, options) => {
                let result = await this.call('revokeByDelegation', [[this.wallet.utils.stringToBytes32(delegatedRequest.schema), [this.wallet.utils.stringToBytes32(delegatedRequest.data.uid), this.wallet.utils.toString(delegatedRequest.data.value)], [this.wallet.utils.toString(delegatedRequest.signature.v), this.wallet.utils.stringToBytes32(delegatedRequest.signature.r), this.wallet.utils.stringToBytes32(delegatedRequest.signature.s)], delegatedRequest.revoker]], options);
                return;
            };
            this.revokeByDelegation = Object.assign(revokeByDelegation_send, {
                call: revokeByDelegation_call
            });
            let revokeOffchain_send = async (data, options) => {
                let result = await this.send('revokeOffchain', [this.wallet.utils.stringToBytes32(data)], options);
                return result;
            };
            let revokeOffchain_call = async (data, options) => {
                let result = await this.call('revokeOffchain', [this.wallet.utils.stringToBytes32(data)], options);
                return new eth_contract_1.BigNumber(result);
            };
            this.revokeOffchain = Object.assign(revokeOffchain_send, {
                call: revokeOffchain_call
            });
            let timestamp_send = async (data, options) => {
                let result = await this.send('timestamp', [this.wallet.utils.stringToBytes32(data)], options);
                return result;
            };
            let timestamp_call = async (data, options) => {
                let result = await this.call('timestamp', [this.wallet.utils.stringToBytes32(data)], options);
                return new eth_contract_1.BigNumber(result);
            };
            this.timestamp = Object.assign(timestamp_send, {
                call: timestamp_call
            });
        }
    }
    EAS._abi = EAS_json_1.default.abi;
    exports.EAS = EAS;
});
define("@trustroot/sdk/contracts/REGISTRY.json.ts", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    ///<amd-module name='@trustroot/sdk/contracts/REGISTRY.json.ts'/> 
    exports.default = {
        "abi": [
            { "inputs": [], "name": "AlreadyExists", "type": "error" },
            { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "bytes32", "name": "uid", "type": "bytes32" }, { "indexed": false, "internalType": "address", "name": "registerer", "type": "address" }], "name": "Registered", "type": "event" },
            { "inputs": [], "name": "VERSION", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" },
            { "inputs": [{ "internalType": "bytes32", "name": "uid", "type": "bytes32" }], "name": "getSchema", "outputs": [{ "components": [{ "internalType": "bytes32", "name": "uid", "type": "bytes32" }, { "internalType": "contract ISchemaResolver", "name": "resolver", "type": "address" }, { "internalType": "bool", "name": "revocable", "type": "bool" }, { "internalType": "string", "name": "schema", "type": "string" }], "internalType": "struct SchemaRecord", "name": "", "type": "tuple" }], "stateMutability": "view", "type": "function" },
            { "inputs": [{ "internalType": "string", "name": "schema", "type": "string" }, { "internalType": "contract ISchemaResolver", "name": "resolver", "type": "address" }, { "internalType": "bool", "name": "revocable", "type": "bool" }], "name": "register", "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "stateMutability": "nonpayable", "type": "function" }
        ]
    };
});
define("@trustroot/sdk/contracts/REGISTRY.ts", ["require", "exports", "@ijstech/eth-contract", "@trustroot/sdk/contracts/REGISTRY.json.ts"], function (require, exports, eth_contract_2, REGISTRY_json_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.REGISTRY = void 0;
    class REGISTRY extends eth_contract_2.Contract {
        constructor(wallet, address) {
            super(wallet, address, REGISTRY_json_1.default.abi, undefined);
            this.assign();
        }
        parseRegisteredEvent(receipt) {
            return this.parseEvents(receipt, "Registered").map(e => this.decodeRegisteredEvent(e));
        }
        decodeRegisteredEvent(event) {
            let result = event.data;
            return {
                uid: result.uid,
                registerer: result.registerer,
                _event: event
            };
        }
        assign() {
            let VERSION_call = async (options) => {
                let result = await this.call('VERSION', [], options);
                return result;
            };
            this.VERSION = VERSION_call;
            let getSchema_call = async (uid, options) => {
                let result = await this.call('getSchema', [this.wallet.utils.stringToBytes32(uid)], options);
                return ({
                    uid: result.uid,
                    resolver: result.resolver,
                    revocable: result.revocable,
                    schema: result.schema
                });
            };
            this.getSchema = getSchema_call;
            let registerParams = (params) => [params.schema, params.resolver, params.revocable];
            let register_send = async (params, options) => {
                let result = await this.send('register', registerParams(params), options);
                return result;
            };
            let register_call = async (params, options) => {
                let result = await this.call('register', registerParams(params), options);
                return result;
            };
            this.register = Object.assign(register_send, {
                call: register_call
            });
        }
    }
    REGISTRY._abi = REGISTRY_json_1.default.abi;
    exports.REGISTRY = REGISTRY;
});
define("@trustroot/sdk/contracts/index.ts", ["require", "exports", "@trustroot/sdk/contracts/EAS.ts", "@trustroot/sdk/contracts/REGISTRY.ts"], function (require, exports, EAS_1, REGISTRY_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.REGISTRY = exports.EAS = void 0;
    Object.defineProperty(exports, "EAS", { enumerable: true, get: function () { return EAS_1.EAS; } });
    Object.defineProperty(exports, "REGISTRY", { enumerable: true, get: function () { return REGISTRY_1.REGISTRY; } });
});
define("@trustroot/sdk/networks.ts", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getNetworkConfig = exports.EASNetworks = void 0;
    exports.EASNetworks = {
        1: {
            name: 'Ethereum Mainnet',
            chainId: 1,
            easContractAddress: '0xA1207F3BBa224E2c9c3c6D5aF63D0eb1582Ce587',
            schemaRegistryAddress: '0xA7b39296258348C78294F95B872b282326A97BDF',
            isTestnet: false,
        },
        11155111: {
            name: 'Sepolia Testnet',
            chainId: 11155111,
            easContractAddress: '0xC2679fBD37d54388Ce493F1DB75320D236e1815e',
            schemaRegistryAddress: '0x0a7E2Ff54e76B8E6659aedc9103FB21c038050D0',
            isTestnet: true,
        },
        10: {
            name: 'Optimism',
            chainId: 10,
            easContractAddress: '0x4200000000000000000000000000000000000021',
            schemaRegistryAddress: '0x4200000000000000000000000000000000000020',
            isTestnet: false,
        },
        42161: {
            name: 'Arbitrum One',
            chainId: 42161,
            easContractAddress: '0xbD75f629A22Dc1ceD33dDA0b68c546A1c035c458',
            schemaRegistryAddress: '0xA310da9c5B885E7fb3fbA9D66E9Ba6Df512bC55F',
            isTestnet: false,
        },
        8453: {
            name: 'Base',
            chainId: 8453,
            easContractAddress: '0x4200000000000000000000000000000000000021',
            schemaRegistryAddress: '0x4200000000000000000000000000000000000020',
            isTestnet: false,
        }
    };
    const getNetworkConfig = (chainId) => {
        const config = exports.EASNetworks[chainId];
        if (!config) {
            throw new Error(`Unsupported network: ${chainId}`);
        }
        return config;
    };
    exports.getNetworkConfig = getNetworkConfig;
});
define("@trustroot/sdk/sdk.ts", ["require", "exports", "@trustroot/sdk/contracts/index.ts", "@trustroot/sdk/networks.ts"], function (require, exports, index_1, networks_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SDK = void 0;
    ;
    ;
    ;
    ;
    class SDK {
        constructor(wallet) {
            this.wallet = wallet;
            let network = (0, networks_1.getNetworkConfig)(wallet.chainId);
            // Initialize contracts
            this.easContract = new index_1.EAS(wallet, network.easContractAddress);
            this.schemaRegistryContract = new index_1.REGISTRY(wallet, network.schemaRegistryAddress);
        }
        ;
        // Register a schema
        async registerSchema(config) {
            try {
                const { schema, resolverAddress = '0x0000000000000000000000000000000000000000', revocable } = config;
                // Validate inputs
                if (!schema || typeof schema !== 'string') {
                    throw new Error('Invalid schema definition');
                }
                ;
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
        // Get schema details
        async getSchema(schemaUID) {
            try {
                // Validate input
                if (!schemaUID.match(/^0x[a-fA-F0-9]{64}$/)) {
                    throw new Error('Invalid schema UID');
                }
                // Fetch schema
                const schemaData = await this.schemaRegistryContract.getSchema(schemaUID);
                // Check if schema exists
                if (schemaData.uid === '0x0000000000000000000000000000000000000000000000000000000000000000' &&
                    schemaData.schema === '') {
                    throw new Error('Schema does not exist');
                }
                // Construct schema object
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
        // Create an attestation
        async createAttestation(schemaUID, data) {
            try {
                const { schemaTypes, values, recipient = '0x0000000000000000000000000000000000000000', expirationTime = 0, revocable = true, refUID = '0x0000000000000000000000000000000000000000000000000000000000000000', } = data;
                // Validate inputs
                if (!schemaUID.match(/^0x[a-fA-F0-9]{64}$/)) {
                    throw new Error('Invalid schema UID');
                }
                ;
                if (schemaTypes.length !== values.length) {
                    throw new Error('Schema types and data values length mismatch');
                }
                ;
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
                // Validate input
                if (!attestationUID.match(/^0x[a-fA-F0-9]{64}$/)) {
                    throw new Error('Invalid attestation UID');
                }
                ;
                // Fetch attestation
                const attestation = await this.easContract.getAttestation(attestationUID);
                // Check existence
                if (attestation.schema === '0x0000000000000000000000000000000000000000000000000000000000000000') {
                    throw new Error('Attestation does not exist');
                }
                // Decode data
                const decodedData = this.wallet.decodeParameters(['string'], attestation.data);
                const dataValues = Object.values(decodedData).slice(0, 1); // Exclude __length__ property
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
        // Revoke an attestation
        async revokeAttestation(attestationUID, schemaUID) {
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
                const receipt = await this.easContract.revoke(revocationRequest);
                return receipt.transactionHash;
            }
            catch (error) {
                throw new Error(`Failed to revoke attestation: ${error.message}`);
            }
        }
        ;
        // Validate an attestation
        async validateAttestation(attestationUID, schemaUID, schemaTypes, expectedData) {
            try {
                if (!schemaUID.match(/^0x[a-fA-F0-9]{64}$/)) {
                    throw new Error('Invalid schema UID');
                }
                ;
                // Fetch attestation
                const attestation = await this.getAttestation(attestationUID);
                // Validate schema
                if (attestation.schemaUID !== schemaUID) {
                    throw new Error(`Schema mismatch: expected ${schemaUID}, got ${attestation.schemaUID}`);
                }
                ;
                // Check revocation
                if (attestation.revocated) {
                    throw new Error('Attestation has been revoked');
                }
                ;
                // Check expiration
                if (!attestation.neverExpires &&
                    Number(attestation.expirationTime.getTime()) < new Date().getTime()) {
                    throw new Error('Attestation has expired');
                }
                ;
                // Decode and validate data
                const decodedData = this.wallet.decodeParameters(schemaTypes, attestation.data);
                const dataValues = Object.values(decodedData).slice(0, schemaTypes.length); // Exclude __length__ property
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
});
define("@trustroot/sdk", ["require", "exports", "@trustroot/sdk/contracts/index.ts", "@trustroot/sdk/sdk.ts", "@trustroot/sdk/networks.ts"], function (require, exports, Contracts, sdk_1, networks_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getNetworkConfig = exports.EASNetworks = exports.SDK = exports.Contracts = void 0;
    exports.Contracts = Contracts;
    Object.defineProperty(exports, "SDK", { enumerable: true, get: function () { return sdk_1.SDK; } });
    ;
    Object.defineProperty(exports, "EASNetworks", { enumerable: true, get: function () { return networks_2.EASNetworks; } });
    Object.defineProperty(exports, "getNetworkConfig", { enumerable: true, get: function () { return networks_2.getNetworkConfig; } });
    exports.default = {
        Contracts,
        SDK: sdk_1.SDK
    };
});
