import { useEffect } from "react";
import { Text, View, FlatList, SafeAreaView, TouchableOpacity } from "react-native";
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
import { MaterialCommunityIcons } from '@expo/vector-icons';


const UserAppointments = () => {
    const { appointments, getUserAppointments, unbook, rateAppointment } = useUserAppointmentsViewModel()
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

            <FlatList
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ flexGrow: 1, padding: 8, paddingTop: 16, paddingBottom: 20 }}
                ItemSeparatorComponent={<Spacer space={4} />}
                style={{ flex: 1, backgroundColor: white, borderTopEndRadius: 26, borderTopStartRadius: 26 }}
                data={appointments}
                keyExtractor={(item) => item._id}
                renderItem={({ item, index }) => (
                    <View style={{ alignItems: 'center' }}>
                        <View>


                            <Text style={{ ...globalStyles.font, fontSize: fontSmall, alignSelf: 'flex-end', color: gray1 }}>{moment(item.start_time).format('DD/MM/yyyy')}</Text>

                            <View style={{ flexDirection: 'row' }}>
                                {item.status === 'in-progress' &&
                                    <TouchableOpacity onPress={() => { unbook(item._id) }}>
                                        <View style={{ backgroundColor: red, borderRadius: 38, height: "100%", paddingEnd: 50, width: 100, start: -30, position: 'absolute' , justifyContent:'center' }} >
                                            <MaterialCommunityIcons name="cancel" size={24} color="black" />
                                        </View>
                                    </TouchableOpacity>
                                }
                                <AppointmentCard appointment={item} image={item.worker.image} text={`${item.worker.firstName} ${item.worker.lastName}`} />
                            </View>

                            <View style={{ alignSelf: 'flex-start' }}>
                                {item.status === 'done' &&
                                    <Rating rating={item.rating} showRatingMsg={item.rating == null} from={5} onClick={(stars) => { rateAppointment(item._id, stars, index) }} />
                                }
                            </View>

                        </View>
                    </View>
                )} />


        </View>
    );
}

export default UserAppointments;