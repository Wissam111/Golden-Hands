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
        rating: null
    })

    const getUserProfile = async () => {
        setIsLoading({ isLoading: true })

        try {
            const data = await userRepository.getUser(user._id)
            setAuthData({
                type: 'UPDATE_USER',
                payload: {
                    user: data.user
                }
            })
            setState(prev => {
                return {
                    ...prev,
                    appointmentCount: data.appointmentCount,
                    paid: data.paid,
                    preferredWorkers: data.preferredWorkers,
                    rating: data.rating
                }
            })

        } catch (e) {

        }

        setIsLoading({ isLoading: false })
    }


    return { ...state, getUserProfile }
}

export default useProfileViewModel;