import React, { useCallback } from 'react'
import { InputBase } from '@mui/material'
import { Search } from '@mui/icons-material'


export interface SearchTokenProps {
    value: string
    onChange: (value: string) => void
}

export default function SearchToken ({ value, onChange }: SearchTokenProps) {

    const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.value)
    }, [onChange])

    return (
        <InputBase
            value={value}
            onChange={handleChange}
            sx={{
                border: '1px solid #40444F',
                borderRadius: '20px',
                color: '#FFFFFF',
                fontSize: '16px',
                height: '56px',
                marginTop: '20px',
                marginBottom: '15px',
                '&.Mui-focused, &:hover': { border: '1px solid #2172E5' },
            }}
            fullWidth
            placeholder='Search name or paste address'
            startAdornment={<Search sx={{ paddingLeft: '10px', paddingRight: '5px', color: '#7A7B7D' }} />}
        />
    )
}