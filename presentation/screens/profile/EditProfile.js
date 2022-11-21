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
import useEditProfileViewModel from "./EditProfileViewModel";
import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from "react";
import useAuthContext from "../../../hooks/useAuthContext";

const EditProfile = ({ navigation }) => {
    const { firstName, lastName, birthDate, phone, onInputChange, update } = useEditProfileViewModel()
    const [showDatePicker, setShowDatePicker] = useState(false)
    const { user } = useAuthContext()

    const onChange = (event, selectedDate) => {
        // console.log(selectedDate);
        onInputChange('birthDate', selectedDate)
        setShowDatePicker(false)
    };

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
                    onChangeText={(s) => { onInputChange('firstName', s) }}
                    value={firstName}
                />
                {/* <Text style={{ ...globalStyles.inputError, ...globalStyles.txtDirection }}>{firstNameError}</Text> */}

                <Spacer space={6} />

                <TextInputIcon
                    iconStart={<MaterialCommunityIcons name="account-details-outline" size={24} color="black" />}
                    placeholder={getString.t('last_name')}
                    onChangeText={(s) => { onInputChange('lastName', s) }}
                    value={lastName}
                />
                {/* <Text style={{ ...globalStyles.inputError, ...globalStyles.txtDirection }}>{lastNameError}</Text> */}
                <Spacer space={6} />




                <TouchableOpacity onPress={() => { setShowDatePicker(true) }}>
                    <View style={{ ...globalStyles.input, alignItems: 'flex-start', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <Fontisto name="date" size={24} color="black" />
                        <Spacer space={6} />
                        <Text>{birthDate ? moment(birthDate).format('DD/MM/yyyy') : getString.t('birth_date')}</Text>
                    </View>
                    {/* <Text style={{ ...globalStyles.inputError, ...globalStyles.txtDirection }}>{birthDateError}</Text> */}
                </TouchableOpacity>

                {showDatePicker &&
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={!birthDate ? new Date() : new Date(birthDate)}
                        mode={'date'}
                        is24Hour={true}
                        onChange={onChange}
                        maximumDate={new Date()}
                        minimumDate={new Date(1950, 0, 1)}
                    />
                }


                <Spacer space={6} />

                <TouchableOpacity onPress={() => { navigation.navigate('UpdatePhoneNumber') }}>
                    <View style={{ ...globalStyles.input, flexDirection: 'row', alignItems: 'center' }}>
                        <AntDesign name="phone" size={24} color="black" />
                        <Spacer space={6} />
                        <Text>{user.phone}</Text>
                    </View>
                </TouchableOpacity>

                <Spacer style={{ flex: 1 }} />

                <DefaultButton text={getString.t('update')} onPress={() => { update() }} />

            </View>
        </TouchableWithoutFeedback>
    );
}

export default EditProfile;