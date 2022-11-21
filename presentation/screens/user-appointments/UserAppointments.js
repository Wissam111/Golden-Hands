import { useEffect } from "react";
import { Text, View, FlatList, SafeAreaView } from "react-native";
import getString from "../../../localization";
import Spacer from "../../components/Spacer";
import Title from "../../components/Title";
import { backgroundColor, primaryColor, white } from "../../styles/global";
import useUserAppointmentsViewModel from "./UserAppointmentsViewModel";


const UserAppointments = () => {
    const { appointments, getUserAppointments } = useUserAppointmentsViewModel()

    useEffect(() => {
        getUserAppointments()
    }, [])

    return (
        <View style={{ flex: 1, backgroundColor: primaryColor }}>
            <View style={{ padding: 8 }}>
                <Title color={white} text={getString.t('appointments')} />

            </View>

            <Spacer space={16} />

            <FlatList
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', padding: 8 , paddingBottom: 20}}
                ItemSeparatorComponent={<Spacer space={6} />}
                style={{ height: '100%', backgroundColor: white, borderTopEndRadius: 26, borderTopStartRadius: 26  }}
                data={appointments}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <View style={{ borderRadius: 12, padding: 8, height: 400, backgroundColor: '#cecece' }}>
                        <Text>{item.customer.firstName} {item.customer.lastName}</Text>
                        <Text>{item.worker.firstName} {item.worker.lastName}</Text>
                        <Text>{item.start_time}</Text>
                        <Text>{item.end_time}</Text>
                    </View>
                )} />


        </View>
    );
}

export default UserAppointments;