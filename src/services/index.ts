import axios from 'axios'
import { Token, Blockchain } from '../types'


export function getTokens (blockchain: Blockchain): Promise<Token[]> {
    return axios.post('https://rpc.ankr.com/multichain', {
        'id': 1,
        'jsonrpc': '2.0',
        'method': 'ankr_getCurrencies',
        'params': {
            'blockchain': blockchain
        }
    })
}