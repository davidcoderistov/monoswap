import React from 'react'
import { Box, Skeleton, Typography } from '@mui/material'
import TokenC from '../Token'
import { Token } from '../../types'


interface FavoriteTokensProps {
    tokens: Token[]
    onClick: (token: Token) => void
    onClose: (token: Token) => void
    loading: boolean
}

export default function FavoriteTokens ({ tokens, onClick, onClose, loading }: FavoriteTokensProps) {

    return (
        <Box minHeight='86px'>
            <Box
                component='div'
                display='flex'
                flexDirection='row'
                flexWrap='wrap'
                rowGap='10px'
                columnGap='10px'
            >
                { loading ? (
                    <Skeleton
                        variant='rectangular'
                        animation='wave'
                        height={86}
                        sx={{ backgroundColor: '#2C2F36', width: '100%' }} />
                ): tokens.length > 0 ? (
                    tokens.map(token => (
                        <TokenC
                            key={token.id}
                            type='close'
                            symbol={token.symbol}
                            imgSrc={token.thumbnail}
                            onClick={() => onClick(token)}
                            onClose={() => onClose(token)} />
                    ))
                ): (
                    <Box
                        component='div'
                        display='flex'
                        justifyContent='center'
                        alignItems='center'
                        height='86px'
                        width='100%'
                    >
                        <Typography color='#7A7B7D'>
                            Pin your favorite tokens
                        </Typography>
                    </Box>
                )}
            </Box>
        </Box>
    )
}