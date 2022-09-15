import React from 'react'
import { Box, IconButton, Typography } from '@mui/material'
import { Close, ArrowBack } from '@mui/icons-material'


const ActionButton = (props: { disabled: boolean, onClick: () => void, children: React.ReactNode }) => {

    return (
        <IconButton
            sx={{ color: '#FFFFFF', p:0, ':disabled': { color: '#9f9f9f' }}}
            disabled={props.disabled}
            onClick={props.onClick}
        >
            { props.children }
        </IconButton>
    )
}

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