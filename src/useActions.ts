/* eslint-disable @typescript-eslint/no-unused-vars */
import { act } from 'react-dom/test-utils'
import Document from './apps/TextEditor/Document'
import useAppState from './useAppState'

const useActions = () => {
    const {get, set} = useAppState()
    return (
        value:
        | 'TEXT_EDITOR_INIT'
        | 'TEXT_EDITOR_DOCUMENT_KEY_PRESS'
        | 'TEXT_EDITOR_DOCUMENT_DELETE'
        | 'TEXT_EDITOR_DOCUMENT_CURSOR_LEFT'
        | 'TEXT_EDITOR_DOCUMENT_CURSOR_RIGHT'
        | 'TEXT_EDITOR_DOCUMENT_SET_CURSOR'
        | 'TEXT_EDITOR_LOCATION_START'
        | 'TEXT_EDITOR_LOCATION_END',
        data?: unknown
    ) => {
        switch (value) {
        case 'TEXT_EDITOR_INIT':
            set('TEXT_EDITOR_DOCUMENT', new Document())
            break
        case 'TEXT_EDITOR_DOCUMENT_KEY_PRESS':
            set(
                'TEXT_EDITOR_DOCUMENT',
                (get('TEXT_EDITOR_DOCUMENT') as Document).keyStroke(data as string)
            )
            break
        case 'TEXT_EDITOR_DOCUMENT_DELETE':
            set(
                'TEXT_EDITOR_DOCUMENT',
                (get('TEXT_EDITOR_DOCUMENT') as Document).delete()
            )
            break
        case 'TEXT_EDITOR_DOCUMENT_CURSOR_LEFT':
            set(
                'TEXT_EDITOR_DOCUMENT',
                (get('TEXT_EDITOR_DOCUMENT') as Document).cursorLeft()
            )
            break
        case 'TEXT_EDITOR_DOCUMENT_CURSOR_RIGHT':
            set(
                'TEXT_EDITOR_DOCUMENT',
                (get('TEXT_EDITOR_DOCUMENT') as Document).cursorRight()
            )
            break
        case 'TEXT_EDITOR_DOCUMENT_SET_CURSOR': {
            const doc = get('TEXT_EDITOR_DOCUMENT') as Document
            doc.location = data as number
            doc._getLocation()
            set('TEXT_EDITOR_DOCUMENT', doc)
            break
        }
        case 'TEXT_EDITOR_LOCATION_START': {
            set('TEXT_EDITOR_SELECTION', [data as number, 0])
            break
        }
        case 'TEXT_EDITOR_LOCATION_END': {
            let selection = get('TEXT_EDITOR_SELECTION') as [number, number]
            const newSelection: [number, number]= [selection[0], data as number]
            set('TEXT_EDITOR_SELECTION', [selection[0], data as number])
            selection = newSelection
            if (selection[1] !== 0 && selection[0] !== selection[1]) {
                set(
                    'TEXT_EDITOR_DOCUMENT',
                    (get('TEXT_EDITOR_DOCUMENT') as Document).select(
                        selection[0],
                        selection[1]
                    )    
                )
                set('TEXT_EDITOR_SELECTION', undefined)
            }
            break
        }

        default:
            throw new Error('ACT key does not exist.')
        }
    }
}

export default useActions
