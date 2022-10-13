import React from 'react'
import { Dialog, Box, Typography, Button } from '@mui/material'
import { Close } from '@mui/icons-material'
import ActionButton from '../ActionButton'
import ViewSwapTokens from '../ViewSwapTokens'
import SwapDetails from '../SwapDetails'
import { Token } from '../../types'


interface SwapDetailsI {
    sellAmount: string
    buyAmount: string
    price: string
    expected: string
    slippage: string
    minimum: string
}

interface SwapDetailsModalProps {
    open: boolean
    sellToken: Token | null
    buyToken: Token | null
    swapDetails: SwapDetailsI
    onClose: () => void
}

export default function SwapDetailsModal ({ open, sellToken, buyToken, swapDetails, onClose }: SwapDetailsModalProps) {

    return (
        <Dialog
            open={open}
            fullWidth
            sx={{
                '.MuiDialog-paper': {
                    backgroundColor: '#191B1F',
                    borderRadius: '30px',
                    maxWidth: '430px'
                }
            }}
        >
            <Box
                component='div'
                color='#FFFFFF'
                padding='20px'
            >
                <Box
                    component='div'
                    display='flex'
                    justifyContent='space-between'
                    alignItems='center'
                    marginBottom='15px'
                >
                    <Typography>Confirm Swap</Typography>
                    <ActionButton disabled={false} onClick={onClose}>
                        <Close />
                    </ActionButton>
                </Box>
                <ViewSwapTokens
                    fromValue={swapDetails.sellAmount}
                    fromSymbol={sellToken?.symbol ?? ''}
                    fromImgSrc={sellToken?.thumbnail ?? ''}
                    toValue={swapDetails.buyAmount}
                    toSymbol={buyToken?.symbol ?? ''}
                    toImgSrc={buyToken?.thumbnail ?? ''} />
                <Typography color='#FFFFFF' fontSize='14px' marginY='15px' marginLeft='15px'>
                    1 {sellToken?.symbol} = {swapDetails.price} {buyToken?.symbol}
                </Typography>
                <SwapDetails
                    bgcolor='#212429'
                    borderRadius='20px'
                    padding='15px'
                    symbol={buyToken?.symbol ?? ''}
                    expected={swapDetails.expected}
                    slippage={swapDetails.slippage}
                    minimum={swapDetails.minimum} />
                <Typography
                    component='div'
                    color='#989AA0'
                    margin='15px'
                    fontSize={12}
                    fontStyle='italic'
                >
                    Output is estimated. You will receive at least <Typography
                            component='span'
                            color='#C3C5CB'
                            fontSize={12}
                            fontWeight='bold'
                        >
                        {swapDetails.minimum} {buyToken?.symbol}
                    </Typography> or the transaction will revert.
                </Typography>
                <Button
                    variant='contained'
                    color='primary'
                    size='large'
                    fullWidth
                    sx={{ borderRadius: '20px', textTransform: 'none', marginTop: '5px' }}
                >
                    Confirm Swap
                </Button>
            </Box>
        </Dialog>
    )
}