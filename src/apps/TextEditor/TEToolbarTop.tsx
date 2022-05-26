import React from 'react'
import { useContext } from 'react'
import { AppState } from '../../AppState'
import DocIcon from './Logos/DocIcon3.png'
import ShareIcon from './Logos/ShareIcon3.png'

export default function ToolbarTop() {
    const {get} = useContext(AppState)
    return (
        <>
            <img
                src={DocIcon}
                style={{
                    height: '1rem',
                    filter: get('darkMode') ? 'invert(100%)' : undefined,
                }}
            />
            <img
                src={ShareIcon}
                style={{
                    height: '1rem',
                    filter: get('darkMode') ? 'invert(100%)' : undefined,
                }}
            />
            <div
                style={{ display: 'inline', borderRadius: 0, textTransform: 'none' }}
            ></div>
        </>
    )
}
