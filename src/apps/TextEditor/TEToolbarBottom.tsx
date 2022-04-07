import { Button, ButtonGroup, Typography } from '@mui/material'
import React from 'react'

export default function ToolbarBottom() {
    return (
        <span
            style={{
                flexGrow: 1,
                height: 'calc(3rem-1rem)',
                padding: '0.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyItems: 'center',
            }}
        >
            <span
                style={{
                    display: 'block',
                    height: 'min-content',
                    marginRight: '0.75rem',
                }}
            >
                <Typography style={{ fontSize: '1rem', fontWeight: 700 }}>
              B
                </Typography>
            </span>
            <span
                style={{
                    display: 'block',
                    height: 'min-content',
                    marginRight: '0.75rem',
                }}
            >
                <Typography
                    style={{ fontSize: '1rem', textDecoration: 'underline' }}
                >
              U
                </Typography>
            </span>
            <span
                style={{
                    display: 'block',
                    height: 'min-content',
                    marginRight: '0.75rem',
                }}
            >
                <Typography style={{ fontSize: '1rem' }}>
                    <em>I</em>
                </Typography>
            </span>
            <span
                style={{
                    display: 'block',
                    height: 'min-content',
                    marginRight: '0.75rem',
                }}
            >
                <Typography
                    style={{ fontSize: '1rem', textDecoration: 'line-through' }}
                >
              S
                </Typography>
            </span>
        </span>
    )
}
