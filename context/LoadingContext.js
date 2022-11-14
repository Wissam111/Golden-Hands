import { createContext, useReducer } from "react";


export const LoadingContext = createContext()


export const loadingReducer = (state, action) => {
    if (action) {
        return { ...action }
    }
    return state
}


export const LoadingContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(loadingReducer, {
        isLoading: false
    })

    return (
        <LoadingContext.Provider value={{ ...state, dispatch }}>
            {children}
        </LoadingContext.Provider>
    );
}
