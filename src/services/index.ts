import axios from 'axios'

export interface Token {
    address: string
    blockchain: string
    name: string
    symbol: string
    thumbnail: string
    decimals: number
}

export type Blockchain = 'eth' | 'polygon' | 'avalanche' | 'optimism' | 'arbitrum'

export function getTokens (blockchain: Blockchain) {
    return axios.post('https://rpc.ankr.com/multichain', {
        'id': 1,
        'jsonrpc': '2.0',
        'method': 'ankr_getCurrencies',
        'params': {
            'blockchain': blockchain
        }
    })
}