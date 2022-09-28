import React from 'react'
import { Button } from '@mui/material'


type ActionProps = {
    type: 'connect'
    onConnect: () => void
    name?: never
}

type ViewProps = {
    type: 'disabled'
    onConnect?: never
    name: string
}

export type ActionButtonProps = ActionProps | ViewProps

export default function ActionButton (props: ActionButtonProps) {

    const isConnect = props.type === 'connect'

    const handleClick = () => {
        if (isConnect) {
            props.onConnect()
        }
    }

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
                '&.Mui-disabled': {
                    backgroundColor: '#23252B',
                    color: '#65676C',
                },
                marginTop: '10px',
                fontSize: '16px',
                paddingY: '12px'
            }}
            onClick={handleClick}
            disabled={!isConnect}
        >
            { isConnect ? 'Connect Wallet' : props.name }
        </Button>
    )
}