import { useState, useContext, useCallback } from 'react'
import AppContext from '../context'
import { getTokenBalance } from '../services'


export function useBalance () {

    const { selectedAccount, selectedChainId } = useContext(AppContext)

    const [balance, setBalance] = useState<string | undefined>(undefined)

    const fetchTokenBalance = useCallback(async (tokenAddress: string, tokenDecimals: number) => {
        if (selectedAccount && selectedChainId) {
            return await getTokenBalance(selectedChainId, selectedAccount, tokenAddress, tokenDecimals)
        }
    }, [selectedAccount, selectedChainId])

    const trySetBalance = async (tokenAddress: string, tokenDecimals: number) => {
        try {
            const tokenBalance = await fetchTokenBalance(tokenAddress, tokenDecimals)
            if (typeof tokenBalance !== 'undefined') {
                setBalance(tokenBalance.toString())
            }
        } catch (e) {
            console.error(e)
        }
    }

    return [balance, setBalance, trySetBalance] as const
}