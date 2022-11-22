import AsyncStorage from '@react-native-async-storage/async-storage';
import getString from '../localization';
import showAlert from '../presentation/components/ShowAlert';

export const BASE_URL = 'https://saloon-ibra-api.herokuapp.com/api/'
export const IMAGE_BASE_URL = 'https://saloon-ibra-api.herokuapp.com/imgs/'

const serialize = function (obj) {
    var str = [];
    for (var p in obj)
        if (obj.hasOwnProperty(p)) {
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        }
    return '?' + str.join("&");
}

const getToken = async () => {
    try {
        const token = await AsyncStorage.getItem('token')
        if (token == null)
            return null
        return token
    } catch (e) {
        console.log('getToken:', e);
    }
}

export const getUserId = async () => {
    try {
        const userJson = await AsyncStorage.getItem('user')
        if (userJson == null)
            return null

        const user = JSON.parse(userJson)
        return user._id
    } catch (e) {
        console.log('getUserId:', e);
    }
}



export const apiCall = async (url, method = 'GET', body, queryParams) => {
    // const customURL = queryParams ? BASE_URL + url + serialize(queryParams) : BASE_URL + url
    const result = await fetch(BASE_URL + url, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${await getToken()}`
        },
        method: method,
        body: body ? JSON.stringify(body) : null
    })
    const json = await result.json()

    if (!result.ok) {
        if (result.status === 401) {
            showAlert(getString.t("error"), getString.t('you_are_not_authorized'))
        }

        throw {
            status: result.status,
            ...json
        }
    }

    return json
}
