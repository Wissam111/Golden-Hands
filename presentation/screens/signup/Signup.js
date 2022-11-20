import { Keyboard, TextInput, SafeAreaView, StyleSheet, Text, View, TouchableWithoutFeedback } from "react-native";
import useSignupContext from "../../../hooks/useSignupContext";
import getString from "../../../localization";
import BackButton from "../../components/BackButton";
import DefaultButton from "../../components/DefaultButton";
import Spacer from "../../components/Spacer";
import Title from "../../components/Title";
import { backgroundColor } from "../../styles/global";
import SignupViewModel from "./SignupViewModel";


const Signup = ({ navigation }) => {
    const { firstName, lastName, birthDate, onInputChanged } = SignupViewModel()

    return (
        <TouchableWithoutFeedback style={{ flex: 1, height: '1' }} onPress={() => { Keyboard.dismiss() }}>
            <View style={{ padding: 8, flex: 1, backgroundColor: backgroundColor, flexDirection: 'column' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <BackButton onPress={navigation.goBack} />
                    <Spacer space={6} />
                    <Title text={getString.t('signup')} />
                </View>

                <Spacer space={30} />

                <View>
                    <TextInput
                        style={styles.input}
                        placeholder="First Name"
                        onChangeText={(s) => { onInputChanged('firstName', s) }}
                        value={firstName}
                    />

                    <Spacer space={6} />

                    <TextInput
                        style={styles.input}
                        placeholder="Last Name"
                        onChangeText={(s) => { onInputChanged('lastName', s) }}
                        value={lastName}
                    />
                    <Spacer space={6} />

                    <TextInput
                        style={styles.input}
                        placeholder="Birth Date"
                        onChangeText={(s) => { onInputChanged('birthDate', s) }}
                        value={birthDate}
                    />
                </View>

                <Spacer style={{ flex: 1 }} space={30} />

                <DefaultButton text='Next' onPress={() => { navigation.navigate('SignupPhone') }} />


            </View>
        </TouchableWithoutFeedback>
    );
}

export default Signup;

const styles = StyleSheet.create({
    input: {
        padding: 16,
        borderWidth: 1,
        borderColor: '#333',
        borderRadius: 8,
    }
})