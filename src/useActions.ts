/* eslint-disable @typescript-eslint/no-unused-vars */
import useAppState from "./useAppState"

const useActions = () => {
    const {get, set} = useAppState()
    return (value: string) => {
        switch (value) {
            case "TEXT_EDITOR_INIT":
                set("TEXT_EDITOR_DOCUMENT", "") 
                break;
        
            default:
                break;
        }
    }
}

export default useActions
