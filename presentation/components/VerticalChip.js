import { StyleSheet, Text, View, Image } from "react-native";
import { IMAGE_BASE_URL } from "../../network/apiCall";
import { globalStyles } from "../styles/global";


const VerticalChip = ({ style, text, imageUrl }) => {
    return (
        <View style={{ ...style, ...styles.container, zIndex: 2 }}>
            <View style={styles.image}>
                <Image
                    style={{
                        width: 120, height: 120, borderRadius: 100, borderWidth: 2,
                        borderColor: '#f9f9f9',
                    }}
                    source={{ uri: IMAGE_BASE_URL + imageUrl }} />
            </View>
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