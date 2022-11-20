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
import UserAppointments from "./screens/user-appointments/UserAppointments";
import Profile from "./screens/profile/Profile";
import getString from "../localization";
import EditProfile from "./screens/profile/EditProfile";
import UpdatePhoneNumber from "./screens/profile/UpdatePhoneNubmer";
import UsersList from "./screens/users-list/UsersList";

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



const ProfileStack = createNativeStackNavigator();

const ProfileNavigation = () => {
  return (
    <ProfileStack.Navigator screenOptions={{ headerShown: false }}>

      <ProfileStack.Screen name="Profile" component={Profile} />
      <ProfileStack.Screen name="EditProfile" component={EditProfile} />
      <ProfileStack.Screen name="UpdatePhoneNumber" component={UpdatePhoneNumber} />

    </ProfileStack.Navigator>
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
      <Drawer.Screen name="Home" component={HomeNavigation} options={{ title: getString.t('home') }} />

      {user &&
        <Drawer.Group>
          <Drawer.Screen name="UserAppointments" component={UserAppointments} options={{ title: getString.t('appointments') }} />
          <Drawer.Screen name="ProfileNavigation" component={ProfileNavigation} options={{ title: getString.t('profile') }} />
        </Drawer.Group>
      }

      {user && user.role === 'barber' &&
        <Drawer.Group>
          <Drawer.Screen name="DashBoardScreen" component={DashBoardScreen} options={{ title: getString.t('worker_page') }} />
          <Drawer.Screen name="UsersList" component={UsersList} options={{ title: getString.t('users') }} />
        </Drawer.Group>
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
