import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { Entypo } from "@expo/vector-icons";
const Card = (props) => {
  const { cardContent, title, handlePress, isSelected, price } = props;
  return (
    <TouchableOpacity
      style={styles.card}
      className={`rounded-full px-4  relative ${
        isSelected ? "bg-[#FF9B02]" : "bg-white"
      } mx-2 mb-2 justify-center items-center`}
      onPress={() => handlePress(props.id)}
    >
      <Text
        className={` font-semibold text-center  ${
          isSelected ? "text-white" : "text-black"
        }`}
      >
        {title}
      </Text>
      {price && (
        <View className=" flex-row items-center relative">
          <Text
            className={`font-semibold  ${
              isSelected ? "black" : "text-[#FFD700]"
            }`}
          >
            {price + "ש"}
          </Text>
          <View className=" absolute left-8 top-1 ">
            <Entypo name="price-tag" size={24} color="green" />
          </View>
        </View>
      )}
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  card: {
    shadowColor: "black",
    elevation: 5,
    shadowOffset: { width: 1, height: 1 },
    shadowRadius: 2,
    shadowOpacity: 0.1,
    width: 120,
    height: 42,
  },
});
export default Card;
