import { TextInput, Image, View, I18nManager } from "react-native";
import { globalStyles } from "../styles/global";
import Spacer from "./Spacer";

const TextInputIcon = ({iconStart, placeholder, onChangeText, value, style, keyboardType, inputStyles , maxLength}) => {
    return (

        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', ...globalStyles.input, ...style, padding: 0, }} >
            <Spacer space={4} />
            {
                iconStart
            }
            <Spacer space={6} />
            <TextInput
                style={{ ...globalStyles.font, textAlign: I18nManager.isRTL ? 'right' : 'left', padding: 16, ...inputStyles }}
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                keyboardType={keyboardType}
                maxLength = {maxLength}
            />

        </View>

    );
}

export default TextInputIcon;