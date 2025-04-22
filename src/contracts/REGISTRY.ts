import {IWallet, Contract as _Contract, Transaction, TransactionReceipt, BigNumber, Event, IBatchRequestObj, TransactionOptions} from "@ijstech/eth-contract";
import Bin from "./REGISTRY.json";
export interface IRegisterParams {schema:string;resolver:string;revocable:boolean}
export class REGISTRY extends _Contract{
    static _abi: any = Bin.abi;
    constructor(wallet: IWallet, address?: string){
        super(wallet, address, Bin.abi, undefined);
        this.assign()
    }
    parseRegisteredEvent(receipt: TransactionReceipt): REGISTRY.RegisteredEvent[]{
        return this.parseEvents(receipt, "Registered").map(e=>this.decodeRegisteredEvent(e));
    }
    decodeRegisteredEvent(event: Event): REGISTRY.RegisteredEvent{
        let result = event.data;
        return {
            uid: result.uid,
            registerer: result.registerer,
            _event: event
        };
    }
    VERSION: {
        (options?: TransactionOptions): Promise<string>;
    }
    getSchema: {
        (uid:string, options?: TransactionOptions): Promise<{uid:string,resolver:string,revocable:boolean,schema:string}>;
    }
    register: {
        (params: IRegisterParams, options?: TransactionOptions): Promise<TransactionReceipt>;
        call: (params: IRegisterParams, options?: TransactionOptions) => Promise<string>;
    }
    private assign(){
        let VERSION_call = async (options?: TransactionOptions): Promise<string> => {
            let result = await this.call('VERSION',[],options);
            return result;
        }
        this.VERSION = VERSION_call
        let getSchema_call = async (uid:string, options?: TransactionOptions): Promise<{uid:string,resolver:string,revocable:boolean,schema:string}> => {
            let result = await this.call('getSchema',[this.wallet.utils.stringToBytes32(uid)],options);
            return (
            {
                uid: result.uid,
                resolver: result.resolver,
                revocable: result.revocable,
                schema: result.schema
            }
            );
        }
        this.getSchema = getSchema_call
        let registerParams = (params: IRegisterParams) => [params.schema,params.resolver,params.revocable];
        let register_send = async (params: IRegisterParams, options?: TransactionOptions): Promise<TransactionReceipt> => {
            let result = await this.send('register',registerParams(params),options);
            return result;
        }
        let register_call = async (params: IRegisterParams, options?: TransactionOptions): Promise<string> => {
            let result = await this.call('register',registerParams(params),options);
            return result;
        }
        this.register = Object.assign(register_send, {
            call:register_call
        });
    }
}
export module REGISTRY{
    export interface RegisteredEvent {uid:string,registerer:string,_event:Event}
}