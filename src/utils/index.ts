import { NETWORKS, IMAGES } from '../config'
import { Token, Blockchain } from '../types'
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

export function getMainnet (chainId: number): string | null {
    switch (chainId) {
        case 1:
        case 3:
        case 4:
        case 5:
        case 42:
        case 11155111:
            return NETWORKS.ETHEREUM.MAINNET
        case 137:
        case 80001:
            return NETWORKS.POLYGON.MAINNET
        case 43114:
        case 43113:
            return NETWORKS.AVALANCHE.MAINNET
        case 10:
        case 420:
        case 69:
            return NETWORKS.OPTIMISM.MAINNET
        case 42161:
        case 421611:
        case 421613:
            return NETWORKS.ARBITRUM.MAINNET
        default:
            return null
    }
}

export function getAnkrBlockchain (chainId: number): Blockchain {
    switch (chainId) {
        case 1:
        case 3:
        case 4:
        case 5:
        case 42:
        case 11155111:
            return 'eth'
        case 137:
        case 80001:
            return 'polygon'
        case 43114:
        case 43113:
            return 'avalanche'
        case 10:
        case 420:
        case 69:
            return 'optimism'
        case 42161:
        case 421611:
        case 421613:
            return 'arbitrum'
        default:
            return 'eth'
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

export function getTokenContractAddresses (blockchain: Blockchain) {
    switch (blockchain) {
        case 'eth':
            return [
                '0xdac17f958d2ee523a2206206994597c13d831ec7', // USDT
                '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48', // USDC
                '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2', // WETH
                '0x514910771af9ca656af840dff83e8264ecf986ca', // LINK
            ]
        case 'polygon':
            return [
                '0xc2132d05d31c914a87c6611c10748aeb04b58e8f', // USDT
                '0x2791bca1f2de4661ed88a30c99a7a9449aa84174', // USDC
                '0x7ceb23fd6bc0add59e62ac25578270cff1b9f619', // WETH
                '0x8f3cf7ad23cd3cadbd9735aff958023239c6a063', // DAI
            ]
        case 'avalanche':
            return [
                '0xc7198437980c041c805a1edcba50c1ce5db95118', // USDT
                '0xb97ef9ef8734c71904d8002f8b6bc66dd9c48a6e', // USDC
                '0x49d5c2bdffac6ce2bfdb6640f4f80f226bc10bab', // WETH
                '0xd586e7f844cea2f87f50152665bcbc2c279d8d70', // DAI
            ]
        case 'optimism':
            return [
                '0xda10009cbd5d07dd0cecc66161fc93d7c9000da1', // DAI
                '0x4200000000000000000000000000000000000042', // OPTIMISM
                '0x4200000000000000000000000000000000000006', // WETH
                '0x8700daec35af8ff88c16bdf0418774cb3d7599b4', // Synthetix
            ]
        case 'arbitrum':
            return [
                '0x05e481b19129b560e921e487adb281e70bdba463', // USDT
                '0x3405a1bd46b85c5c029483fbecf2f3e611026e45', // USDC
                '0xda10009cbd5d07dd0cecc66161fc93d7c9000da1', // DAI
                '0x354a6da3fcde098f8389cad84b0182725c6c91de', // COMPOUND
            ]
    }
}

export function isChainSupported (chainId: number) {
    switch (chainId) {
        case 1:
        case 137:
        case 10:
        case 42161:
        case 5:
            return true
        default:
            return false
    }
}

export function compareTokens (tokenA: Token, tokenB: Token) {
    if (tokenA.name && tokenB.name) {
        const nameA = tokenA.name.replace(/\s+/g, '').toLowerCase()
        const nameB = tokenB.name.replace(/\s+/g, '').toLowerCase()
        nameB.charAt(0).match(/[a-z]/)
        if (/^[a-z]+$/.test(nameA) && /^[a-z]+$/.test(nameB)) {
            if (nameA < nameB) {
                return -1
            }
            if (nameA > nameB) {
                return 1
            }
        } else if (nameA.charAt(0).match(/[a-z]/) && nameB.charAt(0).match(/[a-z]/)) {
            const charA = nameA.charAt(0)
            const charB = nameB.charAt(0)
            if (charA < charB) {
                return -1
            }
            if (charA > charB) {
                return 1
            }
        }
    }
    return 0
}

export function getAlchemyBaseUrl (chainId: number) {
    switch (chainId) {
        case 1:
            return 'https://eth-mainnet.alchemyapi.io/v2/'
        case 5:
            return 'https://eth-goerli.alchemyapi.io/v2/'
        case 137:
            return 'https://polygon-mainnet.g.alchemy.com/v2/'
        case 10:
            return 'https://opt-mainnet.g.alchemy.com/v2/'
        case 42161:
            return 'https://arb-mainnet.g.alchemy.com/v2/'
        default:
            return null
    }
}

export function roundTo (number: number, precision: number) {
    return parseFloat(number.toFixed(precision))
}