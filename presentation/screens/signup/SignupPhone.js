import { useEffect } from "react";
import { View, TextInput, Text, TouchableWithoutFeedback, Keyboard } from "react-native";
import useAuthContext from "../../../hooks/useAuthContext";
import getString from "../../../localization";
import BackButton from "../../components/BackButton";
import DefaultButton from "../../components/DefaultButton";
import Opt from "../../components/Opt";
import Spacer from "../../components/Spacer";
import Title from "../../components/Title";
import { globalStyles } from "../../styles/global";
import SignupViewModel from "./SignupViewModel";


const SignupPhone = ({ navigation }) => {
    const { phone, phoneError, onInputChanged, showCode, sendAuthVerification, signup, hideCode } = SignupViewModel()
    const { user } = useAuthContext()

    useEffect(() => {
        if (user) {
            navigation.reset({
                index: 0,
                routes: [{ name: 'SignupWelcome' }],
            })
        }
    }, [user])

    return (
        <TouchableWithoutFeedback style={{ flex: 1 }} onPress={Keyboard.dismiss}>
            <View style={{ padding: 8, flex: 1 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <BackButton onPress={navigation.goBack} />
                    <Spacer space={6} />
                    <Title text={getString.t('signup')} />
                </View>

                <Spacer style={{ flex: 1 }} />
                <View style={{ flex: 1, justifyContent: 'center' }}>

                    <View style={{ alignItems: 'flex-start' }}>
                        <Text style={globalStyles.font}>{getString.t('phone')}</Text>
                    </View>

                    {!showCode &&
                        <TextInput
                            style={{ ...globalStyles.input }}
                            onChangeText={(s) => { onInputChanged('phone', s) }}
                            value={phone}
                            keyboardType='numeric' />
                    }
                    <View style={{ alignItems: 'flex-start' }}>
                        <Text style={globalStyles.inputError}>{phoneError}</Text>
                    </View>

                    {showCode &&
                        <Opt number={4} callback={signup} goBack={hideCode} sendAgain={sendAuthVerification} />
                    }
                </View>
                <Spacer style={{ flex: 1 }} />
                {!showCode &&
                    <DefaultButton text={showCode ? getString.t('next') : getString.t('check_phone')} onPress={() => {
                        if (!showCode) {
                            sendAuthVerification()
                        }
                    }} />
                }

            </View>
        </TouchableWithoutFeedback>
    );
}

export default SignupPhone;