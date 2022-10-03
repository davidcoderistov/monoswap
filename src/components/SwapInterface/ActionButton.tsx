import React from 'react'
import { Button } from '@mui/material'


export type ActionButtonProps = {
    type: 'actionable' | 'disabled'
    name: string
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
            disabled={!isActionable}
        >
            { props.name }
        </Button>
    )
}