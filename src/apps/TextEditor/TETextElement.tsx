import React from 'react'
import useAppState from '../../useAppState'
import Doc, { TextElement } from './Doc'
import useTextEditorActions from './useTextEditorActions'

export default function TETextElement({element}: {element: TextElement}) {
    const act = useTextEditorActions()
    const { get } = useAppState()
    const doc: Doc = get('TEXT_EDITOR_DOCUMENT') as Doc
    
    return (
        <span
            aria-label={JSON.stringify(doc.locationFromId(element.id))}
            style={{
                background: act('TE_CHAR_SHOULD_SELECT', element.id)
                    ? '#e1efff'
                    : undefined,
            }}
            className="text"
            onMouseDown={() => act('TE_CHAR_ON_MOUSE_DOWN')}
            onMouseUp={() => act('TE_CHAR_ON_MOUSE_UP')}
            onMouseEnter={() => act('TE_CHAR_ON_MOUSE_ENTER')}
        >
            {element.char !== ' ' ? (
                <span>{element.char}</span>
            ) : (
                <span style={{ whiteSpace: 'pre-wrap' }}> </span>
            )}
        </span>
    )
}
