import React from 'react'
import { Box, Typography } from '@mui/material'
import { Close } from '@mui/icons-material'
import ActionButton from '../ActionButton'


export interface SearchTokenModalProps {
    onClose: () => void
}

export default function SearchTokenModalTitle (props: SearchTokenModalProps) {

    return (
        <Box
            component='div'
            display='flex'
            justifyContent='space-between'
            alignItems='center'
        >
            <Typography>Select a token</Typography>
            <ActionButton disabled={false} onClick={props.onClose}>
                <Close />
            </ActionButton>
        </Box>
    )
}