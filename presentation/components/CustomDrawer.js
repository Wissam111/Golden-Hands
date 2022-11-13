import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import { SafeAreaView, Text, View } from "react-native";


const CustomDrawer = (props) => {
    return (
            <View style={{ flex: 1, backgroundColor: '#cecece'}}>

                <DrawerContentScrollView>
                    <DrawerItemList {...props} />
                </DrawerContentScrollView>
                
            </View>
    );
}

export default CustomDrawer;