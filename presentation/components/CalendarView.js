import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import moment from "moment/moment";
import Spacer from "./Spacer";
const CalendarView = (props) => {
  const { dateInterval, handleDateRight, handleDateLeft } = props;
  return (
    <View className="flex-row p-4 items-center justify-center space-x-4 mt-5">
      <TouchableOpacity
        style={{ justifyContent: 'center', alignItems: 'center' }}
        className="bg-[#47566A] rounded-full w-8 h-8 justify-center items-center"
        onPress={handleDateLeft}
      >
        <AntDesign name="right" size={16} color="white" />
      </TouchableOpacity>



      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <View style ={{flexDirection:'row' , alignItems:'center'}}>
          <TouchableOpacity>
            <Feather name="calendar" size={18} color="white" />
          </TouchableOpacity>
          <Spacer space={4}/>
          <Text className="text-white text-base">{moment(dateInterval[0]).format("yyyy")}</Text>
        </View>

        <Text className="text-white text-base">
          {moment(dateInterval[0]).format("MMMM DD") +
            " - " +
            moment(dateInterval[4]).format("MMMM DD")}
        </Text>

      </View>

      <TouchableOpacity
        className="bg-[#47566A] rounded-full w-8 h-8 justify-center items-center"
        onPress={handleDateRight}
      >
        <AntDesign name="left" size={16} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default CalendarView;
