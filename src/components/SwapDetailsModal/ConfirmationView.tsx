import React from 'react'
import { Box, CircularProgress, Typography } from '@mui/material'


interface ConfirmationViewProps {
    sellAmount: string
    sellTokenSymbol: string
    buyAmount: string
    buyTokenSymbol: string
}

export default function ConfirmationView (props: ConfirmationViewProps) {

    return (
        <Box>
            <Box
                display='flex'
                justifyContent='center'
                alignItems='center'
                marginY='40px'
            >
                <CircularProgress
                    sx={{
                        color: '#2172E5',
                        '.MuiCircularProgress-circle': { animationDuration: '5s'}
                    }}
                    size={90}
                    thickness={2} />
            </Box>
            <Box
                display='flex'
                flexDirection='column'
                justifyContent='center'
                alignItems='center'
                rowGap='6px'
            >
                <Typography fontSize={20}>
                    Waiting for confirmation
                </Typography>
                <Typography fontSize={15}>
                    Swapping {props.sellAmount} {props.sellTokenSymbol} for {props.buyAmount} {props.buyTokenSymbol}
                </Typography>
                <Typography fontSize={12} color='#98A0BC' marginTop='5px'>
                    Confirm this transaction in your wallet
                </Typography>
            </Box>
        </Box>
    )
}