import React, { useState, useEffect, useMemo, useCallback, useRef, useContext } from 'react'
import { Dialog, Box } from '@mui/material'
import SearchTokenModalTitle from './SearchTokenModalTitle'
import SearchToken from './SearchToken'
import FavoriteTokens from './FavoriteTokens'
import TokenList from './TokenList'
import AppContext from '../../context'
import { getAnkrBlockchain, getTokenContractAddresses } from '../../utils'
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

    const [favoriteTokens, setFavoriteTokens] = useState<Token[]>([])
    const [query, setQuery] = useState('')

    const blockchain = getAnkrBlockchain(selectedChainId)

    const mapToken = useCallback((token: TokenI): Token => ({
        id: `${token.name}-${token.symbol}-${token.address}`,
        name: token.name,
        symbol: token.symbol,
        address: token.address,
        decimals: token.decimals,
        thumbnail: token.logoURI,
        pinned: false,
    }), [])

    const filterMapToken = useCallback((tokens: TokenI[], network: '137' | '10' | '42161'): Token[] => {
        return tokens
            .filter(token => token.extensions?.bridgeInfo[network]?.tokenAddress)
            .map(token => mapToken({
                ...token,
                address: token.extensions?.bridgeInfo[network]?.tokenAddress ?? ''
            }))
    }, [mapToken])

    const tokens: Token[] = useMemo(() => {
        switch (blockchain) {
            case 'eth':
                return tokenData.map(mapToken)
            case 'polygon':
                return filterMapToken(tokenData, '137')
            case 'optimism':
                return filterMapToken(tokenData, '10')
            case 'arbitrum':
                return filterMapToken(tokenData, '42161')
            default:
                return []
        }
    }, [tokenData, blockchain, mapToken, filterMapToken])

    useEffect(() => {
        const addresses = getTokenContractAddresses(blockchain)
        const favoriteTokens: Token[] = []
        const newTokens = tokens.map(token => {
            if (token.address) {
                const tokenAddress = token.address.toLowerCase()
                const firstAddress = addresses[0].toLowerCase()
                const secondAddress = addresses[1].toLowerCase()
                const thirdAddress = addresses[2].toLowerCase()
                const fourthAddress = addresses[3].toLowerCase()
                if (tokenAddress === firstAddress ||
                    tokenAddress === secondAddress ||
                    tokenAddress === thirdAddress ||
                    tokenAddress === fourthAddress) {
                    const newToken = {
                        ...token,
                        pinned: true,
                    }
                    favoriteTokens.push(newToken)
                    return newToken
                }
            }
            return token
        })
        setFavoriteTokens(favoriteTokens)
        setCurrentTokens(Array.from(newTokens).slice(0, 20))
        setQuery('')
        setStart(0)
        setEnd(20)
    }, [tokens, blockchain])

    const [currentTokens, setCurrentTokens] = useState<Token[]>([])
    const [hasMore, setHasMore] = useState(true)
    const [start, setStart] = useState(0)
    const [end, setEnd] = useState(20)

    const [filteredTokens, setFilteredTokens] = useState<Token[]>([])

    const filterTokensByQuery = useCallback((query: string) => {
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
        const currentTokens = Array.from(filteredTokens).slice(0, 20)
        setFilteredTokens(filteredTokens)
        setCurrentTokens(currentTokens)
        // @ts-ignore
        if (scrollRef && scrollRef.current && scrollRef.current.scrollTop) {
            // @ts-ignore
            scrollRef.current.scrollTop = 0
        }
        setStart(0)
        setEnd(20)
        setHasMore(currentTokens.length < filteredTokens.length)
    }, [tokens])

    const debouncedHandleChangeQuery = useMemo(
        () => _debounce(filterTokensByQuery, 500)
    , [filterTokensByQuery])

    useEffect(() => {
        debouncedHandleChangeQuery(query)
    }, [debouncedHandleChangeQuery, query])

    const handleClickToken = (token: Token) => {
        onTokenSelect(token)
    }

    const handlePinToken = (token: Token) => {
        const pinned = !token.pinned
        setCurrentTokens(currentTokens.map(t => {
            if (t.id === token.id) {
                return {
                    ...t,
                    pinned,
                }
            }
            return t
        }))
        if (pinned) {
            setFavoriteTokens([...favoriteTokens, {...token}])
        } else {
            setFavoriteTokens(favoriteTokens.filter(t => t.id !== token.id))
        }
    }

    const handleCloseToken = (token: Token) => {
        setCurrentTokens(currentTokens.map(t => {
            if (t.id === token.id) {
                return {
                    ...t,
                    pinned: false,
                }
            }
            return t
        }))
        setFavoriteTokens(favoriteTokens.filter(t => t.id !== token.id))
    }

    const handleClearQuery = () => {
        setQuery('')
    }

    const onNext = () => {
        if (currentTokens.length >= filteredTokens.length) {
            setHasMore(false)
            return
        }
        setTimeout(() => {
            setCurrentTokens(currentTokens.concat(Array.from(filteredTokens).slice(start + 20, end + 20)))
            setStart(start + 20)
            setEnd(end + 20)
        }, 500)
    }

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
                    onChange={setQuery}
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