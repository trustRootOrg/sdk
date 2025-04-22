"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EAS = void 0;
const eth_contract_1 = require("@ijstech/eth-contract");
const EAS_json_1 = __importDefault(require("./EAS.json"));
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
