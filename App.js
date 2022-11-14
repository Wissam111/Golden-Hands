import "react-native-gesture-handler";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { useFonts } from "expo-font";
import Navigation from "./presentation/Navigation";
import { TailwindProvider } from "tailwindcss-react-native";
import { AuthContextProvider } from "./context/AuthContext";
import { LoadingContextProvider } from "./context/LoadingContext";
import Loader from "./presentation/components/Loader";
import 'moment/locale/he';
import moment, { locale } from "moment";
import './localization'
import {I18nManager} from "react-native"


I18nManager.allowRTL(true);
I18nManager.forceRTL(true);
moment,locale('he')

export default function App() {
  const [fontsLoaded] = useFonts({
    "poppins-medium": require("./assets/fonts/Poppins-Medium.ttf"),
    "poppins-bold": require("./assets/fonts/Poppins-Bold.ttf"),
  });
  if (fontsLoaded) {
    return (
      <LoadingContextProvider>
        <AuthContextProvider>
          <TailwindProvider>
            <Loader />
            <Navigation />
          </TailwindProvider>
        </AuthContextProvider>
      </LoadingContextProvider>
    );
  }
}

const styles = StyleSheet.create({});
