import React from 'react'
import { Typography, IconButton } from '@mui/material'
import Logo from './Logos/Logo17.png'
import ShareIcon from '@mui/icons-material/ShareTwoTone'

export default function Header() {
    return (
        <span
            style={{
                // border: '1.5px solid #e4e4e4',
                overflow: 'none',
                // background: '#fbfbfb',
                display: 'inline-block',
                background: 'white',
                marginRight: '0.5rem',
                color: 'black',
                width: '15.25rem',
                clipPath:
            'polygon(0 0, 14.75rem 0, 14.75rem 2rem, 13.75rem 3rem, 0 3rem)',
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
                        height: '1.25rem',
                        margin: '0.5rem 0 0.5rem 0',
                        // border: '1.5px solid #f0f0f0'
                    }}
                    className="sticky-logo"
                />
                <Typography variant="h6" style={{ marginLeft: '0.5rem' }}>
                    <span style={{ fontWeight: 400 }}>Key Tools</span>
                </Typography>
                <span
                    style={{
                        marginLeft: '0.75rem',
                        fontSize: '0.65rem',
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
