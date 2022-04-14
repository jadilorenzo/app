import { Button } from '@mui/material'
import React from 'react'
import DocIcon from './Logos/DocIcon3.png'
import ShareIcon from './Logos/ShareIcon3.png'

export default function ToolbarTop() {
    return (
        <div
            style={{
                height: '3rem',
                display: 'flex',
            }}
        >
            <Button
                color="inherit"
                style={{
                    display: 'inline',
                    borderRadius: 0,
                    textTransform: 'none',
                }}
            >
                <img src={DocIcon} style={{ height: '1rem', margin: '0.5rem' }} />
            </Button>
            <Button
                color="inherit"
                style={{ display: 'inline', borderRadius: 0, textTransform: 'none' }}
            >
                <img src={ShareIcon} style={{ height: '1rem', margin: '0.5rem' }} />
            </Button>
            <div
                style={{ display: 'inline', borderRadius: 0, textTransform: 'none' }}
            ></div>
        </div>
    )
}
