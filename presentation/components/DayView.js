import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import moment from "moment";
const DayView = (props) => {
  const { id, date, handleSelectedDay, isSelected } = props;
  return (
    <TouchableOpacity
      className={`${
        isSelected ? "bg-[#FF9B02]" : "bg-[#47566A]"
      } rounded-md items-center pt-1`}
      style={{ width: 58, height: 59 }}
      onPress={() => handleSelectedDay(id)}
    >
      <Text className="text-white font-bold pb-1 text-lg">
        {moment(date).format("Do")}
      </Text>
      <Text className="text-sm text-white font-bold">
        {moment(date).format("dddd")}
      </Text>
    </TouchableOpacity>
  );
};

export default DayView;
