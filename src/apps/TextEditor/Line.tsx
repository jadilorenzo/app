import React from 'react'
import useAppState from '../../useAppState'
import useTextEditorActions from '../../useTextEditorActions'
import Cursor from './Cursor'
import Document, { Paragraph } from './Document'

function isBetween(n: number, a: number, b: number) {
    return (n - a) * (n - b) <= 0
}

const Line = ({i, p}: {i: number, p: Paragraph}): JSX.Element => {
    const act = useTextEditorActions()
    const { get } = useAppState()
    const doc: Document = get('TEXT_EDITOR_DOCUMENT') as Document

    const selection = get('TEXT_EDITOR_SELECTION') as [number, number]
    const activeLocation = get('TEXT_EDITOR_ACTIVE_LOCATION') as number
    const selecting =
      doc.selection &&
      doc.selection[1] !== 0 &&
      doc.selection[0] !== doc.selection[1]

    return (
        <span key={i} style={{ display: 'flex' }}>
            {p.content.split('').map((char, index) => {
                let shouldSelect = false
                const betweenPermanentRange = isBetween(
                    index,
                    doc.selection ? doc.selection[0] : -1,
                    doc.selection ? doc.selection[1] : -1
                )
                const betweenTemporaryRange = isBetween(
                    index,
                    selection ? selection[0] : -1,
                    activeLocation
                )
                // if selecting and between permanent range -> highlight
                if (selecting && betweenPermanentRange) {
                    shouldSelect = true
                }
                // if not selecting and range is incomplete and between temporary range -> highlight
                if (selection) {
                    if (!selecting && selection[1] === 0 && betweenTemporaryRange) {
                        shouldSelect = true
                    }
                }
                return (
                    <div key={index} style={{ display: 'flex' }}>
                        {index === doc.locationInParagraph &&
                    i === doc.paragraphIndex ? (
                                <div style={{ width: '0' }}>
                                    <Cursor />
                                </div>
                            ) : (
                                ''
                            )}
                        <div
                            style={{
                                background: shouldSelect ? '#e1efff' : undefined,
                            }}
                            onMouseDown={() => {
                                act(
                                    'TEXT_EDITOR_DOCUMENT_SET_CURSOR',
                                    index !== 0 ? index : 0
                                )
                                act('TEXT_EDITOR_LOCATION_START', index)
                            }}
                            onMouseUp={() => {
                                if (selection[0]) {
                                    act('TEXT_EDITOR_LOCATION_END', index)
                                }
                            }}
                            onMouseEnter={() => {
                                act('TEXT_EDITOR_ACTIVE_LOCATION', index)
                            }}
                        >
                            {char !== ' ' ? (
                                char
                            ) : (
                                <div style={{ whiteSpace: 'pre-wrap' }}> </div>
                            )}
                        </div>
                    </div>
                )
            })}
        </span>
    )
}

export default Line