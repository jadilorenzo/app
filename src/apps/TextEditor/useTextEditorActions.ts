import Doc, { CursorLocation } from './Doc'
import useAppState from '../../useAppState'

const useTextEditorActions = () => {
    const {get, set} = useAppState()
    const doc = get('TEXT_EDITOR_DOCUMENT') as Doc
    const selection = get('TEXT_EDITOR_SELECTION') as [CursorLocation, CursorLocation]
    const activeLocation = get('TEXT_EDITOR_ACTIVE_LOCATION') as CursorLocation


    return (
        value:
        | 'TEXT_EDITOR_INIT'
        | 'TEXT_EDITOR_DOCUMENT_KEY_PRESS'
        | 'TEXT_EDITOR_DOCUMENT_DELETE'
        | 'TEXT_EDITOR_DOCUMENT_CURSOR_LEFT'
        | 'TEXT_EDITOR_DOCUMENT_CURSOR_RIGHT'
        | 'TEXT_EDITOR_DOCUMENT_NEW_LINE'
        | 'TEXT_EDITOR_DOCUMENT_CLEAR_SELECTION'
        | 'TE_CHAR_SHOULD_SELECT'
        | 'TE_CHAR_ON_MOUSE_DOWN'
        | 'TE_CHAR_ON_MOUSE_UP'
        | 'TE_CHAR_ON_MOUSE_ENTER',
        data?: unknown
    ) => {
        switch (value) {
        // case 'TEXT_EDITOR_INIT':
        //     set('TEXT_EDITOR_DOCUMENT', new Doc())
        //     break
        case 'TEXT_EDITOR_DOCUMENT_KEY_PRESS':
            set('TEXT_EDITOR_DOCUMENT', doc.keyStroke(data as string))
            break
        case 'TEXT_EDITOR_DOCUMENT_DELETE':
            set('TEXT_EDITOR_DOCUMENT', doc.backspace())
            break
        case 'TEXT_EDITOR_DOCUMENT_CURSOR_LEFT':
            set('TEXT_EDITOR_DOCUMENT', doc.cursorLeft())
            break
        case 'TEXT_EDITOR_DOCUMENT_CURSOR_RIGHT':
            set('TEXT_EDITOR_DOCUMENT', doc.cursorRight())
            break
        case 'TEXT_EDITOR_DOCUMENT_NEW_LINE': {
            set('TEXT_EDITOR_DOCUMENT', doc.newLine())
            break
        }
        case 'TEXT_EDITOR_DOCUMENT_CLEAR_SELECTION': {
            doc.selection = undefined
            set('TEXT_EDITOR_DOCUMENT', doc)
            break
        } // case 'TEXT_EDITOR_DOCUMENT_SET_CURSOR': {
        //     let doc = get('TEXT_EDITOR_DOCUMENT') as Document
        //     doc = doc.setLocation({incompleteLocation: data as {paragraphIndex: number, locationInParagraph: number}})
        //     doc.selection = undefined
        //     set('TEXT_EDITOR_DOCUMENT', doc)
        //     break
        // }
        // case 'TEXT_EDITOR_LOCATION_START': {
        //     set('TEXT_EDITOR_SELECTION', [data as number, 0])
        //     break
        // }
        // case 'TEXT_EDITOR_LOCATION_END': {
        //     let selection = get('TEXT_EDITOR_SELECTION') as [number, number]
        //     const newSelection: [number, number] = [selection[0], data as number]
        //     set('TEXT_EDITOR_SELECTION', [selection[0], data as number])
        //     selection = newSelection
        //     if (selection[1] !== 0 && selection[0] !== selection[1]) {
        //         set(
        //             'TEXT_EDITOR_DOCUMENT',
        //             (get('TEXT_EDITOR_DOCUMENT') as Document).select(
        //                 selection[0],
        //                 selection[1]
        //             )
        //         )
        //         set('TEXT_EDITOR_SELECTION', undefined)
        //     }
        //     break
        // }
        // case 'TEXT_EDITOR_ACTIVE_LOCATION': {
        //     set('TEXT_EDITOR_ACTIVE_LOCATION', data as number)
        //     break
        // }
        case 'TE_CHAR_SHOULD_SELECT': {
            if (!doc.selection) return false

            const documentSelection = doc.document.slice(
                doc.elementIndexAtLocation(selection[0]),
                doc.elementIndexAtLocation(activeLocation)
            )

            return documentSelection
                .map((element) => element.id)
                .includes(data as string)
        }
        case 'TE_CHAR_ON_MOUSE_DOWN': {
            // set start of selection
            break
        }
        case 'TE_CHAR_ON_MOUSE_UP': {
            // set end of selection
            // reset active location
            break
        }
        case 'TE_CHAR_ON_MOUSE_ENTER': {
            //  set selection
            break
        }

        default:
            throw new Error('ACT key does not exist.')
        }
    }
}

export default useTextEditorActions
