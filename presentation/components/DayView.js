import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import moment from "moment";
const DayView = (props) => {
  const { id, date, handleSelectedDay, isSelected } = props;
  return (
    <TouchableOpacity
      className={`${isSelected ? `bg-[#FF9502]` : "bg-[#47566A]"
        } rounded-md items-center p-1`}
      style={{ minWidth: 58, minHeight: 59 }}
      onPress={() => handleSelectedDay(id)}>
        <Text
          className={`text-white font-bold text-lg`}>
          {moment(date).format("Do")}
        </Text>
        <Text
          className={`text-white text-sm  font-bold`}>
          {moment(date).format("dddd")}
        </Text>
    </TouchableOpacity>
  );
};

export default DayView;
