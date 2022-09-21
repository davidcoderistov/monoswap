import React from 'react'
import { Box, Typography, IconButton, Skeleton } from '@mui/material'
import { FilterAlt, FilterAltOutlined } from '@mui/icons-material'
import Image from '../Image'


export type Token = {
    id: string
    name: string
    symbol: string
    thumbnail: string
    pinned: boolean
}

type ViewProps = {
    loading: false
    onClick: () => void
    onPin: () => void
} & Token

type LoadingProps = {
    loading: true
    onClick?: never
    onPin?: never
    name?: never
    symbol?: never
    thumbnail?: never
    pinned?: never
}

export type TokenListItemProps = ViewProps | LoadingProps

export default function TokenListItem ({ name, symbol, thumbnail, pinned, loading, onClick, onPin }: TokenListItemProps) {

    const handlePin = (event: React.MouseEvent<HTMLElement>) => {
        if (!loading) {
            event.stopPropagation()
            onPin()
        }
    }

    return (
        <Box
            component='div'
            display='flex'
            flexDirection='row'
            justifyContent='space-between'
            alignItems='center'
            paddingX='20px'
            paddingY='10px'
            sx={{ ...!loading && { '&:hover': { backgroundColor: '#2C2F36' }, cursor: 'pointer' } }}
            onClick={onClick}
        >
            <Box
                component='div'
                display='flex'
                flexDirection='row'
                columnGap='15px'
                alignItems='center'
                sx={{ minWidth: 0 }}
            >
                { loading ? (
                    <Skeleton variant='circular' animation='wave' height={35} width={35} sx={{ backgroundColor: '#2C2F36' }} />
                ): (
                    <Image
                        src={thumbnail}
                        alt={name}
                        size={35} />
                )}
                <Box
                    component='div'
                    display='flex'
                    flexDirection='column'
                    justifyContent='center'
                    sx={{ minWidth: 0 }}
                >
                    <Typography sx={{
                        color: '#FFFFFF',
                        lineHeight: 1.2,
                    }} noWrap>
                        { loading ? (
                            <Skeleton variant='text' animation='wave' width={150} sx={{ backgroundColor: '#2C2F36' }} />
                        ): name }
                    </Typography>
                    <Typography sx={{
                        color: '#8F96AC',
                        lineHeight: 1.2,
                        fontSize: '12px'
                    }} noWrap>
                        { loading ? (
                            <Skeleton variant='text' animation='wave' width={100} sx={{ backgroundColor: '#2C2F36' }} />
                        ): symbol }
                    </Typography>
                </Box>
            </Box>
            { loading ? (
                <Skeleton variant='circular' animation='wave' height={15} width={15} sx={{ backgroundColor: '#2C2F36' }} />
            ): (
                <IconButton sx={{ color: '#FFFFFF', padding: 0, '&:hover': { backgroundColor: '#40444F' }}} onClick={handlePin}>
                    { pinned ? (
                        <FilterAlt sx={{ fontSize: '20px' }} />
                    ) : (
                        <FilterAltOutlined sx={{ fontSize: '20px' }}/>
                    )}
                </IconButton>
            )}
        </Box>
    )
}