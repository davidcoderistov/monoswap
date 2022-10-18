import React from 'react'
import { Box, Typography, CircularProgress, BoxProps } from '@mui/material'
import { CheckCircleOutline } from '@mui/icons-material'
import Image from '../Image'


interface TransactionProps {
    sellTokenSymbol: string
    sellTokenThumbnail: string
    sellAmount: string
    buyTokenSymbol: string
    buyTokenThumbnail: string
    buyAmount: string
    status: 'pending' | 'confirmed'
}

export default function Transaction ({sellTokenSymbol, sellTokenThumbnail, sellAmount,
                                         buyTokenSymbol, buyTokenThumbnail, buyAmount, status, ...rest}: TransactionProps & BoxProps) {

    const pending = status === 'pending'

    return (
        <Box
            component='div'
            display='flex'
            flexDirection='row'
            justifyContent='space-between'
            alignItems='center'
            {...rest}
        >
            <Box
                component='div'
                display='flex'
                flexDirection='row'
                alignItems='center'
            >
                <Box sx={{ flex: '0 0 auto' }}>
                    <Image
                        src={sellTokenThumbnail}
                        alt={sellTokenSymbol}
                        size={20} />
                    <Image
                        src={buyTokenThumbnail}
                        alt={buyTokenSymbol}
                        sx={{ position: 'relative', left: '-10px', top: '10px', }}
                        size={20} />
                </Box>
                <Box>
                    <Typography component='span' color='#555E7A' fontSize={14}>
                        { pending ? 'Swapping' : 'Swapped' }
                    </Typography>
                    <Typography component='span' fontSize={14}>
                        &nbsp;
                    </Typography>
                    <Typography component='span' color='#FFFFFF' fontSize={14}>
                        {sellAmount} {sellTokenSymbol}
                    </Typography>
                    <Typography component='span' fontSize={14}>
                        &nbsp;
                    </Typography>
                    <Typography component='span' color='#555E7A' fontSize={14}>
                        for
                    </Typography>
                    <Typography component='span' fontSize={14}>
                        &nbsp;
                    </Typography>
                    <Typography component='span' color='#FFFFFF' fontSize={14}>
                        {buyAmount} {buyTokenSymbol}
                    </Typography>
                </Box>
            </Box>
            { pending ? (
                <CircularProgress size={16} thickness={5} />
            ) : (
                <CheckCircleOutline color='success' sx={{ fontSize: 22 }} />
            )}
        </Box>
    )
}
