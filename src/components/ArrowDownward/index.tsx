import React from 'react'
import { Box } from '@mui/material'
import { ArrowDownward as MUIArrowDownward } from '@mui/icons-material'


export interface ArrowDownwardProps {
    active: boolean
    onClick?: () => void
}

export default function ArrowDownward (props: ArrowDownwardProps) {

    const handleClick = () => {
        if (props.active && props.onClick) {
            props.onClick()
        }
    }

    return (
        <Box
            component='div'
            display='flex'
            justifyContent='center'
            alignItems='center'
            position='relative'
            padding='4px'
            height='18px'
            width='18px'
            marginTop='-14px'
            marginBottom='-14px'
            left='calc(50% - 17px)'
            bgcolor='#212429'
            border='4px solid #191B1F'
            borderRadius='50%'
            zIndex='2'
            onClick={handleClick}
            sx={{ cursor: props.active ? 'pointer': 'default' }}
        >
            <MUIArrowDownward sx={{
                fontSize: '18px',
                color: props.active ? '#F8F8F8' : '#7D8396',
                '&:hover': {
                    color: props.active ? '#D3D3D4' : '#6A6F7F'
                }
            }}/>
        </Box>
    )
}