import { View } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { orange1 } from "../styles/global";


const Rating = ({ style, rating, from }) => {
    if (!rating || !from)
        return

    const ceilRate = Math.ceil(rating)

    const ratingView = []

    for (let i = 0; i < ceilRate; i++) {
        ratingView.push(<AntDesign key={i} name="star" size={24} color={orange1} />)
    }

    for (let i = ceilRate; i < from; i++) {
        ratingView.push(<AntDesign key={i} name="staro" size={24} color={orange1} />)
    }



    return (
        <View style={{ flexDirection: 'row', ...style }}>
            {ratingView}
        </View>
    );
}

export default Rating;