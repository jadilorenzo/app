import React from 'react'
import useAppState from '../../useAppState'
import useTextEditorActions from './useTextEditorActions'
import Cursor from './TECursor'
import Doc, { CursorLocation } from './Doc'


const Char = ({char, location, id}: {
    char: string;
    id: string;
    location: CursorLocation
}): JSX.Element => {
    const act = useTextEditorActions()

    const { get } = useAppState()
    const doc: Doc = get('TEXT_EDITOR_DOCUMENT') as Doc
    const selecting: boolean = doc.selection !== undefined

    console.log(doc.elementIndexAtLocation(location), doc.document.length)

    return (
        <span key={JSON.stringify(location)} style={{ height: '1.2rem' }}>
            {doc.location.x === location.x && doc.location.y === location.y ? (
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
            <span
                style={{
                    background: act('TE_CHAR_SHOULD_SELECT', id)
                        ? '#e1efff'
                        : undefined,
                    whiteSpace: 'pre-wrap',
                }}
                className="text"
                onMouseDown={() => act('TE_CHAR_ON_MOUSE_DOWN')}
                onMouseUp={() => act('TE_CHAR_ON_MOUSE_UP')}
                onMouseEnter={() => act('TE_CHAR_ON_MOUSE_ENTER')}
            >
                {char !== ' ' ? (
                    <span>{char}</span>
                ) : (
                    <span style={{ whiteSpace: 'pre-wrap' }}> </span>
                )}
            </span>
            {/* {doc.elementIndexAtLocation(location) === doc.document.length ? (
                <div
                    style={{
                        width: '0',
                        display: 'inline',
                        background: selecting ? '#e1efff' : undefined,
                    }}
                >
                    <Cursor />
                </div>
            ) : null} */}
        </span>
    )
}

export default Char