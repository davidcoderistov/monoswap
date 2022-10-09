import React, { useState } from 'react'
import { Box, CircularProgress, Typography, Collapse } from '@mui/material'
import { InfoOutlined, KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material'
import Tooltip from '../Tooltip'
import SwapDetailsView from '../SwapDetails'


export interface SwapDetailsProps {
    loading: boolean
    expected: string
    slippage: string
    minimum: string
}

export default function SwapDetails ({ loading, expected, slippage, minimum }: SwapDetailsProps) {

    const [expanded, setExpanded] = useState(false)

    const handleExpand = () => {
        if (!loading) {
            setExpanded(true)
        }
    }

    const handleCollapse = () => {
        setExpanded(false)
    }

    const [tooltipOpen, setTooltipOpen] = useState(false)

    const handleOpenTooltip = () => {
        if (!expanded) {
            setTooltipOpen(true)
        }
    }

    const handleCloseTooltip = () => {
        setTooltipOpen(false)
    }

    return (
        <React.Fragment>
            <Box
                display='flex'
                flexDirection='row'
                justifyContent='space-between'
                alignItems='center'
                marginTop='10px'
                paddingX='15px'
                paddingY='5px'
                bgcolor={ expanded ? '#212429': undefined}
                borderRadius='10px'
            >
                <Box
                    display='flex'
                    flexDirection='row'
                    alignItems='center'
                    columnGap='7px'
                >
                    { loading ? (
                        <React.Fragment>
                            <CircularProgress variant='indeterminate' size={16} sx={{ color: '#C0C2C8' }}/>
                            <Typography color='#C0C2C8' fontSize={14}>
                                Fetching best price...
                            </Typography>
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            <Tooltip
                                title={
                                    <SwapDetailsView
                                        expected={expected}
                                        slippage={slippage}
                                        minimum={minimum} />
                                }
                                placement='bottom'
                                enterDelay={0}
                                open={tooltipOpen}
                                onOpen={handleOpenTooltip}
                                onClose={handleCloseTooltip}
                            >
                                <InfoOutlined
                                    sx={{
                                        color: '#C0C2C8',
                                        fontSize: '18px',
                                        marginTop: '1px',
                                    }}
                                />
                            </Tooltip>
                            <Typography color='#FFFFFF' fontSize='14px'>
                                1 DAI = 0.06321 ETH
                            </Typography>
                        </React.Fragment>
                    )}
                </Box>
                { expanded ? (
                    <KeyboardArrowUp sx={{
                        color: '#C0C2C8',
                        cursor: 'pointer',
                    }} onClick={handleCollapse} />
                ): (
                    <KeyboardArrowDown sx={{
                        color: loading ? '#31353D' : '#C0C2C8',
                        cursor: loading ? 'default' : 'pointer',
                    }} onClick={handleExpand} />
                )}
            </Box>
            <Collapse in={expanded}>
                <Box
                    display='flex'
                    flexDirection='column'
                    rowGap='5px'
                    borderRadius='15px'
                    border='1px solid #40444F'
                    padding='15px'
                    marginTop='10px'
                >
                    <SwapDetailsView
                        expected={expected}
                        slippage={slippage}
                        minimum={minimum} />
                </Box>
            </Collapse>
        </React.Fragment>
    )
}