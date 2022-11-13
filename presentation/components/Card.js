import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

const Card = (props) => {
  const { cardContent, title } = props;
  return (
    <TouchableOpacity
      className="w-50 h-10 rounded-full px-4 shadow-sm"
      style={{
        borderWidth: 0.2,
        // borderColor: "red",
        // borderRadius: "50%",
        // paddingHorizontal: 15,
        marginHorizontal: 4,
      }}
    >
      <Text className="font-semibold text-center m-3">{title}</Text>
    </TouchableOpacity>
  );
};

export default Card;
