import { Text, ActivityIndicator, Image, TouchableOpacity, View } from "react-native";
import { backgroundColor, globalStyles, gray1, green, white } from "../styles/global";
import { AntDesign } from '@expo/vector-icons';
import { EvilIcons } from "@expo/vector-icons";
import { IMAGE_BASE_URL } from "../../network/apiCall";
import Spacer from "./Spacer";
import { useState } from "react";
import { dialPhoneNumber } from "../../core/linking";


const UserCard = ({ user, onClick }) => {
    const [progressBar, setProgressBar] = useState(true)

    return (
        <TouchableOpacity onPress={onClick}>

            <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 100, borderBottomWidth: 1, borderBottomColor: backgroundColor }}>

                <View style={{ backgroundColor: '#FCC878', borderRadius: 36, borderColor: white, borderWidth: 1 }}>
                    <Image
                        defaultSource={require('../../assets/imgs/person_place_holder.jpg')}
                        style={{ width: 56, height: 56, borderRadius: 36 }}
                        source={{ uri: user.image ? IMAGE_BASE_URL + user.image : null }}
                        onLoadEnd={() => {
                            setProgressBar(false)
                        }} />

                    <View style={{ position: 'absolute', zIndex: 3, width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                        <ActivityIndicator animating={progressBar && user.image != null} color='#000' size='small' />
                    </View>
                </View>

                <Spacer space={6} />

                <View style={{ alignItems: 'flex-start', justifyContent: 'center' }}>
                    <Text style={{ ...globalStyles.font }}>{user.firstName} {user.lastName}</Text>
                    <Text style={{ ...globalStyles.font }}>{user.phone}</Text>
                </View>

                <Spacer style={{ flex: 1 }} />


                <TouchableOpacity onPress={() => { dialPhoneNumber(user.phone) }}>
                    <AntDesign name="phone" size={24} color={green} />
                </TouchableOpacity>

                <Spacer space={6} />
            </View>



        </TouchableOpacity>
    );
}

export default UserCard;