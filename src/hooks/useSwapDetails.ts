import { useState, useCallback, useMemo } from 'react'
import { getSwapDetails, SwapDetailsArgs } from '../services'
import { roundTo } from '../utils'
import _debounce from 'lodash/debounce'


export interface SuccessFuncArgs {
    buyAmount: string
    price: string
    expectedOutput: string
    slippage: string
    minimumReceived: string
}

type OnSuccessFunc = (args: SuccessFuncArgs) => void

export function useSwapDetails () {

    const [swapDetailsOpen, setSwapDetailsOpen] = useState(false)
    const [swapDetailsLoading, setSwapDetailsLoading] = useState(false)
    const [price, setPrice] = useState('')
    const [expectedOutput, setExpectedOutput] = useState('')
    const [slippage, setSlippage] = useState('')
    const [minimumReceived, setMinimumReceived] = useState('')
    const [insufficientLiquidity, setInsufficientLiquidity] = useState(false)

    const tryFetchSwapDetails = useCallback(async (swapDetailsArgs: SwapDetailsArgs & { onSuccess?: OnSuccessFunc, onError?: () => void, reverse?: boolean }) => {
        if (swapDetailsArgs.sellAmount.trim().length > 0 && parseFloat(swapDetailsArgs.sellAmount) > 0) {
            setSwapDetailsOpen(true)
            setSwapDetailsLoading(true)
            setInsufficientLiquidity(false)
            try {
                const swapDetails = await getSwapDetails(swapDetailsArgs, Boolean(swapDetailsArgs.reverse))
                const buyAmount = roundTo(swapDetails.buyAmount, 6).toString()
                const expectedOutput = roundTo(swapDetails.expectedOutput, 6).toString()
                const price = roundTo(swapDetails.price, 6).toString()
                const slippage = `${swapDetails.slippage}.00`
                const minimumReceived = roundTo(swapDetails.minimumReceived, 6).toString()
                setPrice(price)
                setExpectedOutput(expectedOutput)
                setSlippage(slippage)
                setMinimumReceived(minimumReceived)
                setSwapDetailsLoading(false)
                if (swapDetailsArgs.onSuccess) {
                    swapDetailsArgs.onSuccess({
                        buyAmount,
                        price,
                        expectedOutput,
                        slippage,
                        minimumReceived,
                    })
                }
            } catch (e) {
                console.error(e)
                setSwapDetailsLoading(false)
                setSwapDetailsOpen(false)
                setInsufficientLiquidity(true)
                if (swapDetailsArgs.onError) {
                    swapDetailsArgs.onError()
                }
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

    return [swapInfo, swapDetails, tryFetchSwapDetails, tryFetchSwapDetailsDebounced, setSwapDetailsOpen] as const
}