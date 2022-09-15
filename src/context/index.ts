import { createContext } from 'react'
import { ethers } from 'ethers'

export type Provider = ethers.providers.Web3Provider | null

export type Account = string | null

export type Wallet = 'metamask' | 'walletconnect' | null

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
    connectedTo: Wallet
    setConnectedTo: (connectedTo: Wallet) => void
    metamask: Metamask
}

export const defaultValue: Context = {
    provider: null,
    setProvider: () => {},
    selectedAccount: null,
    setSelectedAccount: () => {},
    connectedTo: null,
    setConnectedTo: () => {},
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