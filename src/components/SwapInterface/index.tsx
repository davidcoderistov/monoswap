import React, { useState, useMemo, useContext } from 'react'
import { useBalance } from '../../hooks/useBalance'
import { Box, Typography } from '@mui/material'
import SwapTokens from '../SwapTokens'
import ActionButton from './ActionButton'
import SelectTokenModal from '../SelectTokenModal'
import SwapDetails from './SwapDetails'
import { Token } from '../../types'
import AppContext from '../../context'
import _debounce from 'lodash/debounce'


export interface SwapInterfaceProps {
    onConnectWallet: () => void
}

export default function SwapInterface ({ onConnectWallet }: SwapInterfaceProps) {

    const {
        connectedTo,
        selectedAccount,
    } = useContext(AppContext)

    const [selectTokenOpen, setSelectTokenOpen] = useState(false)
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
    const [fromBalance, trySetFromBalance] = useBalance()
    const [toBalance, trySetToBalance] = useBalance()

    const handleSelectToken = (token: Token) => {
        if (type === 'from') {
            setFromToken(token)
            trySetFromBalance(token.address)
        } else if (type === 'to') {
            setToToken(token)
            trySetToBalance(token.address)
        }
        setSelectTokenOpen(false)
    }

    const handleSwapTokens = () => {
        setFromToken(toToken ?? null)
        setToToken(fromToken ?? null)
        setFromInputValue(toInputValue)
        setToInputValue(fromInputValue)
    }

    const [fromInputValue, setFromInputValue] = useState('')
    const [toInputValue, setToInputValue] = useState('')

    const handleFromInputValueChange = async (inputValue: string) => {
        setFromInputValue(inputValue)
        if (selectState) {
            setToInputValue('')
        } else {
            // TODO: Fetch price debounced
        }
    }

    const handleToInputValueChange = async (inputValue: string) => {
        setToInputValue(inputValue)
        if (selectState) {
            setFromInputValue('')
        } else {
            // TODO: Fetch price debounced
        }
    }

    const [allowance, setAllowance] = useState(false)

    const handleSwapOrConnect = () => {
        if (isConnected) {
            // TODO: Handle swap
        } else {
            onConnectWallet()
        }
    }

    const handleApproveAllowance = () => {
        // TODO: Handle approve allowance
        setAllowance(true)
    }

    const isConnected = Boolean(connectedTo) && Boolean(selectedAccount)
    const selectState = !Boolean(fromToken) || !Boolean(toToken)
    const enterState = (!Boolean(fromInputValue) || !parseFloat(fromInputValue)) && (!Boolean(toInputValue) || !parseFloat(toInputValue))
    const swapState = !Boolean(selectState) && !Boolean(enterState)

    const btnType = !isConnected || (isConnected && swapState && allowance) ? 'actionable' : 'disabled'
    const btnName = isConnected ?
        selectState ? 'Select a token' :
            enterState ? 'Enter an amount' : 'Swap' : 'Connect Wallet'

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
                fromDisabled={false}
                fromSymbol={fromToken?.symbol}
                fromImgSrc={fromToken?.thumbnail}
                fromBalance={fromBalance}
                onFromClick={handleOpenFromSelectTokenModal}
                toType={toToken ? 'select' : 'button'}
                toValue={toInputValue}
                onToChange={handleToInputValueChange}
                toDisabled={false}
                toSymbol={toToken?.symbol}
                toImgSrc={toToken?.thumbnail}
                toBalance={toBalance}
                onToClick={handleOpenToSelectTokenModal}
                switchActive={Boolean(fromToken) && Boolean(toToken)}
                onSwitchClick={handleSwapTokens} />
            <SwapDetails
                loading={false}
                expected='0.00262297'
                slippage='2.00'
                minimum='0.00257154' />
            { swapState && !allowance && (
                <ActionButton
                    type='actionable'
                    name={`Allow Monoswap to use your ${fromToken?.symbol}`}
                    onClick={handleApproveAllowance} />
            )}
            <ActionButton
                type={btnType}
                name={btnName}
                onClick={handleSwapOrConnect} />
            <SelectTokenModal
                open={selectTokenOpen}
                onClose={handleCloseSelectTokenModal}
                onTokenSelect={handleSelectToken} />
        </Box>
    )
}