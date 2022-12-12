import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import moment from "moment";
const DayView = (props) => {
  const { id, date, handleSelectedDay, isSelected } = props;
  return (
    <TouchableOpacity
      className={`${
        isSelected ? `bg-[#F4EBD0]` : "bg-[#47566A]"
      } rounded-md items-center pt-1`}
      style={{ width: 58, height: 59 }}
      onPress={() => handleSelectedDay(id)}
    >
      <Text
        className={`${
          isSelected ? "text-[#122620]" : "text-white"
        } font-bold pb-1 text-lg`}
      >
        {moment(date).format("Do")}
      </Text>
      <Text
        className={`  ${
          isSelected ? "text-[#122620]" : "text-white"
        }    text-sm  font-bold`}
      >
        {moment(date).format("dddd")}
      </Text>
    </TouchableOpacity>
  );
};

export default DayView;
