export interface Token {
    id: string
    address: string
    blockchain: string
    name: string
    symbol: string
    thumbnail: string
    decimals: number
    pinned: boolean
}

export type Blockchain = 'eth' | 'polygon' | 'avalanche' | 'optimism' | 'arbitrum'
