import React from 'react'
import { AppBar, Typography, IconButton } from '@mui/material'
import Logo from './Logos/Logo17.png'
import ShareIcon from '@mui/icons-material/ShareTwoTone'

export default function Header() {
    return (
        <AppBar
            position="static"
            elevation={0}
            style={{
                borderBottom: '1.5px solid #e4e4e4',
                overflow: 'none',
                background: 'white',
                color: 'black',
            }}
        >
            <div
                style={{
                    padding: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyItems: 'center',
                    overflow: 'none',
                }}
            >
                <img
                    src={Logo}
                    style={{
                        height: '1.25rem',
                        margin: '0.5rem 0 0.5rem 0',
                        // border: '1.5px solid #f0f0f0'
                    }}
                    className="sticky-logo"
                />
                <Typography variant="h5" style={{ marginLeft: '0.5rem' }}>
                    <span style={{ fontWeight: 400 }}>Key Tools</span>
                </Typography>
                <div
                    style={{
                        marginLeft: '0.75rem',
                        height: '0.2rem',
                        fontSize: '0.65rem',
                        fontWeight: 300,
                        textTransform: 'uppercase',
                        fontFamily: 'Helvetica',
                    }}
                >
            Text Editor
                </div>
                <div style={{ flexGrow: 1 }} />
                <IconButton color="primary">
                    <ShareIcon />
                </IconButton>
            </div>
        </AppBar>
    )
}
