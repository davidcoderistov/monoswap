import axios from 'axios'
import { ethers } from 'ethers'
import { getAlchemyBaseUrl } from '../utils'


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

    const baseURL = getAlchemyBaseUrl(chainId)

    if (baseURL) {
        try {
            const response = await axios({
                method: 'post',
                url: `${baseURL}${ALCHEMY_API_KEY}`,
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
                        return parseFloat(ethers.utils.formatUnits(
                            ethers.BigNumber.from(tokenBalance),
                            18,
                        ))
                    }
                }
            }
            return 0
        } catch (e) {
            console.error(e)
            return 0
        }
    }

    return 0
}