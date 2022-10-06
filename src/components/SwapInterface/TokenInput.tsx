import React, { useCallback } from 'react'
import { Box, InputBase, Typography } from '@mui/material'
import Token, { TokenProps } from '../Token'


export type TokenInputProps = {
    value: string
    onChange: (value: string) => void
    balance?: string
} & TokenProps


export default function TokenInput ({ value, onChange, balance, type, symbol, imgSrc, onClick }: TokenInputProps) {

    const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.value)
    }, [onChange])

    const isSelect = type === 'select'
    const isView = type === 'view'

    return (
        <Box
            component='div'
            display='flex'
            flexDirection='column'
            paddingX='16px'
            paddingTop={isView ? '8px': '16px'}
            paddingBottom='8px'
            bgcolor='#212429'
            borderRadius='20px'
            border='1px solid #191B1F'
            sx={{ '&:hover': { border: '1px solid #40444F' } }}
        >
            <Box
                component='div'
                display='flex'
                flexDirection='row'
                alignItems='center'
                columnGap='10px'
                >
                <Box
                    flex='1 1 auto'
                >
                    <InputBase
                        sx={{
                            '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
                                display: 'none',
                            },
                            '& input[type=number]': {
                                MozAppearance: 'textfield'
                            },
                            color: '#FFFFFF',
                            font: '32px monospace'
                        }}
                        value={value}
                        onChange={handleChange}
                        readOnly={isView}
                        type='number'
                        placeholder='0.0'
                        fullWidth
                    />
                </Box>
                <Token
                    type={type}
                    symbol={symbol}
                    imgSrc={imgSrc}
                    onClick={onClick}
                />
            </Box>
            { isSelect && (
                <Box
                    component='div'
                    display='flex'
                    flexDirection='row'
                    justifyContent='end'
                    alignItems='center'
                    height={24}
                >
                    { balance && (
                        <Typography
                            color='#8F96AC'
                            sx={{ font: '16px monospace', cursor: 'pointer' }}
                        >
                            Balance: { balance }
                        </Typography>
                    )}
                </Box>
            )}
        </Box>
    )
}