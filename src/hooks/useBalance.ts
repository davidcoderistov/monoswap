import { useState, useContext, useCallback } from 'react'
import AppContext from '../context'
import { getTokenBalance } from '../services'


export function useBalance () {

    const { selectedAccount, selectedChainId } = useContext(AppContext)

    const [balance, setBalance] = useState<string | undefined>(undefined)

    const fetchTokenBalance = useCallback(async (tokenAddress: string) => {
        if (selectedAccount && selectedChainId) {
            return await getTokenBalance(selectedChainId, selectedAccount, tokenAddress)
        }
    }, [selectedAccount, selectedChainId])

    const trySetBalance = async (tokenAddress: string) => {
        try {
            const tokenBalance = await fetchTokenBalance(tokenAddress)
            if (typeof tokenBalance !== 'undefined') {
                setBalance(tokenBalance.toString())
            }
        } catch (e) {
            console.error(e)
        }
    }

    return [balance, setBalance, trySetBalance] as const
}