import React from 'react'
import { Box, Typography, IconButton } from '@mui/material'
import { Close, ErrorOutline } from '@mui/icons-material'


export interface SnackbarProps {
    open: boolean
    message: string
    onClose: () => void
}

export default function Snackbar ({ open, message, onClose }: SnackbarProps) {

    return open ? (
        <Box
            component='div'
            display='flex'
            alignItems='start'
            paddingTop='5px'
            paddingBottom='20px'
            paddingLeft='15px'
            paddingRight='5px'
            marginTop='20px'
            bgcolor='#191B1F'
            width='350px'
            borderRadius='15px'
        >
            <Box
                component='div'
                display='flex'
                alignItems='center'
                columnGap='20px'
                paddingTop='15px'
            >
                <ErrorOutline sx={{ color: '#FF4343' }}/>
                <Typography color='#FFFFFF'>
                    { message }
                </Typography>
            </Box>
            <IconButton onClick={onClose}>
                <Close sx={{ color: '#C3C5CB' }} />
            </IconButton>
        </Box>
    ) : null
}