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

export function getTokenContractAddresses (chainId: number) {
    switch (chainId) {
        case 1:
            return [
                '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2', // WETH
                '0x6B175474E89094C44Da98b954EedeAC495271d0F', // DAI
                '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', // USDC
                '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599', // WBTC
            ]
        case 5:
            return [
                '0x326C977E6efc84E512bB9C30f76E30c160eD06FB', // LINK
                '0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6', // WETH
                '0x2f3A40A3db8a7e3D09B0adfEfbCe4f6F81927557', // USDC
            ]
        case 137:
            return [
                '0x9c2C5fd7b07E95EE044DDeba0E97a665F142394f', // 1INCH
                '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063', // DAI
                '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174', // USDC
                '0x1BFD67037B42Cf73acF2047067bd4F2C47D9BfD6', // WBTC
            ]
        case 10:
            return [
                '0x68f180fcCe6836688e9084f035309E29Bf0A2095', // WBTC
                '0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1', // DAI
                '0x7F5c764cBc14f9669B88837ca1490cCa17c31607', // USDC
                '0xab7bAdEF82E9Fe11f6f33f87BC9bC2AA27F2fCB5', // MKR
            ]
        case 42161:
            return [
                '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1', // WETH
                '0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1', // DAI
                '0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8', // USDC
                '0x2f2a2543B76A4166549F7aaB2e75Bef0aefC5B0f', // WBTC
            ]
        default:
            return []
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

export function get0xBaseUrl (chainId: number) {
    switch (chainId) {
        case 1:
            return 'https://api.0x.org/'
        case 5:
            return 'https://goerli.api.0x.org/'
        case 137:
            return 'https://polygon.api.0x.org/'
        case 10:
            return 'https://optimism.api.0x.org/'
        case 42161:
            return 'https://arbitrum.api.0x.org/'
        default:
            return null
    }
}

export function roundTo (number: number, precision: number) {
    return parseFloat(number.toFixed(precision))
}