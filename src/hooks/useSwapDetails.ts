import {useState, useCallback, useMemo} from 'react'
import { getSwapDetails, SwapDetailsArgs } from '../services'
import { roundTo } from '../utils'
import _debounce from 'lodash/debounce'


export function useSwapDetails () {

    const [swapDetailsOpen, setSwapDetailsOpen] = useState(false)
    const [swapDetailsLoading, setSwapDetailsLoading] = useState(false)
    const [price, setPrice] = useState('')
    const [expectedOutput, setExpectedOutput] = useState('')
    const [slippage, setSlippage] = useState('')
    const [minimumReceived, setMinimumReceived] = useState('')
    const [insufficientLiquidity, setInsufficientLiquidity] = useState(false)

    const tryFetchSwapDetails = useCallback(async (swapDetailsArgs: SwapDetailsArgs & { onSuccess?: (expectedOutput: string) => void }) => {
        if (swapDetailsArgs.sellAmount.trim().length > 0 && parseFloat(swapDetailsArgs.sellAmount) > 0) {
            setSwapDetailsOpen(true)
            setSwapDetailsLoading(true)
            setInsufficientLiquidity(false)
            try {
                const swapDetails = await getSwapDetails(swapDetailsArgs)
                const expectedOutput = roundTo(swapDetails.expectedOutput, 6).toString()
                setPrice(roundTo(swapDetails.price, 6).toString())
                setExpectedOutput(expectedOutput)
                setSlippage(`${swapDetails.slippage}.00`)
                setMinimumReceived(roundTo(swapDetails.minimumReceived, 6).toString())
                setSwapDetailsLoading(false)
                if (swapDetailsArgs.onSuccess) {
                    swapDetailsArgs.onSuccess(expectedOutput)
                }
            } catch (e) {
                console.error(e)
                setSwapDetailsLoading(false)
                setInsufficientLiquidity(true)
            }
        } else {
            setSwapDetailsOpen(false)
        }
    }, [])

    const tryFetchSwapDetailsDebounced = useMemo(() => _debounce(tryFetchSwapDetails, 500), [])

    const swapInfo = {
        swapDetailsOpen,
        swapDetailsLoading,
        insufficientLiquidity,
    }

    const swapDetails = {
        price,
        expectedOutput,
        slippage,
        minimumReceived,
    }

    return [swapInfo, swapDetails, tryFetchSwapDetailsDebounced] as const
}