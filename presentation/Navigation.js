import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BookAppointmentScreen from "./screens/BookAppointmentScreen.js";
import HomeScreen from "./screens/home/HomeScreen.js";
import { createDrawerNavigator } from "@react-navigation/drawer";

const HomeStack = createNativeStackNavigator();

const HomeNavigation = () => {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen
        name="BookAppointment"
        component={BookAppointmentScreen}
        options={{ presentation: "modal", headerShown: false }}
      />
    </HomeStack.Navigator>
  );
};

const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
  return (
    <Drawer.Navigator
      useLegacyImplementation
      screenOptions={{ headerShown: false }}
    >
      <Drawer.Screen name="HomeNavigation" component={HomeNavigation} />
    </Drawer.Navigator>
  );
};

const Navigation = () => {
  return (
    <NavigationContainer>
      <DrawerNavigation />
    </NavigationContainer>
  );
};

export default Navigation;
