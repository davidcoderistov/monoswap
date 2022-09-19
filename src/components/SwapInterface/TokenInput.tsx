import React, { useCallback } from 'react'
import { Box, InputBase } from '@mui/material'
import Token, { TokenProps } from '../Token'


export type TokenInputProps = {
    value: string
    onChange: (value: string) => void
} & TokenProps


export default function TokenInput ({ value, onChange, type, symbol, imgSrc, onClick }: TokenInputProps) {

    const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.value)
    }, [onChange])

    return (
        <Box
            component='div'
            display='flex'
            flexDirection='row'
            alignItems='center'
            columnGap='10px'
            paddingX='16px'
            paddingTop='16px'
            paddingBottom={type === 'select' ? '40px' : '16px'}
            bgcolor='#212429'
            borderRadius='20px'
            border='1px solid #191B1F'
            sx={{ '&:hover': { border: '1px solid #40444F' } }}
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
    )
}