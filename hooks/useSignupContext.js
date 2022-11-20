import { useContext } from "react";
import { SignupContext } from "../context/SignupContext";


const useSignupContext = () => {
    const context = useContext(SignupContext)
    if (!context) {
        throw Error('useSignupContext must be used inside an SingupContextProvider')
    }
    return context
}

export default useSignupContext;