import React, { useCallback, useMemo } from 'react'
import { Box, InputBase, Typography } from '@mui/material'
import Token, { TokenProps } from '../Token'
import { roundTo } from '../../utils'


export type TokenInputProps = {
    value: string
    onChange?: (value: string) => void
    balance?: string
    disabled?: boolean
    selectable?: boolean
} & TokenProps


export default function TokenInput ({ value, onChange, balance, disabled, selectable = true, type, symbol, imgSrc, onClick }: TokenInputProps) {

    const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        if (onChange) {
            onChange(event.target.value)
        }
    }, [onChange])

    const isSelect = type === 'select'
    const isView = type === 'view'

    const totalBalance = useMemo(() => {
        if (balance) {
            const balanceNumber = parseFloat(balance)
            if (balanceNumber > 1) {
                return roundTo(balanceNumber, 2).toString()
            } else {
                return roundTo(balanceNumber, 7).toString()
            }
        }
        return balance
    }, [balance])

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
                            '&.MuiInputBase-root.Mui-disabled': {
                                color: 'red' // (default alpha is 0.38)
                            },
                            '&.Mui-disabled': { '.MuiInputBase-input': { 'WebkitTextFillColor': '#7A7C7F' } },
                            font: '32px monospace'
                        }}
                        value={value}
                        onChange={handleChange}
                        readOnly={isView}
                        type='number'
                        placeholder='0.0'
                        disabled={disabled}
                        fullWidth
                    />
                </Box>
                <Token
                    type={type}
                    symbol={symbol}
                    imgSrc={imgSrc}
                    disabled={!selectable}
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
                            sx={{ font: '16px monospace' }}
                        >
                            Balance: { totalBalance }
                        </Typography>
                    )}
                </Box>
            )}
        </Box>
    )
}