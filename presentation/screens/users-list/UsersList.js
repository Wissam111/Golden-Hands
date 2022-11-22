import { useEffect } from "react";
import { Text, View, FlatList } from "react-native";
import getString from "../../../localization";
import Spacer from "../../components/Spacer";
import Title from "../../components/Title";
import { white } from "../../styles/global";
import useUsersListViewModel from "./UsersListViewModel";

const UsersList = () => {
    const { users, getUsers } = useUsersListViewModel()


    useEffect(() => {
        getUsers()
    }, [])


    return (
        <View style={{ flex: 1 }}>
            <View style={{ padding: 8 }}>
                <Title text={getString.t('users')} />

            </View>

            <Text>{users && users.length}</Text>
            <FlatList
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', padding: 8 , paddingBottom: 20 ,
                borderTopEndRadius: 26, borderTopStartRadius: 26 , overflow:'hidden'}}
                ItemSeparatorComponent={<Spacer space={6} />}
                data={users}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <View style={{ borderRadius: 12, padding: 8, height: 400, backgroundColor: '#cecece' }}>
                        <Text>{item.firstName} {item.lastName}</Text>
                    </View>
                )} />


        </View>
    );
}

export default UsersList