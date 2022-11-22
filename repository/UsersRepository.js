import { apiCall } from "../network/apiCall";



const UserRepository = () => {

    const getUser = async (id) => {
        const data = await apiCall(`users/${id}`)
        return data
    }

    const updateUser = async (id, payload) => {
        const data = await apiCall(`users/${id}`, 'PATCH', payload)
        return data
    }


    // only for superusers
    const getUsers = async (id) => {
        const data = await apiCall(`users`)
        return data
    }


    return { getUser, updateUser , getUsers }
}

export default UserRepository;