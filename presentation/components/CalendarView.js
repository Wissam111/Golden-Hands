import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

import { FontAwesome } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import moment from "moment/moment";
const CalendarView = (props) => {
  const { dateInterval, handleDateRight, handleDateLeft } = props;
  return (
    <View className="flex-row p-4 items-center justify-center space-x-4 mt-5">
      <TouchableOpacity
        className="bg-[#47566A] rounded-full w-8 h-8 justify-center items-center"
        onPress={handleDateLeft}
      >
        <FontAwesome name="arrow-circle-o-right" size={27} color="white" />
      </TouchableOpacity>

      <TouchableOpacity>
        <Feather name="calendar" size={30} color="white" />
      </TouchableOpacity>

      <Text className="text-white text-base">
        {moment(dateInterval[0]).format("l") +
          " - " +
          moment(dateInterval[4]).format("l")}
      </Text>
      <TouchableOpacity
        className="bg-[#47566A] rounded-full w-8 h-8 justify-center items-center"
        onPress={handleDateRight}
      >
        <FontAwesome name="arrow-circle-o-left" size={27} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default CalendarView;
