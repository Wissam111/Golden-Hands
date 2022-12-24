import { useEffect, useState } from "react";
import useLoadingContext from "../../../hooks/useLoadingContext";
import getString from "../../../localization";
import UserRepository from "../../../repository/UsersRepository";
import showAlert from "../../components/ShowAlert";

const PAGE_SIZE = 30

const useUsersListViewModel = () => {
    const { isLoading } = useLoadingContext()
    const [state, setState] = useState({
        users: null,
        count: null,
        newUsersCount: null
    })
    const [currentPage, setCurrentPage] = useState(1)
    const [reachedEnd, setReachedEnd] = useState(false)
    const [refreshing, setRefresh] = useState(false)
    const [search, setSearch] = useState('')
    const { dispatch: setLoading } = useLoadingContext()
    const userRepository = UserRepository()


    const onRefresh = async () => {
        setRefresh(true)
        await getUsers(true)
        setRefresh(false)
    }

    const getUsers = async (isRefreshing) => {
        if (!isRefreshing) setLoading({ isLoading: true })
        try {
            const data = await userRepository.getUsers({ search, pagesize: PAGE_SIZE, currentPage: 1 })
            setState({
                users: data.users,
                count: data.count,
                newUsersCount: data.newUsersCount
            })
            setReachedEnd(false)
            setCurrentPage(1)
        } catch (e) {
            showAlert(getString.t('error'), getString.t('something_went_wrong'))
        }
        setLoading({ isLoading: false })
    }



    const nextPage = async () => {
        if (reachedEnd || isLoading) return
        console.log('nextPage');
        setLoading({ isLoading: true })
        try {
            const data = await userRepository.getUsers({ search, pagesize: PAGE_SIZE, currentPage: currentPage + 1 })
            if (data.users) {
                setState((prev) => {
                    return {
                        count: prev.count,
                        newUsersCount: prev.newUsersCount,
                        users: prev.users.concat(data.users)
                    }
                })
                setCurrentPage(currentPage + 1)
                if (data.users.length < PAGE_SIZE) {
                    setReachedEnd(true)
                }
            }
        } catch (e) {
            console.log(e);
        }
        setLoading({ isLoading: false })
    }


    const setSearchState = (text) => {
        setSearch(text.trim())
    }


    return {
        ...state,
        currentPage,
        nextPage,
        getUsers,
        isLoading,
        onRefresh,
        refreshing,
        reachedEnd,
        setSearchState
    }
}

export default useUsersListViewModel;