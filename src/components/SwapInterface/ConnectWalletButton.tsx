import React from 'react'
import { Button } from '@mui/material'


export interface ConnectWalletButtonProps {
    onClick: () => void
}

export default function ConnectWalletButton (props: ConnectWalletButtonProps) {

    return (
        <Button
            variant='contained'
            fullWidth
            sx={{
                textTransform: 'none',
                backgroundColor: '#153d6f70',
                color: '#5090EA',
                borderRadius: '20px',
                '&:hover': {
                    backgroundColor: '#16273C',
                },
                marginTop: '10px',
                fontSize: '16px',
                paddingY: '12px'
            }}
            onClick={props.onClick}
        >
            Connect Wallet
        </Button>
    )
}