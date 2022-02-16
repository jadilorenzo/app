import useAppState from '../useAppState'

const TextEditor = () => {
    const state = useAppState()
    console.log(state)
    return (
        <>
            <b>TextEditor</b>
        </>
    )   
}

export default TextEditor