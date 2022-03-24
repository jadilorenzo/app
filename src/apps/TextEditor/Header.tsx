import React from 'react'
import { AppBar } from '@mui/material'
import Logo from './Logo5.png'

export default function Header() {
    return (
        <AppBar position='static'>
            <div style={{ padding: '1rem'}}>
                <img src={Logo} style={{height: '3rem'}} />
            </div>
        </AppBar>
    )
}
