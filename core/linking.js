import { Linking, Platform } from "react-native";



export const openMaps = () => {
    const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
    const latLng = `${40.761043},${-73.980545}`;
    const label = 'Custom Label';
    const url = Platform.select({
        ios: `${scheme}${label}@${latLng}`,
        android: `${scheme}${latLng}(${label})`
    });


    Linking.openURL(url);
}


export const openWaze = () => {
    const wazelink = 'https://waze.com/ul?ll=32.041117, 34.904985&navigate=yes'
    const scheme = Platform.select({ ios: wazelink, android: wazelink });
    const url = Platform.select({
        ios: scheme,
        android: scheme
    });


    Linking.openURL(url);
}


export const openWhatsapp = () => {
    const whatsapplink = 'https://api.whatsapp.com/send?phone=+9720525409948&text=hello world'
    const scheme = Platform.select({ ios: whatsapplink, android: whatsapplink });
    const url = Platform.select({
        ios: scheme,
        android: scheme
    });
    Linking.openURL(url);
}