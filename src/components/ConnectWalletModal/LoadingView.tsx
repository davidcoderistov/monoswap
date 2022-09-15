import React from 'react'
import { Box, CircularProgress, Typography } from '@mui/material'


export default function LoadingView () {

    return (
        <Box
            component='div'
            display='flex'
            flexDirection='column'
            justifyContent='center'
            alignItems='center'
            height='170px'
            rowGap='15px'
            marginX='20px'
        >
            <CircularProgress
                sx={{
                    color: '#FFFFFF',
                    '.MuiCircularProgress-circle': { animationDuration: '5s'}
                }}
                size={30}
                thickness={5} />
            <Typography fontSize={20}>Connecting...</Typography>
        </Box>
    )
}