import React, { useState, useEffect, useContext } from 'react'
import { Dialog, Box, Typography, Button } from '@mui/material'
import { Close } from '@mui/icons-material'
import ActionButton from '../ActionButton'
import ViewSwapTokens from '../ViewSwapTokens'
import SwapDetails from '../SwapDetails'
import AllowanceButton from '../SwapInterface/ActionButton'
import { Token } from '../../types'
import { checkAllowance } from '../../services'
import AppContext from '../../context'


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

    const { selectedChainId, selectedAccount } = useContext(AppContext)

    const [loadingAllowance, setLoadingAllowance] = useState(true)
    const [allowance, setAllowance] = useState(false)

    useEffect(() => {
        if (open) {
            if (sellToken && selectedAccount) {
                const tryCheckAllowance = async () => {
                    setLoadingAllowance(true)
                    try {
                        const allowance = await checkAllowance(selectedChainId, sellToken, selectedAccount)
                        setAllowance(parseFloat(swapDetails.sellAmount) <= allowance)
                        setLoadingAllowance(false)
                    } catch (e) {
                        console.error(e)
                    }
                }
                tryCheckAllowance()
            }
        } else {
            setLoadingAllowance(true)
            setAllowance(false)
        }
    }, [open, selectedChainId, selectedAccount, sellToken, swapDetails.sellAmount])

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
                { !loadingAllowance && !allowance && (
                    <AllowanceButton
                        type='actionable'
                        name={`Allow Monoswap to use your ${sellToken?.symbol}`}
                        onClick={() => {}} />
                )}
                <Button
                    variant='contained'
                    color='primary'
                    size='large'
                    fullWidth
                    disabled={!allowance}
                    sx={{
                        borderRadius: '20px',
                        textTransform: 'none',
                        marginTop: '5px',
                        '&.Mui-disabled': {
                            backgroundColor: '#23252B',
                            color: '#65676C',
                        },
                    }}>
                    Confirm Swap
                </Button>
            </Box>
        </Dialog>
    )
}