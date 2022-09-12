import React from 'react'
import { Box, Typography } from '@mui/material'


interface ConnectWalletProps {
    onClick: () => void
}

export default function ConnectWallet (props: ConnectWalletProps) {

    return (
        <Box
            component='div'
            sx={{
                display: 'inline-block',
                backgroundColor: '#172A42',
                color: '#5090EA',
                borderRadius: '20px',
                paddingY: '10px',
                paddingX: '15px',
                cursor: 'pointer',
                '&:hover': {
                    backgroundColor: '#16273C',
                }
            }}
            onClick={props.onClick}
        >
            <Box
                display='flex'
                alignItems='center'
            >
                <Box sx={{ height: 25 }} />
                <Typography fontSize={16} fontWeight='bold'>Connect Wallet</Typography>
            </Box>
        </Box>
    )
}