import React, {createContext} from 'react'
import { useState } from 'react'

interface State {
  [key: string]: unknown;
}

interface StateContext {
  get: (value: string) => unknown;
  set: (v: string, value: unknown) => void;
      }

export const AppState = createContext<StateContext>({
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    get: (_value: string) => undefined,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    set: (_value: string) => undefined
})

export const AppStateProvider = ({children}: {
    children: React.ReactNode
}) => {
    const [state, setState] = useState<State>({})

    const get = (value: string): unknown => {
        return state[value]
    }

    const set = (v: string, value: unknown) : void => {
        setState((s: State) => {
            return { ...s, [v]: value }
        })
    }

    console.log(state)

    return (
        <AppState.Provider value={{get, set}}>
            {children}
        </AppState.Provider>
    )
}
