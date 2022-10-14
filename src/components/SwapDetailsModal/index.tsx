import React, { useState, useEffect, useContext } from 'react'
import { Dialog, Box, Typography, Button } from '@mui/material'
import { Close } from '@mui/icons-material'
import ActionButton from '../ActionButton'
import ViewSwapTokens from '../ViewSwapTokens'
import SwapDetails from '../SwapDetails'
import AllowanceButton from '../SwapInterface/ActionButton'
import Tooltip from '../Tooltip'
import { Warning } from '@mui/icons-material'
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
    const [errorMessage, setErrorMessage] = useState<string | null>(null)

    useEffect(() => {
        if (open) {
            if (sellToken && selectedAccount) {
                const tryCheckAllowance = async () => {
                    try {
                        const allowance = await checkAllowance(selectedChainId, sellToken, selectedAccount)
                        setAllowance(parseFloat(swapDetails.sellAmount) <= allowance)
                        setLoadingAllowance(false)
                    } catch (e) {
                        console.error(e)
                        setErrorMessage(`Monoswap could not check your ${sellToken.symbol} allowance.`)
                    }
                }
                tryCheckAllowance()
            }
        } else {
            setLoadingAllowance(true)
            setAllowance(false)
            setErrorMessage(null)
        }
    }, [open, selectedChainId, selectedAccount, sellToken, swapDetails.sellAmount])

    const [tooltipOpen, setTooltipOpen] = useState(false)

    const handleOpenTooltip = () => {
        setTooltipOpen(true)
    }

    const handleCloseTooltip = () => {
        setTooltipOpen(false)
    }

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
                    <Box
                        component='div'
                        display='flex'
                        flexDirection='row'
                        alignItems='center'
                        columnGap='10px'
                    >
                        <Typography>Confirm Swap</Typography>
                        { errorMessage && (
                            <Tooltip
                                title={<Typography variant='subtitle2'>
                                    { errorMessage }
                                </Typography>}
                                placement='bottom-start'
                                enterDelay={0}
                                open={tooltipOpen}
                                onOpen={handleOpenTooltip}
                                onClose={handleCloseTooltip}
                            >
                                <Warning
                                    color='error'
                                    sx={{
                                        fontSize: '18px',
                                        marginTop: '1px',
                                    }}
                                />
                            </Tooltip>
                        )}
                    </Box>
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