import React, {createContext} from 'react'
import { useState } from 'react'

export const AppState = createContext<any>({})

export const AppStateProvider = ({children}: {
    children: React.ReactNode
}) => {
    const [state, setState] = useState({})
    return (
        <AppState.Provider value={{state, setState}}>
            {children}
        </AppState.Provider>
    )
}