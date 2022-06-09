import { useMediaQuery } from '@mui/material'
import Doc, { CursorLocation } from './apps/TextEditor/Doc'

export interface State {
  TEXT_EDITOR_DOCUMENT: Doc;
  TEXT_EDITOR_SELECTION: [number, number] | undefined;
  TEXT_EDITOR_ACTIVE_LOCATION: number;
  darkMode: boolean
}

export type StateKeys =
  | 'TEXT_EDITOR_DOCUMENT'
  | 'TEXT_EDITOR_SELECTION'
  | 'TEXT_EDITOR_ACTIVE_LOCATION' | 'darkMode';

export type StateValues =
  | Doc
  | boolean
  | undefined
  | [CursorLocation, CursorLocation]
  | CursorLocation;

export const InitialState: State = {
    TEXT_EDITOR_DOCUMENT: new Doc(),
    TEXT_EDITOR_SELECTION: undefined,
    TEXT_EDITOR_ACTIVE_LOCATION: 0,
    darkMode: false 
}