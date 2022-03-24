import React, { useEffect } from 'react'
import useActions from '../../useTextEditorActions'
import Header from './Header'
import TE from './TE'

const TextEditor = () => {
    const act = useActions()

    useEffect(() => {
        'Start Typing... '.split('').map((char) => {
            act('TEXT_EDITOR_DOCUMENT_KEY_PRESS', char)
        })
        act('TEXT_EDITOR_DOCUMENT_CURSOR_LEFT')

        document.addEventListener('keydown', ({ key }) => {
            if (key === ' ') {
                act('TEXT_EDITOR_DOCUMENT_KEY_PRESS', ' ')
            } else if (key.length === 1) {
                act('TEXT_EDITOR_DOCUMENT_KEY_PRESS', key)
            } else if (key === 'Backspace') {
                act('TEXT_EDITOR_DOCUMENT_DELETE')
            } else if (key === 'ArrowLeft') {
                act('TEXT_EDITOR_DOCUMENT_CURSOR_LEFT')
            } else if (key === 'ArrowRight') {
                act('TEXT_EDITOR_DOCUMENT_CURSOR_RIGHT')
            } else if (key === 'Enter') {
                act('TEXT_EDITOR_DOCUMENT_NEW_LINE')
            }
        })
    }, [])
    
    return (
        <div>
            <Header/>
            <h3>TextEditor</h3>
            <TE/>
        </div>
    )   
}

export default TextEditor