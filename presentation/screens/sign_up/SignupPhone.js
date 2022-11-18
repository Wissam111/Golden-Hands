import { View, Text, TouchableWithoutFeedback, Keyboard } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import DefaultButton from "../../components/DefaultButton";
import Opt from "../../components/Opt";
import Spacer from "../../components/Spacer";
import { globalStyles } from "../../styles/global";


const SignupPhone = ({ navigation }) => {
    return (
        <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }}>
            <View style={{ padding: 8, flex: 1 }}>
                <Text style={globalStyles.font}>Login</Text>
                <Spacer style={{ flex: 1 }} />
                <View style={{ flex: 1, justifyContent: 'center' }}>

                    <Text style={globalStyles.font}>Phone</Text>
                    <TextInput style={{ ...globalStyles.input }} />
                    <Opt number={4} />

                </View>
                <Spacer style={{ flex: 1 }} />
                <DefaultButton text='Next' onPress={() => {
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'SignupWelcome' }],
                      });
                }} />

            </View>
        </TouchableWithoutFeedback>
    );
}

export default SignupPhone;