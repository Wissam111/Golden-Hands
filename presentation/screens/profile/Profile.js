import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import Title from "../../components/Title";
import { FontAwesome5 } from '@expo/vector-icons';
import Spacer from "../../components/Spacer";
import { backgroundColor, globalStyles, primaryColor, surfaceColor, white } from "../../styles/global";
import VerticalChip from "../../components/VerticalChip";
import HorizontalChip from "../../components/HorizontalChip";
import getString from "../../../localization";
import useProfileViewModel from "./ProfileViewModel";
import useAuthContext from "../../../hooks/useAuthContext";

const Profile = ({ navigation }) => {
    const { user } = useAuthContext()
    // const { } = useProfileViewModel()

    return (
        <View style={{ flex: 1 }}>
            <View style={{
                backgroundColor: primaryColor,
                padding: 8,
                borderBottomEndRadius: 20,
                borderBottomStartRadius: 20,
                minHeight: '40%'
            }}>

                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                }}>
                    <Title text={getString.t('profile')} color={white} />
                    <Spacer style={{ flex: 1 }} />
                    <TouchableOpacity onPress={() => { navigation.navigate('EditProfile') }}>
                        <FontAwesome5 name="edit" size={24} color="white" />
                    </TouchableOpacity>
                </View>

                <Spacer space={22} />

                   
                <VerticalChip text={`${user.firstName} ${user.lastName}`}
                    imageStyle={{ width: 180, height: 180 }}
                    imageUrl={user.image}
                />

                <Spacer space={22} />


                <Text style={{ ...globalStyles.font, ...globalStyles.txtDirection, color: white, padding: 8 }}>{user.phone}</Text>

            </View>

            <ScrollView style={{ backgroundColor: backgroundColor }}>

                <View style={{ backgroundColor: backgroundColor }}>
                    <Spacer space={16} />

                    <View style={{ flexDirection: 'row' }}>
                        <Spacer space={6} />
                        <View style={{ backgroundColor: '#79F877', padding: 20, borderRadius: 16, flex: 1 }}>
                            <Text style={{ ...globalStyles.font, fontSize: 30, }}>23</Text>
                        </View>

                        <Spacer space={6} />

                        <View style={{ backgroundColor: surfaceColor, padding: 20, borderRadius: 16, flex: 2 }}>
                            <Text style={{ ...globalStyles.font, fontSize: 30, }}>Rating</Text>
                        </View>
                        <Spacer space={6} />
                    </View>

                    <Spacer space={16} />

                    <View style={{ backgroundColor: surfaceColor, padding: 8, marginHorizontal: 6, borderRadius: 12 }}>
                        <Text style={{ ...globalStyles.font, ...globalStyles.txtDirection }}>Prefered Barbers</Text>
                        <Spacer space={12} />

                        <HorizontalChip text='tarik husin' />
                        <Spacer space={6} />
                        <HorizontalChip text='tarik husin' />
                    </View>

                </View>
            </ScrollView>
        </View>
    );
}

export default Profile;