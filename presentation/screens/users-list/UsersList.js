import { useEffect } from "react";
import { Text, View, FlatList, TouchableOpacity } from "react-native";
import getString from "../../../localization";
import Spacer from "../../components/Spacer";
import Title from "../../components/Title";
import { globalStyles, white } from "../../styles/global";
import useUsersListViewModel from "./UsersListViewModel";

const UsersList = ({ navigation }) => {
    const { users, getUsers } = useUsersListViewModel()


    useEffect(() => {
        getUsers()
    }, [])


    return (
        <View style={{ flex: 1 }}>
            <View style={{ padding: 8 }}>
                <Title text={getString.t('users')} />

            </View>


            <Text>Number of users {users && users.length}</Text>


            <FlatList
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    flexGrow: 1, justifyContent: 'center', padding: 8, paddingBottom: 20,
                    borderTopEndRadius: 26, borderTopStartRadius: 26, overflow: 'hidden'
                }}
                ItemSeparatorComponent={<Spacer space={6} />}
                data={users}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => { navigation.navigate('ProfileScreen', { userId: item._id }) }}>

                        <View style={{ borderRadius: 12, padding: 8, backgroundColor: '#f9f9f9', alignItems: 'flex-start' }}>
                            <Text style={{ ...globalStyles.font }}>{item.firstName} {item.lastName}</Text>
                            <Text style={{ ...globalStyles.font }}>{item.phone}</Text>
                            <Text style={{ ...globalStyles.font }}>{item.role}</Text>
                        </View>

                    </TouchableOpacity>
                )} />


        </View>
    );
}

export default UsersList