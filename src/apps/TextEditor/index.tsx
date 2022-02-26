import React, { useEffect } from 'react'
import useActions from '../../useActions'
import useAppState from '../../useAppState'
import Cursor from './Cursor'
import Document from './Document'

const TextEditor = () => {
    const act = useActions()
    const {get} = useAppState()
    const doc: Document = get('TEXT_EDITOR_DOCUMENT') as Document
   
    useEffect(() => {
        'Start Typing...'.split('').map(char => {
            act('TEXT_EDITOR_DOCUMENT_KEY_PRESS', char)
        })

        document.addEventListener('keydown', ({key}) => {
            if (key === 'Space') {
                act('TEXT_EDITOR_DOCUMENT_KEY_PRESS', ' ')
            } else if (key.length === 1) {
                act('TEXT_EDITOR_DOCUMENT_KEY_PRESS', key)
            } else if (key === 'Backspace') {
                act('TEXT_EDITOR_DOCUMENT_DELETE')
            } else if (key === 'ArrowLeft') {
                act('TEXT_EDITOR_DOCUMENT_CURSOR_LEFT')
            } else if (key === 'ArrowRight') {
                act('TEXT_EDITOR_DOCUMENT_CURSOR_RIGHT')
            }
        })

        return () => {
            for (let index = 0; index < doc.allText.length; index++) {
                act('TEXT_EDITOR_DOCUMENT_DELETE') 
            }
        }
    }, [])



    return (
        <div>
            <h3>TextEditor</h3>
            <div>
                {doc.document.map(p => p.content.split('').map((char, i) => {
                    return (
                        <span key={i}>
                            <span onMouseDown={() => act('TEXT_EDITOR_DOCUMENT_SET_CURSOR', i)}>{char}</span>
                            {(i+1 === doc.location) ? <Cursor/> : ''}
                        </span>
                    )
                }))}
            </div>
        </div>
    )   
}

export default TextEditor