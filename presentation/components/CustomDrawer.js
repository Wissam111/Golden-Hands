import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import { SafeAreaView, Text, View, Button, Alert } from "react-native";
import useAuthContext from "../../hooks/useAuthContext";
import getString from "../../localization";
import showAlert from "./ShowAlert";



const CustomDrawer = (props) => {
    const { user, dispatch } = useAuthContext()
    return (
        <View style={{ flex: 1, backgroundColor: '#cecece' }}>
            <DrawerContentScrollView>
                <DrawerItemList {...props} />
                {user &&
                    <Button title={getString.t('logout')} onPress={() => {
                        showAlert(getString.t('logout'), getString.t('are_you_sure_logout'), null, () => {
                            dispatch({
                                type: 'LOGOUT'
                            })
                            props.navigation.closeDrawer()
                        })
                    }} />
                }
            </DrawerContentScrollView>
        </View>
    );
}

export default CustomDrawer;