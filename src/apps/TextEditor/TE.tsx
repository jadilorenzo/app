import React from 'react'
import useAppState from '../../useAppState'
import Document from './Document'
import Line from './TELine'

export default function TE() {
    const {get} = useAppState()
    const doc: Document = get('TEXT_EDITOR_DOCUMENT') as Document

    return (
        <div style={{height: '-webkit-max-available'}}>
            {doc.document.map((p, i) => (
                <div key={i}>
                    <Line p={p} i={i} />
                </div>
            ))}
        </div>
    )
}
