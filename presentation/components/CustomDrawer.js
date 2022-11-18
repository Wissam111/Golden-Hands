import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import { SafeAreaView, Text, View, Button, Alert } from "react-native";
import useAuthContext from "../../hooks/useAuthContext";
import showAlert from "./ShowAlert";



const CustomDrawer = (props) => {
    const { dispatch } = useAuthContext()
    return (
        <View style={{ flex: 1, backgroundColor: '#cecece' }}>
            <DrawerContentScrollView>
                <DrawerItemList {...props} />
                <Button title="Logout" onPress={() => {
                    showAlert('Logout', 'Are you sure you want to logout?', null, () => {
                        dispatch({
                            type: 'LOGOUT'
                        })
                        props.navigation.closeDrawer()
                    })
                }} />
            </DrawerContentScrollView>
        </View>
    );
}

export default CustomDrawer;