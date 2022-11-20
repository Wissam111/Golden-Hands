import { StyleSheet, Text, View } from "react-native";
import { globalStyles } from "../styles/global";


const Title = ({ text }) => {
    return (
        <View style={styles.container} >
            <Text style={styles.text}>{text}</Text>
        </View>
    );
}

export default Title;

const styles = StyleSheet.create({
    text: {
        borderColor: '#000',
        ...globalStyles.font,
        fontSize: 24,
        ...globalStyles.txtDirection
    },
    container: {
        borderBottomWidth: 2,
        borderColor: '#000',
        padding: 6

    }
})