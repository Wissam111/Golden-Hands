import { apiCall } from "../network/apiCall";
import AsyncStorage from '@react-native-async-storage/async-storage';


const AuthRepository = () => {

    const sendAuthVerification = async (phone, isLogin, isSignup) => {
        const data = await apiCall('send-auth-verification', 'POST', { phone, isLogin, isSignup })
        return data
    }

    const loginAndVerify = async (verifyId, phone, code) => {
        const data = await apiCall('login-verify-phone', 'POST', { verifyId, phone, code })
        await AsyncStorage.setItem('authData', JSON.stringify({
            token: data.authData.token,
            refreshToken: data.authData.refresh_token,
            user: data.authData.user,
            expireDate: data.authData.expireDate,
        }))
        return data
    }


    const singupAndVerify = async ({ firstName, lastName, birthDate, verifyId, phone, code }) => {
        const data = await apiCall('signup-verify-phone', 'POST', { firstName, lastName, birthDate, verifyId, phone, code })
        await AsyncStorage.setItem('authData', JSON.stringify({
            token: data.authData.token,
            refreshToken: data.authData.refresh_token,
            user: data.authData.user,
            expireDate: data.authData.expireDate,
        }))
        return data
    }

    const logout = async () => {
        try {
            await AsyncStorage.removeItem('authData')
        } catch (e) {
            console.log('e');
        }
    }

    return { singupAndVerify, logout, sendAuthVerification, loginAndVerify }
}

export default AuthRepository;