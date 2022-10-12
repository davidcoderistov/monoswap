import React from 'react'
import { Box, Typography } from '@mui/material'


export default function TermsView () {

    return (
        <Box
            borderRadius='15px'
            bgcolor='#212429'
            padding='14px'
            marginX='20px'
        >
            <Typography fontSize={12}>
                By connecting a wallet, you agree to Monoswap's Terms of Service and acknowledge that you have read
                and understand the 0x Protocol.
            </Typography>
        </Box>
    )
}