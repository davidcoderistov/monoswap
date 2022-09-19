import React from 'react'
import { Box, Typography } from '@mui/material'
import TokenInput from './TokenInput'
import ArrowDownward from './ArrowDownward'
import ConnectWalletButton from './ConnectWalletButton'


export default function SwapInterface () {

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
                type='select'
                symbol='Eth'
                imgSrc='/ethereumlogo.png'
                onClick={() => {}} />
            <ArrowDownward active={false} onClick={() => {}} />
            <TokenInput
                value=''
                onChange={() => {}}
                type='button'
                symbol='Eth'
                imgSrc='/ethereumlogo.png'
                onClick={() => {}} />
            <ConnectWalletButton onClick={() => {}} />
        </Box>
    )
}