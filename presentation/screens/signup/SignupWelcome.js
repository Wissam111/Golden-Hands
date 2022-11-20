import { Image, Text, View } from "react-native";
import DefaultButton from "../../components/DefaultButton";
import Spacer from "../../components/Spacer";
import Title from "../../components/Title";
import { backgroundColor, globalStyles } from "../../styles/global";
import { CommonActions } from '@react-navigation/native';

const SignupWelcome = ({ navigation }) => {
   
    return (
        <View style={{ flex: 1, padding: 8, backgroundColor: backgroundColor }}>

            <Title text='Signup' />
            <Spacer style={{ flex: 1 }} />

            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

                <Text style={{ ...globalStyles.font, fontFamily: 'poppins-bold', fontSize: 40 }}>Wellcome</Text>
                <Text style={{ ...globalStyles.font, fontSize: 32 }}>To Our Barbershop</Text>
                <Text style={{ ...globalStyles.font, fontSize: 28 }}>We Are Ready</Text>

                <Image style={{ width: 160, height: 160 }} source={require('../../../assets/imgs/barber_logo-2.png')} />
            </View>


            <Spacer style={{ flex: 1 }} />
            <DefaultButton text='Done' onPress={() => {
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'HomeScreen' }],
                  });
            }} />



        </View>
    );
}

export default SignupWelcome;