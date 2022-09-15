import React from 'react'
import { Box, Typography, Button } from '@mui/material'
import { SportsVolleyball, MultilineChart } from '@mui/icons-material'


const AccountButton = (props: { title: string, onClick: () => void }) => {

    return (
        <Button
            sx={{
                textTransform: 'none',
                border: '1px solid #2C2F36',
                borderRadius: '15px',
                '&:hover': {
                    border: '1px solid #2172E5',
                    textDecoration: 'underline'
                }
            }}
            size='small'
            variant='text'
            onClick={props.onClick}
        >
            { props.title }
        </Button>
    )
}

interface AccountViewProps {
    address: string
    onDisconnect: () => void
    onChange: () => void
}

export default function AccountView (props: AccountViewProps) {

    const length = props.address.length

    return (
        <React.Fragment>
            <Box mt='15px' />
            <Box
                component='div'
                bgcolor='#191B1F'
                padding='15px'
                border='1px solid #2C2F36'
                borderRadius='30px'
                marginX='20px'
            >
                <Box
                    component='div'
                    display='flex'
                    justifyContent='space-between'
                    alignItems='center'
                >
                    <Typography color='#848B9F' fontSize={14}>
                        Connected with MetaMask
                    </Typography>
                    <AccountButton
                        title='Disconnect'
                        onClick={props.onDisconnect} />
                    <AccountButton
                        title='Change'
                        onClick={props.onChange} />
                </Box>
                <Box
                    component='div'
                    display='flex'
                    flexDirection='column'
                    marginTop='10px'
                >
                    <Box
                        component='div'
                        display='flex'
                        alignItems='center'
                        columnGap='5px'
                    >
                        <SportsVolleyball sx={{ color: '#018E72', fontSize: '25px' }} />
                        <Typography fontSize={20} color='white'>
                            { length >= 10 ?
                                `${props.address.slice(0, 6)}...${props.address.slice(length - 4, length)}` : props.address }
                        </Typography>
                    </Box>
                    <Box>
                        <Button
                            sx={{
                                textTransform: 'none',
                                color: '#848B9F',
                                '&:hover': {
                                    color: '#9f9f9f'
                                },
                                ml: 1,
                            }}
                            size='small'
                            variant='text'
                            startIcon={<MultilineChart />}
                        >
                            View on Explorer
                        </Button>
                    </Box>
                </Box>
            </Box>
            <Box mt='15px' />
            <Box
                component='div'
                bgcolor='#2C2F36'
                padding='20px'
            >
                <Typography fontSize={16}>
                    Your transactions will appear here...
                </Typography>
            </Box>
        </React.Fragment>
    )
}