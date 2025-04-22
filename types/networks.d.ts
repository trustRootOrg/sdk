export interface INetworkConfig {
    name: string;
    chainId: number;
    easContractAddress: string;
    schemaRegistryAddress: string;
    isTestnet: boolean;
}
export declare const EASNetworks: {
    [chainId: number]: INetworkConfig;
};
export declare const getNetworkConfig: (chainId: number) => INetworkConfig;
