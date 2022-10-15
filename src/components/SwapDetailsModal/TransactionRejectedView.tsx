import React from 'react'
import { Box, Typography, Button } from '@mui/material'
import { ErrorOutline } from '@mui/icons-material'


interface TransactionRejectedViewProps {
    onDismiss: () => void
}

export default function TransactionRejectedView (props: TransactionRejectedViewProps) {

    return (
        <Box
            display='flex'
            flexDirection='column'
            justifyContent='center'
            alignItems='center'
            marginTop='40px'
        >
            <ErrorOutline sx={{ color: '#FD766B', fontSize: 100 }} />
            <Typography fontSize={20} marginTop='20px'>
                Transaction rejected
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
                    padding: '15px'
                }}
                onClick={props.onDismiss}
            >
                <Typography fontSize={20}>
                    Dismiss
                </Typography>
            </Button>
        </Box>
    )
}