import { useState } from "react";
import useAuthContext from "../../../hooks/useAuthContext";
import useLoadingContext from "../../../hooks/useLoadingContext";
import useSignupContext from "../../../hooks/useSignupContext";
import AuthRepository from "../../../repository/AuthRepository";
import { validate } from "../../../validation/ValidateName";
import showAlert from "../../components/ShowAlert";
import { useNavigation } from '@react-navigation/native';
import getString from "../../../localization";

let verifyId

const useSignupViewModel = () => {
    const { dispatch: setLoading } = useLoadingContext();
    const { dispatch: setAuth } = useAuthContext();
    const context = useSignupContext()
    const [showCode, setShowCode] = useState(false)
    const navigation = useNavigation();
    const authRepository = AuthRepository();


    const hideCode = () => {
        setShowCode(false);
    };

    const onInputChanged = (key, value) => {
        const payload = {}
        payload[key] = value

        const v = validate(key, value).errorMessage
        payload[key + 'Error'] = v


        context.dispatch({
            type: 'SET_DATA',
            payload: payload
        })
    }


    const sendAuthVerification = async () => {
        setLoading({ isLoading: true });
        try {
            const data = await authRepository.sendAuthVerification(context.phone, null, true);
            verifyId = data.verifyId;
            if (verifyId) {
                setShowCode((prev) => {
                    return {
                        ...prev,
                        showCode: true,
                    };
                });
            }
        } catch (e) {
            if (e.status === 400) {
                showAlert(getString.t('error'), getString.t('user_with_this_number_exists'))
            }

            else if (e.status === 403) {
                showAlert(getString.t('error'), getString.t('you_have_too_many_tries'))
            }
            else {
                showAlert(getString.t('error'), getString.t('something_went_wrong'))
            }
        }
        setLoading({ isLoading: false });
    };


    const signup = async (code) => {
        setLoading({ isLoading: true });

        try {
            const { authData } = await authRepository.singupAndVerify({
                verifyId,
                phone: context.phone,
                firstName: context.firstName,
                lastName: context.lastName,
                birthDate: context.birthDate,
                code
            });


            setAuth({
                type: "LOGIN",
                payload: {
                    user: authData.user,
                    token: authData.token,
                    refreshToken: authData.refresh_token,
                    expireDate: authData.expireDate,
                },
            });

        } catch (e) {
            if (e.status === 403) {
                showAlert(getString.t('error'), getString.t('code_not_match'))
            }
            else if (e.status === 404) {
                showAlert(getString.t('error'), getString.t('code_expired_try_again'))
            } else {
                showAlert(getString.t('error'), getString.t('something_went_wrong'))
            }
        }

        setLoading({ isLoading: false });
    }


    const navigateToSignupPhone = () => {
        const payload = {}
        const vfirstName = validate('firstName', context.firstName)
        const vlastName = validate('lastName', context.lastName)
        const vbirthDate = validate('birthDate', context.birthDate)

        payload['firstNameError'] = vfirstName.errorMessage
        payload['lastNameError'] = vlastName.errorMessage
        payload['birthDateError'] = vbirthDate.errorMessage

        context.dispatch({
            type: 'SET_DATA',
            payload: payload
        })

        if (!vfirstName.successful || !vlastName.successful || !vbirthDate.successful) {
            return
        }

        navigation.navigate('SignupPhone')
    }


    return { ...context, showCode, navigateToSignupPhone, hideCode, onInputChanged, signup, sendAuthVerification }
}

export default useSignupViewModel;