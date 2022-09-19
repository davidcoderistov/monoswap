import React from 'react'
import { Box, Typography } from '@mui/material'
import { Close, ArrowBack } from '@mui/icons-material'
import ActionButton from '../ActionButton'


interface ConnectWalletModalTitleProps {
    title: string
    actionable: boolean
    disabled: boolean
    onClickBack: () => void
    onClose: () => void
}

export default function ConnectWalletModalTitle (props: ConnectWalletModalTitleProps) {

    return (
        <Box
            component='div'
            display='flex'
            justifyContent='space-between'
            alignItems='center'
            marginX='20px'
            paddingTop='20px'
        >
            { props.actionable ? (
                <ActionButton
                    disabled={props.disabled}
                    onClick={props.onClickBack}
                >
                    <ArrowBack />
                </ActionButton>
            ) : (
                <Typography>
                    { props.title }
                </Typography>
            )}
            <ActionButton
                disabled={props.disabled}
                onClick={props.onClose}
            >
                <Close />
            </ActionButton>
        </Box>
    )
}