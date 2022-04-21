import React from 'react'
import useAppState from '../../useAppState'
import useTextEditorActions from './useTextEditorActions'
import Document from './Document'
import Cursor from './TECursor'



const Char = ({char, index, parIndex}: {
    char: string;
    index: number;
    parIndex: number;
}): JSX.Element => {
    const act = useTextEditorActions()
    const { get } = useAppState()
    const doc: Document = get('TEXT_EDITOR_DOCUMENT') as Document

    const selection = get('TEXT_EDITOR_SELECTION') as [number, number]
    const activeLocation = get('TEXT_EDITOR_ACTIVE_LOCATION') as number
    const selecting =
      doc.selection &&
      doc.selection[1] !== 0 &&
      doc.selection[0] !== doc.selection[1]


    const shouldSelect = () => {
        const isBetween = (n: number, a: number, b: number) => {
            return (n - a) * (n - b) <= 0
        }

        const betweenPermanentRange = isBetween(
            doc._getGlobalLocation(parIndex, index),
            doc.selection ? doc.selection[0] : -1,
            doc.selection ? doc.selection[1] : -1
        )

        const betweenTemporaryRange = isBetween(
            doc._getGlobalLocation(parIndex, index),
            selection ? selection[0] : -1,
            activeLocation
        )

        // if selecting and between permanent range -> highlight
        if (selecting && betweenPermanentRange) {
            return true
        }
        // if not selecting and range is incomplete and between temporary range -> highlight
        if (selection) {
            if (!selecting && selection[1] === 0 && betweenTemporaryRange) {
                return true
            }
        }
    }
    
    const onMouseDown = () => {
        act('TEXT_EDITOR_DOCUMENT_SET_CURSOR', {paragraphIndex: parIndex, locationInParagraph: index})
        act('TEXT_EDITOR_LOCATION_START', doc._getGlobalLocation(parIndex, index))
    }

    const onMouseUp = () => {
        if (selection[0]) {
            act('TEXT_EDITOR_LOCATION_END', doc._getGlobalLocation(parIndex, index))
        }
    }

    const onMouseEnter = () => {
        act('TEXT_EDITOR_ACTIVE_LOCATION', doc._getGlobalLocation(parIndex, index))
    }

    return (
        <span key={index} style={{height: '1.2rem'}}>
            {index === doc.locationInParagraph &&
        parIndex === doc.paragraphIndex ? (
                    <div style={{ height: 0, width: 0, display: 'inline' }}>
                        <Cursor />
                    </div>
                ) : (
                    ''
                )}
            <span
                style={{ background: shouldSelect() ? '#e1efff' : undefined }}
                className="text"
                onMouseDown={onMouseDown}
                onMouseUp={onMouseUp}
                onMouseEnter={onMouseEnter}
            >
                {char !== ' ' ? (
                    <span style={{ whiteSpace: 'pre-wrap' }}>{char}</span>
                ) : (
                    <span style={{ whiteSpace: 'pre-wrap' }}> </span>
                )}
            </span>
            {doc.allText.length === doc.location && index === doc.allText.length ? (
                <div style={{ width: '0', display: 'inline' }}>
                    <Cursor />
                </div>
            ) : (
                ''
            )}
        </span>
    )
}

export default Char