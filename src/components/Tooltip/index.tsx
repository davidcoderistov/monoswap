import React from 'react'
import {styled, Tooltip as MUITooltip} from '@mui/material'
import { tooltipClasses, TooltipProps } from '@mui/material/Tooltip'


const Tooltip = styled(({ className, ...props }: TooltipProps) => (
    <MUITooltip {...props} classes={{ popper: className }} />
))(() => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: '#191B1F',
        color: '#FFFFFF',
        borderRadius: '15px',
        minWidth: 240,
        padding: '12px',
    },
}))

export default Tooltip