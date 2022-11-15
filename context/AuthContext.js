import { createContext, useEffect, useReducer } from "react";


export const AuthContext = createContext()
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthRepository from "../repository/AuthRepository";


export const authReducer = (state, action) => {
    // console.log(action);
    switch (action.type) {
        case 'LOGIN':
            return {
                ...action.payload
            }

        case 'LOGOUT':
            const { logout } = AuthRepository()
            logout()
            return { user: null, token: null }

        default: return state
    }
}


const getAuthData = async (dispatch) => {
    try {
        const jsonValue = await AsyncStorage.getItem('authData')
        const data = jsonValue != null ? JSON.parse(jsonValue) : null;
        dispatch({
            type: 'LOGIN',
            payload: data
        })
    } catch (e) {
        console.log(e);
    }
}



export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null,
        token: null,
        refreshToken: null,
        expireDate: null
    })

    useEffect(() => {
        getAuthData(dispatch)
    }, [])

    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
}
