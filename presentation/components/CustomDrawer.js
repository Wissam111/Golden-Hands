import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import { SafeAreaView, Text, View, Button, Alert } from "react-native";
import useAuthContext from "../../hooks/useAuthContext";
import getString from "../../localization";
import DefaultButton from "./DefaultButton";
import showAlert from "./ShowAlert";
import Spacer from "./Spacer";
import { useDrawerStatus } from '@react-navigation/drawer';



const CustomDrawer = (props) => {
    const { user, dispatch } = useAuthContext()
    return (
        <View style={{ flex: 1, backgroundColor: '#fefefe', borderRadius: 20, position: 'relative' }}>
            <DrawerContentScrollView style={{ flex: 1 }}>
                <Spacer space={20} />
                
                <DrawerItemList {...props} />

                <View style={{ height: '100%' }}>
                    <Spacer style={{ flex: 1 }} />

                    {user &&
                        <View style={{ paddingBottom: 20, paddingHorizontal: 8 }}>
                            <DefaultButton text={getString.t('logout')} onPress={() => {
                                showAlert(getString.t('logout'), getString.t('are_you_sure_logout'), null, () => {
                                    dispatch({
                                        type: 'LOGOUT'
                                    })
                                    props.navigation.closeDrawer()
                                })
                            }} />
                        </View>}

                </View>
            </DrawerContentScrollView>
        </View>
    );
}

export default CustomDrawer;