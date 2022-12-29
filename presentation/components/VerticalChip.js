import { useState } from "react";
import { StyleSheet, Text, View, Image, ActivityIndicator, TouchableOpacity } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { IMAGE_BASE_URL } from "../../network/apiCall";
import { backgroundColor, fontMeduim, fontSmall, globalStyles } from "../styles/global";
import Spacer from "./Spacer";


const VerticalChip = ({ style, text, imageUrl, imageStyle, onClickImage, chipIcon }) => {
    const [progressBar, setProgressBar] = useState(true)
    return (
        <Animated.View entering={FadeIn} exiting={FadeOut} style={{ ...style, ...styles.container }}>

            <TouchableOpacity style={{ ...styles.image, ...imageStyle }} onPress={onClickImage} disabled={onClickImage == null}>
                <Image
                    key={imageUrl}
                    style={{
                        width: 120, height: 120, borderRadius: 100, borderWidth: 2,
                        borderColor: '#f9f9f9',
                        ...imageStyle
                    }}
                    source={{ uri: imageUrl ? IMAGE_BASE_URL + imageUrl : null }}
                    defaultSource={require('../../assets/imgs/person_place_holder.jpg')}
                    onLoadEnd={() => {
                        setProgressBar(false)
                    }} />

                <View style={{ position: 'absolute', zIndex: 3, width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator animating={progressBar && imageUrl != null} color='#000' size='large' />
                </View>
            </TouchableOpacity>
            <View style={styles.chip}>
                {chipIcon && <>
                    {chipIcon}
                    < Spacer space={6} />
                </>
                }
                <Text style={{ ...globalStyles.font, fontSize: fontMeduim, textAlign: 'center' }}>{text}</Text>
            </View>
        </Animated.View>
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
        backgroundColor: backgroundColor,
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
        alignItems: 'center',
        flexDirection: 'row'
    }
})