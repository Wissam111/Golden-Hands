import { StyleSheet, Text, View } from "react-native";
import { globalStyles, primaryColor } from "../styles/global";


const Title = ({ text, color }) => {
    return (
        <View style={{ justifyContent: 'flex-start', alignItems: 'flex-start' }}>
            <View style={{ ...styles.container, borderBottomColor: color ? color : '#000' }} >
                <Text style={{ ...styles.text, color: color ? color : '#000' }}>{text}</Text>
            </View>
        </View>
    );
}

export default Title;

const styles = StyleSheet.create({
    text: {
        ...globalStyles.font,
        fontSize: 24,
        ...globalStyles.txtDirection
    },
    container: {
        borderBottomWidth: 2,
        borderColor: '#000',
        padding: 6,
        borderRadius: 2
    }
})