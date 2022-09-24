import React from 'react'
import { Box } from '@mui/material'
import TokenListItem from './TokenListItem'
import InfiniteScroll from 'react-infinite-scroll-component'
import _range from 'lodash/range'
import { Token } from '../../types'


export interface TokenListProps {
    tokens: Token[]
    hasMore: boolean
    disabled: boolean
    onNext: () => void
    onClick: (token: Token) => void
    onPin: (token: Token) => void
    scrollRef: React.RefObject<HTMLElement>
}

export default function TokenList ({ tokens, hasMore, onNext, onClick, onPin, disabled, scrollRef }: TokenListProps) {

    return (
        <Box
            component='div'
            ref={scrollRef}
            id='scrollableContainer'
            sx={{
                borderTop: '1px solid #40444F',
                marginBottom: '20px',
                height: '275px',
                overflowY: 'scroll',
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
                endMessage={<></>}
                scrollableTarget='scrollableContainer'
            >
                {tokens.map(token => (
                    <TokenListItem
                        key={token.id}
                        id={token.id}
                        name={token.name}
                        symbol={token.symbol}
                        thumbnail={token.thumbnail}
                        pinned={token.pinned}
                        disabled={disabled}
                        loading={false}
                        onClick={() => onClick(token)}
                        onPin={() => onPin(token)} />
                ))}
            </InfiniteScroll>
        </Box>
    )
}