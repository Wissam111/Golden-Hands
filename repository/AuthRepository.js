import { apiCall } from "../network/apiCall";
import AsyncStorage from '@react-native-async-storage/async-storage';



const AuthRepository = () => {

    const sendAuthVerification = async (phone, isLogin, isSignup) => {
        const data = await apiCall('send-auth-verification', 'POST', { phone, isLogin, isSignup })
        return data
    }

    const loginAndVerify = async (verifyId, phone, code) => {
        const data = await apiCall('login-verify-phone', 'POST', { verifyId, phone, code })
        await AsyncStorage.setItem('user', JSON.stringify(data.authData.user))
        await AsyncStorage.setItem('token', data.authData.token)
        await AsyncStorage.setItem('refreshToken', data.authData.refresh_token)
        await AsyncStorage.setItem('expireDate', data.authData.expireDate)
        return data
    }


    const singupAndVerify = async ({ firstName, lastName, birthDate, verifyId, phone, code }) => {
        const data = await apiCall('signup-verify-phone', 'POST', { firstName, lastName, birthDate, verifyId, phone, code })
        await AsyncStorage.setItem('user', JSON.stringify(data.authData.user))
        await AsyncStorage.setItem('token', data.authData.token)
        await AsyncStorage.setItem('refreshToken', data.authData.refresh_token)
        await AsyncStorage.setItem('expireDate', data.authData.expireDate)
        return data
    }

    const logout = async () => {
        try {
            await AsyncStorage.removeItem('user')
            await AsyncStorage.removeItem('token')
            await AsyncStorage.removeItem('refreshToken')
            await AsyncStorage.removeItem('expireDate')
        } catch (e) {
            console.log('e');
        }
    }

    const verifyUpdatePhone = async (code, phone, verifyId, userId) => {
        const data = await apiCall(`verify-update-phone`, 'PATCH', { code, phone, verifyId, userId })
        return data
    }

    return { singupAndVerify, verifyUpdatePhone, logout, sendAuthVerification, loginAndVerify }
}

export default AuthRepository;