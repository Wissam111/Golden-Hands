import { StyleSheet, Platform, StatusBar } from "react-native";

export const AndroidSafeAreaStyle = {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
}