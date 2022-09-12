import React from 'react'
import { Box, Typography } from '@mui/material'
import { Circle } from '@mui/icons-material'


interface NetworkOptionProps {
    id: number
    title: string
    imgSrc: string
    selected: boolean
    onClick: (id: number) => void
}

export default function NetworkOption (props: NetworkOptionProps) {

    const handleClick = () => {
        props.onClick(props.id)
    }

    return (
        <Box
            component='div'
            display='flex'
            justifyContent='space-between'
            alignItems='center'
            padding='10px'
            marginY='5px'
            bgcolor={props.selected ? '#404149' : undefined}
            borderRadius={props.selected ? '10px' : undefined}
            onClick={handleClick}
            sx={{ cursor: 'pointer' }}
        >
            <Box
                display='flex'
                alignItems='center'
                columnGap='7px'
            >
                <Box
                    component='img'
                    sx={{ height: 25, width: 25 }}
                    src={props.imgSrc}
                    alt='Ethereum'
                />
                <Typography fontSize={16}>{ props.title }</Typography>
            </Box>
            { props.selected && (
                <Circle sx={{ color: '#27AE60', fontSize: '12px' }} />
            )}
        </Box>
    )
}


