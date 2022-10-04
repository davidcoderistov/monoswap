import React, { useState, useEffect, useMemo, useCallback, useRef, useContext } from 'react'
import { Dialog, Box } from '@mui/material'
import SearchTokenModalTitle from './SearchTokenModalTitle'
import SearchToken from './SearchToken'
import FavoriteTokens from './FavoriteTokens'
import TokenList from './TokenList'
import AppContext from '../../context'
import { getTokenContractAddresses } from '../../utils'
import _uniqBy from 'lodash/uniqBy'
import _debounce from 'lodash/debounce'
import { TokenI, Token } from '../../types'


export interface SelectTokenModalProps {
    open: boolean
    onClose: () => void
    onTokenSelect: (token: Token) => void
}

export default function SelectTokenModal ({ open, onClose, onTokenSelect }: SelectTokenModalProps) {

    const { selectedChainId, tokens: tokenData, tokensLoading: loading } = useContext(AppContext)

    const scrollRef = useRef(null)

    const mapToken = useCallback((token: TokenI, addresses: string[]): Token => ({
        id: `${token.name}-${token.symbol}-${token.address}`,
        name: token.name,
        symbol: token.symbol,
        address: token.address,
        decimals: token.decimals,
        thumbnail: token.logoURI,
        pinned: addresses.some(address => address === token.address),
    }), [])

    const filterMapToken = useCallback((tokens: TokenI[], addresses: string[], network: '137' | '10' | '42161'): Token[] => {
        return _uniqBy(
            tokens
                .filter(token => token.extensions?.bridgeInfo[network]?.tokenAddress)
                .map(token => mapToken({
                    ...token,
                    address: token.extensions?.bridgeInfo[network]?.tokenAddress ?? ''
                }, addresses)),
            'id'
        )
    }, [mapToken])

    const chainTokens: Token[] = useMemo(() => {
        const addresses = getTokenContractAddresses(selectedChainId)
        switch (selectedChainId) {
            case 1:
                return _uniqBy(tokenData.map(token => mapToken(token, addresses)), 'id')
            case 137:
                return filterMapToken(tokenData, addresses, '137')
            case 10:
                return filterMapToken(tokenData, addresses, '10')
            case 42161:
                return filterMapToken(tokenData, addresses, '42161')
            default:
                return []
        }
    }, [tokenData, selectedChainId, mapToken, filterMapToken])

    const [tokens, setTokens] = useState<Token[]>([])
    const [filteredTokens, setFilteredTokens] = useState<Token[]>([])
    const [query, setQuery] = useState('')

    const [end, setEnd] = useState(20)
    const [hasMore, setHasMore] = useState(true)

    useEffect(() => {
        setTokens(chainTokens)
        setFilteredTokens(chainTokens)
        setQuery('')
        setEnd(20)
    }, [chainTokens])

    const handleChangeQuery = (query: string) => {
        setQuery(query)
        debouncedFilterTokensByQuery(tokens, query)
    }

    const handleClearQuery = () => {
        setQuery('')
        filterTokensByQuery(tokens, '')
    }

    const filterTokensByQuery = (tokens: Token[], query: string) => {
        const trimmedQuery = query.trim()
        let filteredTokens = Array.from(tokens)
        if (trimmedQuery.length > 0) {
            filteredTokens = tokens.filter(token => {
                const q = trimmedQuery.toLowerCase()
                return token.name.toLowerCase().includes(q) ||
                    token.symbol.toLowerCase().includes(q) ||
                    token.address.toLowerCase().includes(q)
            })
        }
        setFilteredTokens(filteredTokens)
        // @ts-ignore
        if (scrollRef && scrollRef.current && scrollRef.current.scrollTop) {
            // @ts-ignore
            scrollRef.current.scrollTop = 0
        }
        setEnd(20)
        setHasMore(currentTokens.length < filteredTokens.length)
    }

    const debouncedFilterTokensByQuery = useMemo(
        () => _debounce(filterTokensByQuery, 500), []
    )

    const handleClickToken = (token: Token) => {
        onTokenSelect(token)
    }

    const toggleTokens = (tokens: Token[], token: Token) => {
        return tokens.map(t => {
            if (t.id === token.id) {
                return {
                    ...t,
                    pinned: !token.pinned,
                }
            }
            return t
        })
    }

    const handlePinToken = (token: Token) => {
        setTokens(toggleTokens(tokens, token))
        setFilteredTokens(toggleTokens(filteredTokens, token))
    }

    const handleCloseToken = (token: Token) => {
        setTokens(toggleTokens(tokens, token))
        setFilteredTokens(toggleTokens(filteredTokens, token))
    }

    const onNext = () => {
        if (currentTokens.length >= filteredTokens.length) {
            setHasMore(false)
            return
        }

        setTimeout(() => {
            setEnd(end + 20)
        }, 500)
    }

    const favoriteTokens = useMemo(() => {
        return tokens.filter(token => token.pinned)
    }, [tokens])

    const currentTokens = useMemo(() => {
        return Array.from(filteredTokens).slice(0, end)
    }, [filteredTokens, end])

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
                <SearchTokenModalTitle onClose={onClose} />
                <SearchToken
                    value={query}
                    onChange={handleChangeQuery}
                    onClear={handleClearQuery} />
                <FavoriteTokens
                    loading={loading}
                    tokens={favoriteTokens}
                    onClick={handleClickToken}
                    onClose={handleCloseToken} />
            </Box>
            <TokenList
                scrollRef={scrollRef}
                tokens={currentTokens}
                hasMore={hasMore}
                disabled={favoriteTokens.length === 6}
                onNext={onNext}
                onClick={handleClickToken}
                onPin={handlePinToken} />
        </Dialog>
    )
}