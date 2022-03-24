import React from 'react'
import useAppState from '../../useAppState'
import Cursor from './Cursor'
import Document from './Document'
import Line from './Line'

export default function TE() {
    const {get} = useAppState()
    const doc: Document = get('TEXT_EDITOR_DOCUMENT') as Document

    return (
        <div style={{ display: 'flex', width: '50%' }}>
            {doc.location === 0 ? (
                <div style={{ width: '0' }}>
                    <Cursor />
                </div>
            ) : (
                ''
            )}
            {doc.document.map((p, i) =>
                p.newLine ? (
                    <>
                        <div
                            key={i}
                            style={{
                                whiteSpace: 'pre-wrap',
                                alignSelf: 'flex-end',
                                flexGrow: 1,
                                display: 'block',
                            }}
                        />
                        <div style={{flexGrow: 1}}/>
                    </>
                ) : (
                    <Line p={p} i={i}/> 
                )
            )}
        </div>
    )
}
