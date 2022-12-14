import React, { useState, useContext } from 'react'
import { useBalance } from '../../hooks/useBalance'
import { useSwapDetails, SuccessFuncArgs } from '../../hooks/useSwapDetails'
import { Box, Typography } from '@mui/material'
import SwapTokens from '../SwapTokens'
import ActionButton from './ActionButton'
import SelectTokenModal from '../SelectTokenModal'
import SwapDetails from './SwapDetails'
import SwapDetailsModal from '../SwapDetailsModal'
import { Token } from '../../types'
import { isChainSupported } from '../../utils'
import AppContext from '../../context'
import { Transaction } from '../../types'


export interface SwapInterfaceProps {
    onConnectWallet: () => void
}

export default function SwapInterface ({ onConnectWallet }: SwapInterfaceProps) {

    const {
        connectedTo,
        selectedAccount,
        selectedChainId,
        transactions,
        setTransactions,
    } = useContext(AppContext)

    const [selectTokenOpen, setSelectTokenOpen] = useState(false)
    const [swapOpen, setSwapOpen] = useState(false)
    const [type, setType] = useState<'from' | 'to'>('from')

    const handleOpenFromSelectTokenModal = () => {
        setType('from')
        setSelectTokenOpen(true)
    }

    const handleOpenToSelectTokenModal = () => {
        setType('to')
        setSelectTokenOpen(true)
    }

    const handleCloseSelectTokenModal = () => {
        setSelectTokenOpen(false)
    }

    const [fromToken, setFromToken] = useState<Token | null>(null)
    const [toToken, setToToken] = useState<Token | null>(null)
    const [fromBalance, setFromBalance, trySetFromBalance] = useBalance()
    const [toBalance, setToBalance, trySetToBalance] = useBalance()
    const [swapInfo, swapDetails, tryFetchSwapDetails, tryFetchSwapDetailsDebounced, setSwapDetailsOpen] = useSwapDetails()
    const [currToken, setCurrToken] = useState<'from' | 'to'>('from')

    const handleSelectToken = (token: Token) => {
        if (type === 'from') {
            setFromToken(token)
            trySetFromBalance(token.address, token.decimals)
            if (toToken) {
                if (hasInputValue(fromInputValue)) {
                    trySellFromToken(token, toToken, fromInputValue)
                } else if (hasInputValue(toInputValue)) {
                    trySellToToken(toToken, token, toInputValue)
                }
            }
        } else if (type === 'to') {
            setToToken(token)
            trySetToBalance(token.address, token.decimals)
            if (fromToken) {
                if (hasInputValue(toInputValue)) {
                    trySellToToken(token, fromToken, toInputValue)
                } else if (hasInputValue(fromInputValue)) {
                    trySellFromToken(fromToken, token, fromInputValue)
                }
            }
        }
        setSelectTokenOpen(false)
    }

    const handleSwapTokens = () => {
        setFromToken(toToken ?? null)
        setToToken(fromToken ?? null)
        setFromBalance(toBalance)
        setToBalance(fromBalance)
        if (fromToken && toToken) {
            if (hasInputValue(toInputValue)) {
                setFromInputValue(toInputValue)
                trySellFromToken(toToken, fromToken, toInputValue)
            } else if (hasInputValue(fromInputValue)) {
                setToInputValue(fromInputValue)
                trySellToToken(fromToken, toToken, fromInputValue)
            } else {
                setFromInputValue(toInputValue)
                setToInputValue(fromInputValue)
            }
        } else {
            setFromInputValue(toInputValue)
            setToInputValue(fromInputValue)
        }
    }

    const [fromInputValue, setFromInputValue] = useState('')
    const [toInputValue, setToInputValue] = useState('')

    const handleFromInputValueChange = async (inputValue: string) => {
        setFromInputValue(inputValue)
        if (selectState) {
            setToInputValue('')
        } else {
            if (fromToken && toToken) {
                trySellFromToken(fromToken, toToken, inputValue, true)
            }
        }
    }

    const handleToInputValueChange = async (inputValue: string) => {
        setToInputValue(inputValue)
        if (selectState) {
            setFromInputValue('')
        } else {
            if (fromToken && toToken) {
                trySellToToken(toToken, fromToken, inputValue, true)
            }
        }
    }

    const trySellFromToken = (sellToken: Token, buyToken: Token, amount: string, debounced: boolean = false) => {
        setCurrToken('to')
        const swapDetailsArgs = {
            chainId: selectedChainId,
            sellTokenAddress: sellToken.address,
            sellTokenDecimals: sellToken.decimals,
            buyTokenAddress: buyToken.address,
            buyTokenDecimals: buyToken.decimals,
            sellAmount: amount,
            onSuccess: ({ expectedOutput }: SuccessFuncArgs) => {
                setToInputValue(expectedOutput)
            },
            onError: () => {
                setToInputValue('')
            }
        }
        if (debounced) {
            tryFetchSwapDetailsDebounced(swapDetailsArgs)
        } else {
            tryFetchSwapDetails(swapDetailsArgs)
        }
    }

    const trySellToToken = (sellToken: Token, buyToken: Token, amount: string, debounced: boolean = false) => {
        setCurrToken('from')
        const swapDetailsArgs = {
            chainId: selectedChainId,
            sellTokenAddress: sellToken.address,
            sellTokenDecimals: sellToken.decimals,
            buyTokenAddress: buyToken.address,
            buyTokenDecimals: buyToken.decimals,
            sellAmount: amount,
            onSuccess: ({ expectedOutput }: SuccessFuncArgs) => {
                setFromInputValue(expectedOutput)
            },
            onError: () => {
                setFromInputValue('')
            },
            reverse: true,
        }
        if (debounced) {
            tryFetchSwapDetailsDebounced(swapDetailsArgs)
        } else {
            tryFetchSwapDetails(swapDetailsArgs)
        }
    }

    const handleSwapOrConnect = () => {
        if (isConnected) {
            setSwapOpen(true)
        } else {
            onConnectWallet()
        }
    }

    const handleCloseSwapModal = () => {
        setSwapOpen(false)
    }

    const handleTransactionSubmitted = (transaction: Transaction) => {
        setTransactions([...transactions, {...transaction}])
        setSelectTokenOpen(false)
        setSwapDetailsOpen(false)
        setType('from')
        setFromToken(null)
        setToToken(null)
        setFromBalance(undefined)
        setToBalance(undefined)
        setCurrToken('from')
        setFromInputValue('')
        setToInputValue('')
    }

    const handleTransactionMined = (transaction: Transaction, sellToken: Token, buyToken: Token) => {
        setTransactions([...transactions, {...transaction}])
        if (fromToken) {
            const fromId = fromToken.id
            if (fromId === sellToken.id || fromId === buyToken.id) {
                trySetFromBalance(fromToken.address, fromToken.decimals)
            }
        }
        if (toToken) {
            const toId = toToken.id
            if (toId === sellToken.id || toId === buyToken.id) {
                trySetToBalance(toToken.address, toToken.decimals)
            }
        }
    }

    const hasInputValue = (inputValue: string) => {
        return inputValue.trim().length > 0 && parseFloat(inputValue) > 0
    }

    const isConnected = Boolean(connectedTo) && Boolean(selectedAccount)
    const selectState = !Boolean(fromToken) || !Boolean(toToken)
    const enterState = (!Boolean(fromInputValue) || !parseFloat(fromInputValue)) && (!Boolean(toInputValue) || !parseFloat(toInputValue))
    const swapState = !Boolean(selectState) && !Boolean(enterState)
    const insufficientBalance = !fromBalance || parseFloat(fromInputValue) > parseFloat(fromBalance)

    const btnType = !isConnected || (isConnected && swapState && !swapInfo.insufficientLiquidity && !insufficientBalance && !swapInfo.swapDetailsLoading && hasInputValue(fromInputValue) && hasInputValue(toInputValue)) ? 'actionable' : 'disabled'
    const btnName = isConnected ?
        selectState ? 'Select a token' :
            enterState ? 'Enter an amount' : swapInfo.insufficientLiquidity ?
                'Insufficient liquidity for this trade': insufficientBalance ?
                    `Insufficient ${fromToken?.symbol} balance` : 'Swap' : 'Connect Wallet'

    const chainSupported = isChainSupported(selectedChainId)

    return (
        <Box
            component='div'
            bgcolor='#191B1F'
            padding='10px'
            borderRadius='20px'
            width='464px'
        >
            <Box
                component='div'
                marginLeft='10px'
                marginTop='5px'
                marginBottom='10px'
            >
                <Typography color='#FFFFFF'>
                    Swap
                </Typography>
            </Box>
            <SwapTokens
                fromType={fromToken ? 'select' : 'button'}
                fromValue={fromInputValue}
                onFromChange={handleFromInputValueChange}
                fromDisabled={currToken === 'from' && swapInfo.swapDetailsLoading}
                fromSymbol={fromToken?.symbol}
                fromImgSrc={fromToken?.thumbnail}
                fromBalance={fromBalance}
                onFromClick={handleOpenFromSelectTokenModal}
                toType={toToken ? 'select' : 'button'}
                toValue={toInputValue}
                onToChange={handleToInputValueChange}
                toDisabled={currToken === 'to' && swapInfo.swapDetailsLoading}
                toSymbol={toToken?.symbol}
                toImgSrc={toToken?.thumbnail}
                toBalance={toBalance}
                onToClick={handleOpenToSelectTokenModal}
                switchActive={Boolean(fromToken) && Boolean(toToken) && !swapInfo.swapDetailsLoading}
                onSwitchClick={handleSwapTokens}
                selectable={chainSupported} />
            { swapInfo.swapDetailsOpen && (
                <SwapDetails
                    loading={swapInfo.swapDetailsLoading}
                    fromSymbol={fromToken?.symbol ?? ''}
                    toSymbol={toToken?.symbol ?? ''}
                    price={swapDetails.price}
                    expected={swapDetails.expectedOutput}
                    slippage={swapDetails.slippage}
                    minimum={swapDetails.minimumReceived} />
            )}
            <ActionButton
                type={btnType}
                name={btnName}
                onClick={handleSwapOrConnect} />
            <SelectTokenModal
                open={selectTokenOpen}
                onClose={handleCloseSelectTokenModal}
                onTokenSelect={handleSelectToken} />
            <SwapDetailsModal
                open={swapOpen}
                sellToken={fromToken}
                buyToken={toToken}
                swapDetails={{
                    sellAmount: fromInputValue,
                    buyAmount: toInputValue,
                    price: swapDetails?.price ?? '',
                    expected: swapDetails?.expectedOutput ?? '',
                    slippage: swapDetails?.slippage ?? '',
                    minimum: swapDetails?.minimumReceived ?? '',
                }}
                onTransactionSubmitted={handleTransactionSubmitted}
                onTransactionMined={handleTransactionMined}
                onClose={handleCloseSwapModal} />
        </Box>
    )
}