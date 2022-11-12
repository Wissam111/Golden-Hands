import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import { globalStyles } from "../styles/global";


const BorderButton = ({ style, text, onPress }) => {
    return (
        <TouchableOpacity>
            <View style={{ ...style, ...styles.button }}>
                <Text style={styles.text}>{text}</Text>
            </View>
        </TouchableOpacity>
    );
}

export default BorderButton;


const styles = StyleSheet.create({
    button: {
        borderColor: '#f9f9f9',
        borderWidth: 1,
        borderRadius: 20,
        paddingVertical: 8,
        paddingHorizontal: 20,
    },
    text: {
        ...globalStyles.font,
        color: '#fff',
        fontSize: 16
    }
})