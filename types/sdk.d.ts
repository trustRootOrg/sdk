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
export declare class SDK {
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
export {};
