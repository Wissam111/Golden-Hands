import { useEffect } from "react";
import { Text, View, FlatList, SafeAreaView } from "react-native";
import getString from "../../../localization";
import HorizontalChip from "../../components/HorizontalChip";
import Spacer from "../../components/Spacer";
import Title from "../../components/Title";
import { backgroundColor, globalStyles, green, orange1, primaryColor, red, white } from "../../styles/global";
import useUserAppointmentsViewModel from "./UserAppointmentsViewModel";
import moment from 'moment'
import DefaultButton from "../../components/DefaultButton";
import { useIsFocused } from "@react-navigation/native";
import Rating from "../../components/Rating";
import AppointmentCard from "../../components/AppointmentCard";

const UserAppointments = () => {
    const { appointments, getUserAppointments, unbook } = useUserAppointmentsViewModel()
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
                ItemSeparatorComponent={<Spacer space={8} />}
                style={{ height: '100%', backgroundColor: white, borderTopEndRadius: 26, borderTopStartRadius: 26 }}
                data={appointments}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <View style={{ borderRadius: 12, alignItems: 'center' }}>
                        <View>
                            <Text style={{ ...globalStyles.font, alignSelf: 'flex-end' }}>{moment(item.start_time).format('DD/MM/yyyy')}</Text>
                            <AppointmentCard appointment={item} />
                            <View style={{ alignSelf: 'flex-start' }}>
                                {item.rating &&
                                    <Rating rating={item.rating} from={5} />
                                }
                            </View>
                        </View>

                        {
                            item.status === 'in-progress' &&
                            <View style={{ alignItems: 'stretch' }}>
                                <Spacer space={12} />
                                <DefaultButton text={getString.t('cancel')} onPress={() => { unbook(item._id) }} />
                            </View>
                        }
                    </View>
                )} />


        </View>
    );
}

export default UserAppointments;