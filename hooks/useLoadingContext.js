import { useContext } from "react";
import { LoadingContext } from "../context/LoadingContext";


const useLoadingContext = () => {
    const context = useContext(LoadingContext)
    if (!context)
        throw Error('useAuthContext must be used inside an AuthContextProvider')

    return context
}

export default useLoadingContext;