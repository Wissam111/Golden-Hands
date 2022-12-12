import { useState } from "react";
import useAuthContext from "../../../hooks/useAuthContext";
import useLoadingContext from "../../../hooks/useLoadingContext";
import UserRepository from "../../../repository/UsersRepository";



const useEditProfileViewModel = () => {
    const { dispatch: setAuthData, user } = useAuthContext()
    const [state, setState] = useState({
        ...user
    })
    const userRepository = UserRepository()
    const { dispatch: setLoading } = useLoadingContext()

    // update inputs values
    const onInputChange = (key, value) => {
        setState((prev) => {
            const payload = {
                ...prev
            }
            payload[key] = value
            return payload
        })
    }


    // update profile info
    const update = async () => {
        setLoading({ isLoading: true })
        try {
            const result = await userRepository.updateUser(user._id, { firstName: state.firstName, lastName: state.lastName, birthDate: state.birthDate })
            setAuthData({
                type: 'UPDATE_USER',
                payload: {
                    user: result.user
                }
            })
        } catch (e) {
            console.log('update user', e);
        }
        setLoading({ isLoading: false })
    }


    return { ...state, onInputChange, update }
}

export default useEditProfileViewModel;