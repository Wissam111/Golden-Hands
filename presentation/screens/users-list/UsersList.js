import { useEffect } from "react";
import { View, FlatList, TextInput, RefreshControl, Text } from "react-native";
import getString from "../../../localization";
import Spacer from "../../components/Spacer";
import Title from "../../components/Title";
import { fontLarge, fontMeduim, fontXLarge, globalStyles, green, orange1, primaryColor, white } from "../../styles/global";
import useUsersListViewModel from "./UsersListViewModel";
import { EvilIcons } from "@expo/vector-icons";
import UserCard from "../../components/UserCard";
import DefaultButton from "../../components/DefaultButton";

const UsersList = ({ navigation }) => {
    const { users, count, refreshing, reachedEnd, setSearchState, onRefresh, nextPage, getUsers } = useUsersListViewModel()

    useEffect(() => {
        getUsers()
    }, [])


    return (
        <View style={{ flex: 1, backgroundColor: white }}>
            <View style={{
                backgroundColor: primaryColor,
                borderBottomStartRadius: 26,
                borderBottomEndRadius: 26,
                shadowColor: '#000000',
                shadowOffset: {
                    width: .5,
                    height: .5,
                },
                shadowOpacity: 0.5,
                shadowRadius: 6,
                elevation: 4,
                zIndex: 2
            }}>

                <View style={{ padding: 8 }}>
                    <Title color={white} text={getString.t('users')} />
                </View>

                <Spacer space={6} />

                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: '#fff', ...globalStyles.font, }}>{getString.t('users')}</Text>
                    <Spacer space={6} />
                    <Text style={{ color: green, ...globalStyles.font, fontSize: fontXLarge }}>{count}</Text>
                </View>

                <Spacer space={6} />

                <View className="flex-row items-center bg-gray-200 rounded-full">
                    <EvilIcons name="search" size={27} color="gray" />
                    <TextInput
                        style={{ flex: 1, padding: Platform.OS === 'android' ? 8 : 12, ...globalStyles.txtDirection }}
                        placeholder={getString.t('search') + '...'}
                        keyboardType="text"
                        onChangeText={(text) => setSearchState(text)}
                    />
                    <View style={{ alignSelf: 'stretch' }}>
                        <DefaultButton style={{ borderRadius: 26, flex: 1 }} color={orange1} text={getString.t('search')} onPress={() => { getUsers() }} />
                    </View>
                </View>




            </View>


            <FlatList
                onEndReached={nextPage}
                onEndReachedThreshold={0.5}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        progressBackgroundColor="#fff"
                        tintColor="#000"
                    />
                }
                ListFooterComponent={
                    reachedEnd &&
                    <View style={{ justifyContent: 'center', alignItems: 'center', padding: 24 }}>
                        <Text style={{ ...globalStyles.font, fontSize: fontMeduim }}>{getString.t('end_reached')}</Text>
                    </View>
                }
                style={{ flex: 1, zIndex: 1 }}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    flexGrow: 1, padding: 8, paddingBottom: 20
                }}
                ItemSeparatorComponent={<Spacer space={6} />}
                data={users}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <UserCard user={item} onClick={() => { navigation.navigate('ProfileScreen', { userId: item._id }) }} />
                )} />


        </View>
    );
}

export default UsersList