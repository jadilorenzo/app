import React from 'react'
import { Typography, IconButton, useTheme } from '@mui/material'
import Logo from './Logos/Logo24.png'
import ShareIcon from '@mui/icons-material/ShareTwoTone'

export default function Header() {
    const theme = useTheme()

    return (
        <span
            style={{
                // border: '1.5px solid #e4e4e4',
                overflow: 'none',
                // background: '#fbfbfb',
                display: 'inline-flex',
                justifyItems: 'center',
                alignItems: 'center',
                color: 'black',
                background: theme.palette.mode === 'dark' ? '#36b223' : 'white',
                width: '14rem',
                clipPath:
            'polygon(0 0, 13.75rem 0, 13.75rem 2rem, 12.75rem 3rem, 0 3rem)',
                position: 'sticky',
                top: 0,
            }}
        >
            <span
                style={{
                    padding: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyItems: 'center',
                    overflow: 'none',
                    height: '1rem',
                }}
            >
                <img
                    src={Logo}
                    style={{
                        height: '1.8rem',
                        margin: '0.5rem 0 0.5rem 0',
                        // border: '1.5px solid #f0f0f0'
                        // filter:
                        // theme.palette.mode === 'dark' ? 'invert(100%)' : undefined,
                    }}
                    className="sticky-logo"
                />
                <Typography variant="h6" style={{ marginLeft: '0.5rem' }}>
                    <span style={{ fontWeight: 400 }}>Power</span>
                </Typography>
                <span
                    style={{
                        marginLeft: '0.75rem',
                        fontSize: '0.65rem',
                        marginTop: '0.1rem',
                        width: '5rem',
                        fontWeight: 300,
                        textTransform: 'uppercase',
                        fontFamily: 'Helvetica',
                    }}
                >
            Text Editor
                </span>
            </span>
        </span>
    )
}
