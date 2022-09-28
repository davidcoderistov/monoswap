import React from 'react'
import { Button } from '@mui/material'


type ActionProps = {
    type: 'actionable'
    onClick: () => void
    name: string
}

type ViewProps = {
    type: 'disabled'
    onConnect?: never
    name: string
}

export type ActionButtonProps = ActionProps | ViewProps

export default function ActionButton (props: ActionButtonProps) {

    const isActionable = props.type === 'actionable'

    const handleClick = () => {
        if (isActionable) {
            props.onClick()
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
            disabled={!isActionable}
        >
            { props.name }
        </Button>
    )
}