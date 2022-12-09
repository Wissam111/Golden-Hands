import { apiCall } from "../network/apiCall";
import AsyncStorage from '@react-native-async-storage/async-storage';



const UserRepository = () => {

    // get user with this $id
    const getUser = async (id) => {
        const data = await apiCall(`users/${id}`)
        return data
    }


    /**
     *  update the user
     * @param {*} id  user id
     * @param {*} payload an object that has the fields to update
     * @returns 
     */
    const updateUser = async (id, payload) => {
        const data = await apiCall(`users/${id}`, 'PATCH', payload)
        return data
    }


    /**
     * get all users from the database
     * @param {*} id 
     * @returns 
     */
    const getUsers = async (id) => {
        const data = await apiCall(`users`)
        return data
    }


    /**
     * uploads an image
     * @param {*} localUri 
     * @param {*} filename 
     * @param {*} type 
     * @returns 
     */
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