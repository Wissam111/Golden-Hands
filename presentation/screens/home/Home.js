import { StyleSheet, View, Text, ScrollView, RefreshControl, SafeAreaView } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { backgroundColor, globalStyles, primaryColor, surfaceColor, white } from "../../styles/global";
import BorderButton from "../../components/BorderButton";
import HorizontalChip from "../../components/HorizontalChip";
import VerticalChip from '../../components/VerticalChip'
import useHomeViewModel from "./HomeViewModel";
import { useCallback, useEffect } from "react";
import { FlatList } from "react-native-gesture-handler";
import { useIsFocused } from "@react-navigation/native";
import 'moment/locale/he';
import moment from "moment";
import getString from "../../../localization";
import useAuthContext from "../../../hooks/useAuthContext";
import Spacer from "../../components/Spacer";


const GeustHeader = () => {
    return (
        <View style={{ marginTop: 16 }}>
            <Text style={{ ...globalStyles.font, color: white, textAlign: 'center' }}>{getString.t('hello_there_login_first')}</Text>
        </View>
    )
}


const LoggedInHeader = ({ appointment }) => {
    return (
        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 16 }}>
            {
                appointment ?
                    (
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ ...globalStyles.font, ...styles.margin, color: '#fff' }}>{getString.t('you_have_an_appointment')}</Text>
                            <Text style={{ ...globalStyles.font, ...styles.margin, color: '#fff' }}>{moment(appointment.start_time).format(`dddd, MMMM DD [${getString.t('at')}] HH:mm`)}</Text>

                            <HorizontalChip
                                style={styles.margin}
                                text={`${appointment.customer.firstName} ${appointment.customer.lastName}`}
                                imageUrl={appointment.customer.image} />

                            <Text style={{ ...globalStyles.font, ...styles.margin, color: '#fff' }}>{getString.t('find_us')}</Text>
                        </View>
                    )
                    : (
                        <Text style={{ ...globalStyles.font, color: white, textAlign: 'center' }}>{getString.t('you_dont_have_appointment')}</Text>
                    )
            }
        </View>
    );
}



const Home = ({ navigation }) => {
    const isFocused = useIsFocused();
    const { user } = useAuthContext()
    const { isLoading, refreshing, workers, appointment, getAppointment, getWorkers, onRefresh } = useHomeViewModel()

    useEffect(() => {
        if (isFocused) {
            getAppointment()
            getWorkers()
        }
    }, [isFocused])


    const refresh = useCallback(() => {
        onRefresh()
    }, [])

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: primaryColor }}>
            <View style={{ ...styles.backLayer }}>
                <View style={{ paddingHorizontal: 16, paddingVertical: 36 }}>
                    {user &&
                        <HorizontalChip imageUrl={user.image} text={`${user.firstName} ${user.lastName}`} />
                    }
                </View>

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
                                <BorderButton
                                    style={styles.margin}
                                    text={user ? getString.t('book') : getString.t('login_or_signup')}
                                    onPress={() => { user ? navigation.navigate('BookAppointment') : navigation.navigate('LoginScreen') }} />
                                {
                                    user ?
                                        <LoggedInHeader appointment={appointment} />
                                        :
                                        <GeustHeader />
                                }
                            </View>

                        </LinearGradient>

                        <View style={{ backgroundColor: backgroundColor }}>
                            <View style={{ backgroundColor: surfaceColor, padding: 12, marginVertical: 4, borderRadius: 20, alignItems: 'flex-start' }}>
                                <Text style={{ ...globalStyles.font, ...styles.margin }}>{getString.t('our_staff')}</Text>
                                {
                                    workers && (
                                        <FlatList
                                            contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
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
                            </View>


                            <View style={{ backgroundColor: surfaceColor, padding: 12, marginVertical: 4, borderRadius: 20, alignItems: 'flex-start' }}>
                                <Text style={{ ...globalStyles.font, ...styles.margin }}>{getString.t('about_us')}</Text>

                                <Text style={{ ...globalStyles.font, ...styles.margin }}>{getString.t('about_us_details')}</Text>
                            </View>

                            <View style={{ padding: 20 }} />
                        </View>
                    </ScrollView>
                </View>
            </View>
        </SafeAreaView>
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