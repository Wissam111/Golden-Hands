import { Image, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import Title from "../../components/Title";
import { FontAwesome5 } from '@expo/vector-icons';
import Spacer from "../../components/Spacer";
import { backgroundColor, fontLarge, fontXLarge, globalStyles, green, orange1, orange2, primaryColor, red, semiLarge, surfaceColor, white } from "../../styles/global";
import VerticalChip from "../../components/VerticalChip";
import HorizontalChip from "../../components/HorizontalChip";
import getString from "../../../localization";
import useProfileViewModel from "./ProfileViewModel";
import useAuthContext from "../../../hooks/useAuthContext";
import { useCallback, useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import Rating from "../../components/Rating";
import { MaterialIcons } from '@expo/vector-icons';
import BackButton from "../../components/BackButton";
import { dialPhoneNumber } from "../../../core/linking";
import { FontAwesome } from '@expo/vector-icons';
import BottomSheet from '@gorhom/bottom-sheet';
import { useRef, useMemo } from "react";

const Option = ({ text, icon, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={{ backgroundColor: surfaceColor, padding: 8, borderRadius: 12, flexDirection: 'row', alignItems: 'center', borderWidth: Platform.OS === 'android' ? .5 : 1, borderColor: 'rgba(0, 0, 0, .1)' }}>
                <View style={{ padding: 8, borderRadius: 12, backgroundColor: backgroundColor, alignItems: 'center', justifyContent: 'center' }}>
                    {icon}
                </View>
                <Spacer space={6} />
                <Text>{text}</Text>
            </View>
        </TouchableOpacity>
    )
}

const ProfileOptionsBottomSheet = ({ user, call, markAsBarber, block, show, onClose }) => {
    const bottomSheetRef = useRef(null);
    const snapPoints = useMemo(() => ['25%', '50%'], []);

    useEffect(() => {
        bottomSheetRef.current.close()
    }, [])

    useEffect(() => {
        if (show) {
            bottomSheetRef.current.expand()
        }
        else {
            bottomSheetRef.current.close()
        }
    }, [show])

    return (
        <BottomSheet
            containerStyle={{
                elevation: 8,
                shadowColor: 'black',
                shadowRadius: 1,
                shadowOpacity: 1,
                shadowOffset: { width: .7, height: .7 },
            }}
            ref={bottomSheetRef}
            index={-1}
            snapPoints={snapPoints}
            onClose={onClose}
            enablePanDownToClose>

            <View style={{ paddingHorizontal: 8, paddingVertical: 16 }}>
                <Text style={{ ...globalStyles.font, ...globalStyles.txtDirection, fontSize: semiLarge }}>{getString.t('actions')}</Text>
                <Spacer space={12} />
                <Option onPress={call} text={getString.t('call')} icon={<AntDesign name="phone" size={24} color={green} />} />
                <Spacer space={4} />
                <Option onPress={markAsBarber} text={user && user.role === 'customer' ? getString.t('mark_as_barber') : getString.t('mark_as_customer')} icon={<MaterialIcons name="work" size={24} color={orange2} />} />
                <Spacer space={4} />
                <Option onPress={block} text={user && user.isBlocked ? getString.t('unblock') : getString.t('block')} icon={<MaterialIcons name="block" size={24} color={user && user.isBlocked ? 'black' : red} />} />
            </View>
        </BottomSheet>
    )
}





const Profile = ({ navigation, route }) => {
    let { user } = useAuthContext()
    const { getUserProfile, user: fetchedUser, appointmentCount, paid, rating, preferredWorkers, markAsBarber, block } = useProfileViewModel()
    const isFocused = useIsFocused();
    const [show, setShow] = useState(false)

    useEffect(() => {
        if (isFocused)
            getUserProfile(route.params ? route.params.userId : null)
    }, [isFocused])

    if (route.params) {
        user = fetchedUser
    }

    return (
        <View style={{ flex: 1, backgroundColor: primaryColor, zIndex: 2 }}>


            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 12
            }}>
                {route.params &&
                    <>
                        <BackButton color='white' onPress={navigation.goBack} />
                        <Spacer space={6} />
                    </>
                }
                <Title text={getString.t('profile')} color={white} />
                <Spacer style={{ flex: 1 }} />

                {!route.params &&
                    <TouchableOpacity onPress={() => { navigation.navigate('EditProfile') }}>
                        <FontAwesome5 name="edit" size={24} color="white" />
                    </TouchableOpacity>
                }
            </View>

            <ScrollView showsVerticalScrollIndicator={false} style={{ backgroundColor: primaryColor, flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}>

                <View style={{ backgroundColor: backgroundColor }}>
                    <View style={{
                        backgroundColor: primaryColor,
                        padding: 8,
                        borderBottomEndRadius: 26,
                        borderBottomStartRadius: 26,
                        minHeight: '30%'
                    }}>

                        <Spacer space={12} />

                        {user && user.superUser &&
                            <Image style={{ alignSelf: 'center', width: 60, height: 60 }} source={require('../../../assets/imgs/crown.png')} />
                        }
                        <VerticalChip
                            chipIcon={user && user.role !== 'customer' ? <MaterialIcons name="work-outline" size={24} color="black" /> : <FontAwesome name="user" size={24} color="black" />}
                            text={user ? `${user.firstName} ${user.lastName}` : ''}
                            imageStyle={{ width: 180, height: 180 }}
                            imageUrl={user ? user.image : null}
                            onClickImage={() => { if (!route.params) navigation.navigate('ImageUpload', { title: getString.t('upload_image'), buttonText: getString.t('upload'), backButton: true }) }}
                        />
                        <Spacer space={12} />

                    </View>
                </View>

                <View style={{ backgroundColor: backgroundColor, height: '100%' }}>
                    <Spacer space={6} />


                    <View style={{ padding: 8, flexDirection: 'row' }}>
                        <TouchableOpacity onPress={() => { setShow(!show) }}>
                            <Feather name="settings" size={24} color="black" />
                        </TouchableOpacity>
                    </View>

                    <Spacer space={16} />

                    <View style={{ backgroundColor: surfaceColor, paddingVertical: 16, paddingHorizontal: 8, marginHorizontal: 6, borderRadius: 12 }}>
                        <View style={{ flexDirection: 'row', alignSelf: 'center', alignItems: 'center' }}>
                            <AntDesign name="idcard" size={24} color="black" />
                            <Spacer space={6} />
                            <Text style={{ ...globalStyles.font, fontFamily: 'poppins-bold' }}>{getString.t('general')}</Text>
                        </View>

                        <Spacer space={16} />

                        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{ ...globalStyles.font, fontFamily: 'poppins-bold' }}>תפקיד :</Text>
                                <Spacer space={6} />
                                {user &&
                                    <Text style={{ ...globalStyles.font, ...globalStyles.txtDirection, fontSize: fontLarge }}>{getString.t(user.role)}</Text>
                                }
                            </View>

                            <Spacer space={8} />

                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Feather name="phone" size={24} color="black" />
                                <Spacer space={6} />
                                {user &&
                                    <Text style={{ ...globalStyles.font, ...globalStyles.txtDirection }}>{user.phone}</Text>
                                }
                            </View>
                        </View>
                    </View>

                    <Spacer space={12} />


                    {route.params &&
                        <View style={{ flexDirection: 'row' }}>
                            <Spacer space={6} />

                            <View style={{ backgroundColor: orange1, padding: 20, borderRadius: 16, flex: 1, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                                <Text style={{ ...globalStyles.font, fontSize: fontXLarge, color: white }}>{paid}₪</Text>
                                <MaterialCommunityIcons name="account-cash-outline" size={24} color={white} />
                            </View>
                            <Spacer space={6} />
                        </View>
                    }

                    <Spacer space={12} />


                    <View style={{ flexDirection: 'row' }}>
                        <Spacer space={6} />
                        <View style={{ backgroundColor: '#79F877', padding: 20, borderRadius: 16, flex: 1, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                            <Text style={{ ...globalStyles.font, fontSize: fontXLarge, }}>{appointmentCount}</Text>
                            <MaterialCommunityIcons name="account-arrow-up-outline" size={24} color="black" />
                        </View>

                        <Spacer space={6} />

                        <View style={{ backgroundColor: surfaceColor, padding: 20, borderRadius: 16, flex: 2, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ ...globalStyles.font, fontSize: fontLarge }}>{getString.t('rating')}</Text>
                            <Spacer space={12} />
                            <Rating rating={rating} from={5} />
                        </View>
                        <Spacer space={6} />
                    </View>

                    <Spacer space={12} />

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
                                <View key={item.worker._id}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <HorizontalChip imageUrl={item.worker.image} text={`${item.worker.firstName} ${item.worker.lastName}`} />
                                        <Spacer style={{ flex: 1 }} />
                                        <Text style={{ ...globalStyles.font, fontSize: fontLarge }}>{item.count} {getString.t('appointments')}</Text>
                                        <Spacer style={{ flex: 1 }} />
                                    </View>
                                    <Spacer space={6} />
                                </View>
                            ))
                        }
                    </View>
                </View>
                <Spacer space={16} />
            </ScrollView>

            {user && !user.superUser &&
                < ProfileOptionsBottomSheet
                    onClose={() => {
                        setShow(false)
                    }}
                    show={show}
                    user={user}
                    call={() => { dialPhoneNumber(user.phone) }}
                    markAsBarber={() => { user && user.role === 'barber' ? markAsBarber('customer') : markAsBarber('barber') }}
                    block={() => { user && user.isBlocked ? block(false) : block(true) }} />
            }
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