import React from 'react'
import useAppState from '../../useAppState'
import Doc from './Doc'
import Line from './TELine'

export default function TE() {
    const {get} = useAppState()
    const doc: Doc = get('TEXT_EDITOR_DOCUMENT') as Doc

    return (
        <div style={{wordWrap: 'break-word', width: '100%'}}>
            {doc.lines.map((line, i) => (
                <div key={i}>
                    <Line indexY={i} line={line} />
                </div>
            ))}
        </div>
    )
}
