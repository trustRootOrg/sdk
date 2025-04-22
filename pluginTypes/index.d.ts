/// <amd-module name="@trustroot/sdk/contracts/EAS.json.ts" />
declare module "@trustroot/sdk/contracts/EAS.json.ts" {
    const _default: {
        abi: ({
            inputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            stateMutability: string;
            type: string;
            name?: undefined;
            anonymous?: undefined;
            outputs?: undefined;
        } | {
            inputs: any[];
            name: string;
            type: string;
            stateMutability?: undefined;
            anonymous?: undefined;
            outputs?: undefined;
        } | {
            anonymous: boolean;
            inputs: {
                indexed: boolean;
                internalType: string;
                name: string;
                type: string;
            }[];
            name: string;
            type: string;
            stateMutability?: undefined;
            outputs?: undefined;
        } | {
            inputs: {
                components: ({
                    internalType: string;
                    name: string;
                    type: string;
                    components?: undefined;
                } | {
                    components: {
                        internalType: string;
                        name: string;
                        type: string;
                    }[];
                    internalType: string;
                    name: string;
                    type: string;
                })[];
                internalType: string;
                name: string;
                type: string;
            }[];
            name: string;
            outputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            stateMutability: string;
            type: string;
            anonymous?: undefined;
        } | {
            inputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            name: string;
            outputs: {
                components: {
                    internalType: string;
                    name: string;
                    type: string;
                }[];
                internalType: string;
                name: string;
                type: string;
            }[];
            stateMutability: string;
            type: string;
            anonymous?: undefined;
        } | {
            inputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            name: string;
            outputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            stateMutability: string;
            type: string;
            anonymous?: undefined;
        })[];
    };
    export default _default;
}
/// <amd-module name="@trustroot/sdk/contracts/EAS.ts" />
declare module "@trustroot/sdk/contracts/EAS.ts" {
    import { IWallet, Contract as _Contract, TransactionReceipt, BigNumber, Event, TransactionOptions } from "@ijstech/eth-contract";
    export interface IGetRevokeOffchainParams {
        revoker: string;
        data: string;
    }
    export class EAS extends _Contract {
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
    export module EAS {
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
}
/// <amd-module name="@trustroot/sdk/contracts/REGISTRY.json.ts" />
declare module "@trustroot/sdk/contracts/REGISTRY.json.ts" {
    const _default_1: {
        abi: ({
            inputs: any[];
            name: string;
            type: string;
            anonymous?: undefined;
            outputs?: undefined;
            stateMutability?: undefined;
        } | {
            anonymous: boolean;
            inputs: {
                indexed: boolean;
                internalType: string;
                name: string;
                type: string;
            }[];
            name: string;
            type: string;
            outputs?: undefined;
            stateMutability?: undefined;
        } | {
            inputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            name: string;
            outputs: {
                components: {
                    internalType: string;
                    name: string;
                    type: string;
                }[];
                internalType: string;
                name: string;
                type: string;
            }[];
            stateMutability: string;
            type: string;
            anonymous?: undefined;
        } | {
            inputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            name: string;
            outputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            stateMutability: string;
            type: string;
            anonymous?: undefined;
        })[];
    };
    export default _default_1;
}
/// <amd-module name="@trustroot/sdk/contracts/REGISTRY.ts" />
declare module "@trustroot/sdk/contracts/REGISTRY.ts" {
    import { IWallet, Contract as _Contract, TransactionReceipt, Event, TransactionOptions } from "@ijstech/eth-contract";
    export interface IRegisterParams {
        schema: string;
        resolver: string;
        revocable: boolean;
    }
    export class REGISTRY extends _Contract {
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
    export module REGISTRY {
        interface RegisteredEvent {
            uid: string;
            registerer: string;
            _event: Event;
        }
    }
}
/// <amd-module name="@trustroot/sdk/contracts/index.ts" />
declare module "@trustroot/sdk/contracts/index.ts" {
    export { EAS } from "@trustroot/sdk/contracts/EAS.ts";
    export { REGISTRY } from "@trustroot/sdk/contracts/REGISTRY.ts";
}
/// <amd-module name="@trustroot/sdk/networks.ts" />
declare module "@trustroot/sdk/networks.ts" {
    export interface INetworkConfig {
        name: string;
        chainId: number;
        easContractAddress: string;
        schemaRegistryAddress: string;
        isTestnet: boolean;
    }
    export const EASNetworks: {
        [chainId: number]: INetworkConfig;
    };
    export const getNetworkConfig: (chainId: number) => INetworkConfig;
}
/// <amd-module name="@trustroot/sdk/sdk.ts" />
declare module "@trustroot/sdk/sdk.ts" {
    import { Wallet } from "@ijstech/eth-wallet";
    export interface ISchemaConfig {
        schema: string;
        revocable: boolean;
        resolverAddress?: string;
    }
    interface ISchema {
        uid: string;
        schema: string;
        resolver: string;
        revocable: boolean;
    }
    export interface IAttestationData {
        schemaTypes: string[];
        values: any[];
        recipient?: string;
        expirationTime?: number;
        revocable?: boolean;
        refUID?: string;
    }
    export interface IAttestation {
        uid: string;
        schemaUID: string;
        recipient: string;
        attester: string;
        time: Date;
        neverExpires: boolean;
        expirationTime: Date;
        revocated: boolean;
        revocationTime: Date;
        refUID: string;
        revocable: boolean;
        data: any;
    }
    export class SDK {
        private wallet;
        private network;
        private easContract;
        private schemaRegistryContract;
        constructor(wallet: Wallet);
        registerSchema(config: ISchemaConfig): Promise<{
            uid: string;
            transactionHash: string;
        }>;
        getSchema(schemaUID: string): Promise<ISchema>;
        createAttestation(schemaUID: string, data: IAttestationData): Promise<{
            transactionHash: string;
            uid: string;
        }>;
        getAttestation(attestationUID: string): Promise<IAttestation>;
        revokeAttestation(attestationUID: string, schemaUID: string): Promise<string>;
        validateAttestation(attestationUID: string, schemaUID: string, schemaTypes: string[], expectedData: any[]): Promise<boolean>;
    }
}
/// <amd-module name="@trustroot/sdk" />
declare module "@trustroot/sdk" {
    import * as Contracts from "@trustroot/sdk/contracts/index.ts";
    export { Contracts };
    import { SDK, IAttestation, IAttestationData, ISchemaConfig } from "@trustroot/sdk/sdk.ts";
    export { SDK, IAttestation, IAttestationData, ISchemaConfig };
    export { EASNetworks, INetworkConfig, getNetworkConfig } from "@trustroot/sdk/networks.ts";
    const _default_2: {
        Contracts: typeof Contracts;
        SDK: typeof SDK;
    };
    export default _default_2;
}
