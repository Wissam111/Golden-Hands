import { Text, TouchableOpacity, View } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { globalStyles, orange1 } from "../styles/global";
import { useState } from "react";
import Spacer from "./Spacer";
import getString from "../../localization";


const Rating = ({ style, rating, from, onClick }) => {
    const showRatingMsg = rating == null

    if (!from)
        return

    if (!rating) {
        rating = 0
    }

    const ceilRate = Math.ceil(rating)

    const ratingView = []

    for (let i = 0; i < ceilRate; i++) {
        ratingView.push(
            <TouchableOpacity key={i} onPress={() => { if (onClick) onClick(i + 1) }}>
                <AntDesign name="star" size={20} color={orange1} />
            </TouchableOpacity>
        )
    }

    for (let i = ceilRate; i < from; i++) {
        ratingView.push(
            <TouchableOpacity key={i} onPress={() => { if (onClick) onClick(i + 1) }}>
                <AntDesign name="staro" size={20} color={orange1} />
            </TouchableOpacity>)
    }



    return (
        <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row', ...style }}>
            {showRatingMsg &&
                <>
                    <Text style={{ ...globalStyles.font }}>{getString.t('rate_us')}</Text>
                    <Spacer space={6} />
                </>
            }
            {ratingView}
        </View>
    );
}

export default Rating;