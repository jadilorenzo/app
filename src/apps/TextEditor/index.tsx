import React, { useEffect } from 'react'
import useActions from '../../useActions'
// import useAppState from '../useAppState';

const TextEditor = () => {
    const act = useActions()
    // const {get} = useAppState()

    useEffect(() => {
        act('TEXT_EDITOR_INIT')
    }, [])

    return (
        <>
            <b>TextEditor</b>
        </>
    )   
}

export default TextEditor