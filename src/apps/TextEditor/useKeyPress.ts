import { useContext, useEffect } from 'react'
import { AppState } from '../../AppState'
import useTextEditorActions from './useTextEditorActions'
import Doc from './Doc'

const useKeyPress = () => {
    const act = useTextEditorActions()
    const {get} = useContext(AppState)

    useEffect(() => {
        const doc = get('TEXT_EDITOR_DOCUMENT') as Doc

        if (doc.text === '') {
            'Start Typing... '.split('').map((char) => {
                act('TEXT_EDITOR_DOCUMENT_KEY_PRESS', char)
            })
            act('TEXT_EDITOR_DOCUMENT_CURSOR_LEFT')
        }

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
            } else if (key === 'Escape') {
                act('TEXT_EDITOR_DOCUMENT_CLEAR_SELECTION')
            }
            
            return false
        })
    }, [])
}

export default useKeyPress