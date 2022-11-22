import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import { globalStyles, primaryColor } from "../styles/global";


const DefaultButton = ({ style, text, onPress }) => {
    return (
        <TouchableOpacity style={{ ...style }} onPress={onPress}>
            <View style={{ ...styles.button }}>
                <Text style={styles.text}>{text}</Text>
            </View>
        </TouchableOpacity>
    );
}

export default DefaultButton;


const styles = StyleSheet.create({
    button: {
        borderRadius: 6,
        paddingVertical: 8,
        paddingHorizontal: 20,
        backgroundColor: primaryColor,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        ...globalStyles.font,
        color: '#fff',
        fontSize: 18
    }
})