import { Image, Text, View } from "react-native";
import DefaultButton from "../../components/DefaultButton";
import Spacer from "../../components/Spacer";
import Title from "../../components/Title";
import { backgroundColor, globalStyles } from "../../styles/global";
import getString from "../../../localization";

const SignupWelcome = ({ navigation }) => {

    return (
        <View style={{ flex: 1, padding: 8, backgroundColor: backgroundColor }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Title text={getString.t('signup')} />
            </View>

            <Spacer style={{ flex: 1 }} />

            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

                <Text style={{ ...globalStyles.font, fontFamily: 'poppins-bold', fontSize: 40 }}>{getString.t('welcome')}</Text>
                <Text style={{ ...globalStyles.font, fontSize: 32 }}>{getString.t('to_our_barbershop')}</Text>
                <Text style={{ ...globalStyles.font, fontSize: 28 }}>{getString.t('we_are_ready')}</Text>

                <Image style={{ width: 160, height: 160 }} source={require('../../../assets/imgs/barber_logo-2.png')} />
            </View>


            <Spacer style={{ flex: 1 }} />
            <DefaultButton text={getString.t('done')} onPress={() => {
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'HomeScreen' }],
                });
            }} />



        </View>
    );
}

export default SignupWelcome;