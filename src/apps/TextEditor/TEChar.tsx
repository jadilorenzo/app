import React from 'react'
import useAppState from '../../useAppState'
import useTextEditorActions from './useTextEditorActions'
import Cursor from './TECursor'
import Doc, { Element } from './Doc'
import TETextElement from './TETextElement'
import TENewlineElement from './TENewlineElement'
import TEEOFElement from './TEEOFElement'


const Char = ({element}: {element: Element}): JSX.Element => {
    const act = useTextEditorActions()

    const { get } = useAppState()
    const doc: Doc = get('TEXT_EDITOR_DOCUMENT') as Doc
    const selecting: boolean = doc.selection !== undefined
    const location = doc.locationFromId(element.id) 

    const cursor = doc.location.x === location.x && doc.location.y === location.y ? (
        <div
            style={{
                width: '0',
                display: 'inline',
                background: selecting ? '#e1efff' : undefined,
            }}
        >
            <Cursor />
        </div>
    ) : null

    return (
        <span
            key={JSON.stringify(location)}
        // style={{ height: '1.2rem' }}
        >
            {cursor}
            {element.type === 'text' ? (
                <TETextElement element={element} />
            ) : element.type === 'eof' ? (
                <TEEOFElement id={element.id} />
            ) : element.type === 'newline' ? (
                <TENewlineElement id={element.id} />
            ) : null}
            {(
                doc.atEndOfLine &&
                doc.location.y === location.y &&
                doc.lengthOfLine - 1 === location.x 
            ) ? (
                    <div
                        style={{
                            width: '0',
                            display: 'inline',
                            background: selecting ? '#e1efff' : undefined,
                        }}
                    >
                        <Cursor />
                    </div>
                ) : null}
        </span>
    )
}

export default Char