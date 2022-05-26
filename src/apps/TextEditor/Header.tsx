import React from 'react'
import ToolbarBottom from './TEToolbarBottom'
import ToolbarTop from './TEToolbarTop'
import HeaderLogo from './HeaderLogo'

export default function Header() {
    return (
        <div style={{ borderBottom: '2px solid #36b223' }}>
            <span style={{ height: '3rem', display: 'flex' }}>
                <HeaderLogo />
                <div style={{ flexGrow: 1 }} />
                <ToolbarTop />
            </span>
            <ToolbarBottom />
        </div>
    )
}
