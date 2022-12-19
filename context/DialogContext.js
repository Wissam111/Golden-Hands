import { createContext, useReducer } from "react";


export const DialogContext = createContext()


export const dialogReducer = (state, action) => {
    if (action) {
        return { ...action }
    }
    return state
}


export const DialogContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(dialogReducer, {
        isVisible: false,
        title: null,
        message: null,
        onDone: null
    })

    return (
        <DialogContext.Provider value={{ ...state, dispatch }}>
            {children}
        </DialogContext.Provider>
    );
}
