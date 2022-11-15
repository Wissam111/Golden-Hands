import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

const Card = (props) => {
  const { cardContent, title, handlePress, isSelected } = props;
  return (
    <TouchableOpacity
      className={`w-50 h-10 rounded-full px-4 shadow-sm ${
        isSelected ? "bg-[#FF9B02]" : "bg-[#f5f5f5"
      } mx-2 mb-2`}
      // style={{
      //   marginHorizontal: 4,
      // }}
      onPress={() => handlePress(props.id)}
    >
      <Text
        className={`font-semibold text-center m-3 ${
          isSelected ? "text-white" : "text-black"
        }`}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default Card;
