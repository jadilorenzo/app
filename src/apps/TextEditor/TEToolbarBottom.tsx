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
                className="btn"
            >
                <span className='font-bold'>
            B
                </span>
            </span>
            <span
                className="btn"
            >
                <span style={{ fontSize: '1rem', textDecoration: 'underline' }}>
            U
                </span>
            </span>
            <span
                className="btn"
            >
                <span style={{ fontSize: '1rem' }}>
                    <em>I</em>
                </span>
            </span>
            <span
                className="btn"
            >
                <span
                    style={{ fontSize: '1rem', textDecoration: 'line-through' }}
                >
            S
                </span>
            </span>
        </span>
    )
}
