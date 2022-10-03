import axios from 'axios'
import { ethers } from 'ethers'


interface BridgeTokenI {
    tokenAddress: string
}

interface BridgeInfoI {
    '10'?: BridgeTokenI
    '137'?: BridgeTokenI
    '42161'?: BridgeTokenI
}

interface ExtensionsI {
    bridgeInfo: BridgeInfoI
}

interface TokenI {
    name: string
    symbol: string
    address: string
    decimals: number
    chainId: number
    logoURI: string
    extensions?: ExtensionsI
}

export async function getTokens (): Promise<TokenI[]> {
    try {
        const response = await fetch('https://tokens.uniswap.org/')
        const data = await response.json()
        return data.tokens
    } catch (e) {
        throw e
    }
}

const ALCHEMY_API_KEY = process.env.REACT_APP_ALCHEMY_API_KEY

export async function getTokenBalance (chainId: number, ownerAddress: string, tokenAddress: string) {
    let baseURL = null
    switch (chainId) {
        case 1:
            baseURL = `https://eth-mainnet.alchemyapi.io/v2/${ALCHEMY_API_KEY}`
            break
        case 5:
            baseURL = `https://eth-goerli.alchemyapi.io/v2/${ALCHEMY_API_KEY}`
            break
        case 137:
            baseURL = `https://polygon-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}`
            break
        case 10:
            baseURL = `https://opt-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}`
            break
        case 42161:
            baseURL = `https://arb-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}`
            break
    }

    if (baseURL) {
        try {
            const response = await axios({
                method: 'post',
                url: baseURL,
                headers: {
                    'Content-Type': 'application/json'
                },
                data : JSON.stringify({
                    "jsonrpc": "2.0",
                    "method": "alchemy_getTokenBalances",
                    "params": [
                        `${ownerAddress}`,
                        [
                            `${tokenAddress}`
                        ]
                    ],
                    "id": 42
                })
            })
            const tokenBalances = response?.data?.result?.tokenBalances
            if (Array.isArray(tokenBalances) && tokenBalances.length > 0) {
                const tokenBalance = tokenBalances[0].tokenBalance
                if (tokenBalance) {
                    if (tokenBalance === '0x') {
                        return 0
                    } else {
                        return parseFloat(
                            parseFloat(ethers.utils.formatUnits(
                                ethers.BigNumber.from(tokenBalance),
                                18,
                            )).toFixed(6)
                        )
                    }
                }
            }
            return 0
        } catch (e) {
            throw e
        }
    }
    throw new Error('Invalid chain id')
}