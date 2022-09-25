import React, {useState, useEffect, useMemo, useCallback, useRef, useContext } from 'react'
import { Dialog, Box } from '@mui/material'
import SearchTokenModalTitle from './SearchTokenModalTitle'
import SearchToken from './SearchToken'
import FavoriteTokens from './FavoriteTokens'
import TokenList from './TokenList'
import AppContext from '../../context'
import { getTokens } from '../../services'
import { getAnkrBlockchain, getTokenContractAddresses, compareTokens } from '../../utils'
import _uniqBy from 'lodash/uniqBy'
import _debounce from 'lodash/debounce'
import { Token } from '../../types'


export interface SelectTokenModalProps {
    open: boolean
    onClose: () => void
    onTokenSelect: (token: Token) => void
}

export default function SelectTokenModal ({ open, onClose, onTokenSelect }: SelectTokenModalProps) {

    const { tokenData, setTokenData, selectedChainId } = useContext(AppContext)

    const scrollRef = useRef(null)

    const [tokens, setTokens] = useState<Token[]>([])
    const [favoriteTokens, setFavoriteTokens] = useState<Token[]>([])
    const [query, setQuery] = useState('')
    const [loading, setLoading] = useState(false)

    const blockchain = getAnkrBlockchain(selectedChainId)

    useEffect(() => {
        if (tokenData[blockchain].loaded) {
            const addresses = getTokenContractAddresses(blockchain)
            const tokens = tokenData[blockchain].tokens
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
            setTokens(newTokens)
            setFavoriteTokens(favoriteTokens)
            setCurrentTokens(Array.from(newTokens).slice(0, 20))
            setQuery('')
            setStart(0)
            setEnd(20)
        } else {
            const loadTokens = async () => {
                try {
                    setLoading(true)
                    const r: any = await getTokens(blockchain)
                    const tokens: Token[] | null = r?.data?.result?.currencies
                    if (Array.isArray(tokens)) {
                        const data = Array.from(
                            _uniqBy(
                                tokens
                                    .filter(token => {
                                        return token.address && token.address.trim().length > 0 &&
                                            token.name && token.name.trim().length > 0 &&
                                            token.symbol && token.symbol.trim().length > 0 &&
                                            token.thumbnail && token.thumbnail.trim().length > 0
                                    })
                                    .map(token => ({
                                        ...token,
                                        id: `${token.name}-${token.symbol}-${token.decimals}`,
                                        pinned: false,
                                    })),
                                'id'
                            )
                        ).sort(compareTokens)
                        setTokenData({
                            ...tokenData,
                            [blockchain]: {
                                tokens: data,
                                loaded: true,
                            }
                        })
                        setLoading(false)
                    }
                } catch (e) {
                    setLoading(false)
                    console.error(e)
                }
            }
            loadTokens()
        }
    }, [tokenData, setTokenData, blockchain])

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