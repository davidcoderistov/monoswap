import React, { useState } from 'react'
import { Box, Typography, styled } from '@mui/material'
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip'
import { KeyboardArrowDown } from '@mui/icons-material'
import NetworkOption from './NetworkOption'
import Image from '../Image'
import { IMAGES } from '../../config'


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
}))

export interface SelectNetworkProps {
    selectedNetwork: string
    selectedImgSrc: string | null
    onChange: (network: string) => void
}

export default function SelectNetwork ({ selectedNetwork, selectedImgSrc, onChange }: SelectNetworkProps) {

    const [open, setOpen] = useState(false)

    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleSelectNetwork = (title: string) => {
        handleClose()
        onChange(title)
    }

    return (
        <HtmlTooltip
            title={
                <React.Fragment>
                    <Typography color='gainsboro' margin='5px'>
                        Select a network
                    </Typography>
                    { Object.keys(IMAGES).map((network, index) => (
                        <NetworkOption
                            key={index}
                            title={network}
                            onClick={handleSelectNetwork}
                            imgSrc={IMAGES[network]}
                            selected={network === selectedNetwork} />
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
                    { selectedImgSrc && (
                        <Image
                            src={selectedImgSrc}
                            alt={selectedNetwork}
                            size={25} />
                    )}
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