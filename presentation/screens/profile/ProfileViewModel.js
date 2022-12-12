import { useState } from "react";
import useAuthContext from "../../../hooks/useAuthContext";
import useLoadingContext from "../../../hooks/useLoadingContext";
import UserRepository from "../../../repository/UsersRepository";



const useProfileViewModel = () => {
    const { dispatch: setIsLoading } = useLoadingContext()
    const { dispatch: setAuthData, user } = useAuthContext()
    const userRepository = UserRepository()
    const [state, setState] = useState({
        appointmentCount: null,
        paid: null,
        preferredWorkers: null,
        rating: null,
        user: null
    })


    // if received a userId then we want to get the info for another user (not the loggedin one)
    const getUserProfile = async (userId) => {
        setIsLoading({ isLoading: true })

        try {
            const data = await userRepository.getUser(userId ? userId : user._id)
            if (!userId) {
                setAuthData({
                    type: 'UPDATE_USER',
                    payload: {
                        user: data.user
                    }
                })
            }
            setState(prev => {
                return {
                    ...prev,
                    appointmentCount: data.appointmentCount,
                    paid: data.paid,
                    preferredWorkers: data.preferredWorkers,
                    rating: data.rating,
                    user: data.user
                }
            })

        } catch (e) {
            showAlert(getString.t('error'), getString.t('something_went_wrong'))
        }

        setIsLoading({ isLoading: false })
    }



    const markAsBarber = async (role) => {
        if (!state.user)
            return

        try {
            setIsLoading({ isLoading: true })

            const data = await userRepository.updateUser(state.user._id, { role: role })
            setState(prev => {
                return {
                    ...prev,
                    user: data.user
                }
            })
        }
        catch (e) {
            showAlert(getString.t('error'), getString.t('something_went_wrong'))
        }

        setIsLoading({ isLoading: false })

    }

    // block the user 
    const block = async (isBlocked) => {
        if (!state.user)
            return

        try {
            setIsLoading({ isLoading: true })

            const data = await userRepository.updateUser(state.user._id, { isBlocked: isBlocked })
            setState(prev => {
                return {
                    ...prev,
                    user: data.user
                }
            })
        }
        catch (e) {
            showAlert(getString.t('error'), getString.t('something_went_wrong'))
        }

        setIsLoading({ isLoading: false })
    }

    return { ...state, getUserProfile, markAsBarber, block }
}

export default useProfileViewModel;