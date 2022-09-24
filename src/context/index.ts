import { createContext } from 'react'
import { ethers } from 'ethers'
import { Token, Blockchain } from '../types'

export type Provider = ethers.providers.Web3Provider | null

export type Account = string | null

export type Wallet = 'metamask' | 'walletconnect' | null

export type TokenData = {
    [blockchain in Blockchain]: {
        tokens: Token[]
        loaded: boolean
    }
}

export interface Metamask {
    isInstalled: boolean
    setIsInstalled: (isInstalled: boolean) => void
    isConnecting: boolean
    setIsConnecting: (isConnecting: boolean) => void
    isError: boolean
    setIsError: (isError: boolean) => void
}

export interface Context {
    provider: Provider
    setProvider: (provider: Provider) => void
    selectedAccount: Account
    setSelectedAccount: (account: Account) => void
    selectedChainId: number
    setSelectedChainId: (chainId: number) => void
    connectedTo: Wallet
    setConnectedTo: (connectedTo: Wallet) => void
    message: string | null
    setMessage: (message: string | null) => void
    tokenData: TokenData
    setTokenData: (tokenData: TokenData) => void
    metamask: Metamask
}

export const initialTokenData = {
    'eth': {
        tokens: [],
        loaded: false,
    },
    'polygon': {
        tokens: [],
        loaded: false,
    },
    'avalanche': {
        tokens: [],
        loaded: false,
    },
    'optimism': {
        tokens: [],
        loaded: false,
    },
    'arbitrum': {
        tokens: [],
        loaded: false,
    },
}

export const defaultValue: Context = {
    provider: null,
    setProvider: () => {},
    selectedAccount: null,
    setSelectedAccount: () => {},
    selectedChainId: 1,
    setSelectedChainId: () => {},
    connectedTo: null,
    setConnectedTo: () => {},
    message: null,
    setMessage: () => {},
    tokenData: initialTokenData,
    setTokenData: () => {},
    metamask: {
        isInstalled: false,
        setIsInstalled: () => {},
        isConnecting: false,
        setIsConnecting: () => {},
        isError: false,
        setIsError: () => {},
    }
}

const AppContext = createContext(defaultValue)

export default AppContext