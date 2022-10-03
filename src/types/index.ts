

export interface BridgeTokenI {
    tokenAddress: string
}

export interface BridgeInfoI {
    '10'?: BridgeTokenI
    '137'?: BridgeTokenI
    '42161'?: BridgeTokenI
}

export interface ExtensionsI {
    bridgeInfo: BridgeInfoI
}

export interface TokenI {
    name: string
    symbol: string
    address: string
    decimals: number
    chainId: number
    logoURI: string
    extensions?: ExtensionsI
}

export interface Token {
    id: string
    address: string
    name: string
    symbol: string
    thumbnail: string
    decimals: number
    pinned: boolean
}

export type Blockchain = 'eth' | 'polygon' | 'avalanche' | 'optimism' | 'arbitrum'
