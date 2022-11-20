import { useState } from "react";
import useAuthContext from "../../../hooks/useAuthContext";
import useLoadingContext from "../../../hooks/useLoadingContext";
import useSignupContext from "../../../hooks/useSignupContext";
import AuthRepository from "../../../repository/AuthRepository";

let verifyId

const SignupViewModel = () => {
    const { dispatch: setLoading } = useLoadingContext();
    const { dispatch: setAuth } = useAuthContext();
    const context = useSignupContext()
    const [showCode, setShowCode] = useState(false)
    const [navigateToWelcome, setNavigateToWelcome] = useState(false)

    const authRepository = AuthRepository();

    const state = useState({
        firstName: null,
        lastName: null,
        birthDate: null,
        phone: null
    })


    const onInputChanged = (key, value) => {
        const payload = {}
        payload[key] = value
        context.dispatch({
            type: 'SET_DATA',
            payload: payload
        })
    }

    const signup = () => {

    }

    const sendAuthVerification = async () => {
        console.log(context);
        setLoading({ isLoading: true });
        const data = await authRepository.sendAuthVerification(context.phone);
        verifyId = data.verifyId;
        console.log(data);

        if (verifyId) {
            setShowCode((prev) => {
                return {
                    ...prev,
                    showCode: true,
                };
            });
        }
        setLoading({ isLoading: false });
    };


    return { ...context.state, showCode, navigateToWelcome, onInputChanged, signup, sendAuthVerification }
}

export default SignupViewModel;