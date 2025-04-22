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
