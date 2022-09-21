import React from 'react'
import { Box } from '@mui/material'
import TokenListItem, { Token } from './TokenListItem'
import InfiniteScroll from 'react-infinite-scroll-component'
import _range from 'lodash/range'


export interface TokenListProps {
    tokens: Token[]
    hasMore: boolean
    onNext: () => void
    onClick: (id: string, index: number) => void
    onPin: (id: string, index: number) => void
}

export default function TokenList ({ tokens, hasMore, onNext, onClick, onPin }: TokenListProps) {

    return (
        <Box
            component='div'
            maxHeight='275px'
            sx={{
                borderTop: '1px solid #40444F',
                marginBottom: '20px',
            }}
        >
            <InfiniteScroll
                dataLength={tokens.length}
                next={onNext}
                hasMore={hasMore}
                loader={_range(5).map(key => (
                    <TokenListItem
                        key={key}
                        loading={true} />
                ))}
                height={275}
                endMessage={<></>}
            >
                {tokens.map((token, index) => (
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
                ))}
            </InfiniteScroll>
        </Box>
    )
}