import React from 'react'
import { Dialog, Box, Typography, Button } from '@mui/material'
import { Close } from '@mui/icons-material'
import ActionButton from '../ActionButton'
import ViewSwapTokens from '../ViewSwapTokens'
import SwapDetails from '../SwapDetails'


export default function SwapDetailsModal () {

    return (
        <Dialog
            open={true}
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
                    <ActionButton disabled={false} onClick={() => {}}>
                        <Close />
                    </ActionButton>
                </Box>
                <ViewSwapTokens
                    fromValue='1'
                    fromSymbol='1INCH'
                    fromImgSrc='https://assets.coingecko.com/coins/images/13469/thumb/1inch-token.png?1608803028'
                    toValue='0.00262297'
                    toSymbol='AAVE'
                    toImgSrc='https://assets.coingecko.com/coins/images/12645/thumb/AAVE.png?1601374110' />
                <Typography color='#FFFFFF' fontSize='14px' marginY='15px' marginLeft='15px'>
                    1 AAVE = 381.2 1INCH
                </Typography>
                <SwapDetails
                    bgcolor='#212429'
                    borderRadius='20px'
                    padding='15px'
                    expected='0.00262297'
                    slippage='2.00'
                    minimum='0.00257154' />
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
                        0.002571 AAVE
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