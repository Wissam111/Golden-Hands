import { View, TextInput, Text, TouchableWithoutFeedback, Keyboard } from "react-native";
import DefaultButton from "../../components/DefaultButton";
import Opt from "../../components/Opt";
import Spacer from "../../components/Spacer";
import { globalStyles } from "../../styles/global";
import SignupViewModel from "./SignupViewModel";


const SignupPhone = ({ navigation }) => {
    const { phone, navigateToWelcome, onInputChanged, showCode, sendAuthVerification } = SignupViewModel()

    return (
        <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }}>
            <View style={{ padding: 8, flex: 1 }}>
                <Text style={globalStyles.font}>Login</Text>
                <Spacer style={{ flex: 1 }} />
                <View style={{ flex: 1, justifyContent: 'center' }}>

                    <Text style={globalStyles.font}>Phone</Text>
                    <TextInput
                        style={{ ...globalStyles.input }}
                        onChangeText={(s) => { onInputChanged('phone', s) }}
                        value={phone} />

                    {showCode &&
                        <Opt number={4} />
                    }
                </View>
                <Spacer style={{ flex: 1 }} />
                <DefaultButton text={showCode ? 'Next' : 'Check Phone'} onPress={() => {
                    if (showCode) {
                        // navigation.reset({
                        //     index: 0,
                        //     routes: [{ name: 'SignupWelcome' }],
                        // })
                    }
                    else {
                        sendAuthVerification()
                    }
                }} />

            </View>
        </TouchableWithoutFeedback>
    );
}

export default SignupPhone;