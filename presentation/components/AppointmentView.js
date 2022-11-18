import { View, Text } from "react-native";
import React from "react";
import { UserCircleIcon, ScissorsIcon } from "react-native-heroicons/outline";
import HorizontalChipS from "./HorizontalChipS";
import useAuthContext from "../../hooks/useAuthContext";
import moment from "moment";
const AppointmentView = (props) => {
  const { appointment } = props;
  const { user } = useAuthContext();
  return (
    <View
      style={{ borderWidth: 2, borderColor: "red", width: 355, height: 183 }}
      className="bg-[#AA8CFF] m-2 rounded-lg relative "
    >
      <View className="items-center flex-row justify-center mt-2 space-x-5">
        <UserCircleIcon size={35} color={"white"} />
        <Text className="font-bold text-white text-xl">Appointment Booked</Text>
      </View>
      <View className="m-2 p-2 space-x-5 flex-row flex-start">
        <Text className="text-base text-white">
          {moment(appointment.start_time).format("LT") +
            " - " +
            moment(appointment.end_time).format("LT")}
        </Text>
        <Text className="text-base text-white">
          {moment(appointment.start_time).format("MMMM Do YYYY")}
        </Text>
      </View>
      <View className="flex-row items-center absolute bottom-0 left-0 pl-2 pb-1">
        <ScissorsIcon size={30} color="white" />
        <HorizontalChipS user={user} handlePress={() => {}} />
      </View>
    </View>
  );
};

export default AppointmentView;
