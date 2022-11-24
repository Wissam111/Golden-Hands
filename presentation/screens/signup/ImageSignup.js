import { Image, View, Text } from "react-native";
import getString from "../../../localization";
import DefaultButton from "../../components/DefaultButton";
import Spacer from "../../components/Spacer";
import Title from "../../components/Title";
import { backgroundColor, globalStyles, white } from "../../styles/global";


const ImageSignup = ({ navigation }) => {
    return (
        <View style={{ flex: 1, padding: 8, backgroundColor: backgroundColor }}>
            <Title text={getString.t('signup')} />
            <Spacer space={12} />

            <Image style={{ alignSelf: 'center', width: 160, height: 160, borderRadius: 100, borderWidth: 1, borderColor: white }} source={require('../../../assets/imgs/tarik.jpg')} />
            <Spacer space={12} />
            <Text style={{ ...globalStyles.font, alignSelf: 'center' }}>Let's add a profile image</Text>


            <Spacer style={{ flex: 1 }} />
            <DefaultButton text={getString.t('next')} onPress = {()=>{navigation.navigate('SignupWelcome')}}/>


        </View>
    );
}

export default ImageSignup;