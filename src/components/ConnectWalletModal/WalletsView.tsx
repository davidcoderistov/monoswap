import React from 'react'
import { Box } from '@mui/material'
import WalletButton, { WalletButtonProps } from './WalletButton'


interface WalletsViewProps {
    connectedTo: 'metamask' | null
    isMetamaskInstalled: boolean
    onClick: WalletButtonProps['onClick']
}

export default function WalletsView (props: WalletsViewProps) {

    return (
        <Box marginX='20px'>
            <Box mt='15px' />
            <WalletButton
                id='metamask'
                title={props.isMetamaskInstalled ? 'MetaMask' : 'Install MetaMask'}
                imgSrc='/metamask.png'
                connected={props.connectedTo === 'metamask'}
                onClick={props.onClick} />
            <Box mt='15px' />
        </Box>
    )
}