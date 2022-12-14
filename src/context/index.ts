import { createContext } from 'react'
import { ethers } from 'ethers'
import { TokenI, Transaction } from '../types'

export type Provider = ethers.providers.Web3Provider | null

export type Account = string | null

export type Wallet = 'metamask' | null

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
    tokens: TokenI[]
    setTokens: (tokens: TokenI[]) => void
    tokensLoading: boolean
    setTokensLoading: (tokensLoading: boolean) => void
    transactions: Transaction[]
    setTransactions: (transactions: Transaction[]) => void
    metamask: Metamask
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
    tokens: [],
    setTokens: () => {},
    tokensLoading: false,
    setTokensLoading: () => {},
    transactions: [],
    setTransactions: () => {},
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