import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { useFonts } from 'expo-font'
import Home from './presentation/screens/home/Home';

export default function App() {
  const [fontsLoaded] = useFonts({
    'poppins-medium': require('./assets/fonts/Poppins-Medium.ttf'),
    'poppins-bold': require('./assets/fonts/Poppins-Bold.ttf'),
  })

  if (fontsLoaded)
    return (
      <Home/>
    );
}

const styles = StyleSheet.create({

});
