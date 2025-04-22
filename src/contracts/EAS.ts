import {IWallet, Contract as _Contract, Transaction, TransactionReceipt, BigNumber, Event, IBatchRequestObj, TransactionOptions} from "@ijstech/eth-contract";
import Bin from "./EAS.json";
export interface IGetRevokeOffchainParams {revoker:string;data:string}
export class EAS extends _Contract{
    static _abi: any = Bin.abi;
    constructor(wallet: IWallet, address?: string){
        super(wallet, address, Bin.abi, undefined);
        this.assign()
    }
    parseAttestedEvent(receipt: TransactionReceipt): EAS.AttestedEvent[]{
        return this.parseEvents(receipt, "Attested").map(e=>this.decodeAttestedEvent(e));
    }
    decodeAttestedEvent(event: Event): EAS.AttestedEvent{
        let result = event.data;
        return {
            recipient: result.recipient,
            attester: result.attester,
            uid: result.uid,
            schema: result.schema,
            _event: event
        };
    }
    parseRevokedEvent(receipt: TransactionReceipt): EAS.RevokedEvent[]{
        return this.parseEvents(receipt, "Revoked").map(e=>this.decodeRevokedEvent(e));
    }
    decodeRevokedEvent(event: Event): EAS.RevokedEvent{
        let result = event.data;
        return {
            recipient: result.recipient,
            attester: result.attester,
            uid: result.uid,
            schema: result.schema,
            _event: event
        };
    }
    parseRevokedOffchainEvent(receipt: TransactionReceipt): EAS.RevokedOffchainEvent[]{
        return this.parseEvents(receipt, "RevokedOffchain").map(e=>this.decodeRevokedOffchainEvent(e));
    }
    decodeRevokedOffchainEvent(event: Event): EAS.RevokedOffchainEvent{
        let result = event.data;
        return {
            revoker: result.revoker,
            data: result.data,
            timestamp: new BigNumber(result.timestamp),
            _event: event
        };
    }
    parseTimestampedEvent(receipt: TransactionReceipt): EAS.TimestampedEvent[]{
        return this.parseEvents(receipt, "Timestamped").map(e=>this.decodeTimestampedEvent(e));
    }
    decodeTimestampedEvent(event: Event): EAS.TimestampedEvent{
        let result = event.data;
        return {
            data: result.data,
            timestamp: new BigNumber(result.timestamp),
            _event: event
        };
    }
    VERSION: {
        (options?: TransactionOptions): Promise<string>;
    }
    attest: {
        (request:{schema:string,data:{recipient:string,expirationTime:number|BigNumber,revocable:boolean,refUID:string,data:string,value:number|BigNumber}}, options?: number|BigNumber|TransactionOptions): Promise<TransactionReceipt>;
        call: (request:{schema:string,data:{recipient:string,expirationTime:number|BigNumber,revocable:boolean,refUID:string,data:string,value:number|BigNumber}}, options?: number|BigNumber|TransactionOptions) => Promise<string>;
    }
    attestByDelegation: {
        (delegatedRequest:{schema:string,data:{recipient:string,expirationTime:number|BigNumber,revocable:boolean,refUID:string,data:string,value:number|BigNumber},signature:{v:number|BigNumber,r:string,s:string},attester:string}, options?: number|BigNumber|TransactionOptions): Promise<TransactionReceipt>;
        call: (delegatedRequest:{schema:string,data:{recipient:string,expirationTime:number|BigNumber,revocable:boolean,refUID:string,data:string,value:number|BigNumber},signature:{v:number|BigNumber,r:string,s:string},attester:string}, options?: number|BigNumber|TransactionOptions) => Promise<string>;
    }
    getAttestTypeHash: {
        (options?: TransactionOptions): Promise<string>;
    }
    getAttestation: {
        (uid:string, options?: TransactionOptions): Promise<{uid:string,schema:string,time:BigNumber,expirationTime:BigNumber,revocationTime:BigNumber,refUID:string,recipient:string,attester:string,revocable:boolean,data:string}>;
    }
    getDomainSeparator: {
        (options?: TransactionOptions): Promise<string>;
    }
    getNonce: {
        (account:string, options?: TransactionOptions): Promise<BigNumber>;
    }
    getRevokeOffchain: {
        (params: IGetRevokeOffchainParams, options?: TransactionOptions): Promise<BigNumber>;
    }
    getRevokeTypeHash: {
        (options?: TransactionOptions): Promise<string>;
    }
    getSchemaRegistry: {
        (options?: TransactionOptions): Promise<string>;
    }
    getTimestamp: {
        (data:string, options?: TransactionOptions): Promise<BigNumber>;
    }
    isAttestationValid: {
        (uid:string, options?: TransactionOptions): Promise<boolean>;
    }
    multiAttest: {
        (multiRequests:{schema:string,data:{recipient:string,expirationTime:number|BigNumber,revocable:boolean,refUID:string,data:string,value:number|BigNumber}[]}[], options?: number|BigNumber|TransactionOptions): Promise<TransactionReceipt>;
        call: (multiRequests:{schema:string,data:{recipient:string,expirationTime:number|BigNumber,revocable:boolean,refUID:string,data:string,value:number|BigNumber}[]}[], options?: number|BigNumber|TransactionOptions) => Promise<string[]>;
    }
    multiAttestByDelegation: {
        (multiDelegatedRequests:{schema:string,data:{recipient:string,expirationTime:number|BigNumber,revocable:boolean,refUID:string,data:string,value:number|BigNumber}[],signatures:{v:number|BigNumber,r:string,s:string}[],attester:string}[], options?: number|BigNumber|TransactionOptions): Promise<TransactionReceipt>;
        call: (multiDelegatedRequests:{schema:string,data:{recipient:string,expirationTime:number|BigNumber,revocable:boolean,refUID:string,data:string,value:number|BigNumber}[],signatures:{v:number|BigNumber,r:string,s:string}[],attester:string}[], options?: number|BigNumber|TransactionOptions) => Promise<string[]>;
    }
    multiRevoke: {
        (multiRequests:{schema:string,data:{uid:string,value:number|BigNumber}[]}[], options?: number|BigNumber|TransactionOptions): Promise<TransactionReceipt>;
        call: (multiRequests:{schema:string,data:{uid:string,value:number|BigNumber}[]}[], options?: number|BigNumber|TransactionOptions) => Promise<void>;
    }
    multiRevokeByDelegation: {
        (multiDelegatedRequests:{schema:string,data:{uid:string,value:number|BigNumber}[],signatures:{v:number|BigNumber,r:string,s:string}[],revoker:string}[], options?: number|BigNumber|TransactionOptions): Promise<TransactionReceipt>;
        call: (multiDelegatedRequests:{schema:string,data:{uid:string,value:number|BigNumber}[],signatures:{v:number|BigNumber,r:string,s:string}[],revoker:string}[], options?: number|BigNumber|TransactionOptions) => Promise<void>;
    }
    multiRevokeOffchain: {
        (data:string[], options?: TransactionOptions): Promise<TransactionReceipt>;
        call: (data:string[], options?: TransactionOptions) => Promise<BigNumber>;
    }
    multiTimestamp: {
        (data:string[], options?: TransactionOptions): Promise<TransactionReceipt>;
        call: (data:string[], options?: TransactionOptions) => Promise<BigNumber>;
    }
    revoke: {
        (request:{schema:string,data:{uid:string,value:number|BigNumber}}, options?: number|BigNumber|TransactionOptions): Promise<TransactionReceipt>;
        call: (request:{schema:string,data:{uid:string,value:number|BigNumber}}, options?: number|BigNumber|TransactionOptions) => Promise<void>;
    }
    revokeByDelegation: {
        (delegatedRequest:{schema:string,data:{uid:string,value:number|BigNumber},signature:{v:number|BigNumber,r:string,s:string},revoker:string}, options?: number|BigNumber|TransactionOptions): Promise<TransactionReceipt>;
        call: (delegatedRequest:{schema:string,data:{uid:string,value:number|BigNumber},signature:{v:number|BigNumber,r:string,s:string},revoker:string}, options?: number|BigNumber|TransactionOptions) => Promise<void>;
    }
    revokeOffchain: {
        (data:string, options?: TransactionOptions): Promise<TransactionReceipt>;
        call: (data:string, options?: TransactionOptions) => Promise<BigNumber>;
    }
    timestamp: {
        (data:string, options?: TransactionOptions): Promise<TransactionReceipt>;
        call: (data:string, options?: TransactionOptions) => Promise<BigNumber>;
    }
    private assign(){
        let VERSION_call = async (options?: TransactionOptions): Promise<string> => {
            let result = await this.call('VERSION',[],options);
            return result;
        }
        this.VERSION = VERSION_call
        let getAttestTypeHash_call = async (options?: TransactionOptions): Promise<string> => {
            let result = await this.call('getAttestTypeHash',[],options);
            return result;
        }
        this.getAttestTypeHash = getAttestTypeHash_call
        let getAttestation_call = async (uid:string, options?: TransactionOptions): Promise<{uid:string,schema:string,time:BigNumber,expirationTime:BigNumber,revocationTime:BigNumber,refUID:string,recipient:string,attester:string,revocable:boolean,data:string}> => {
            let result = await this.call('getAttestation',[this.wallet.utils.stringToBytes32(uid)],options);
            return (
            {
                uid: result.uid,
                schema: result.schema,
                time: new BigNumber(result.time),
                expirationTime: new BigNumber(result.expirationTime),
                revocationTime: new BigNumber(result.revocationTime),
                refUID: result.refUID,
                recipient: result.recipient,
                attester: result.attester,
                revocable: result.revocable,
                data: result.data
            }
            );
        }
        this.getAttestation = getAttestation_call
        let getDomainSeparator_call = async (options?: TransactionOptions): Promise<string> => {
            let result = await this.call('getDomainSeparator',[],options);
            return result;
        }
        this.getDomainSeparator = getDomainSeparator_call
        let getNonce_call = async (account:string, options?: TransactionOptions): Promise<BigNumber> => {
            let result = await this.call('getNonce',[account],options);
            return new BigNumber(result);
        }
        this.getNonce = getNonce_call
        let getRevokeOffchainParams = (params: IGetRevokeOffchainParams) => [params.revoker,this.wallet.utils.stringToBytes32(params.data)];
        let getRevokeOffchain_call = async (params: IGetRevokeOffchainParams, options?: TransactionOptions): Promise<BigNumber> => {
            let result = await this.call('getRevokeOffchain',getRevokeOffchainParams(params),options);
            return new BigNumber(result);
        }
        this.getRevokeOffchain = getRevokeOffchain_call
        let getRevokeTypeHash_call = async (options?: TransactionOptions): Promise<string> => {
            let result = await this.call('getRevokeTypeHash',[],options);
            return result;
        }
        this.getRevokeTypeHash = getRevokeTypeHash_call
        let getSchemaRegistry_call = async (options?: TransactionOptions): Promise<string> => {
            let result = await this.call('getSchemaRegistry',[],options);
            return result;
        }
        this.getSchemaRegistry = getSchemaRegistry_call
        let getTimestamp_call = async (data:string, options?: TransactionOptions): Promise<BigNumber> => {
            let result = await this.call('getTimestamp',[this.wallet.utils.stringToBytes32(data)],options);
            return new BigNumber(result);
        }
        this.getTimestamp = getTimestamp_call
        let isAttestationValid_call = async (uid:string, options?: TransactionOptions): Promise<boolean> => {
            let result = await this.call('isAttestationValid',[this.wallet.utils.stringToBytes32(uid)],options);
            return result;
        }
        this.isAttestationValid = isAttestationValid_call
        let attest_send = async (request:{schema:string,data:{recipient:string,expirationTime:number|BigNumber,revocable:boolean,refUID:string,data:string,value:number|BigNumber}}, options?: number|BigNumber|TransactionOptions): Promise<TransactionReceipt> => {
            let result = await this.send('attest',[[this.wallet.utils.stringToBytes32(request.schema),[request.data.recipient,this.wallet.utils.toString(request.data.expirationTime),request.data.revocable,this.wallet.utils.stringToBytes32(request.data.refUID),this.wallet.utils.stringToBytes(request.data.data),this.wallet.utils.toString(request.data.value)]]],options);
            return result;
        }
        let attest_call = async (request:{schema:string,data:{recipient:string,expirationTime:number|BigNumber,revocable:boolean,refUID:string,data:string,value:number|BigNumber}}, options?: number|BigNumber|TransactionOptions): Promise<string> => {
            let result = await this.call('attest',[[this.wallet.utils.stringToBytes32(request.schema),[request.data.recipient,this.wallet.utils.toString(request.data.expirationTime),request.data.revocable,this.wallet.utils.stringToBytes32(request.data.refUID),this.wallet.utils.stringToBytes(request.data.data),this.wallet.utils.toString(request.data.value)]]],options);
            return result;
        }
        this.attest = Object.assign(attest_send, {
            call:attest_call
        });
        let attestByDelegation_send = async (delegatedRequest:{schema:string,data:{recipient:string,expirationTime:number|BigNumber,revocable:boolean,refUID:string,data:string,value:number|BigNumber},signature:{v:number|BigNumber,r:string,s:string},attester:string}, options?: number|BigNumber|TransactionOptions): Promise<TransactionReceipt> => {
            let result = await this.send('attestByDelegation',[[this.wallet.utils.stringToBytes32(delegatedRequest.schema),[delegatedRequest.data.recipient,this.wallet.utils.toString(delegatedRequest.data.expirationTime),delegatedRequest.data.revocable,this.wallet.utils.stringToBytes32(delegatedRequest.data.refUID),this.wallet.utils.stringToBytes(delegatedRequest.data.data),this.wallet.utils.toString(delegatedRequest.data.value)],[this.wallet.utils.toString(delegatedRequest.signature.v),this.wallet.utils.stringToBytes32(delegatedRequest.signature.r),this.wallet.utils.stringToBytes32(delegatedRequest.signature.s)],delegatedRequest.attester]],options);
            return result;
        }
        let attestByDelegation_call = async (delegatedRequest:{schema:string,data:{recipient:string,expirationTime:number|BigNumber,revocable:boolean,refUID:string,data:string,value:number|BigNumber},signature:{v:number|BigNumber,r:string,s:string},attester:string}, options?: number|BigNumber|TransactionOptions): Promise<string> => {
            let result = await this.call('attestByDelegation',[[this.wallet.utils.stringToBytes32(delegatedRequest.schema),[delegatedRequest.data.recipient,this.wallet.utils.toString(delegatedRequest.data.expirationTime),delegatedRequest.data.revocable,this.wallet.utils.stringToBytes32(delegatedRequest.data.refUID),this.wallet.utils.stringToBytes(delegatedRequest.data.data),this.wallet.utils.toString(delegatedRequest.data.value)],[this.wallet.utils.toString(delegatedRequest.signature.v),this.wallet.utils.stringToBytes32(delegatedRequest.signature.r),this.wallet.utils.stringToBytes32(delegatedRequest.signature.s)],delegatedRequest.attester]],options);
            return result;
        }
        this.attestByDelegation = Object.assign(attestByDelegation_send, {
            call:attestByDelegation_call
        });
        let multiAttest_send = async (multiRequests:{schema:string,data:{recipient:string,expirationTime:number|BigNumber,revocable:boolean,refUID:string,data:string,value:number|BigNumber}[]}[], options?: number|BigNumber|TransactionOptions): Promise<TransactionReceipt> => {
            let result = await this.send('multiAttest',[multiRequests.map(e=>([this.wallet.utils.stringToBytes32(e.schema),e.data.map(e=>([e.recipient,this.wallet.utils.toString(e.expirationTime),e.revocable,this.wallet.utils.stringToBytes32(e.refUID),this.wallet.utils.stringToBytes(e.data),this.wallet.utils.toString(e.value)]))]))],options);
            return result;
        }
        let multiAttest_call = async (multiRequests:{schema:string,data:{recipient:string,expirationTime:number|BigNumber,revocable:boolean,refUID:string,data:string,value:number|BigNumber}[]}[], options?: number|BigNumber|TransactionOptions): Promise<string[]> => {
            let result = await this.call('multiAttest',[multiRequests.map(e=>([this.wallet.utils.stringToBytes32(e.schema),e.data.map(e=>([e.recipient,this.wallet.utils.toString(e.expirationTime),e.revocable,this.wallet.utils.stringToBytes32(e.refUID),this.wallet.utils.stringToBytes(e.data),this.wallet.utils.toString(e.value)]))]))],options);
            return result;
        }
        this.multiAttest = Object.assign(multiAttest_send, {
            call:multiAttest_call
        });
        let multiAttestByDelegation_send = async (multiDelegatedRequests:{schema:string,data:{recipient:string,expirationTime:number|BigNumber,revocable:boolean,refUID:string,data:string,value:number|BigNumber}[],signatures:{v:number|BigNumber,r:string,s:string}[],attester:string}[], options?: number|BigNumber|TransactionOptions): Promise<TransactionReceipt> => {
            let result = await this.send('multiAttestByDelegation',[multiDelegatedRequests.map(e=>([this.wallet.utils.stringToBytes32(e.schema),e.data.map(e=>([e.recipient,this.wallet.utils.toString(e.expirationTime),e.revocable,this.wallet.utils.stringToBytes32(e.refUID),this.wallet.utils.stringToBytes(e.data),this.wallet.utils.toString(e.value)])),e.signatures.map(e=>([this.wallet.utils.toString(e.v),this.wallet.utils.stringToBytes32(e.r),this.wallet.utils.stringToBytes32(e.s)])),e.attester]))],options);
            return result;
        }
        let multiAttestByDelegation_call = async (multiDelegatedRequests:{schema:string,data:{recipient:string,expirationTime:number|BigNumber,revocable:boolean,refUID:string,data:string,value:number|BigNumber}[],signatures:{v:number|BigNumber,r:string,s:string}[],attester:string}[], options?: number|BigNumber|TransactionOptions): Promise<string[]> => {
            let result = await this.call('multiAttestByDelegation',[multiDelegatedRequests.map(e=>([this.wallet.utils.stringToBytes32(e.schema),e.data.map(e=>([e.recipient,this.wallet.utils.toString(e.expirationTime),e.revocable,this.wallet.utils.stringToBytes32(e.refUID),this.wallet.utils.stringToBytes(e.data),this.wallet.utils.toString(e.value)])),e.signatures.map(e=>([this.wallet.utils.toString(e.v),this.wallet.utils.stringToBytes32(e.r),this.wallet.utils.stringToBytes32(e.s)])),e.attester]))],options);
            return result;
        }
        this.multiAttestByDelegation = Object.assign(multiAttestByDelegation_send, {
            call:multiAttestByDelegation_call
        });
        let multiRevoke_send = async (multiRequests:{schema:string,data:{uid:string,value:number|BigNumber}[]}[], options?: number|BigNumber|TransactionOptions): Promise<TransactionReceipt> => {
            let result = await this.send('multiRevoke',[multiRequests.map(e=>([this.wallet.utils.stringToBytes32(e.schema),e.data.map(e=>([this.wallet.utils.stringToBytes32(e.uid),this.wallet.utils.toString(e.value)]))]))],options);
            return result;
        }
        let multiRevoke_call = async (multiRequests:{schema:string,data:{uid:string,value:number|BigNumber}[]}[], options?: number|BigNumber|TransactionOptions): Promise<void> => {
            let result = await this.call('multiRevoke',[multiRequests.map(e=>([this.wallet.utils.stringToBytes32(e.schema),e.data.map(e=>([this.wallet.utils.stringToBytes32(e.uid),this.wallet.utils.toString(e.value)]))]))],options);
            return;
        }
        this.multiRevoke = Object.assign(multiRevoke_send, {
            call:multiRevoke_call
        });
        let multiRevokeByDelegation_send = async (multiDelegatedRequests:{schema:string,data:{uid:string,value:number|BigNumber}[],signatures:{v:number|BigNumber,r:string,s:string}[],revoker:string}[], options?: number|BigNumber|TransactionOptions): Promise<TransactionReceipt> => {
            let result = await this.send('multiRevokeByDelegation',[multiDelegatedRequests.map(e=>([this.wallet.utils.stringToBytes32(e.schema),e.data.map(e=>([this.wallet.utils.stringToBytes32(e.uid),this.wallet.utils.toString(e.value)])),e.signatures.map(e=>([this.wallet.utils.toString(e.v),this.wallet.utils.stringToBytes32(e.r),this.wallet.utils.stringToBytes32(e.s)])),e.revoker]))],options);
            return result;
        }
        let multiRevokeByDelegation_call = async (multiDelegatedRequests:{schema:string,data:{uid:string,value:number|BigNumber}[],signatures:{v:number|BigNumber,r:string,s:string}[],revoker:string}[], options?: number|BigNumber|TransactionOptions): Promise<void> => {
            let result = await this.call('multiRevokeByDelegation',[multiDelegatedRequests.map(e=>([this.wallet.utils.stringToBytes32(e.schema),e.data.map(e=>([this.wallet.utils.stringToBytes32(e.uid),this.wallet.utils.toString(e.value)])),e.signatures.map(e=>([this.wallet.utils.toString(e.v),this.wallet.utils.stringToBytes32(e.r),this.wallet.utils.stringToBytes32(e.s)])),e.revoker]))],options);
            return;
        }
        this.multiRevokeByDelegation = Object.assign(multiRevokeByDelegation_send, {
            call:multiRevokeByDelegation_call
        });
        let multiRevokeOffchain_send = async (data:string[], options?: TransactionOptions): Promise<TransactionReceipt> => {
            let result = await this.send('multiRevokeOffchain',[this.wallet.utils.stringToBytes32(data)],options);
            return result;
        }
        let multiRevokeOffchain_call = async (data:string[], options?: TransactionOptions): Promise<BigNumber> => {
            let result = await this.call('multiRevokeOffchain',[this.wallet.utils.stringToBytes32(data)],options);
            return new BigNumber(result);
        }
        this.multiRevokeOffchain = Object.assign(multiRevokeOffchain_send, {
            call:multiRevokeOffchain_call
        });
        let multiTimestamp_send = async (data:string[], options?: TransactionOptions): Promise<TransactionReceipt> => {
            let result = await this.send('multiTimestamp',[this.wallet.utils.stringToBytes32(data)],options);
            return result;
        }
        let multiTimestamp_call = async (data:string[], options?: TransactionOptions): Promise<BigNumber> => {
            let result = await this.call('multiTimestamp',[this.wallet.utils.stringToBytes32(data)],options);
            return new BigNumber(result);
        }
        this.multiTimestamp = Object.assign(multiTimestamp_send, {
            call:multiTimestamp_call
        });
        let revoke_send = async (request:{schema:string,data:{uid:string,value:number|BigNumber}}, options?: number|BigNumber|TransactionOptions): Promise<TransactionReceipt> => {
            let result = await this.send('revoke',[[this.wallet.utils.stringToBytes32(request.schema),[this.wallet.utils.stringToBytes32(request.data.uid),this.wallet.utils.toString(request.data.value)]]],options);
            return result;
        }
        let revoke_call = async (request:{schema:string,data:{uid:string,value:number|BigNumber}}, options?: number|BigNumber|TransactionOptions): Promise<void> => {
            let result = await this.call('revoke',[[this.wallet.utils.stringToBytes32(request.schema),[this.wallet.utils.stringToBytes32(request.data.uid),this.wallet.utils.toString(request.data.value)]]],options);
            return;
        }
        this.revoke = Object.assign(revoke_send, {
            call:revoke_call
        });
        let revokeByDelegation_send = async (delegatedRequest:{schema:string,data:{uid:string,value:number|BigNumber},signature:{v:number|BigNumber,r:string,s:string},revoker:string}, options?: number|BigNumber|TransactionOptions): Promise<TransactionReceipt> => {
            let result = await this.send('revokeByDelegation',[[this.wallet.utils.stringToBytes32(delegatedRequest.schema),[this.wallet.utils.stringToBytes32(delegatedRequest.data.uid),this.wallet.utils.toString(delegatedRequest.data.value)],[this.wallet.utils.toString(delegatedRequest.signature.v),this.wallet.utils.stringToBytes32(delegatedRequest.signature.r),this.wallet.utils.stringToBytes32(delegatedRequest.signature.s)],delegatedRequest.revoker]],options);
            return result;
        }
        let revokeByDelegation_call = async (delegatedRequest:{schema:string,data:{uid:string,value:number|BigNumber},signature:{v:number|BigNumber,r:string,s:string},revoker:string}, options?: number|BigNumber|TransactionOptions): Promise<void> => {
            let result = await this.call('revokeByDelegation',[[this.wallet.utils.stringToBytes32(delegatedRequest.schema),[this.wallet.utils.stringToBytes32(delegatedRequest.data.uid),this.wallet.utils.toString(delegatedRequest.data.value)],[this.wallet.utils.toString(delegatedRequest.signature.v),this.wallet.utils.stringToBytes32(delegatedRequest.signature.r),this.wallet.utils.stringToBytes32(delegatedRequest.signature.s)],delegatedRequest.revoker]],options);
            return;
        }
        this.revokeByDelegation = Object.assign(revokeByDelegation_send, {
            call:revokeByDelegation_call
        });
        let revokeOffchain_send = async (data:string, options?: TransactionOptions): Promise<TransactionReceipt> => {
            let result = await this.send('revokeOffchain',[this.wallet.utils.stringToBytes32(data)],options);
            return result;
        }
        let revokeOffchain_call = async (data:string, options?: TransactionOptions): Promise<BigNumber> => {
            let result = await this.call('revokeOffchain',[this.wallet.utils.stringToBytes32(data)],options);
            return new BigNumber(result);
        }
        this.revokeOffchain = Object.assign(revokeOffchain_send, {
            call:revokeOffchain_call
        });
        let timestamp_send = async (data:string, options?: TransactionOptions): Promise<TransactionReceipt> => {
            let result = await this.send('timestamp',[this.wallet.utils.stringToBytes32(data)],options);
            return result;
        }
        let timestamp_call = async (data:string, options?: TransactionOptions): Promise<BigNumber> => {
            let result = await this.call('timestamp',[this.wallet.utils.stringToBytes32(data)],options);
            return new BigNumber(result);
        }
        this.timestamp = Object.assign(timestamp_send, {
            call:timestamp_call
        });
    }
}
export module EAS{
    export interface AttestedEvent {recipient:string,attester:string,uid:string,schema:string,_event:Event}
    export interface RevokedEvent {recipient:string,attester:string,uid:string,schema:string,_event:Event}
    export interface RevokedOffchainEvent {revoker:string,data:string,timestamp:BigNumber,_event:Event}
    export interface TimestampedEvent {data:string,timestamp:BigNumber,_event:Event}
}