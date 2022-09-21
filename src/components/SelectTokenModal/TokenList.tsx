import React from 'react'
import { Box } from '@mui/material'
import TokenListItem, { Token } from './TokenListItem'
import _range from 'lodash/range'


export interface TokenListProps {
    tokens: Token[]
    loading: boolean
    onClick: (id: string, index: number) => void
    onPin: (id: string, index: number) => void
}

export default function TokenList ({ tokens, loading, onClick, onPin }: TokenListProps) {

    return (
        <Box
            component='div'
            maxHeight='275px'
            sx={{
                borderTop: '1px solid #40444F',
                marginBottom: '20px',
                ...!loading && {
                    overflowY: 'scroll',
                    overflowX: 'hidden',
                }
            }}
        >
            { loading ? _range(5).map(key => (
                <TokenListItem
                    key={key}
                    loading={true} />
            )): (
                tokens.map((token, index) => (
                    <TokenListItem
                        key={token.id}
                        id={token.id}
                        name={token.name}
                        symbol={token.symbol}
                        thumbnail={token.thumbnail}
                        pinned={token.pinned}
                        loading={false}
                        onClick={() => onClick(token.id, index)}
                        onPin={() => onPin(token.id, index)} />
                ))
            )}
        </Box>
    )
}