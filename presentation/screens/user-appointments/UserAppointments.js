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
                contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', padding: 8, paddingBottom: 20 }}
                ItemSeparatorComponent={<Spacer space={6} />}
                style={{ height: '100%', backgroundColor: white, borderTopEndRadius: 26, borderTopStartRadius: 26 }}
                data={appointments}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <View style={{ borderRadius: 12, padding: 16, backgroundColor: '#cecece' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View style={{
                                width: 8, height: 8, borderRadius: 100,
                                backgroundColor: getStatusColor(item.status),
                            }} />
                            <Spacer space={6} />
                            <Text style={{ ...globalStyles.font, fontFamily: 'poppins-bold' }}>{getString.t(item.status)}</Text>
                        </View>

                        <Spacer space={12} />

                        <Text style={{ alignSelf: 'center', ...globalStyles.font }}>{moment(item.start_time).format('DD/MM/yyyy')}</Text>

                        <Spacer space={6} />


                        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                            <Text style={{ alignSelf: 'center', ...globalStyles.font }}>{moment(item.start_time).format('HH:mm')}</Text>
                            <Spacer space={4} />
                            <Text>-</Text>
                            <Spacer space={4} />
                            <Text style={{ alignSelf: 'center', ...globalStyles.font }}>{moment(item.end_time).format('HH:mm')}</Text>
                        </View>

                        <Spacer space={12} />
                        <HorizontalChip text={`${item.worker.firstName} ${item.worker.lastName}`} />

                        {item.rating &&
                            <Rating rating={item.rating} from={5} />
                        }

                        {
                            item.status === 'in-progress' &&
                            <View>
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