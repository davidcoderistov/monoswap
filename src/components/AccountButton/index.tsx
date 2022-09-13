import React from 'react'
import { Box, Typography } from '@mui/material'
import { SportsVolleyball } from '@mui/icons-material'


interface AccountButtonProps {
    address: string
    onClick: () => void
}

export default function AccountButton (props: AccountButtonProps) {

    const length = props.address.length

    return (
        <Box
            component='div'
            sx={{
                display: 'inline-block',
                color: '#FFFFFF',
                backgroundColor: '#212429',
                border: '1px solid #7B679A',
                borderRadius: '20px',
                paddingX: '15px',
                paddingY: '9px',
                cursor: 'pointer',
            }}
            onClick={props.onClick}
        >
            <Box
                display='flex'
                alignItems='center'
                columnGap='7px'
            >
                <Typography fontSize={16}>
                    { length >= 10 ?
                        `${props.address.slice(0, 6)}...${props.address.slice(length - 4, length)}` : props.address }
                </Typography>
                <SportsVolleyball sx={{ color: '#018E72', fontSize: '25px' }} />
            </Box>
        </Box>
    )
}