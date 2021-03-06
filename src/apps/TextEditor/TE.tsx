import React from 'react'
import useAppState from '../../useAppState'
import Doc from './Doc'
import TEChar from './TEChar'
import Cursor from './TECursor'

export default function TE() {
    const {get} = useAppState()
    const doc: Doc = get('TEXT_EDITOR_DOCUMENT') as Doc
    const selecting: boolean = doc.selection !== undefined
    
    return (
        <div style={{ wordWrap: 'break-word', width: '100%' }}>
            {doc.document.map((element) => (
                <React.Fragment key={element.id}>
                    <TEChar element={element} />
                </React.Fragment>
            ))}
            {doc.atEOF ? (
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
        </div>
    )
}
