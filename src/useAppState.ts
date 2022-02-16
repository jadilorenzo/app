import { useContext } from 'react'
import { AppState } from './AppState'

const useAppState = () => {
    const state = useContext(AppState)
    console.log(state)
    return state
}

export default useAppState