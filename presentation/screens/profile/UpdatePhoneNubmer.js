import { View, Text, TouchableWithoutFeedback, Keyboard } from "react-native";
import BackButton from "../../components/BackButton";
import DefaultButton from "../../components/DefaultButton";
import Opt from "../../components/Opt";
import Spacer from "../../components/Spacer";
import TextInputIcon from "../../components/TextInputIcon";
import Title from "../../components/Title";
import { backgroundColor, globalStyles } from "../../styles/global";
import { AntDesign } from '@expo/vector-icons';
import { useEffect, useState } from "react";
import getString from "../../../localization";
import useUpdatePhoneViewModel from "./UpdatePhoneViewModel";


const UpdatePhoneNumber = ({ navigation }) => {
    const { showCode, phone, isVerified, phoneError, hideCode, verifyAndUpdate, sendAuthVerification, onPhoneChanged } = useUpdatePhoneViewModel()

    useEffect(() => {
        if (isVerified) {
            setTimeout(() => {
                navigation.goBack()
            }, 1000)
        }
    }, [isVerified])

    return (
        <TouchableWithoutFeedback style={{ flex: 1 }} onPress={Keyboard.dismiss}>
            <View style={{ flex: 1, backgroundColor: backgroundColor, padding: 8 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <BackButton onPress={navigation.goBack} />
                    <Spacer space={6} />
                    <Title text={getString.t('phone_number')} />
                </View>

                <Spacer style={{ flex: 1 }} />

                <TextInputIcon
                    iconStart={<AntDesign name="phone" size={24} color="black" />}
                    onChangeText={onPhoneChanged}
                    value={phone}
                    keyboardType='numeric'
                    placeholder={getString.t('phone')} />
                <Text style={{ ...globalStyles.inputError, ...globalStyles.txtDirection }}>{phoneError}</Text>

                {showCode &&
                    <View>
                        <Spacer space={20} />
                        <Opt number={4} callback={(code) => { verifyAndUpdate(code) }} sendAgain={sendAuthVerification} goBack={hideCode} />
                    </View>
                }

                {
                    isVerified &&
                    <View>
                        <Spacer space={16} />
                        <Text style={{ ...globalStyles.font, textAlign: 'center' }}>Phone Updated Successfuly</Text>
                    </View>
                }

                <Spacer style={{ flex: 2 }} />

                {!showCode &&
                    <DefaultButton text={getString.t('update')} onPress={sendAuthVerification} />
                }
            </View>
        </TouchableWithoutFeedback>
    );
}

export default UpdatePhoneNumber;