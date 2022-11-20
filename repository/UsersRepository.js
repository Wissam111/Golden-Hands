import { apiCall } from "../network/apiCall";



const UserRepository = () => {

    const getUser = async (id) => {
        const data = await apiCall(`users/${id}`)
        return data
    }



}

export default UserRepository;