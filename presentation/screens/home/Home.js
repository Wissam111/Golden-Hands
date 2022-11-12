import { StyleSheet, View, Text, ScrollView, RefreshControl, SafeAreaView } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { backgroundColor, globalStyles, primaryColor, surfaceColor } from "../../styles/global";
import BorderButton from "../../components/BorderButton";
import HorizontalChip from "../../components/HorizontalChip";
import VerticalChip from '../../components/VerticalChip'
import HomeViewModel from "./HomeViewModel";
import { useCallback, useEffect } from "react";



const Home = ({ navigation }) => {
    const { isLoading, refreshing, workers, appointment, getAppointment, getWorkers, onRefresh } = HomeViewModel()

    const refresh = useCallback(() => {
        onRefresh()
    }, [])

    

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: primaryColor }}>
            <View style={{ ...styles.backLayer }}>

                <View style={{ padding: 8, paddingBottom: 20 }}>
                    <Text style={{ color: '#fff', ...globalStyles.font }}>Tarik Husin</Text>
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
                            colors={['#FF9502', '#FD7501']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}>

                            <View style={styles.appointmentStatus}>
                                <BorderButton
                                    style={styles.margin}
                                    text='Book'
                                    onPress={() => { navigation.navigate('BookAppointment') }} />

                                {
                                    appointment &&
                                    (
                                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                            <Text style={{ ...globalStyles.font, ...styles.margin, color: '#fff' }}>You have an appointment</Text>
                                            <Text style={{ ...globalStyles.font, ...styles.margin, color: '#fff' }}>Sunday, November 03 at 11:30</Text>

                                            <HorizontalChip
                                                style={styles.margin}
                                                text={`${appointment.customer.firstName} ${appointment.customer.lastName}`}
                                                imageUrl={appointment.customer.image} />

                                            <Text style={{ ...globalStyles.font, ...styles.margin, color: '#fff' }}>Find Us</Text>
                                        </View>
                                    )
                                }
                            </View>

                        </LinearGradient>

                        <View style={{ backgroundColor: backgroundColor }}>
                            <View style={{ backgroundColor: surfaceColor, padding: 12, marginVertical: 4, borderRadius: 20 }}>
                                <Text style={{ ...globalStyles.font, ...styles.margin }}>Our Staff</Text>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                                    {
                                        workers &&
                                        workers.map(worker => (
                                            <VerticalChip key={worker._id} text={`${worker.firstName} ${worker.lastName}`} imageUrl={worker.image} />
                                        ))
                                    }
                                </View>

                            </View>


                            <View style={{ backgroundColor: surfaceColor, padding: 12, marginVertical: 4, borderRadius: 20 }}>
                                <Text style={{ ...globalStyles.font, ...styles.margin }}>About Us</Text>

                                <Text style={{ ...globalStyles.font, ...styles.margin }}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis quis perferendis incidunt possimus natus accusamus porro distinctio eligendi, doloremque enim fugit nam ipsam dicta debitis odio, nihil consequatur tempora alias?</Text>
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
        borderTopStartRadius: 20
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