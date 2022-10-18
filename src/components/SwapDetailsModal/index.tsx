import React, { useState, useEffect, useContext } from 'react'
import { Dialog, Box, Typography, Button } from '@mui/material'
import { Close } from '@mui/icons-material'
import ActionButton from '../ActionButton'
import ViewSwapTokens from '../ViewSwapTokens'
import SwapDetails from '../SwapDetails'
import AllowanceButton from '../SwapInterface/ActionButton'
import ConfirmationView from './ConfirmationView'
import TransactionStatus from './TransactionStatus'
import Tooltip from '../Tooltip'
import { Warning } from '@mui/icons-material'
import { Token } from '../../types'
import { checkAllowance, approveAllowance, getQuote } from '../../services'
import AppContext from '../../context'
import { Transaction } from '../../types'
import { getChainExplorerUrl } from '../../utils'


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
    onTransactionSubmitted: (transaction: Transaction) => void
    onClose: () => void
}

export default function SwapDetailsModal ({ open, sellToken, buyToken, swapDetails, onTransactionSubmitted, onClose }: SwapDetailsModalProps) {

    const { selectedChainId, selectedAccount, provider } = useContext(AppContext)

    const [loadingAllowance, setLoadingAllowance] = useState(true)
    const [allowance, setAllowance] = useState(false)
    const [approvingAllowance, setApprovingAllowance] = useState(false)
    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    const [swapping, setSwapping] = useState(false)
    const [swapConfirming, setSwapConfirming] = useState(true)
    const [swapError, setSwapError] = useState(false)
    const [hash, setHash] = useState<string | null>(null)

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
        }
    }, [open, selectedChainId, selectedAccount, sellToken, swapDetails.sellAmount])

    useEffect(() => {
        if (!open) {
            setTimeout(() => {
                setLoadingAllowance(true)
                setAllowance(false)
                setApprovingAllowance(false)
                setErrorMessage(null)
                setSwapping(false)
                setSwapConfirming(true)
                setSwapError(false)
                setHash(null)
            }, 100)
        }
    }, [open])

    const [tooltipOpen, setTooltipOpen] = useState(false)

    const handleOpenTooltip = () => {
        setTooltipOpen(true)
    }

    const handleCloseTooltip = () => {
        setTooltipOpen(false)
    }

    const tryApproveAllowance = async () => {
        setApprovingAllowance(true)
        setErrorMessage(null)
        if (selectedChainId && selectedAccount && sellToken) {
            try {
                const approved = await approveAllowance(
                    selectedChainId,
                    sellToken,
                    swapDetails.sellAmount,
                    selectedAccount
                )
                if (approved?.status) {
                    setApprovingAllowance(false)
                    setAllowance(true)
                    return
                }
            } catch (e) {
                console.error(e)
            }
        }
        setApprovingAllowance(false)
        setErrorMessage(`Monoswap could not approve your ${sellToken?.symbol} allowance.`)
    }

    const handleOnApproveAllowance = () => {
        tryApproveAllowance()
    }

    const trySwapTokens = async () => {
        setSwapping(true)
        setSwapConfirming(true)
        if (selectedChainId && selectedAccount && sellToken && buyToken && provider) {
            try {
                const quoteTx = await getQuote(selectedChainId, sellToken, buyToken, swapDetails.sellAmount, selectedAccount)
                const signer = provider.getSigner()
                const tx = await signer.sendTransaction({
                    from: quoteTx.from,
                    to: quoteTx.to,
                    data: quoteTx.data,
                    value: quoteTx.value,
                    gasLimit: quoteTx.gas,
                    gasPrice: quoteTx.gasPrice,
                    chainId: quoteTx.chainId,
                })
                setSwapConfirming(false)
                setSwapError(false)
                setHash(tx.hash)
                onTransactionSubmitted({
                    hash: tx.hash,
                    chainId: selectedChainId,
                    sellTokenSymbol: sellToken.symbol,
                    sellTokenThumbnail: sellToken.thumbnail,
                    sellAmount: swapDetails.sellAmount,
                    buyTokenSymbol: buyToken.symbol,
                    buyTokenThumbnail: buyToken.thumbnail,
                    buyAmount: swapDetails.buyAmount,
                    status: 'pending',
                })
                return
            } catch (e) {
                console.error(e)
            }
        }
        setSwapConfirming(false)
        setSwapError(true)
    }

    const handleConfirmSwap = () => {
        trySwapTokens()
    }

    const handleDismiss = () => {
        onClose()
    }

    const handleViewTransaction = () => {
        if (selectedChainId && hash) {
            const baseUrl = getChainExplorerUrl(selectedChainId)
            if (baseUrl) {
                window.open(`${baseUrl}/tx/${hash}`)
            }
        }
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
                        { !swapping && (
                            <Typography>Confirm Swap</Typography>
                        )}
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
                { swapping ?
                    swapConfirming ? (
                        <ConfirmationView
                            message={`Swapping ${swapDetails.sellAmount} ${sellToken?.symbol} for ${swapDetails.buyAmount} ${buyToken?.symbol}`} />
                    ) : (
                        <TransactionStatus
                            success={!swapError}
                            onDismiss={handleDismiss}
                            onView={handleViewTransaction} />
                    ) : approvingAllowance ? (
                        <ConfirmationView message={`Approving allowance for ${swapDetails.sellAmount} ${sellToken?.symbol}`} />
                    ) : (
                        <>
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
                                    onClick={handleOnApproveAllowance} />
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
                                }}
                                onClick={handleConfirmSwap}>
                                Confirm Swap
                            </Button>
                        </>
                    )}
            </Box>
        </Dialog>
    )
}