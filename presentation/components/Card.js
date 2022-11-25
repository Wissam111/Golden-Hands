import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Entypo } from "@expo/vector-icons";
const Card = (props) => {
  const { cardContent, title, handlePress, isSelected, price } = props;
  return (
    <TouchableOpacity
      className={`rounded-full px-4 shadow-sm relative ${
        isSelected ? "bg-[#FF9B02]" : "bg-[#f5f5f5"
      } mx-2 mb-2 justify-center items-center`}
      style={{
        width: 120,
        height: 42,
      }}
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
            className={`font-medium ${isSelected ? "black" : "text-[#FFD700]"}`}
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

export default Card;
