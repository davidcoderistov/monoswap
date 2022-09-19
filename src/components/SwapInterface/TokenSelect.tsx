import React from 'react'
import { Box, Typography } from '@mui/material'
import { KeyboardArrowDown } from '@mui/icons-material'
import Image from '../Image'


export interface TokenSelectProps {
    active: boolean
    symbol: string | null
    imgSrc: string | null
    onClick: () => void
}

export default function TokenSelect ({ active, symbol, imgSrc, onClick }: TokenSelectProps) {

    return (
        <Box
            component='div'
            display='flex'
            flexDirection='row'
            alignItems='center'
            columnGap='7px'
            paddingY='8px'
            paddingRight='8px'
            paddingLeft={active ? '8px' : '12px'}
            borderRadius='18px'
            bgcolor={ active ? '#2C2F36' : '#2172E5'}
            sx={{
                cursor: 'pointer',
                '&:hover': { backgroundColor: active ? '#40444F' : '#1966D4' }
            }}
            onClick={onClick}
        >
            { active && imgSrc && (
                <Image
                    src={imgSrc}
                    alt='Token Logo'
                    size={26} />
            )}
            <Box
                component='div'
                display='flex'
                flexDirection='row'
                columnGap='5px'
            >
                <Typography
                    color='#FFFFFF'
                    fontFamily='Verdana'
                    fontSize='18px'
                    sx={{ textTransform: active ? 'uppercase' : 'none', whiteSpace: 'nowrap' }}
                >
                    { active && symbol ? symbol : 'Select token' }
                </Typography>
                <KeyboardArrowDown sx={{ color: '#FFFFFF' }}/>
            </Box>
        </Box>
    )
}