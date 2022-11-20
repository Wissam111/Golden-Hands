import { TextInput, Image, View, I18nManager } from "react-native";
import { globalStyles } from "../styles/global";
import Spacer from "./Spacer";

const TextInputIcon = ({ iconStart, placeholder, onChangeText, value, style, keyboardType, inputStyles }) => {
    return (

        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', ...globalStyles.input, padding: 0, ...style }} >
            <Spacer space={4} />
            {
                iconStart
            }
            <Spacer space={6} />
            <TextInput
                style={{ flex: 1, ...globalStyles.font, textAlign: I18nManager.isRTL ? 'right' : 'left', ...inputStyles, padding: 16 }}
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                keyboardType={keyboardType}
            />

        </View>

    );
}

export default TextInputIcon;