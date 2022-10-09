import React from 'react'
import { Box, Typography, BoxProps } from '@mui/material'


const SwapDetailsRow = (props: { title: string, subtitle: string, secondary?: boolean }) => (
    <Box
        display='flex'
        flexDirection='row'
        justifyContent='space-between'
        alignItems='center'
        color={props.secondary ? '#848B9F': '#FFFFFF'}
    >
        <Typography fontSize={14}>
            { props.title }
        </Typography>
        <Typography fontSize={14} textAlign='end'>
            { props.subtitle }
        </Typography>
    </Box>
)

interface CustomProps {
    expected: string
    slippage: string
    minimum: string
}

export type SwapDetailsProps = CustomProps & BoxProps

export default function SwapDetails ({ expected, slippage, minimum, ...rest }: SwapDetailsProps) {

    return (
        <Box {...rest}>
            <SwapDetailsRow
                title='Expected Output'
                subtitle={`${expected} DAI`} />
            <SwapDetailsRow
                title='Slippage'
                subtitle={`${slippage}%`} />
            <Box borderTop='1px solid #40444F' marginTop='5px' />
            <SwapDetailsRow
                title='Minimum received after slippage'
                subtitle={`${minimum} DAI`}
                secondary />
        </Box>
    )
}