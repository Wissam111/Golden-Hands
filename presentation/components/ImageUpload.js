import { Image, View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import getString from "../../localization";
import DefaultButton from "./DefaultButton";
import Spacer from "./Spacer";
import Title from "./Title";
import { backgroundColor, globalStyles, white } from "../styles/global";
import * as ImagePicker from 'expo-image-picker';
import { useState } from "react";
import { BASE_URL_DEV } from "../../network/apiCall";
import useSignupViewModel from "../screens/signup/SignupViewModel";
import BackButton from "./BackButton";


const ImageUpload = ({ route, navigation }) => {
    const { uploadImage, isLoading } = useSignupViewModel()
    const [image, setImage] = useState(null);
    const { buttonText, title, backButton } = route.params

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
            allowsMultipleSelection: false,
        })
        if (!result.canceled) {
            setImage(result.assets[0].uri);
            if (!backButton)
                uploadImage(result.assets[0].uri)
        }
    }


    return (
        <View style={{ flex: 1, padding: 8, backgroundColor: backgroundColor }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                {backButton &&
                    <View style={{ flexDirection: 'row' }}>
                        <BackButton onPress={navigation.goBack} />
                        <Spacer space={6} />
                    </View>
                }
                <Title text={title ? title : getString.t('signup')} />
            </View>

            <Spacer space={12} />

            <TouchableOpacity onPress={pickImage}>
                <View style={{
                    alignSelf: 'center',
                    borderRadius: 100,
                    width: 200,
                    height: 200,
                    zIndex: 2,
                    elevation: 4,
                    shadowColor: 'black',
                    shadowRadius: 2,
                    shadowOpacity: .3,
                    shadowOffset: { width: 1, height: 1 },
                }}>
                    <Image
                        style={{ width: 200, height: 200, borderRadius: 100, borderWidth: 1, borderColor: white }}
                        source={image ? { uri: image } : require('../../assets/imgs/person_place_holder.jpg')} />
                </View>
            </TouchableOpacity>

            <Spacer space={12} />
            <Text style={{ ...globalStyles.font, alignSelf: 'center' }}>{getString.t('lets_add_profile_image')}</Text>


            <Spacer style={{ flex: 1 }} />
            <DefaultButton text={buttonText ? buttonText : getString.t('next')} onPress={() => {
                if (isLoading)
                    return
                if (!backButton)
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'SignupWelcome' }],
                    })
                else {
                    uploadImage(image)
                }
            }} />
            <SafeAreaView />
        </View>
    );
}

export default ImageUpload;