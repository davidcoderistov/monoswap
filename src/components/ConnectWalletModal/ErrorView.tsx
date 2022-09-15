import React from 'react'
import { Box, Typography, Button } from '@mui/material'


interface ErrorViewProps {
    onClickTryAgain: () => void
    onClickBackToWallet: () => void
}

export default function ErrorView (props: ErrorViewProps) {

    return (
        <Box
            component='div'
            display='flex'
            flexDirection='column'
            justifyContent='center'
            alignItems='center'
            paddingX='15px'
            marginX='20px'
        >
            <Typography fontSize={20} sx={{ marginTop: '40px' }}>Error connecting</Typography>
            <Typography fontSize={14} textAlign='center' sx={{ marginTop: '10px' }}>
                The connection attempt failed. Please click try again and follow the steps to connect in your wallet.
            </Typography>
            <Button
                sx={{ marginTop: '35px', textTransform: 'none', borderRadius: '10px' }}
                variant='contained'
                size='large'
                fullWidth
                onClick={props.onClickTryAgain}
            >
                Try Again
            </Button>
            <Button
                sx={{ marginTop: '10px', textTransform: 'none' }}
                variant='text'
                size='small'
                onClick={props.onClickBackToWallet}
            >
                Back to wallet selection
            </Button>
        </Box>
    )
}