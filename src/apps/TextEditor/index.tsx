import React, { useContext } from 'react'
import { AppState } from '../../AppState'
import Header from './Header'
import TE from './TE'
import useKeyPress from './useKeyPress'

const TextEditor = () => {
    const {get} = useContext(AppState)
    useKeyPress()
    
    return (
        <div
            style={{
                background: get('darkMode') ? '#202020' : '#f5F5F5',
                display: 'flex',
                flexDirection: 'column',
                height: '100vh',
            }}
        >
            <Header/>
            <div style={{ overflow: 'scroll' }}>
                <div style={{ width: 'calc(5.1*125px)', height: 'calc(7*125px)', margin: 'auto', marginBottom: '3rem' }}>
                    <div className="page">
                        <TE />
                    </div>
                </div>
            </div>
        </div>
    )   
}

export default TextEditor