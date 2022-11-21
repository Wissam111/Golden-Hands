import { useEffect } from "react";
import { Text, View, FlatList } from "react-native";
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
        <View style={{ padding: 8 , flex :1}}>
            <Title text='Users List' />

            <Text>{users && users.length}</Text>
            {users &&
                <FlatList
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', padding: 8 }}
                    ItemSeparatorComponent={<Spacer space={6} />}
                    style={{ flex: 1, backgroundColor: white, borderTopEndRadius: 26, borderTopStartRadius: 26 }}
                    data={users}
                    keyExtractor={(item) => item._id}
                    renderItem={({ item }) => (
                        <View style={{ borderRadius: 12, padding: 8, height: 400, backgroundColor: '#cecece' }}>
                            <Text>{item.firstName} {item.lastName}</Text>
                        </View>
                    )} />
            }


        </View>
    );
}

export default UsersList