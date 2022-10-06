import React from 'react'
import { Box, Typography } from '@mui/material'
import Image from '../Image'
import { KeyboardArrowDown, Close } from '@mui/icons-material'


export interface TokenProps {
    type: 'button' | 'select' | 'close' | 'view'
    onClick: () => void
    symbol?: string | null
    imgSrc?: string | null
    onClose?: () => void
}

export default function Token ({ type, symbol, imgSrc, onClick, onClose }: TokenProps) {

    const handleClose = (event: React.MouseEvent<HTMLElement>) => {
        if (onClose) {
            event.stopPropagation()
            onClose()
        }
    }

    const isButton = type === 'button'
    const isSelect = type === 'select'
    const isClose = type === 'close'
    const isView = type === 'view'

    return (
        <Box
            component='div'
            display='flex'
            flexDirection='row'
            alignItems='center'
            columnGap='7px'
            paddingY={isClose ? '7px' : '8px'}
            paddingRight={isClose ? '7px' : '8px'}
            paddingLeft={isSelect ? '8px' : isButton ? '12px' : '7px'}
            borderRadius={isView ? undefined : '18px'}
            bgcolor={isView ? undefined : isSelect ? '#2C2F36' : isButton ? '#2172E5' : '#191B1F'}
            sx={{
                ...!isView && {
                    cursor: 'pointer',
                    '&:hover': { backgroundColor: isSelect ? '#40444F' : isButton ? '#1966D4' : '#2C2F36' },
                    ...isClose && { border: '1px solid #40444F' }
                }
            }}
            onClick={onClick}
        >
            { (isSelect || isClose || isView) && imgSrc && (
                <Image
                    src={imgSrc}
                    alt='Token Logo'
                    size={isClose ? 22 : 26} />
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
                    fontSize={isClose ? '14px' : '18px'}
                    sx={{ textTransform: isSelect ? 'uppercase' : 'none', whiteSpace: 'nowrap' }}
                >
                    { isButton ? 'Select token' : symbol }
                </Typography>
                { isView ? null : isClose ? (
                    <Box
                        component='div'
                        display='flex'
                        alignItems='center'
                        sx={{ '&:hover': { backgroundColor: '#40444F' }}}
                        onClick={handleClose}
                    >
                        <Close sx={{ color: '#FFFFFF', fontSize: '17px', marginTop: '1px' }} />
                    </Box>
                ) : (
                    <KeyboardArrowDown sx={{ color: '#FFFFFF' }} />
                )}
            </Box>
        </Box>
    )
}