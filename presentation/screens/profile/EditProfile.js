import { Keyboard, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import getString from "../../../localization";
import BackButton from "../../components/BackButton";
import Spacer from "../../components/Spacer";
import TextInputIcon from "../../components/TextInputIcon";
import Title from "../../components/Title";
import { backgroundColor, globalStyles } from "../../styles/global";
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import moment from 'moment'
import DefaultButton from "../../components/DefaultButton";

const EditProfile = ({ navigation }) => {
    return (
        <TouchableWithoutFeedback style={{ flex: 1 }} onPress={Keyboard.dismiss}>
            <View style={{ flex: 1, backgroundColor: backgroundColor, padding: 8 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <BackButton onPress={navigation.goBack} />
                    <Spacer space={6} />
                    <Title text={getString.t('edit_profile')} />
                </View>

                <Spacer space={22} />

                <TextInputIcon
                    iconStart={<MaterialCommunityIcons name="card-account-details-outline" size={24} color="black" />}
                    placeholder={getString.t('first_name')}
                    onChangeText={(s) => { }}
                    value={'firstName'}
                />
                {/* <Text style={{ ...globalStyles.inputError, ...globalStyles.txtDirection }}>{firstNameError}</Text> */}

                <Spacer space={6} />

                <TextInputIcon
                    iconStart={<MaterialCommunityIcons name="account-details-outline" size={24} color="black" />}
                    placeholder={getString.t('last_name')}
                    onChangeText={(s) => { }}
                    value={'lastName'}
                />
                {/* <Text style={{ ...globalStyles.inputError, ...globalStyles.txtDirection }}>{lastNameError}</Text> */}
                <Spacer space={6} />

                <TouchableOpacity onPress={() => { }}>
                    <View style={{ ...globalStyles.input, alignItems: 'flex-start', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <Fontisto name="date" size={24} color="black" />
                        <Spacer space={6} />
                        {/* <Text>{birthDate ? moment(birthDate).format('DD/MM/yyyy') : getString.t('birth_date')}</Text> */}
                    </View>
                    {/* <Text style={{ ...globalStyles.inputError, ...globalStyles.txtDirection }}>{birthDateError}</Text> */}
                </TouchableOpacity>

                <Spacer space={6} />

                <TouchableOpacity onPress={() => { navigation.navigate('UpdatePhoneNumber')}}>
                    <View style={{ ...globalStyles.input, flexDirection: 'row', alignItems: 'center' }}>
                        <AntDesign name="phone" size={24} color="black" />
                        <Spacer space={6} />
                        <Text>0525145565</Text>
                    </View>
                </TouchableOpacity>

                <Spacer style={{ flex: 1 }} />

                <DefaultButton text='Update' />

            </View>
        </TouchableWithoutFeedback>
    );
}

export default EditProfile;