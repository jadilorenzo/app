import React from 'react'
import useAppState from '../../useAppState'
import Document from './Document'
import Line from './TELine'

export default function TE() {
    const {get} = useAppState()
    const doc: Document = get('TEXT_EDITOR_DOCUMENT') as Document

    return (
        <div style={{wordWrap: 'break-word', width: '100%'}}>
            {doc.document.map((p, i) => p.newLine ? null : (
                <div key={i}>
                    <Line p={p} i={i} />
                </div>
            ))}
        </div>
    )
}
