import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import {
  UserCircleIcon,
  ScissorsIcon,
  PencilSquareIcon,
} from "react-native-heroicons/outline";
import HorizontalChipS from "./HorizontalChipS";
import useAuthContext from "../../hooks/useAuthContext";
import moment from "moment";
const AppointmentView = (props) => {
  const { appointment, handleShowStatusList } = props;
  const { user } = useAuthContext();
  return (
    <View
      className="m-2 mt-3 relative  flex-row justify-between pt-5 pr-1"
      style={{
        // borderWidth: 2,
        // borderColor: "red",
        width: 355,
        height: 250,
      }}
    >
      <View className="items-center justify-center">
        <TouchableOpacity
          className="m-2"
          onPress={() => handleShowStatusList(appointment._id, true)}
        >
          <PencilSquareIcon size={35} color={"black"} />
        </TouchableOpacity>
      </View>

      <View
        className="bg-[#D6AD60]  absolute right-1 rounded-xl items-center p-2 "
        style={{ width: 100, height: 100 }}
      >
        <Text className="text-white font-semibold">{appointment.status}</Text>
      </View>
      <View
        style={{
          // borderWidth: 2,
          // borderColor: "red",
          width: "85%",
          height: "80%",
        }}
        className="bg-[#F4EBD0] rounded-xl mt-3 "
      >
        <View className="items-center flex-row justify-center mt-2 space-x-3">
          <UserCircleIcon size={25} color="#122620" />
          <Text className="font-bold text-[#122620] text-lg">Appointment</Text>
        </View>
        <View className="m-2 p-2 space-y-2 flex-wrap items-center ">
          <Text className="text-base text-[#122620]">
            {moment(appointment.start_time).format("LT") +
              " - " +
              moment(appointment.end_time).format("LT")}
          </Text>
          <Text className="text-base text-[#122620]">
            {moment(appointment.start_time).format("MMMM Do YYYY")}
          </Text>
        </View>
        <View className="flex-row items-center absolute bottom-0 left-0 pl-2 pb-1">
          <ScissorsIcon size={30} color="#122620" />
          <HorizontalChipS user={user} handlePress={() => {}} />
        </View>
      </View>
    </View>
  );
};

export default AppointmentView;
