import { useState } from "react";
import useLoadingContext from "../../../hooks/useLoadingContext";
import getString from "../../../localization";
import UserRepository from "../../../repository/UsersRepository";
import showAlert from "../../components/ShowAlert";



const useUsersListViewModel = () => {
    const [state, setState] = useState({
        users: null
    })
    const { dispatch: setLoading } = useLoadingContext()
    const userRepository = UserRepository()

    const getUsers = async () => {
        setLoading({ isLoading: true })
        try {
            const data = await userRepository.getUsers()
            setState(prev => {
                return {
                    ...prev,
                    users: data.users
                }
            })

        } catch (e) {
            showAlert(getString.t('error'), getString.t('something_went_wrong'))
        }
        setLoading({ isLoading: false })
    }



    return {
        ...state,
        getUsers
    }
}

export default useUsersListViewModel;