import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Home from "./screens/home/Home";
import BookAppointmentScreen from "./screens/BookAppointmentScreen";
import CustomDrawer from "./components/CustomDrawer";

const HomeStack = createNativeStackNavigator();

const HomeNavigation = () => {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name='HomeScreen' component={Home} />
      <HomeStack.Screen name='BookAppointment' component={BookAppointmentScreen} />
    </HomeStack.Navigator>
  )
}


const Drawer = createDrawerNavigator()

const DrawerNavigation = () => {
  return (
    <Drawer.Navigator
      drawerContentOptions={{
        activeTintColor: '#D09900',
        itemStyle: { borderRadius: 0, marginVertical: 0, borderBottomWidth: 0.5, borderBottomColor: '#D09900' },
      }}
      useLegacyImplementation screenOptions={{ headerShown: false }} drawerContent={props => <CustomDrawer {...props} />}>
      <Drawer.Screen name="Home" component={HomeNavigation} />
    </Drawer.Navigator>
  )
}



const Navigation = () => {
  return (
    <NavigationContainer>
      <DrawerNavigation />
    </NavigationContainer>
  );
};

export default Navigation;
