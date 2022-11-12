import { StyleSheet, View, Text, ScrollView } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { backgroundColor, globalStyles, surfaceColor } from "../../styles/global";
import BorderButton from "../../components/BorderButton";
import HorizontalChip from "../../components/HorizontalChip";
import VerticalChip from '../../components/VerticalChip'
import HomeViewModel from "./HomeViewModel";


const Home = () => {
    const { workers, getAppointment, getWorkers } = HomeViewModel()


    return (
        <View style={styles.backLayer}>

            <View style={{ padding: 8, paddingBottom: 20 }}>
                <Text style={{ color: '#fff', ...globalStyles.font }}>Tarik Husin</Text>
            </View>

            <View
                style={{
                    borderTopStartRadius: 26,
                    borderTopEndRadius: 26,
                    flex: 1,
                    overflow: 'hidden',
                    backgroundColor: 'red'
                }}>
                <ScrollView style={styles.scroll}>

                    <LinearGradient
                        style={styles.gradient}
                        colors={['#FF9502', '#FD7501']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}>

                        <View style={styles.appointmentStatus}>
                            <BorderButton style={styles.margin} text='Book' />

                            <Text style={{ ...globalStyles.font, ...styles.margin, color: '#fff' }}>You have an appointment</Text>
                            <Text style={{ ...globalStyles.font, ...styles.margin, color: '#fff' }}>Sunday, November 03 at 11:30</Text>

                            <HorizontalChip style={styles.margin} />

                            <Text style={{ ...globalStyles.font, ...styles.margin, color: '#fff' }}>Find Us</Text>
                        </View>

                    </LinearGradient>


                    <View style={{ backgroundColor: surfaceColor, padding: 12, marginVertical: 4, borderRadius: 20 }}>
                        <Text style={{ ...globalStyles.font, ...styles.margin }}>Our Staff</Text>

                        <VerticalChip />
                    </View>


                    <View style={{ backgroundColor: surfaceColor, padding: 12, marginVertical: 4, borderRadius: 20 }}>
                        <Text style={{ ...globalStyles.font, ...styles.margin }}>About Us</Text>

                        <Text style={{ ...globalStyles.font, ...styles.margin }}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis quis perferendis incidunt possimus natus accusamus porro distinctio eligendi, doloremque enim fugit nam ipsam dicta debitis odio, nihil consequatur tempora alias?</Text>
                    </View>

                    <View style={{ padding: 20 }} />
                </ScrollView>
            </View>
        </View>
    );
}

export default Home;


const styles = StyleSheet.create({
    scroll: {
        backgroundColor: backgroundColor,
        flex: 1,
        paddingBottom: 20
    },
    backLayer: {
        flex: 1,
        backgroundColor: '#1D1B1B',
        paddingTop: 40,
    },

    gradient: {
        flex: 1,
        minHeight: 500,
        borderRadius: 20
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