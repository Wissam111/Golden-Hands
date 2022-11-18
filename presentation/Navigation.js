import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Home from "./screens/home/Home";
import BookAppointmentScreen from "./screens/BookAppointments/BookAppointmentScreen";
import CustomDrawer from "./components/CustomDrawer";
import Login from "./screens/login/Login";
import Signup from "./screens/sign_up/Signup";
import SignupPhone from "./screens/sign_up/SignupPhone";
import SignupWelcome from "./screens/sign_up/SignupWelcome";

const SignupStack = createNativeStackNavigator();
import BookingLoadingScreen from "./screens/BookingLoadingScreen";
const HomeStack = createNativeStackNavigator();

const HomeNavigation = () => {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="HomeScreen" component={Home} />
      <HomeStack.Screen name="LoginScreen" component={Login} />

      <HomeStack.Group>
        <HomeStack.Screen name="SignupScreen" component={Signup} />
        <HomeStack.Screen name="SignupPhone" component={SignupPhone} />
        <HomeStack.Screen name="SignupWelcome" component={SignupWelcome} />
      </HomeStack.Group>

      <HomeStack.Screen
        name="BookAppointment"
        component={BookAppointmentScreen}
        options={{ presentation: "modal", headerShown: false }}
      />

      <HomeStack.Screen
        name="BookingLoadingScreen"
        component={BookingLoadingScreen}
        options={{ presentation: "fullScreenModal", headerShown: false }}
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
      drawerContent={(props) => <CustomDrawer {...props} />}
    >
      <Drawer.Screen name="Home" component={HomeNavigation} />
      <Drawer.Screen name="DashBoardScreen" component={DashBoardScreen} />
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
