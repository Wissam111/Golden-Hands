import { View, Text, Button, SafeAreaView, TouchableWithoutFeedback, StyleSheet, Keyboard, TouchableOpacity, Platform } from "react-native";
import React, { useEffect } from "react";
import LoginViewModel from "./LoginViewModel";
import { backgroundColor, blue, globalStyles } from "../../styles/global";
import DefaultButton from "../../components/DefaultButton";
import Title from "../../components/Title";
import getString from "../../../localization";
import Opt from "../../components/Opt";
import BackButton from "../../components/BackButton";
import Spacer from "../../components/Spacer";
import TextInputIcon from "../../components/TextInputIcon";
import { AntDesign } from '@expo/vector-icons';
import Loader from "../../components/Loader";


const Login = ({ navigation }) => {
  const { navigateToHome, hideCode, showCode, phone, onPhoneChanged, sendAuthVerification, loginAndVerify } = LoginViewModel()

  useEffect(() => {
    if (navigateToHome) {
      navigation.reset({
        index: 0,
        routes: [{ name: 'HomeScreen' }],
      });
    }
  }, [navigateToHome])

  return (
    <TouchableWithoutFeedback style={{ flex: 1 }} onPress={Keyboard.dismiss}>
      <View style={{ justifyContent: 'center', flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', }}>
        <Loader />
        <View style={{
          margin: 6, borderRadius: 20, padding: 8, backgroundColor: backgroundColor
        }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <BackButton onPress={navigation.goBack} />
            <Spacer space={6} />
            <Title text={getString.t('login')} />
          </View>

          <Spacer space={26} />

          <View style={styles.container}>
            <View style={styles.topText}>
              <Text style={{ ...globalStyles.font, fontFamily: 'poppins-bold', alignItems: 'flex-start', fontSize: 30 }}>{getString.t('lets_start')}</Text>
              <Text style={{ ...globalStyles.font, alignItems: 'flex-start', fontSize: 26 }}>{getString.t('the_login_process')}</Text>
            </View>

            <Spacer space={18} />

            {
              (!showCode) ?
                <View>
                  <TextInputIcon
                    iconStart={<AntDesign name="phone" size={24} color="black" />}
                    onChangeText={onPhoneChanged}
                    value={phone}
                    placeholder={getString.t('phone')}
                    keyboardType="numeric" />

                  <Spacer space={10} />

                  <DefaultButton buttonStyles={{ paddingVertical: Platform.OS === 'android' ? 10 : 12 }} text={getString.t('login')} onPress={sendAuthVerification} />

                  <View style={styles.create}>
                    <Text style={{ marginEnd: 6 }}>{getString.t('dont_have_an_account')}</Text>
                    <TouchableOpacity onPress={() => { navigation.navigate('SignupNavigation') }}>
                      <Text style={{ ...globalStyles.font, color: blue }}>{getString.t('create_account')}</Text>
                    </TouchableOpacity>
                  </View>

                </View>
                :
                < Opt
                  style={{ marginTop: 30 }}
                  number={4}
                  goBack={hideCode}
                  callback={(code) => { loginAndVerify(code) }}
                  sendAgain={sendAuthVerification} />
            }
          </View>

          <Spacer space={36} />


          <SafeAreaView />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Login;


const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    zIndex: 3
  },

  create: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16
  },
  topText: {
    justifyConent: 'flex-start',
    alignItems: 'flex-start'
  }
})