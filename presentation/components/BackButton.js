import { TouchableOpacity, View } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { I18nManager } from 'react-native';

const BackButton = ({ onPress, color }) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={{ alignItems: 'flex-start' }}>
                {
                    I18nManager.isRTL ?
                        <MaterialIcons name="arrow-forward-ios" size={24} color={color ? color : "black"} /> :
                        <MaterialIcons name="arrow-back-ios" size={24} color="black" />
                }
            </View>
        </TouchableOpacity>
    );
}

export default BackButton;