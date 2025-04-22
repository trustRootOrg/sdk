import { IWallet, Contract as _Contract, TransactionReceipt, Event, TransactionOptions } from "@ijstech/eth-contract";
export interface IRegisterParams {
    schema: string;
    resolver: string;
    revocable: boolean;
}
export declare class REGISTRY extends _Contract {
    static _abi: any;
    constructor(wallet: IWallet, address?: string);
    parseRegisteredEvent(receipt: TransactionReceipt): REGISTRY.RegisteredEvent[];
    decodeRegisteredEvent(event: Event): REGISTRY.RegisteredEvent;
    VERSION: {
        (options?: TransactionOptions): Promise<string>;
    };
    getSchema: {
        (uid: string, options?: TransactionOptions): Promise<{
            uid: string;
            resolver: string;
            revocable: boolean;
            schema: string;
        }>;
    };
    register: {
        (params: IRegisterParams, options?: TransactionOptions): Promise<TransactionReceipt>;
        call: (params: IRegisterParams, options?: TransactionOptions) => Promise<string>;
    };
    private assign;
}
export declare module REGISTRY {
    interface RegisteredEvent {
        uid: string;
        registerer: string;
        _event: Event;
    }
}
