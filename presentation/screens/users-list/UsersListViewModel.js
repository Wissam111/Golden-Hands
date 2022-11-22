import { useState } from "react";
import useLoadingContext from "../../../hooks/useLoadingContext";
import UserRepository from "../../../repository/UsersRepository";



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

        }
        setLoading({ isLoading: false })
    }



    return {
        ...state,
        getUsers
    }
}

export default useUsersListViewModel;