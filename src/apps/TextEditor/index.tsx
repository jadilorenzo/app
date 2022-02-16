import { useEffect } from 'react'
import useActions from '../../useActions'
// import useAppState from '../useAppState';

const TextEditor = () => {
    const act = useActions();
    // const {get} = useAppState()

    useEffect(() => {
        act("TEXT_EDITOR_INIT")
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            <b>TextEditor</b>
        </>
    )   
}

export default TextEditor