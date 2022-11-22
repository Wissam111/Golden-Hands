import { useEffect, useState } from "react";
import useAuthContext from "../../../hooks/useAuthContext";
import useLoadingContext from "../../../hooks/useLoadingContext";
import getString from "../../../localization";
import { getUserId } from "../../../network/apiCall";
import AuthRepository from "../../../repository/AuthRepository";
import { validate } from "../../../validation/ValidateName";
import showAlert from "../../components/ShowAlert";


let verifyId

const useUpdatePhoneViewModel = () => {
    const { user, dispatch: setAuthData } = useAuthContext()
    const authRepository = AuthRepository()
    const { dispatch: setLoading } = useLoadingContext()
    const [state, setState] = useState({
        phone: user.phone,
        phoneError: null,
        showCode: false,
        isVerified: false
    })
    const [verifyId, setVerifyId] = useState(null)


    const sendAuthVerification = async () => {
        setLoading({ isLoading: true })
        try {
            const data = await authRepository.sendAuthVerification(state.phone, false, true)
            setVerifyId(data.verifyId)
            setState(prev => {
                return {
                    ...prev,
                    showCode: true
                }
            })
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
        setLoading({ isLoading: false })
    }

    const verifyAndUpdate = async (code) => {
        setLoading({ isLoading: true })
        try {
            const data = await authRepository.verifyUpdatePhone(code, state.phone, verifyId, user._id)
            setAuthData({
                type: 'UPDATE_USER',
                payload: {
                    user: data.user
                }
            })

            setState(prev => {
                return {
                    ...prev,
                    isVerified: true,
                    showCode: false
                }
            })
        } catch (e) {
            showAlert(getString.t('error'), getString.t('something_went_wrong'))
        }
        setLoading({ isLoading: false })
    }

    const onPhoneChanged = (s) => {

        const vPhone = validate('phone', s)
        setState(prev => {
            return {
                ...prev,
                phone: s,
                phoneError: vPhone.errorMessage
            }
        })
    }

    const hideCode = () => {
        setState(prev => {
            return {
                ...prev,
                showCode: false
            }
        })
    }

    return { ...state, showCode: state.showCode && verifyId, hideCode, sendAuthVerification, verifyAndUpdate, onPhoneChanged }
}

export default useUpdatePhoneViewModel;