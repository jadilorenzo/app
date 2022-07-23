import React from 'react'
import useAppState from '../../useAppState'
import Doc from './Doc'
import Cursor from './TECursor'

export default function TENewLineElement({id}: {id: string}) {
    const { get } = useAppState()
    const doc: Doc = get('TEXT_EDITOR_DOCUMENT') as Doc
    const selecting: boolean = doc.selection !== undefined
    const location = doc.locationFromId(id)

    return (
        <>
            {doc.atEOF ? (
                <>
                    <br/>
                    <div
                        style={{
                            width: '0',
                            display: 'inline',
                            background: selecting ? '#e1efff' : undefined,
                        }}
                    >
                        <Cursor />
                    </div>
                </>
            ) : null}
        </>
    )
}
