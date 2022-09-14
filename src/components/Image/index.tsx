import React from 'react'
import { Box } from '@mui/material'


interface ImageProps {
    src: string
    alt: string
    size: number
}

export default function Image (props: ImageProps) {

    return (
        <Box
            component='img'
            src={props.src}
            alt={props.alt}
            sx={{ height: props.size, width: props.size }}
        />
    )
}