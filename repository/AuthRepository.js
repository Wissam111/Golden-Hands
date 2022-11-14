import { apiCall } from "../network/apiCall";


const AuthRepository = () => {

    const sendAuthVerification = async (phone) => {
        console.log(phone);
        const data = apiCall('send-auth-verification', 'POST', { phone })
        return data
    }

    const loginAndVerify = (verifyId, phone, code) => {
        const data = apiCall('login-verify-phone', 'POST', { verifyId, phone, code })
        return data
    }

    return { sendAuthVerification, loginAndVerify }
}

export default AuthRepository;