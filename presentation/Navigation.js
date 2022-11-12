import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";

const HomeStack = createNativeStackNavigator();

const HomeNavigation = () => {
    return (
        <HomeStack.Navigator screenOptions={{ headerShown: false }}>
            <HomeStack.Screen name='HomeScreen' component={Home} />
            <HomeStack.Screen name='BookAppointment' component={BookAppointment} />
        </HomeStack.Navigator>
    )
}


const Drawer = createDrawerNavigator()

const DrawerNavigation = () => {
    return (
        <Drawer.Navigator useLegacyImplementation screenOptions={{ headerShown: false }}>
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
