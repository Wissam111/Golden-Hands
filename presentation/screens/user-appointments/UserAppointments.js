import { useEffect } from "react";
import { Text, View, FlatList, RefreshControl } from "react-native";
import getString from "../../../localization";
import Spacer from "../../components/Spacer";
import Title from "../../components/Title";
import { fontSmall, globalStyles, gray1, primaryColor, red, white } from "../../styles/global";
import useUserAppointmentsViewModel from "./UserAppointmentsViewModel";
import moment from 'moment'
import { useIsFocused } from "@react-navigation/native";
import Rating from "../../components/Rating";
import AppointmentCard from "../../components/AppointmentCard";
import CancelAppointmentBottomSheet from "../../components/CancelAppointmentBottomSheet";


const UserAppointments = () => {
    const { appointments,
        refresh,
        cancelAppointment,
        cancelSheet,
        isLoading,
        onRefresh,
        setCancelSheetState,
        getUserAppointments,
        unbook,
        rateAppointment } = useUserAppointmentsViewModel()
    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused)
            getUserAppointments()
    }, [isFocused])


    return (
        <View style={{ flex: 1, backgroundColor: primaryColor }}>
            <View style={{ padding: 8 }}>
                <Title color={white} text={getString.t('appointments')} />

            </View>

            <Spacer space={16} />
            <View
                style={{
                    borderTopStartRadius: 26,
                    borderTopEndRadius: 26,
                    flex: 1,
                    overflow: "hidden",
                }}>
                <FlatList
                    refreshControl={
                        <RefreshControl
                            refreshing={refresh}
                            onRefresh={onRefresh}
                            progressBackgroundColor="#fff"
                            tintColor="#000"
                        />
                    }
                    ListHeaderComponent={(
                        (!appointments || appointments.length === 0) && !isLoading && <Text style={{
                            textAlign: 'center',
                            padding: 8,
                            ...globalStyles.font,
                            color: red,
                            fontSize: fontSmall
                        }}>{getString.t('you_dont_have_any_appointment')}</Text>)}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ flexGrow: 1, padding: 8, paddingTop: 16, paddingBottom: 20, backgroundColor: white }}
                    ItemSeparatorComponent={<Spacer space={4} />}
                    style={{ flex: 1, backgroundColor: white, borderTopEndRadius: 26, borderTopStartRadius: 26 }}
                    data={appointments}
                    keyExtractor={(item) => item._id}
                    renderItem={({ item, index }) => (
                        <View style={{ alignItems: 'center' }}>
                            <View>
                                <Text style={{ ...globalStyles.font, fontSize: fontSmall, alignSelf: 'flex-end', color: gray1 }}>{moment(item.start_time).format('DD/MM/yyyy')}</Text>

                                <AppointmentCard
                                    onPress={item.status === 'in-progress' ? () => { setCancelSheetState(true, item) } : null}
                                    appointment={item} image={item.worker?.image}
                                    text={`${item.worker?.firstName} ${item.worker?.lastName}`} />


                                <View style={{ alignSelf: 'flex-start' }}>
                                    {item.status === 'done' &&
                                        <Rating rating={item.rating} showRatingMsg={item.rating == null} from={5} onClick={(stars) => { rateAppointment(item._id, stars, index) }} />
                                    }
                                </View>

                            </View>
                        </View>
                    )} />
            </View>

            <CancelAppointmentBottomSheet
                isVisible={cancelSheet}
                onCancel={() => { unbook() }}
                appointment={cancelAppointment}
                onClose={() => { setCancelSheetState(false) }} />
        </View>
    );
}

export default UserAppointments;