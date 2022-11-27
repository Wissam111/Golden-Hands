import { useEffect } from "react";
import { Text, View, FlatList, SafeAreaView } from "react-native";
import getString from "../../../localization";
import Spacer from "../../components/Spacer";
import Title from "../../components/Title";
import { backgroundColor, fontSmall, globalStyles, gray1, green, orange1, primaryColor, red, semiLarge, white } from "../../styles/global";
import useUserAppointmentsViewModel from "./UserAppointmentsViewModel";
import moment from 'moment'
import DefaultButton from "../../components/DefaultButton";
import { useIsFocused } from "@react-navigation/native";
import Rating from "../../components/Rating";
import AppointmentCard from "../../components/AppointmentCard";

const UserAppointments = () => {
    const { appointments, getUserAppointments, unbook, rateAppointment } = useUserAppointmentsViewModel()
    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused)
            getUserAppointments()
    }, [isFocused])

    // console.log(appointments);
    const getStatusColor = (status) => {
        switch (status) {
            case 'in-progress': return orange1
            case 'canceled': return red
            case 'done': return green
            case 'didnt-come': return backgroundColor
        }
    }

    return (
        <View style={{ flex: 1, backgroundColor: primaryColor }}>
            <View style={{ padding: 8 }}>
                <Title color={white} text={getString.t('appointments')} />

            </View>

            <Spacer space={16} />

            <FlatList
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ flexGrow: 1, padding: 8, paddingTop: 16, paddingBottom: 20 }}
                ItemSeparatorComponent={<Spacer space={4} />}
                style={{ height: '100%', backgroundColor: white, borderTopEndRadius: 26, borderTopStartRadius: 26 }}
                data={appointments}
                keyExtractor={(item) => item._id}
                renderItem={({ item, index }) => (
                    <View style={{ alignItems: 'center' }}>
                        <View>


                            <Text style={{ ...globalStyles.font, fontSize: fontSmall, alignSelf: 'flex-end', color: gray1 }}>{moment(item.start_time).format('DD/MM/yyyy')}</Text>
                            <AppointmentCard appointment={item} image={item.worker.image} text={`${item.worker.firstName} ${item.worker.lastName}`} />
                            <View style={{ alignSelf: 'flex-start' }}>
                                {item.status === 'done' &&
                                    <Rating rating={item.rating} from={5} onClick={(stars) => { rateAppointment(item._id, stars, index) }} />
                                }
                            </View>


                            {
                                item.status === 'in-progress' &&
                                <View >
                                    <Spacer space={4} />
                                    <DefaultButton color={red} text={getString.t('cancel')} onPress={() => { unbook(item._id) }} />
                                    <Spacer space={8} />
                                </View>
                            }
                        </View>
                    </View>
                )} />


        </View>
    );
}

export default UserAppointments;