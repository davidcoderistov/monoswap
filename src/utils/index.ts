import { NETWORKS, IMAGES } from '../config'
import { ethers } from 'ethers'

export function getNetwork (chainId: number): string | null {
    switch (chainId) {
        case 1:
            return NETWORKS.ETHEREUM.MAINNET
        case 3:
            return NETWORKS.ETHEREUM.ROPSTEN
        case 4:
            return NETWORKS.ETHEREUM.RINKEBY
        case 5:
            return NETWORKS.ETHEREUM.GORLI
        case 42:
            return NETWORKS.ETHEREUM.KOVAN
        case 11155111:
            return NETWORKS.ETHEREUM.SEPOLIA
        case 137:
            return NETWORKS.POLYGON.MAINNET
        case 80001:
            return NETWORKS.POLYGON.MUMBAI
        case 43114:
            return NETWORKS.AVALANCHE.MAINNET
        case 43113:
            return NETWORKS.AVALANCHE.FUJI
        case 10:
            return NETWORKS.OPTIMISM.MAINNET
        case 420:
            return NETWORKS.OPTIMISM.GORLI
        case 69:
            return NETWORKS.OPTIMISM.KOVAN
        case 42161:
            return NETWORKS.ARBITRUM.MAINNET
        case 421611:
            return NETWORKS.ARBITRUM.RINKEBY
        case 421613:
            return NETWORKS.ARBITRUM.GORLI
        default:
            return null
    }
}

export function getChainId (network: string): number | null {
    switch (network) {
        case NETWORKS.ETHEREUM.MAINNET:
            return 1
        case NETWORKS.ETHEREUM.ROPSTEN:
            return 3
        case NETWORKS.ETHEREUM.RINKEBY:
            return 4
        case NETWORKS.ETHEREUM.GORLI:
            return 5
        case NETWORKS.ETHEREUM.KOVAN:
            return 42
        case NETWORKS.ETHEREUM.SEPOLIA:
            return 11155111
        case NETWORKS.POLYGON.MAINNET:
            return 137
        case NETWORKS.POLYGON.MUMBAI:
            return 80001
        case NETWORKS.AVALANCHE.MAINNET:
            return 43114
        case NETWORKS.AVALANCHE.FUJI:
            return 43113
        case NETWORKS.OPTIMISM.MAINNET:
            return 10
        case NETWORKS.OPTIMISM.GORLI:
            return 420
        case NETWORKS.OPTIMISM.KOVAN:
            return 69
        case NETWORKS.ARBITRUM.MAINNET:
            return 42161
        case NETWORKS.ARBITRUM.RINKEBY:
            return 421611
        case NETWORKS.ARBITRUM.GORLI:
            return 421613
        default:
            return null
    }
}

export function getRpcUrls (chainId: number): string[] | null {
    switch (chainId) {
        case 1:
            return [
                'https://rpc.ankr.com/eth',
                'https://cloudflare-eth.com',
                'https://api.mycryptoapi.com/eth',
            ]
        case 3:
            return [
                'https://ropsten.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
                'https://rpc.ankr.com/eth_ropsten',
            ]
        case 4:
            return [
                'https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
                'https://rpc.ankr.com/eth_rinkeby',
            ]
        case 5:
            return [
                'https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
                'https://rpc.ankr.com/eth_goerli',
            ]
        case 42:
            return [
                'https://kovan.poa.network',
            ]
        case 11155111:
            return [
                'https://rpc.sepolia.org'
            ]
        case 137:
            return [
                'https://rpc-mainnet.matic.quiknode.pro',
                'https://polygon-rpc.com',
                'https://rpc.ankr.com/polygon',
            ]
        case 80001:
            return [
                'https://polygon-testnet.public.blastapi.io',
                'https://matic-mumbai.chainstacklabs.com',
                'https://rpc.ankr.com/polygon_mumbai',
            ]
        case 43114:
            return [
                'https://rpc.ankr.com/avalanche',
                'https://ava-mainnet.public.blastapi.io/ext/bc/C/rpc',
                'https://api.avax.network/ext/bc/C/rpc',
            ]
        case 43113:
            return [
                'https://ava-testnet.public.blastapi.io/ext/bc/C/rpc'
            ]
        case 10:
            return [
                'https://mainnet.optimism.io',
                'https://optimism-mainnet.public.blastapi.io',
            ]
        case 420:
            return [
                'https://goerli.optimism.io/'
            ]
        case 69:
            return [
                'https://kovan.optimism.io/'
            ]
        case 42161:
            return [
                'https://rpc.ankr.com/arbitrum',
                'https://arb1.arbitrum.io/rpc',
            ]
        case 421611:
            return [
                'https://rinkeby.arbitrum.io/rpc'
            ]
        case 421613:
            return [
                'https://goerli-rollup.arbitrum.io/rpc/'
            ]
        default:
            return null
    }
}

export function getNetworkImgSrc (chainId: number): string | null {
    switch (chainId) {
        case 1:
        case 3:
        case 4:
        case 5:
        case 42:
        case 11155111:
            return IMAGES[NETWORKS.ETHEREUM.MAINNET]
        case 137:
        case 80001:
            return IMAGES[NETWORKS.POLYGON.MAINNET]
        case 43114:
        case 43113:
            return IMAGES[NETWORKS.AVALANCHE.MAINNET]
        case 10:
        case 420:
        case 69:
            return IMAGES[NETWORKS.OPTIMISM.MAINNET]
        case 42161:
        case 421611:
        case 421613:
            return IMAGES[NETWORKS.ARBITRUM.MAINNET]
        default:
            return null
    }
}

export function getChainIdHexValue (chainId: number): string {
    return ethers.utils.hexValue(chainId)
}