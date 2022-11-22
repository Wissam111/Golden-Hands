import { Keyboard, TextInput, SafeAreaView, Button, StyleSheet, Text, View, TouchableWithoutFeedback, TouchableOpacity, I18nManager } from "react-native";
import useSignupContext from "../../../hooks/useSignupContext";
import getString from "../../../localization";
import BackButton from "../../components/BackButton";
import DefaultButton from "../../components/DefaultButton";
import Spacer from "../../components/Spacer";
import Title from "../../components/Title";
import { backgroundColor, globalStyles } from "../../styles/global";
import SignupViewModel from "./SignupViewModel";
import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from "react";
import moment from 'moment'
import TextInputIcon from "../../components/TextInputIcon";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';

const Signup = ({ navigation }) => {
    const { firstName, firstNameError, lastName, lastNameError, birthDate, birthDateError, onInputChanged, navigateToSignupPhone } = SignupViewModel()
    const [showDatePicker, setShowDatePicker] = useState(false)

    const onChange = (event, selectedDate) => {
        // console.log(selectedDate);
        onInputChanged('birthDate', selectedDate)
        setShowDatePicker(false)
    };




    return (
        <TouchableWithoutFeedback style={{ flex: 1 }} onPress={() => { Keyboard.dismiss() }}>
            <View style={{ padding: 8, flex: 1, backgroundColor: backgroundColor, flexDirection: 'column' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <BackButton onPress={navigation.goBack} />
                    <Spacer space={6} />
                    <Title text={getString.t('signup')} />
                </View>

                <Spacer space={30} />

                <View>



                    <TextInputIcon
                        iconStart={<MaterialCommunityIcons name="card-account-details-outline" size={24} color="black" />}
                        placeholder={getString.t('first_name')}
                        onChangeText={(s) => { onInputChanged('firstName', s) }}
                        value={firstName}
                    />
                    <Text style={{ ...globalStyles.inputError, ...globalStyles.txtDirection }}>{firstNameError}</Text>

                    <Spacer space={6} />

                    <TextInputIcon
                        iconStart={<MaterialCommunityIcons name="account-details-outline" size={24} color="black" />}
                        placeholder={getString.t('last_name')}
                        onChangeText={(s) => { onInputChanged('lastName', s) }}
                        value={lastName}
                    />
                    <Text style={{ ...globalStyles.inputError, ...globalStyles.txtDirection }}>{lastNameError}</Text>
                    <Spacer space={6} />

                    <TouchableOpacity onPress={() => { setShowDatePicker(true) }}>
                        <View style={{ ...globalStyles.input, alignItems: 'flex-start', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <Fontisto name="date" size={24} color="black" />
                            <Spacer space={6} />
                            <Text>{birthDate ? moment(birthDate).format('DD/MM/yyyy') : getString.t('birth_date')}</Text>
                        </View>
                        <Text style={{ ...globalStyles.inputError, ...globalStyles.txtDirection }}>{birthDateError}</Text>
                    </TouchableOpacity>

                    {showDatePicker &&
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={!birthDate ? new Date() : birthDate}
                            mode={'date'}
                            is24Hour={true}
                            onChange={onChange}
                            maximumDate={new Date()}
                            minimumDate={new Date(1950, 0, 1)}
                        />
                    }


                </View>

                <Spacer style={{ flex: 1 }} space={30} />

                <DefaultButton text={getString.t('next')} onPress={navigateToSignupPhone} />
                <SafeAreaView />

            </View>
        </TouchableWithoutFeedback>
    );
}

export default Signup;

const styles = StyleSheet.create({

})