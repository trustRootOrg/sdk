import { IWallet, Contract as _Contract, TransactionReceipt, BigNumber, Event, TransactionOptions } from "@ijstech/eth-contract";
export interface IGetRevokeOffchainParams {
    revoker: string;
    data: string;
}
export declare class EAS extends _Contract {
    static _abi: any;
    constructor(wallet: IWallet, address?: string);
    parseAttestedEvent(receipt: TransactionReceipt): EAS.AttestedEvent[];
    decodeAttestedEvent(event: Event): EAS.AttestedEvent;
    parseRevokedEvent(receipt: TransactionReceipt): EAS.RevokedEvent[];
    decodeRevokedEvent(event: Event): EAS.RevokedEvent;
    parseRevokedOffchainEvent(receipt: TransactionReceipt): EAS.RevokedOffchainEvent[];
    decodeRevokedOffchainEvent(event: Event): EAS.RevokedOffchainEvent;
    parseTimestampedEvent(receipt: TransactionReceipt): EAS.TimestampedEvent[];
    decodeTimestampedEvent(event: Event): EAS.TimestampedEvent;
    VERSION: {
        (options?: TransactionOptions): Promise<string>;
    };
    attest: {
        (request: {
            schema: string;
            data: {
                recipient: string;
                expirationTime: number | BigNumber;
                revocable: boolean;
                refUID: string;
                data: string;
                value: number | BigNumber;
            };
        }, options?: number | BigNumber | TransactionOptions): Promise<TransactionReceipt>;
        call: (request: {
            schema: string;
            data: {
                recipient: string;
                expirationTime: number | BigNumber;
                revocable: boolean;
                refUID: string;
                data: string;
                value: number | BigNumber;
            };
        }, options?: number | BigNumber | TransactionOptions) => Promise<string>;
    };
    attestByDelegation: {
        (delegatedRequest: {
            schema: string;
            data: {
                recipient: string;
                expirationTime: number | BigNumber;
                revocable: boolean;
                refUID: string;
                data: string;
                value: number | BigNumber;
            };
            signature: {
                v: number | BigNumber;
                r: string;
                s: string;
            };
            attester: string;
        }, options?: number | BigNumber | TransactionOptions): Promise<TransactionReceipt>;
        call: (delegatedRequest: {
            schema: string;
            data: {
                recipient: string;
                expirationTime: number | BigNumber;
                revocable: boolean;
                refUID: string;
                data: string;
                value: number | BigNumber;
            };
            signature: {
                v: number | BigNumber;
                r: string;
                s: string;
            };
            attester: string;
        }, options?: number | BigNumber | TransactionOptions) => Promise<string>;
    };
    getAttestTypeHash: {
        (options?: TransactionOptions): Promise<string>;
    };
    getAttestation: {
        (uid: string, options?: TransactionOptions): Promise<{
            uid: string;
            schema: string;
            time: BigNumber;
            expirationTime: BigNumber;
            revocationTime: BigNumber;
            refUID: string;
            recipient: string;
            attester: string;
            revocable: boolean;
            data: string;
        }>;
    };
    getDomainSeparator: {
        (options?: TransactionOptions): Promise<string>;
    };
    getNonce: {
        (account: string, options?: TransactionOptions): Promise<BigNumber>;
    };
    getRevokeOffchain: {
        (params: IGetRevokeOffchainParams, options?: TransactionOptions): Promise<BigNumber>;
    };
    getRevokeTypeHash: {
        (options?: TransactionOptions): Promise<string>;
    };
    getSchemaRegistry: {
        (options?: TransactionOptions): Promise<string>;
    };
    getTimestamp: {
        (data: string, options?: TransactionOptions): Promise<BigNumber>;
    };
    isAttestationValid: {
        (uid: string, options?: TransactionOptions): Promise<boolean>;
    };
    multiAttest: {
        (multiRequests: {
            schema: string;
            data: {
                recipient: string;
                expirationTime: number | BigNumber;
                revocable: boolean;
                refUID: string;
                data: string;
                value: number | BigNumber;
            }[];
        }[], options?: number | BigNumber | TransactionOptions): Promise<TransactionReceipt>;
        call: (multiRequests: {
            schema: string;
            data: {
                recipient: string;
                expirationTime: number | BigNumber;
                revocable: boolean;
                refUID: string;
                data: string;
                value: number | BigNumber;
            }[];
        }[], options?: number | BigNumber | TransactionOptions) => Promise<string[]>;
    };
    multiAttestByDelegation: {
        (multiDelegatedRequests: {
            schema: string;
            data: {
                recipient: string;
                expirationTime: number | BigNumber;
                revocable: boolean;
                refUID: string;
                data: string;
                value: number | BigNumber;
            }[];
            signatures: {
                v: number | BigNumber;
                r: string;
                s: string;
            }[];
            attester: string;
        }[], options?: number | BigNumber | TransactionOptions): Promise<TransactionReceipt>;
        call: (multiDelegatedRequests: {
            schema: string;
            data: {
                recipient: string;
                expirationTime: number | BigNumber;
                revocable: boolean;
                refUID: string;
                data: string;
                value: number | BigNumber;
            }[];
            signatures: {
                v: number | BigNumber;
                r: string;
                s: string;
            }[];
            attester: string;
        }[], options?: number | BigNumber | TransactionOptions) => Promise<string[]>;
    };
    multiRevoke: {
        (multiRequests: {
            schema: string;
            data: {
                uid: string;
                value: number | BigNumber;
            }[];
        }[], options?: number | BigNumber | TransactionOptions): Promise<TransactionReceipt>;
        call: (multiRequests: {
            schema: string;
            data: {
                uid: string;
                value: number | BigNumber;
            }[];
        }[], options?: number | BigNumber | TransactionOptions) => Promise<void>;
    };
    multiRevokeByDelegation: {
        (multiDelegatedRequests: {
            schema: string;
            data: {
                uid: string;
                value: number | BigNumber;
            }[];
            signatures: {
                v: number | BigNumber;
                r: string;
                s: string;
            }[];
            revoker: string;
        }[], options?: number | BigNumber | TransactionOptions): Promise<TransactionReceipt>;
        call: (multiDelegatedRequests: {
            schema: string;
            data: {
                uid: string;
                value: number | BigNumber;
            }[];
            signatures: {
                v: number | BigNumber;
                r: string;
                s: string;
            }[];
            revoker: string;
        }[], options?: number | BigNumber | TransactionOptions) => Promise<void>;
    };
    multiRevokeOffchain: {
        (data: string[], options?: TransactionOptions): Promise<TransactionReceipt>;
        call: (data: string[], options?: TransactionOptions) => Promise<BigNumber>;
    };
    multiTimestamp: {
        (data: string[], options?: TransactionOptions): Promise<TransactionReceipt>;
        call: (data: string[], options?: TransactionOptions) => Promise<BigNumber>;
    };
    revoke: {
        (request: {
            schema: string;
            data: {
                uid: string;
                value: number | BigNumber;
            };
        }, options?: number | BigNumber | TransactionOptions): Promise<TransactionReceipt>;
        call: (request: {
            schema: string;
            data: {
                uid: string;
                value: number | BigNumber;
            };
        }, options?: number | BigNumber | TransactionOptions) => Promise<void>;
    };
    revokeByDelegation: {
        (delegatedRequest: {
            schema: string;
            data: {
                uid: string;
                value: number | BigNumber;
            };
            signature: {
                v: number | BigNumber;
                r: string;
                s: string;
            };
            revoker: string;
        }, options?: number | BigNumber | TransactionOptions): Promise<TransactionReceipt>;
        call: (delegatedRequest: {
            schema: string;
            data: {
                uid: string;
                value: number | BigNumber;
            };
            signature: {
                v: number | BigNumber;
                r: string;
                s: string;
            };
            revoker: string;
        }, options?: number | BigNumber | TransactionOptions) => Promise<void>;
    };
    revokeOffchain: {
        (data: string, options?: TransactionOptions): Promise<TransactionReceipt>;
        call: (data: string, options?: TransactionOptions) => Promise<BigNumber>;
    };
    timestamp: {
        (data: string, options?: TransactionOptions): Promise<TransactionReceipt>;
        call: (data: string, options?: TransactionOptions) => Promise<BigNumber>;
    };
    private assign;
}
export declare module EAS {
    interface AttestedEvent {
        recipient: string;
        attester: string;
        uid: string;
        schema: string;
        _event: Event;
    }
    interface RevokedEvent {
        recipient: string;
        attester: string;
        uid: string;
        schema: string;
        _event: Event;
    }
    interface RevokedOffchainEvent {
        revoker: string;
        data: string;
        timestamp: BigNumber;
        _event: Event;
    }
    interface TimestampedEvent {
        data: string;
        timestamp: BigNumber;
        _event: Event;
    }
}
