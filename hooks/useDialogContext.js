import { useContext } from "react";
import { DialogContext } from "../context/DialogContext";


const useDialogContext = () => {
    const context = useContext(DialogContext)
    if (!context)
        throw Error('useDialogContext must be used inside an DialogContextProvider')

    return context
}

export default useDialogContext;