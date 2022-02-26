import Document from './apps/TextEditor/Document'

export interface State {
  TEXT_EDITOR_DOCUMENT: Document
}

export type StateKeys = 'TEXT_EDITOR_DOCUMENT';
export type StateValues = Document | undefined;

export const InitialState: State = {
    TEXT_EDITOR_DOCUMENT: new Document()
}