import { IconButton } from '@mui/material'
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
            <div
                style={{
                    display: 'inline',
                    borderRadius: 0,
                    textTransform: 'none',
                }}
            >
                <img src={DocIcon} style={{ height: '1.25rem', margin: '0.5rem' }} />
            </div>
            <div
                style={{ display: 'inline', borderRadius: 0, textTransform: 'none' }}
            >
                <img src={ShareIcon} style={{ height: '1.25rem', margin: '0.5rem' }} />
            </div>
            <div
                style={{ display: 'inline', borderRadius: 0, textTransform: 'none' }}
            >
          
            </div>
        </div>
    )
}
