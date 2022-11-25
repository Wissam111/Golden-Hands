import { useState } from "react";
import { StyleSheet, Text, View, Image, ActivityIndicator, TouchableOpacity } from "react-native";
import { IMAGE_BASE_URL } from "../../network/apiCall";
import { backgroundColor, globalStyles } from "../styles/global";


const VerticalChip = ({ style, text, imageUrl, imageStyle, onClickImage }) => {
    const [showDefualtImage, setDefaultImage] = useState(false)
    const [progressBar, setProgressBar] = useState(true)
    return (
        <View style={{ ...style, ...styles.container }}>

            <TouchableOpacity style={{ ...styles.image, ...imageStyle }} onPress={onClickImage}>
                <Image
                    style={{
                        width: 120, height: 120, borderRadius: 100, borderWidth: 2,
                        borderColor: '#f9f9f9',
                        ...imageStyle
                    }}
                    source={showDefualtImage ? require('../../assets/imgs/person_place_holder.jpg') : { uri: IMAGE_BASE_URL + imageUrl + '?time=' + new Date() }}
                    onLoadEnd={() => {
                        setProgressBar(false)
                    }}
                    onError={(e) => {
                        setDefaultImage(true)
                    }} />

                <View style={{ position: 'absolute', zIndex: 3, width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                    {progressBar && <ActivityIndicator />}
                </View>
            </TouchableOpacity>
            <View style={styles.chip}>
                <Text style={{ ...globalStyles.font, textAlign: 'center' }}>{text}</Text>
            </View>
        </View>
    );
}

export default VerticalChip;


const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        backgroundColor:backgroundColor,
        borderRadius: 100,
        width: 120,
        height: 120,
        zIndex: 2,
        elevation: 12,
        shadowColor: 'black',
        shadowRadius: 2,
        shadowOpacity: .3,
        shadowOffset: { width: 1, height: 1 },
        justifyContent: 'center',
        alignItems: 'center'
    },
    chip: {
        backgroundColor: '#f5f5f5',
        paddingVertical: 8,
        paddingHorizontal: 20,
        borderRadius: 100,
        position: 'relative',
        top: -6,
        justifyContent: 'center',
        alignItems: 'center'
    }
})