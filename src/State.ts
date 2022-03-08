import Document from './apps/TextEditor/Document'

export interface State {
  TEXT_EDITOR_DOCUMENT: Document;
  TEXT_EDITOR_SELECTION: [number, number] | undefined
}

export type StateKeys =
  | 'TEXT_EDITOR_DOCUMENT'
  | 'TEXT_EDITOR_SELECTION';
export type StateValues = Document | boolean | undefined | [number, number];

export const InitialState: State = {
    TEXT_EDITOR_DOCUMENT: new Document(),
    TEXT_EDITOR_SELECTION: undefined
}