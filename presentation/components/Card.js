import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { Entypo } from "@expo/vector-icons";
import { backgroundColor, blue, globalStyles, green, orange1, orange2 } from "../styles/global";
const Card = (props) => {
  const { cardContent, title, handlePress, isSelected, price } = props;
  return (
    <TouchableOpacity onPress={() => handlePress(props.id)}>
      <View
        style={{ ...styles.card, backgroundColor: isSelected ? orange1 : backgroundColor }}
        className={`rounded-full relative ${isSelected ? "bg-[#FF9B02]" : "bg-white"
          } justify-center items-center`}>
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
      </View>
      {price &&
        <View style={{ position: 'relative', top: -12 }} >
          <Entypo name="price-tag" size={24} color={green} />
        </View>}
      
    </TouchableOpacity>
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
