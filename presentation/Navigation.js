import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Home from "./screens/home/Home";
import BookAppointmentScreen from "./screens/BookAppointments/BookAppointmentScreen";
import DashBoardScreen from "./screens/DashBoard/DashBoardScreen";
import CustomDrawer from "./components/CustomDrawer";
import Login from "./screens/login/Login";
import Signup from "./screens/signup/Signup";
import SignupPhone from "./screens/signup/SignupPhone";
import SignupWelcome from "./screens/signup/SignupWelcome";
import BookingLoadingScreen from "./screens/BookingLoadingScreen";
import { SignupContextProvider } from "../context/SignupContext";
import useAuthContext from "../hooks/useAuthContext";

const SingupStack = createNativeStackNavigator();

const SignupNavigation = () => {
  return (
    <SignupContextProvider>
      <SingupStack.Navigator screenOptions={{ headerShown: false }}>

        <HomeStack.Screen name="SignupScreen" component={Signup} />
        <HomeStack.Screen name="SignupPhone" component={SignupPhone} />
        <HomeStack.Screen name="SignupWelcome" component={SignupWelcome} />

      </SingupStack.Navigator>
    </SignupContextProvider>
  );
};


const HomeStack = createNativeStackNavigator();


const HomeNavigation = () => {

  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>


      <HomeStack.Screen name="HomeScreen" component={Home} />
      <HomeStack.Screen name="LoginScreen" component={Login} />

      <HomeStack.Screen name="SignupNavigation" component={SignupNavigation} />


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
  const { user } = useAuthContext()

  return (
    <Drawer.Navigator
      useLegacyImplementation
      screenOptions={{ headerShown: false }}
      drawerContent={(props) => <CustomDrawer {...props} />}
    >
      <Drawer.Screen name="Home" component={HomeNavigation} />
      {user && user.role === 'barber' &&
        <Drawer.Screen name="DashBoardScreen" component={DashBoardScreen} />
      }
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
