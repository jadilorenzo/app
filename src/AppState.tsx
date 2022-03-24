import React, {createContext} from 'react'
import { useState } from 'react'
import { State, InitialState, StateKeys, StateValues } from './State'

interface StateContext {
  get: (value: StateKeys) => StateValues;
  set: (v: string, value: unknown) => void;
}

export const AppState = createContext<StateContext>({
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    get: (_value: StateKeys) => undefined,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    set: (_value: string) => undefined,
})

export const AppStateProvider = ({children}: {
    children: React.ReactNode
}) => {
    const [state, setState] = useState<State>(InitialState)

    const get = (value: StateKeys): unknown => {
        // if (!state[value]) throw new Error('State does not exist!')
        return state[value] as StateValues
    }

    const set = (v: string, value: unknown) : void => {
        setState((s: State) => {
            return { ...s, [v]: value }
        })
    }

    return (
        <AppState.Provider value={{get, set} as StateContext}>
            {children}
        </AppState.Provider>
    )
}
