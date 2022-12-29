import { TouchableOpacity, View } from "react-native"
import Animated, { FadeIn, FadeOut, SlideInDown, SlideOutDown } from "react-native-reanimated";
import { primaryColor, red, white } from "../styles/global"
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';



const BottomDeleteView = (props) => {
    const { onCancel, onExcute } = props


    return (
        <Animated.View
            style={{ position: 'absolute', width: '100%', bottom: 0, start: 0 , zIndex: 10}}
            entering={SlideInDown}
            exiting={SlideOutDown}>

            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    backgroundColor: primaryColor,
                    width: '100%',
                    zIndex: 10,
                    padding: 20
                }}>
                <TouchableOpacity onPress={() => { onCancel() }}>
                    <MaterialIcons name="cancel" size={24} color={white} />
                </TouchableOpacity>

                <TouchableOpacity onPress={onExcute}>
                    <AntDesign name="delete" size={24} color={red} />
                </TouchableOpacity>
            </View>
        </Animated.View>
    )
}

export default BottomDeleteView