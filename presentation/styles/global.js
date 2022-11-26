import { I18nManager, StyleSheet } from "react-native";


export const globalStyles = StyleSheet.create({
    font: {
        fontFamily: 'poppins-medium',
        fontSize: fontMeduim
    },
    input: {
        padding: 16,
        borderWidth: 1,
        borderColor: '#333',
        borderRadius: 8,
    },
    inputError: {
        color: '#E22D2D',
        fontSize: 12,
        fontFamily: 'poppins-medium',
    },

    txtDirection: {
        writingDirection: I18nManager.isRTL ? 'rtl' : 'ltr'
    }

})


export const fontXLarge = Platform.OS === 'android' ? 30 : 32
export const fontLarge = Platform.OS === 'android' ? 20 : 22
export const semiLarge = Platform.OS === 'android' ? 18 : 20
export const fontMeduim = Platform.OS === 'android' ? 14 : 16
export const fontSmall = Platform.OS === 'android' ? 10 : 12


export const primaryColor = '#1D1B1B'
export const backgroundColor = '#f5f5f5'
export const surfaceColor = '#f9f9f9'
export const blue = '#3172F0'
export const white = '#fff'
export const red = '#E22D2D'
export const orange1 = '#FF9502'
export const orange2 = '#FD7501'
export const green = '#32C240'
export const gray1 = '#8A8A8A'