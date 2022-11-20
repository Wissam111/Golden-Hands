import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import {
  ArrowLeftCircleIcon,
  ArrowRightCircleIcon,
  CalendarIcon,
} from "react-native-heroicons/outline";
import moment from "moment/moment";
const CalendarView = (props) => {
  const { dateInterval, handleDateRight, handleDateLeft } = props;
  return (
    <View
      className="flex-row p-4 items-center justify-center space-x-4 mt-5"
      // style={{ borderWidth: 2, borderColor: "red" }}
    >
      <TouchableOpacity
        className="bg-[#47566A] rounded-full"
        onPress={handleDateLeft}
      >
        <ArrowRightCircleIcon size={35} color={"white"} />
      </TouchableOpacity>

      <TouchableOpacity>
        <CalendarIcon size={35} color="white" />
      </TouchableOpacity>

      <Text className="text-white text-base">
        {moment(dateInterval[0]).format("l") +
          " - " +
          moment(dateInterval[4]).format("l")}
      </Text>
      <TouchableOpacity
        className="bg-[#47566A] rounded-full"
        onPress={handleDateRight}
      >
        <ArrowLeftCircleIcon size={35} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default CalendarView;
