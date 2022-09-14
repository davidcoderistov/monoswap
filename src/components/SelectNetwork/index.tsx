import React, { useState } from 'react'
import { Box, Typography, styled } from '@mui/material'
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip'
import { KeyboardArrowDown } from '@mui/icons-material'
import NetworkOption from './NetworkOption'
import Image from '../Image'


const options = [
    'Ethereum',
    'Polygon',
]

const imgSources: { [network: string]: string } = {
    'Ethereum': '/ethereumlogo.png',
    'Polygon': '/polygonlogo.png',
}

const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
))(() => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: '#191B1F',
        color: '#FFFFFF',
        borderRadius: '15px',
        minWidth: 240,
        padding: '12px',
    },
}));

export default function SelectNetwork () {

    const [selectedNetwork, setSelectedNetwork] = useState('Ethereum')
    const [open, setOpen] = useState(false)

    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleSelectNetwork = (title: string) => {
        handleClose()
        setSelectedNetwork(title)
    }

    return (
        <HtmlTooltip
            title={
                <React.Fragment>
                    <Typography color='gainsboro' margin='5px'>
                        Select a network
                    </Typography>
                    { options.map((option, index) => (
                        <NetworkOption
                            key={index}
                            title={option}
                            onClick={handleSelectNetwork}
                            imgSrc={imgSources[option]}
                            selected={option === selectedNetwork} />
                    )) }
                </React.Fragment>
            }
            placement='bottom-start'
            enterDelay={0}
            open={open}
            onOpen={handleOpen}
            onClose={handleClose}
        >
            <Box
                component='div'
                sx={{
                    display: 'inline-block',
                    color: '#FFFFFF',
                    backgroundColor: '#191B1F',
                    borderRadius: '20px',
                    paddingX: '10px',
                    paddingY: '7px',
                    cursor: 'default',
                }}
            >
                <Box
                    display='flex'
                    alignItems='center'
                    columnGap='7px'
                >
                    <Image
                        src={imgSources[selectedNetwork]}
                        alt={selectedNetwork}
                        size={25} />
                    <Box
                        component='div'
                        display='flex'
                        columnGap='5px'
                    >
                        <Typography fontSize={16}>{ selectedNetwork }</Typography>
                        <KeyboardArrowDown fontSize='small' sx={{ marginTop: '2px' }} />
                    </Box>
                </Box>
            </Box>
        </HtmlTooltip>
    )
}