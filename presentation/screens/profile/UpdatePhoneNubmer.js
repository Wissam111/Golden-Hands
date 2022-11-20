import { View, Text, TouchableWithoutFeedback, Keyboard } from "react-native";
import BackButton from "../../components/BackButton";
import DefaultButton from "../../components/DefaultButton";
import Opt from "../../components/Opt";
import Spacer from "../../components/Spacer";
import TextInputIcon from "../../components/TextInputIcon";
import Title from "../../components/Title";
import { backgroundColor } from "../../styles/global";
import { AntDesign } from '@expo/vector-icons';


const UpdatePhoneNumber = ({ navigation }) => {
    return (
        <TouchableWithoutFeedback style={{ flex: 1 }} onPress={Keyboard.dismiss}>
            <View style={{ flex: 1, backgroundColor: backgroundColor, padding: 8 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <BackButton onPress={navigation.goBack} />
                    <Spacer space={6} />
                    <Title text={'Phone Number'} />
                </View>

                <Spacer style={{ flex: 1 }} />

                <TextInputIcon
                            iconStart={<AntDesign name="phone" size={24} color="black" />}
                            onChangeText={(s) => {  }}
                            value={'phone'}
                            keyboardType='numeric' />

                <Opt number={4} />

                <Spacer style={{ flex: 1 }} />

                <DefaultButton text='Update' />

            </View>
        </TouchableWithoutFeedback>
    );
}

export default UpdatePhoneNumber;