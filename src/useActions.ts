/* eslint-disable @typescript-eslint/no-unused-vars */
import Document from './apps/TextEditor/Document'
import useAppState from './useAppState'

const useActions = () => {
    const {get, set} = useAppState()
    return (value: string, data?: unknown) => {
        switch (value) {
        case 'TEXT_EDITOR_INIT':
            set('TEXT_EDITOR_DOCUMENT', new Document())
            break
        case 'TEXT_EDITOR_DOCUMENT_KEY_PRESS':
            set(
                'TEXT_EDITOR_DOCUMENT',
                (get('TEXT_EDITOR_DOCUMENT') as Document).keyStroke(
                data as string
                )
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
            return set(
                'TEXT_EDITOR_DOCUMENT',
                doc
            )
        }

        default:
            throw new Error('Act key does not exist.')
        }
    }
}

export default useActions
