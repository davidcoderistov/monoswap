import React, { useState } from 'react'
import { Box, Typography } from '@mui/material'
import TokenInput from './TokenInput'
import ArrowDownward from './ArrowDownward'
import ConnectWalletButton from './ConnectWalletButton'
import SelectTokenModal from '../SelectTokenModal'
import { Token } from '../../types'


export interface SwapInterfaceProps {
    onConnectWallet: () => void
}

export default function SwapInterface ({ onConnectWallet }: SwapInterfaceProps) {

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

    const handleSelectToken = (token: Token) => {
        if (type === 'from') {
            setFromToken(token)
        } else if (type === 'to') {
            setToToken(token)
        }
        setSelectTokenOpen(false)
    }

    const handleSwapTokens = () => {
        setFromToken(toToken ?? null)
        setToToken(fromToken ?? null)
    }

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
            <TokenInput
                value=''
                onChange={() => {}}
                type={fromToken ? 'select' : 'button'}
                symbol={fromToken?.symbol}
                imgSrc={fromToken?.thumbnail}
                onClick={handleOpenFromSelectTokenModal} />
            <ArrowDownward
                active={Boolean(fromToken) && Boolean(toToken)}
                onClick={handleSwapTokens} />
            <TokenInput
                value=''
                onChange={() => {}}
                type={toToken ? 'select' : 'button'}
                symbol={toToken?.symbol}
                imgSrc={toToken?.thumbnail}
                onClick={handleOpenToSelectTokenModal} />
            <ConnectWalletButton onClick={onConnectWallet} />
            <SelectTokenModal
                open={selectTokenOpen}
                onClose={handleCloseSelectTokenModal}
                onTokenSelect={handleSelectToken} />
        </Box>
    )
}