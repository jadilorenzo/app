import { useContext } from 'react'
import { AppState } from './AppState'

const useAppState = () => {
    const state = useContext(AppState)
    return state
}

export default useAppState