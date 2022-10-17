import React from 'react'
import { Box, Typography, CircularProgress } from '@mui/material'
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

export default function Transaction (props: TransactionProps) {

    const pending = props.status === 'pending'

    return (
        <Box
            component='div'
            display='flex'
            flexDirection='row'
            justifyContent='space-between'
            alignItems='center'
        >
            <Box
                component='div'
                display='flex'
                flexDirection='row'
                alignItems='center'
            >
                <Box sx={{ flex: '0 0 auto' }}>
                    <Image
                        src={props.sellTokenThumbnail}
                        alt={props.sellTokenSymbol}
                        size={20} />
                    <Image
                        src={props.buyTokenThumbnail}
                        alt={props.buyTokenSymbol}
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
                        {props.sellAmount} {props.sellTokenSymbol}
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
                        {props.buyAmount} {props.buyTokenSymbol}
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
