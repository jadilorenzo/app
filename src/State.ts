import { useMediaQuery } from '@mui/material'
import Document from './apps/TextEditor/Document'

export interface State {
  TEXT_EDITOR_DOCUMENT: Document;
  TEXT_EDITOR_SELECTION: [number, number] | undefined;
  TEXT_EDITOR_ACTIVE_LOCATION: number;
  darkMode: boolean
}

export type StateKeys =
  | 'TEXT_EDITOR_DOCUMENT'
  | 'TEXT_EDITOR_SELECTION'
  | 'TEXT_EDITOR_ACTIVE_LOCATION' | 'darkMode';

export type StateValues = Document | boolean | undefined | [number, number] | number;

export const InitialState: State = {
    TEXT_EDITOR_DOCUMENT: new Document(),
    TEXT_EDITOR_SELECTION: undefined,
    TEXT_EDITOR_ACTIVE_LOCATION: 0,
    darkMode: false 
}