import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { useFonts } from 'expo-font'
import Navigation from './presentation/Navigation';

export default function App() {
  const [fontsLoaded] = useFonts({
    'poppins-medium': require('./assets/fonts/Poppins-Medium.ttf'),
    'poppins-bold': require('./assets/fonts/Poppins-Bold.ttf'),
  })

  if (fontsLoaded)
    return (
      <Navigation />
    );
}

const styles = StyleSheet.create({

});
