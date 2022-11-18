import { View } from "react-native";


const Spacer = ({ space , style}) => {
    return (
        <View style={{ padding: space , ...style }}></View>
    );
}

export default Spacer;