import { Button, IconButton, Typography } from '@mui/material'
import React from 'react'

export default function Toolbar() {
    return (
        <div
            style={{
                padding: '1rem',
                borderBottom: '1.5px solid #EAEAEA',
                display: 'flex',
                alignItems: 'center',
                justifyItems: 'center',
            }}
        >
            <Typography style={{ marginRight: '0.5rem' }}>Toolbar</Typography>
            <div
                style={{
                    display: 'block',
                    height: 'min-content',
                    marginRight: '0.5rem',
                }}
            >
                <Typography style={{ fontSize: '1rem', fontWeight: 700 }}>
            B
                </Typography>
            </div>
            <div
                style={{
                    display: 'block',
                    height: 'min-content',
                    marginRight: '0.5rem',
                }}
            >
                <Typography style={{ fontSize: '1rem', textDecoration: 'underline' }}>
            U
                </Typography>
            </div>
            <div
                style={{
                    display: 'block',
                    height: 'min-content',
                    marginRight: '0.5rem',
                }}
            >
                <Typography
                    style={{ fontSize: '1rem' }}
                >
                    <em>I</em>
                </Typography>
            </div>
            <div
                style={{
                    display: 'block',
                    height: 'min-content',
                    marginRight: '0.5rem',
                }}
            >
                <Typography
                    style={{ fontSize: '1rem', textDecoration: 'line-through' }}
                >
            S
                </Typography>
            </div>
        </div>
    )
}
