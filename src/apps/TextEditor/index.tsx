import React, { useEffect } from 'react'
import useActions from '../../useActions'
import useAppState from '../../useAppState'
import Cursor from './Cursor'
import Document from './Document'

function isBetween(n: number, a: number, b: number) {
    return (n - a) * (n - b) <= 0
}

const TextEditor = () => {
    const act = useActions()
    const {get} = useAppState()
    const doc: Document = get('TEXT_EDITOR_DOCUMENT') as Document
    const selection = get('TEXT_EDITOR_SELECTION') as [number, number]
    const selecting =
      doc.selection &&
      doc.selection[1] !== 0 &&
      doc.selection[0] !== doc.selection[1]

    console.log(selecting)

    useEffect(() => {
        'Start Typing...'.split('').map((char) => {
            act('TEXT_EDITOR_DOCUMENT_KEY_PRESS', char)
        })

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
            <div style={{display: 'flex'}}> 
                {(doc.location === 0) ? <Cursor /> : ''}
                {doc.document.map(p => p.content.split('').map((char, i) => {
                    return (
                        <div key={i} style={{ display: 'flex' }}>
                            <div
                                style={{
                                    background:
                                    selecting &&
                                    isBetween(i, doc.selection ? doc.selection[0] : -1, doc.selection ? doc.selection[1]: -1)
                                        ? '#e1efff'
                                        : undefined,
                                }}
                                onMouseDown={() => {
                                    act('TEXT_EDITOR_DOCUMENT_SET_CURSOR', i)
                                    act('TEXT_EDITOR_LOCATION_START', i)
                                }}
                                onMouseUp={() => {
                                    if (selection[0]) {
                                        act('TEXT_EDITOR_LOCATION_END', i)
                                    }
                                }}
                            >
                                {char !== ' ' ? (
                                    char
                                ) : (
                                    <div style={{ whiteSpace: 'pre-wrap' }}> </div>
                                )}
                            </div>
                            {}
                        </div>
                    )
                }))}
            </div>
        </div>
    )   
}

export default TextEditor