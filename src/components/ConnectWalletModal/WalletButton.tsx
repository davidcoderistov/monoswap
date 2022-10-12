import React from 'react'
import { Box, Typography } from '@mui/material'
import { Circle } from '@mui/icons-material'
import Image from '../Image'


type Wallet = 'metamask'

export interface WalletButtonProps {
    id: Wallet
    title: string
    imgSrc: string
    connected: boolean
    onClick: (walletId: Wallet) => void
}

export default function WalletButton (props: WalletButtonProps) {

    const handleClick = () => {
        props.onClick(props.id)
    }

    return (
        <Box
            component='div'
            display='flex'
            justifyContent='space-between'
            alignItems='center'
            bgcolor='#2C2F36'
            borderRadius='15px'
            padding='14px'
            sx={{
                border: `1px solid ${props.connected ? '#2172E5' : 'transparent'}`,
                cursor: 'pointer',
                '&:hover': { border: '1px solid #2172E5' }
            }}
            onClick={handleClick}
        >
            <Box
                component='div'
                display='flex'
                alignItems='center'
                columnGap='10px'
            >
                { props.connected && ( <Circle sx={{ color: '#27AE60', fontSize: '12px' }} /> )}
                <Typography>
                    { props.title }
                </Typography>
            </Box>
            <Image
                src={props.imgSrc}
                alt={props.title}
                size={35} />
        </Box>
    )
}