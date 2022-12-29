import { apiCall } from "../network/apiCall";
import AsyncStorage from '@react-native-async-storage/async-storage';



const AuthRepository = () => {


    // sends an SMS message 
    const sendAuthVerification = async (phone, isLogin, isSignup) => {
        const data = await apiCall('send-auth-verification', 'POST', { phone, isLogin, isSignup })
        return data
    }


    // login the user and verify the code
    const loginAndVerify = async (verifyId, phone, code) => {
        const data = await apiCall('login-verify-phone', 'POST', { verifyId, phone, code })
        await AsyncStorage.setItem('user', JSON.stringify(data.authData.user))
        await AsyncStorage.setItem('token', data.authData.token)
        await AsyncStorage.setItem('refreshToken', data.authData.refresh_token)
        await AsyncStorage.setItem('expireDate', data.authData.expireDate)
        await AsyncStorage.setItem('expireDateRefreshToken', data.authData.expireDateRefreshToken)
        if (data.authData.user.image)
            await AsyncStorage.setItem('user_image', data.authData.user.image)
        return data
    }


    // signup the user and verify the code
    const singupAndVerify = async ({ firstName, lastName, birthDate, verifyId, phone, code }) => {
        const data = await apiCall('signup-verify-phone', 'POST', { firstName, lastName, birthDate, verifyId, phone, code })
        await AsyncStorage.setItem('user', JSON.stringify(data.authData.user))
        await AsyncStorage.setItem('token', data.authData.token)
        await AsyncStorage.setItem('refreshToken', data.authData.refresh_token)
        await AsyncStorage.setItem('expireDate', data.authData.expireDate)
        await AsyncStorage.setItem('expireDateRefreshToken', data.authData.expireDateRefreshToken)
        if (data.authData.user.image)
            await AsyncStorage.setItem('user_image', data.authData.user.image)
        return data
    }


    // logout the user and remove cache data
    const logout = async () => {
        try {
            await AsyncStorage.removeItem('user')
            await AsyncStorage.removeItem('token')
            await AsyncStorage.removeItem('refreshToken')
            await AsyncStorage.removeItem('expireDate')
            await AsyncStorage.removeItem('user_image')
            await AsyncStorage.removeItem('expireDateRefreshToken')
        } catch (e) {
            console.log('e');
        }
    }


    // verify and update the phone number
    const verifyUpdatePhone = async (code, phone, verifyId, userId) => {
        const data = await apiCall(`verify-update-phone`, 'PATCH', { code, phone, verifyId, userId })
        return data
    }

    return { singupAndVerify, verifyUpdatePhone, logout, sendAuthVerification, loginAndVerify }
}

export default AuthRepository;