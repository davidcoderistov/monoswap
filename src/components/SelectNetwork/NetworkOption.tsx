import React from 'react'
import { Box, Typography } from '@mui/material'
import { Circle } from '@mui/icons-material'
import Image from '../Image'


interface NetworkOptionProps {
    title: string
    imgSrc: string
    selected: boolean
    onClick: (title: string) => void
}

export default function NetworkOption (props: NetworkOptionProps) {

    const handleClick = () => {
        props.onClick(props.title)
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
                <Image
                    src={props.imgSrc}
                    alt={props.title}
                    size={25}
                />
                <Typography fontSize={16}>{ props.title }</Typography>
            </Box>
            { props.selected && (
                <Circle sx={{ color: '#27AE60', fontSize: '12px' }} />
            )}
        </Box>
    )
}


