import axios from 'axios'
import { getAlchemyBaseUrl, get0xBaseUrl, get0xContractAddress } from '../utils'
import { ethers } from 'ethers'
import Web3 from 'web3'
import { AbiItem } from 'web3-utils'
import qs from 'qs'
import { ERC20_ABI } from '../abis/erc20'
import { Token } from '../types'


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

export interface SwapDetailsArgs {
    chainId: number
    sellTokenAddress: string
    sellTokenDecimals: number
    buyTokenAddress: string
    buyTokenDecimals: number
    sellAmount: string
}

interface SwapDetailsReturnType {
    buyAmount: number
    price: number
    expectedOutput: number
    slippage: number
    minimumReceived: number
}

export async function getSwapDetails (swapDetails: SwapDetailsArgs, reverse = false): Promise<SwapDetailsReturnType> {
    const baseUrl = get0xBaseUrl(swapDetails.chainId)
    if (baseUrl) {
        try {
            const params = {
                sellToken: swapDetails.sellTokenAddress,
                buyToken: swapDetails.buyTokenAddress,
                sellAmount: ethers.utils.parseUnits(swapDetails.sellAmount, swapDetails.sellTokenDecimals).toString(),
            }
            const response = await fetch(
                `${baseUrl}swap/v1/price?${qs.stringify(params)}`
            )
            const details = await response.json()

            const buyAmount = parseFloat(
                ethers.utils.formatUnits(
                    ethers.BigNumber.from(details.buyAmount),
                    swapDetails.buyTokenDecimals,
                )
            )
            const buyUnits = reverse ? parseFloat(swapDetails.sellAmount) : buyAmount
            const price = parseFloat(details.price)

            return {
                buyAmount,
                price: reverse ? (1.00 / price) : price,
                expectedOutput: details.expectedSlippage ? (1 + parseFloat(details.expectedSlippage)) * buyUnits : buyUnits,
                slippage: 1,
                minimumReceived: buyUnits * 0.99,
            }
        } catch (e) {
            throw e
        }
    } else {
        throw new Error('Chain id is not valid')
    }
}

export async function checkAllowance (chainId: number, sellToken: Token, walletAddress: string) {
    const zeroExAddress = get0xContractAddress(chainId)
    if (zeroExAddress) {
        try {
            const web3 = new Web3(Web3.givenProvider)
            const contract = new web3.eth.Contract(ERC20_ABI as AbiItem[], sellToken.address)
            const allowance = await contract.methods.allowance(walletAddress, zeroExAddress).call()
            if (parseFloat(allowance)) {
                return parseFloat(
                    ethers.utils.formatUnits(
                        ethers.BigNumber.from(allowance),
                        sellToken.decimals,
                    )
                )
            }
            return 0
        } catch (e) {
            throw e
        }
    } else {
        throw new Error('Chain id is not valid')
    }
}