import React, {createContext} from 'react'
import { useState } from 'react'

export const AppState = createContext<any>({})

export const AppStateProvider = ({children}: {
    children: React.ReactNode
}) => {
    const [state, setState] = useState<any>({})

    const get = (value: string) => {
        return state[value]
    }

    const set = (v: string, value: any) => {
        setState((s: any) => {
            return {...s, [v]: value}
        })
    }

    console.log(state)

    return (
        <AppState.Provider value={{get, set}}>
            {children}
        </AppState.Provider>
    )
}
