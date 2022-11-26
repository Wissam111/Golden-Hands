import { StyleSheet, View, Text, ScrollView, RefreshControl, SafeAreaView, Image, TouchableOpacity } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { backgroundColor, fontLarge, fontSmall, globalStyles, gray1, primaryColor, semiLarge, surfaceColor, white } from "../../styles/global";
import BorderButton from "../../components/BorderButton";
import HorizontalChip from "../../components/HorizontalChip";
import VerticalChip from '../../components/VerticalChip'
import useHomeViewModel from "./HomeViewModel";
import { useCallback, useEffect, useState } from "react";
import { FlatList } from "react-native-gesture-handler";
import { useIsFocused } from "@react-navigation/native";
import 'moment/locale/he';
import moment from "moment";
import getString from "../../../localization";
import useAuthContext from "../../../hooks/useAuthContext";
import Spacer from "../../components/Spacer";
import { openMaps, openWaze, openWhatsapp } from "../../../core/linking";
import { FontAwesome } from '@expo/vector-icons';
import Animated, { FadeIn, FadeInDown, FadeInUp, FadeOut, SlideInDown, SlideInRight, SlideInUp, SlideOutUp, useAnimatedRef } from "react-native-reanimated";
import { useRef } from "react";
import { IMAGE_BASE_URL } from "../../../network/apiCall";
import AppointmentCard from "../../components/AppointmentCard";





const GeustHeader = () => {
    return (
        <View style={{ marginTop: 16 }}>
            <Text style={{ ...globalStyles.font, fontSize: semiLarge, color: white, textAlign: 'center' }}>{getString.t('hello_there_login_first')}</Text>
        </View>
    )
}


// const LoggedInHeader = ({ appointment }) => {

//     return (
//         <Animated.View
//             entering={FadeIn.duration(600)}
//             exiting={FadeOut}
//             style={{ justifyContent: 'center', alignItems: 'center', marginTop: 16 }}>
//             {
//                 appointment ?
//                     (
//                         <Animated.View style={{ justifyContent: 'center', alignItems: 'center' }}>

//                             <Text style={{ ...globalStyles.font, fontSize: semiLarge, ...styles.margin, color: '#fff' }}>{getString.t('you_have_an_appointment')}</Text>
//                             <Text style={{ ...globalStyles.font, fontSize: semiLarge, ...styles.margin, color: '#fff' }}>{moment(appointment.start_time).format(`dddd, MMMM DD [${getString.t('at')}] HH:mm`)}</Text>

//                             <HorizontalChip
//                                 style={styles.margin}
//                                 text={`${appointment.worker.firstName} ${appointment.worker.lastName}`}
//                                 imageUrl={appointment.worker.image} />

//                             <Spacer space={20} />

//                             <TouchableOpacity onPress={() => { openWaze() }}>
//                                 <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//                                     <Image style={{ width: 30, height: 30 }} source={require('../../../assets/imgs/location.png')} />
//                                     <Spacer space={6} />
//                                     <Text style={{ ...globalStyles.font, fontSize: semiLarge, ...styles.margin, color: '#fff' }}>{getString.t('find_us')}</Text>
//                                 </View>
//                             </TouchableOpacity>
//                         </Animated.View>
//                     )
//                     : (
//                         <Animated.View>
//                             <Text style={{ ...globalStyles.font, fontSize: semiLarge, color: white, textAlign: 'center' }}>{getString.t('you_dont_have_appointment')}</Text>
//                         </Animated.View>
//                     )
//             }
//         </Animated.View>
//     );
// }



const Time = ({ startTime, endTime }) => {
    return (
        <View style={{ alignItems: 'center', position: 'relative', top: -24 }} >
            <Text style={{ color: white, ...globalStyles.font }}>{moment(startTime).format('HH:mm')}</Text>
            <Spacer space={6} />
            <View style={{ height: 16, width: 1, borderRadius: 100, backgroundColor: backgroundColor }} />
            <Spacer space={6} />
            <View style={{ height: 16, width: 1, backgroundColor: backgroundColor, borderRadius: 100 }} />
            <Spacer space={6} />
            <View style={{ height: 16, width: 1, backgroundColor: backgroundColor, borderRadius: 100 }} />
            <Spacer space={6} />
            <Text style={{ color: white, ...globalStyles.font }}>{moment(endTime).format('HH:mm')}</Text>
        </View>
    )
}


const LocationView = () => {
    return (
        <View style={{ alignSelf: 'flex-end' }}>
            <View style={{ height: 16, width: 1, backgroundColor: backgroundColor, borderRadius: 100 }} />
            <Spacer space={6} />

            <View style={{ height: 16, width: 1, backgroundColor: backgroundColor, borderRadius: 100 }} />
            <Spacer space={6} />

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ position: 'relative', top: -20, height: 16, width: 1, backgroundColor: backgroundColor, borderRadius: 100 }} />
                <View style={{ height: 1, width: 16, backgroundColor: backgroundColor, borderRadius: 100 }} />
                <Spacer space={6} />
                <View style={{ height: 1, width: 16, backgroundColor: backgroundColor, borderRadius: 100 }} />
                <Spacer space={6} />
                <TouchableOpacity onPress={() => { openWaze() }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Image style={{ width: 30, height: 30 }} source={require('../../../assets/imgs/location.png')} />
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}




const AppointmentStatus = ({ appointment }) => {
    if (!appointment)
        return (
            <View style={{ paddingTop: 16 }}>
                <Text style={{ ...globalStyles.font, fontSize: semiLarge, color: white, textAlign: 'center' }}>{getString.t('you_dont_have_appointment')}</Text>
            </View>
        )




    return (
        <View style={{ alignItems: 'center', paddingTop: 24 }}>

            <Text style={{ ...globalStyles.font, fontSize: semiLarge, ...styles.margin, color: '#fff' }}>{getString.t('you_have_an_appointment')}</Text>
            <Text style={{ ...globalStyles.font, fontSize: semiLarge, ...styles.margin, color: '#fff' }}>{moment(appointment.start_time).format(`dddd, MMMM DD [${getString.t('at')}] HH:mm`)}</Text>

            <Spacer space={6} />

            <AppointmentCard appointment={appointment} image={appointment.worker.image} text={`${appointment.worker.firstName} ${appointment.worker.lastName}`} />
            <LocationView />
        </View>
    )
}

const Story = () => {
    return (
        <ScrollView showsHorizontalScrollIndicator={false} horizontal contentContainerStyle={{ padding: 8 }}>
            <View>
                <Image style={{ width: 160, height: 200, borderRadius: 36, borderWidth: 2, borderColor: gray1 }} source={require('../../../assets/imgs/tarik.jpg')} />
                <View style={{ position: 'relative', top: -26 }}>
                    <VerticalChip imageStyle={{ width: 60, height: 60 }} text={'tarik husin'} />
                </View>
            </View>
            <Spacer space={6} />
            <View>
                <Image style={{ width: 160, height: 200, borderRadius: 36, borderWidth: 2, borderColor: gray1 }} source={require('../../../assets/imgs/tarik.jpg')} />
                <View style={{ position: 'relative', top: -26 }}>
                    <VerticalChip imageStyle={{ width: 60, height: 60 }} text={'tarik husin'} />
                </View>
            </View>
            <Spacer space={6} />
            <View>
                <Image style={{ width: 160, height: 200, borderRadius: 36, borderWidth: 2, borderColor: gray1 }} source={require('../../../assets/imgs/tarik.jpg')} />
                <View style={{ position: 'relative', top: -26 }}>
                    <VerticalChip imageStyle={{ width: 60, height: 60 }} text={'tarik husin'} />
                </View>
            </View>
        </ScrollView>
    )
}

const Home = ({ navigation }) => {
    const isFocused = useIsFocused();
    const { user } = useAuthContext()
    const { isLoading, refreshing, workers, appointment, getAppointment, getWorkers, onRefresh } = useHomeViewModel()

    useEffect(() => {
        if (isFocused) {
            if (user)
                getAppointment()
            getWorkers()
        }
    }, [isFocused, user])


    const refresh = useCallback(() => {
        onRefresh()
    }, [])

    return (
        <View style={{ ...styles.backLayer }}>
            <Animated.View
                entering={SlideInRight.duration(600)}
                exiting={FadeOut}
                style={{ paddingHorizontal: 16, paddingVertical: 36, flexDirection: 'row', alignItems: 'center' }}>
                <Animated.View>
                    <TouchableOpacity onPress={navigation.toggleDrawer}>
                        <FontAwesome name="navicon" size={24} color={white} />
                    </TouchableOpacity>
                </Animated.View>
                <Spacer space={12} />
                {user &&
                    <Animated.View
                    >
                        <HorizontalChip imageUrl={user.image} text={`${user.firstName} ${user.lastName}`} />
                    </Animated.View>
                }

            </Animated.View>


            <View
                style={{
                    borderTopStartRadius: 26,
                    borderTopEndRadius: 26,
                    flex: 1,
                    overflow: 'hidden'
                }}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={styles.scroll}
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={refresh} progressBackgroundColor='#fff' tintColor='#fff' />}>

                    <LinearGradient
                        style={styles.gradient}
                        colors={['#FF9502', '#FD7501']} >

                        <View style={styles.appointmentStatus}>
                            <Animated.View
                                entering={FadeIn.duration(600)}
                                exiting={FadeOut}>
                                <BorderButton
                                    style={styles.margin}
                                    text={user ? getString.t('book') : getString.t('login_or_signup')}
                                    onPress={() => { user ? navigation.navigate('BookAppointment') : navigation.navigate('LoginScreen') }} />
                            </Animated.View>
                            {
                                user ?
                                    <AppointmentStatus appointment={appointment} />
                                    // <LoggedInHeader appointment={appointment} />
                                    :
                                    <GeustHeader />
                            }
                        </View>

                    </LinearGradient>

                    <View style={{ backgroundColor: backgroundColor, minHeight: '100%' }}>
                        {workers &&
                            <Animated.View
                                entering={FadeIn.duration(600)}
                                exiting={FadeOut}
                                style={{ backgroundColor: surfaceColor, paddingVertical: 12, marginVertical: 4, borderRadius: 20 }}>
                                <Text style={{ ...globalStyles.font, paddingHorizontal: 12, paddingBottom: 12, fontSize: semiLarge, ...styles.margin, ...globalStyles.txtDirection, fontFamily: 'poppins-bold' }}>{getString.t('our_staff')}</Text>
                                {
                                    workers && (
                                        <FlatList
                                            contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', padding: 16 }}
                                            ItemSeparatorComponent={<View style={{ padding: 6 }} />}
                                            centerContent={true}
                                            showsHorizontalScrollIndicator={false}
                                            data={workers}
                                            horizontal
                                            keyExtractor={(item) => item._id}
                                            renderItem={({ item: worker }) => (
                                                <VerticalChip key={worker._id} text={`${worker.firstName} ${worker.lastName}`} imageUrl={worker.image} />
                                            )} />)
                                }
                            </Animated.View>
                        }

                        <Animated.View
                            entering={FadeIn.duration(600)}
                            exiting={FadeOut}
                            style={{ backgroundColor: surfaceColor, paddingVertical: 12, paddingBottom: 20, marginVertical: 4, borderRadius: 20 }}>
                            <Text style={{ paddingHorizontal: 8, ...globalStyles.font, ...styles.margin, ...globalStyles.txtDirection, fontSize: semiLarge, fontFamily: 'poppins-bold' }}>Stories</Text>
                            <Spacer space={8} />
                            <Story />
                        </Animated.View>


                        <Animated.View
                            entering={FadeIn.duration(600)}
                            exiting={FadeOut}
                            style={{ backgroundColor: surfaceColor, paddingVertical: 12, paddingBottom: 20, paddingHorizontal: 12, marginVertical: 4, borderRadius: 20 }}>
                            <Text style={{ ...globalStyles.font, ...styles.margin, ...globalStyles.txtDirection, fontSize: semiLarge, fontFamily: 'poppins-bold' }}>{getString.t('about_us')}</Text>

                            <Text style={{ ...globalStyles.font, ...styles.margin, ...globalStyles.txtDirection }}>{getString.t('about_us_details')}</Text>
                        </Animated.View>

                        <Spacer space={12} />

                        <SafeAreaView />
                    </View>
                </ScrollView>
            </View>
        </View>
    );
}

export default Home;


const styles = StyleSheet.create({
    scroll: {
        backgroundColor: primaryColor,
        flex: 1,
        paddingBottom: 20
    },
    backLayer: {
        flex: 1,
        backgroundColor: '#1D1B1B'
    },

    gradient: {
        flex: 1,
        minHeight: 500,
        borderTopEndRadius: 20,
        borderTopStartRadius: 20,
    },

    appointmentStatus: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 40,
        textAlign: 'center'
    },

    margin: {
        marginVertical: 4
    }
})