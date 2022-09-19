import React from 'react'
import { IconButton } from '@mui/material'


export interface ActionButtonProps {
    disabled: boolean
    children: React.ReactNode
    onClick: () => void
}

export default function ActionButton (props: ActionButtonProps) {

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