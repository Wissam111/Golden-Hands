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
import { backgroundColor, fontMeduim, globalStyles, orange1 } from "./styles/global";
import { AntDesign } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import Splash from "./screens/Splash";
import ImageUpload from "./components/ImageUpload";

const SignupNavigation = () => {
  return (
    <SignupContextProvider>
      <HomeStack.Navigator screenOptions={{ headerShown: false }}>
        <HomeStack.Screen name="SignupScreen" component={Signup} />
        <HomeStack.Screen name="SignupPhone" component={SignupPhone} />
        <HomeStack.Screen
          name="ImageUpload"
          component={ImageUpload}
          initialParams={{}}
        />
        <HomeStack.Screen name="SignupWelcome" component={SignupWelcome} />
      </HomeStack.Navigator>
    </SignupContextProvider>
  );
};

const ProfileStack = createNativeStackNavigator();

const ProfileNavigation = () => {
  return (
    <ProfileStack.Navigator screenOptions={{ headerShown: false }}>
      <ProfileStack.Screen name="Profile" component={Profile} />
      <ProfileStack.Screen name="EditProfile" component={EditProfile} />
      <ProfileStack.Screen
        name="UpdatePhoneNumber"
        component={UpdatePhoneNumber}
      />
      <ProfileStack.Screen name="ImageUpload" component={ImageUpload} />
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
        options={{
          presentation: "modal",
          headerShown: false,
          // ...TransitionPresets.ModalSlideFromBottomIOS,
          // ...TransitionPresets.FadeFromBottomAndroid,
        }}
      />

      <HomeStack.Screen
        name="BookingLoadingScreen"
        component={BookingLoadingScreen}
        options={{
          presentation: "fullScreenModal",
          headerShown: false,
        }}
      />
    </HomeStack.Navigator>
  );
};




const UsersListStack = createNativeStackNavigator();

const UsersListNavigation = () => {
  return (
    <UsersListStack.Navigator screenOptions={{ headerShown: false }}>
      <UsersListStack.Screen name="UsersListScreen" component={UsersList} />
      <ProfileStack.Screen name="ProfileScreen" component={Profile} />
    </UsersListStack.Navigator>
  );
};



const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
  const { user } = useAuthContext();

  return (
    <Drawer.Navigator
      useLegacyImplementation
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: "transparent",
        },
        drawerActiveTintColor: "#000",
        drawerLabelStyle: {
          ...globalStyles.font,
          fontSize: fontMeduim,
          color: "#000",
          textAlign: "left",
        },
        drawerItemStyle: {
          borderColor: backgroundColor,
          borderWidth: 1,
          borderRadius: 12,
        },
      }}
      drawerContent={(props) => <CustomDrawer {...props} />}
    >
      <Drawer.Screen
        name="Home"
        component={HomeNavigation}
        options={{
          drawerIcon: ({ focused, size }) => (
            <AntDesign
              name="home"
              size={size}
              color={focused ? orange1 : "#ccc"}
            />
          ),
          title: getString.t("home"),
        }}
      />

      {user && (
        <Drawer.Group>
          <Drawer.Screen
            name="UserAppointments"
            component={UserAppointments}
            options={{
              drawerIcon: ({ focused, size }) => (
                <Fontisto
                  name="date"
                  size={size}
                  color={focused ? orange1 : "#ccc"}
                />
              ),
              title: getString.t("appointments"),
            }}
          />
          <Drawer.Screen
            name="ProfileNavigation"
            component={ProfileNavigation}
            options={{
              drawerIcon: ({ focused, size }) => (
                <MaterialCommunityIcons
                  name="card-account-details-outline"
                  size={size}
                  color={focused ? orange1 : "#ccc"}
                />
              ),
              title: getString.t("profile"),
            }}
          />
        </Drawer.Group>
      )}

      {user && user.role === "barber" && (
        <Drawer.Group>
          <Drawer.Screen
            name="DashBoardScreen"
            component={DashBoardScreen}
            options={{
              drawerIcon: ({ focused, size }) => (
                <MaterialIcons
                  name="work-outline"
                  size={size}
                  color={focused ? orange1 : "#ccc"}
                />
              ),
              title: getString.t("worker_page"),
            }}
          />
          <Drawer.Screen
            name="UsersList"
            component={UsersListNavigation}
            options={{
              drawerIcon: ({ focused, size }) => (
                <FontAwesome5
                  name="users"
                  size={size}
                  color={focused ? orange1 : "#ccc"}
                />
              ),
              title: getString.t("users"),
            }}
          />
        </Drawer.Group>
      )}
    </Drawer.Navigator>
  );
};

const SplashStack = createNativeStackNavigator();

const SplashNavigation = () => {
  return (
    <SplashStack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: "transparent" },
      }}
    >
      <SplashStack.Screen name="Splash" component={Splash} />
      <SplashStack.Screen
        name="DrawerNavigation"
        component={DrawerNavigation}
      />
    </SplashStack.Navigator>
  );
};

const Navigation = () => {
  return (
    <NavigationContainer>
      <SplashNavigation />
    </NavigationContainer>
  );
};

export default Navigation;
