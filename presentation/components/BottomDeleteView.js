import { TouchableOpacity } from "react-native"
import Animated, { SlideInDown,  SlideOutDown,  } from "react-native-reanimated"
import { primaryColor, red, white } from "../styles/global"
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';



const BottomDeleteView = ({ onCancel, onExcute }) => {
    return (
        <Animated.View
            entering={SlideInDown}
            exiting={SlideOutDown}
            style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                position: 'absolute',
                bottom: 0,
                start: 0,
                backgroundColor: primaryColor,
                width: '100%',
                padding: 20
            }}>

            <TouchableOpacity onPress={() => { onCancel() }}>
                <MaterialIcons name="cancel" size={24} color={white} />
            </TouchableOpacity>

            <TouchableOpacity onPress={onExcute}>
                <AntDesign name="delete" size={24} color={red} />
            </TouchableOpacity>
        </Animated.View>
    )
}

export default BottomDeleteView