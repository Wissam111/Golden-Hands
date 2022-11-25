import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Title from "../../components/Title";
import { FontAwesome5 } from '@expo/vector-icons';
import Spacer from "../../components/Spacer";
import { backgroundColor, globalStyles, orange1, primaryColor, surfaceColor, white } from "../../styles/global";
import VerticalChip from "../../components/VerticalChip";
import HorizontalChip from "../../components/HorizontalChip";
import getString from "../../../localization";
import useProfileViewModel from "./ProfileViewModel";
import useAuthContext from "../../../hooks/useAuthContext";
import { useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

const Profile = ({ navigation }) => {
    const { user } = useAuthContext()
    const { getUserProfile, appointmentCount, paid, preferredWorkers } = useProfileViewModel()
    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused)
            getUserProfile()
    }, [isFocused])



    return (
        <View style={{ flex: 1, backgroundColor: backgroundColor }}>
            <View style={{
                backgroundColor: primaryColor,
                padding: 8,
                borderBottomEndRadius: 26,
                borderBottomStartRadius: 26,
                minHeight: '40%'
            }}>

                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                }}>
                    <Title text={getString.t('profile')} color={white} />
                    <Spacer style={{ flex: 1 }} />
                    <TouchableOpacity onPress={() => { navigation.navigate('EditProfile') }}>
                        <FontAwesome5 name="edit" size={24} color="white" />
                    </TouchableOpacity>
                </View>

                <Spacer space={22} />


                <VerticalChip text={`${user.firstName} ${user.lastName}`}
                    imageStyle={{ width: 180, height: 180 }}
                    imageUrl={user.image}
                    onClickImage={() => { navigation.navigate('ImageUpload', { title: getString.t('upload_image'), buttonText: getString.t('upload'), backButton: true }) }}
                />

                <Spacer space={22} />



            </View>

            <ScrollView showsVerticalScrollIndicator={false} style={{ paddingVertical: 16, backgroundColor: backgroundColor, flex: 1 }}>

                <View style={{ backgroundColor: backgroundColor }}>

                    <View style={{ backgroundColor: surfaceColor, paddingVertical: 16, paddingHorizontal: 8, marginHorizontal: 6, borderRadius: 12 }}>
                        <View style={{ flexDirection: 'row', alignSelf: 'center', alignItems: 'center' }}>
                            <AntDesign name="idcard" size={24} color="black" />
                            <Spacer space={6} />
                            <Text style={{ ...globalStyles.font, fontFamily: 'poppins-bold' }}>{getString.t('general')}</Text>
                        </View>

                        <Spacer space={16} />

                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ ...globalStyles.font, fontFamily: 'poppins-bold' }}>תפקיד :</Text>
                            <Spacer space={6} />
                            <Text style={{ ...globalStyles.font, ...globalStyles.txtDirection, fontSize: 20 }}>{getString.t(user.role)}</Text>
                        </View>

                        <Spacer space={8} />

                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Feather name="phone" size={24} color="black" />
                            <Spacer space={6}/>
                            <Text style={{ ...globalStyles.font, ...globalStyles.txtDirection }}>{user.phone}</Text>
                        </View>
                    </View>

                    <Spacer space={16} />

                    <View style={{ flexDirection: 'row' }}>
                        <Spacer space={6} />
                        <View style={{ backgroundColor: '#79F877', padding: 20, borderRadius: 16, flex: 1, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                            <Text style={{ ...globalStyles.font, fontSize: 36, }}>{appointmentCount}</Text>
                            <MaterialCommunityIcons name="account-arrow-up-outline" size={24} color="black" />
                        </View>

                        <Spacer space={6} />

                        <View style={{ backgroundColor: surfaceColor, padding: 20, borderRadius: 16, flex: 2, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ ...globalStyles.font, fontSize: 22 }}>{getString.t('rating')}</Text>
                            <Spacer space={12} />
                            <View style={{ flexDirection: 'row' }}>
                                <AntDesign name="star" size={24} color={orange1} />
                                <AntDesign name="star" size={24} color={orange1} />
                                <AntDesign name="star" size={24} color={orange1} />
                                <AntDesign name="star" size={24} color={orange1} />
                                <AntDesign name="star" size={24} color={orange1} />
                            </View>
                        </View>
                        <Spacer space={6} />
                    </View>

                    <Spacer space={16} />

                    <View style={{ backgroundColor: surfaceColor, padding: 8, marginHorizontal: 6, borderRadius: 12 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <AntDesign name="staro" size={24} color="black" />
                            <Spacer space={6} />
                            <Text style={{ ...globalStyles.font, ...globalStyles.txtDirection, fontFamily: 'poppins-bold' }}>{getString.t('preferred_workers')}</Text>
                        </View>
                        <Spacer space={12} />


                        {
                            preferredWorkers &&
                            preferredWorkers.map(item => (
                                <View key={item.worker._id} style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <HorizontalChip imageUrl={item.worker.image} text={`${item.worker.firstName} ${item.worker.lastName}`} />
                                    <Spacer style={{ flex: 1 }} />
                                    <Text style={{ ...globalStyles.font, fontSize: 22 }}>{item.count} {getString.t('appointments')}</Text>
                                    <Spacer style={{ flex: 1 }} />
                                </View>
                            ))
                        }
                        {/* <HorizontalChip text='tarik husin' />
                        <Spacer space={6} />
                        <HorizontalChip text='tarik husin' /> */}
                    </View>
                </View>
                <Spacer space={16} />
            </ScrollView>


        </View>
    );
}

export default Profile;

const styles = StyleSheet.create({
    shadow: {
        elevation: 12,
        shadowColor: 'black',
        shadowRadius: 2,
        shadowOpacity: .3,
        shadowOffset: { width: 1, height: 1 },
    }
})