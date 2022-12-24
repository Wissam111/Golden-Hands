import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { Entypo } from "@expo/vector-icons";
import { backgroundColor, blue, globalStyles, green, orange1, orange2 } from "../styles/global";
const Card = (props) => {
  const { cardContent, title, handlePress, isSelected, price } = props;
  return (
    <View>
      <TouchableOpacity
        style={{ ...styles.card, backgroundColor: isSelected ? orange1 : backgroundColor }}
        className={`rounded-full px-4  relative ${isSelected ? "bg-[#FF9B02]" : "bg-white"
          } mx-2 mb-2 justify-center items-center`}
        onPress={() => handlePress(props.id)}>
        <Text
          className={` font-semibold text-center  ${isSelected ? "text-white" : "text-black"
            }`}>
          {title}
        </Text>

        {price && (
          <Text
            style={{ textAlign: 'center', color: isSelected ? 'black' : orange2, ...globalStyles.txtDirection }}
            className={`font-semibold  ${isSelected ? "black" : "text-[#FFD700]"
              }`}>
            {price} ₪
          </Text>
        )}
      </TouchableOpacity>

      {price &&
        <View style={{ position: 'relative', top: -16 }} >
          <Entypo name="price-tag" size={24} color={green} />
        </View>}
    </View>
  );
};
const styles = StyleSheet.create({
  card: {
    shadowColor: "black",
    elevation: .5,
    shadowOffset: { width: 1, height: 1 },
    shadowRadius: 2,
    shadowOpacity: 0.1,
    minWidth: 120,
    minHeight: 42,
    padding: 8
  },
});
export default Card;
