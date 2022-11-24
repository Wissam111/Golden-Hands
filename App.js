import "react-native-gesture-handler";
import {
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useFonts } from "expo-font";
import Navigation from "./presentation/Navigation";
import { TailwindProvider } from "tailwindcss-react-native";
import { AuthContextProvider } from "./context/AuthContext";
import { LoadingContextProvider } from "./context/LoadingContext";
import Loader from "./presentation/components/Loader";
import "moment/locale/he";
import moment, { locale } from "moment";
import "./localization";
import { I18nManager } from "react-native";
import { AndroidSafeAreaStyle } from "./presentation/styles/AndroidSafeArea";
import { primaryColor } from "./presentation/styles/global";
import { SignupContextProvider } from "./context/SignupContext";

I18nManager.allowRTL(true);
moment, locale("he");

export default function App() {
  const [fontsLoaded] = useFonts({
    "poppins-medium": require("./assets/fonts/Poppins-Medium.ttf"),
    "poppins-bold": require("./assets/fonts/Poppins-Bold.ttf"),
  });
  if (fontsLoaded) {
    return (
      <View style={{ backgroundColor: primaryColor, flex: 1 }}>
        <SafeAreaView style={AndroidSafeAreaStyle}>
          <StatusBar barStyle="light-content" />
          <LoadingContextProvider>
            <AuthContextProvider>
              <SignupContextProvider>
                <TailwindProvider>
                  <Loader />
                  <Navigation />
                </TailwindProvider>
              </SignupContextProvider>
            </AuthContextProvider>
          </LoadingContextProvider>
        </SafeAreaView>
      </View>
    );
  }
}

const styles = StyleSheet.create({});
