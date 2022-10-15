import React from 'react'
import { Box, Typography, Button } from '@mui/material'
import { ErrorOutline, ArrowCircleUpOutlined } from '@mui/icons-material'


interface TransactionStatusProps {
    success: boolean
    onDismiss: () => void
    onView?: () => void
}

export default function TransactionStatus (props: TransactionStatusProps) {

    return (
        <Box
            display='flex'
            flexDirection='column'
            justifyContent='center'
            alignItems='center'
            marginTop='40px'
        >
            { props.success ? (
                <ArrowCircleUpOutlined sx={{ color: '#4C82FB', fontSize: 100 }} />
            ) : (
                <ErrorOutline sx={{ color: '#FD766B', fontSize: 100 }} />
            )}
            <Typography fontSize={20} marginTop='20px'>
                Transaction {props.success ? 'submitted' : 'rejected'}
            </Typography>
            <Button
                variant='contained'
                color='primary'
                size='large'
                fullWidth
                sx={{
                    borderRadius: '20px',
                    textTransform: 'none',
                    marginTop: '30px',
                    padding: '12px'
                }}
                onClick={props.onDismiss}
            >
                <Typography fontSize={20}>
                    {props.success ? 'Close' : 'Dismiss'}
                </Typography>
            </Button>
            { props.success && (
                <Button
                    size='small'
                    sx={{
                        textTransform: 'none',
                        marginTop: '10px'
                    }}
                    onClick={props.onView}
                >
                    <Typography fontSize={12} fontWeight='bold' color='#4C82FB'>
                        View on Etherscan
                    </Typography>
                </Button>
            )}
        </Box>
    )
}