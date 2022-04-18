import { AppBar, Container, Paper } from '@mui/material'
import { useTheme } from '@mui/system'
import React from 'react'
import Header from './Header'
import TE from './TE'
import ToolbarBottom from './TEToolbarBottom'
import ToolbarTop from './TEToolbarTop'
import useKeyPress from './useKeyPress'

const TextEditor = () => {
    const theme = useTheme()
    useKeyPress()
    
    return (
        <div>
            <AppBar
                position='static'
                variant='outlined'
                elevation={0}
                style={{
                    background: (theme.palette.mode === 'dark') ? '#202020' :  '#f5F5F5',
                    borderBottom: `2px solid ${theme.palette.primary.main}`,
                    display: 'block',
                    minWidth: '40rem'
                }}
            >
                <span
                    style={{
                        height: '3rem',
                        display: 'flex',
                    }}
                >
                    <Header />
                    <div style={{flexGrow: 1}}/>
                    <ToolbarTop />
                    
                </span>
                <ToolbarBottom />
            </AppBar>
            <div>
                <Container style={{width: '650px'}}>
                    <Paper className='page'>
                        <TE />
                    </Paper>
                </Container>
            </div>
        </div>
    )   
}

export default TextEditor