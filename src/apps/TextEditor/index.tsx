import React from 'react'
import Header from './Header'
import TE from './TE'
import ToolbarBottom from './TEToolbarBottom'
import Toolbar from './TEToolbarBottom'
import ToolbarTop from './TEToolbarTop'
import useKeyPress from './useKeyPress'

const TextEditor = () => {

    useKeyPress()
    
    return (
        <div>
            <div
                style={{
                    background: '#f5F5F5',
                    borderBottom: '1.5px solid #e4e4e4',
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
            </div>
            <div className="page-container">
                <div className="page">
                    <TE />
                </div>
            </div>
        </div>
    )   
}

export default TextEditor