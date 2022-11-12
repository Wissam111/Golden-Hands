import { StyleSheet, Text, View, Image } from "react-native";
import { globalStyles } from "../styles/global";


const VerticalChip = ({ style }) => {
    return (
        <View style={{ ...style, ...styles.container }}>
            <View style={styles.imageContainer}>
                <Image style={styles.image} source={require('../../assets/imgs/tarik.jpg')} />
            </View>
            <View style={styles.chip}>
                <Text style={globalStyles.font}>Tarik Husin</Text>
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
        borderWidth: 1,
        borderColor: '#f9f9f9',
        zIndex: 1,
        elevation: 10,
        shadowColor: '#333',
        shadowRadius: 5,
        shadowOpacity: .8,
        shadowOffset: { width: 1, height: 1 }
    },
   
    chip: {
        backgroundColor: '#f5f5f5',
        paddingVertical: 8,
        paddingHorizontal: 20,
        borderRadius: 100,
        paddingStart: 40,
        position: 'relative',
        top: -6
    }
})