import { apiCall } from "../network/apiCall";
import AsyncStorage from '@react-native-async-storage/async-storage';



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


    const uploadImage = async (localUri, filename, type) => {
        let formData = new FormData();
        formData.append('image', { uri: localUri, name: filename, type });

        const data = await apiCall(`users/upload-image`, 'POST', formData, null, 'multipart/form-data')
        AsyncStorage.setItem('user_image', data.filename)
        return data
    }

    return { getUser, updateUser, getUsers, uploadImage }
}

export default UserRepository;