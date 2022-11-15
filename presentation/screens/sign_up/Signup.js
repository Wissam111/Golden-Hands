import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import getString from "../../../localization";
import BackButton from "../../components/BackButton";
import DefaultButton from "../../components/DefaultButton";
import Spacer from "../../components/Spacer";
import Title from "../../components/Title";
import { backgroundColor } from "../../styles/global";


const Signup = ({ navigation }) => {
    return (
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
                />

                <Spacer space={6} />

                <TextInput
                    style={styles.input}
                    placeholder="Last Name"
                />
                <Spacer space={6} />

                <TextInput
                    style={styles.input}
                    placeholder="Birth Date"
                />
            </View>

            <Spacer style={{ flex: 1 }} space={30} />

            <DefaultButton text='Next' onPress={() => { navigation.navigate('SignupPhone') }} />


        </View>
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