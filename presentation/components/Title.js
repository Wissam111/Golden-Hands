import { StyleSheet, Text, View } from "react-native";
import { globalStyles } from "../styles/global";


const Title = ({ text }) => {
    return (
        <View style={{ justifyContent: 'flex-start', alignItems: 'flex-start' }}>
            <View style={styles.container} >
                <Text style={styles.text}>{text}</Text>
            </View>
        </View>
    );
}

export default Title;

const styles = StyleSheet.create({
    text: {
        borderBottomWidth: 2,
        borderColor: '#000',
        ...globalStyles.font,
        fontSize: 24
    },
    container: {
        borderBottomWidth: 2,
        borderColor: '#000',

    }
})