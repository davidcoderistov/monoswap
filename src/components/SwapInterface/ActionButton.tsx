import React from 'react'
import { Button, CircularProgress } from '@mui/material'


export type ActionButtonProps = {
    type: 'actionable' | 'disabled'
    name: string
    loading?: boolean
    onClick: () => void
}

export default function ActionButton (props: ActionButtonProps) {

    const isActionable = props.type === 'actionable'

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
            onClick={props.onClick}
            disabled={!isActionable || props.loading}
        >
            { props.loading ? (
                <CircularProgress
                    sx={{
                        color: '#5090EA',
                        '.MuiCircularProgress-circle': { animationDuration: '5s'}
                    }}
                    size={28}
                    thickness={5} />
            ): props.name }
        </Button>
    )
}