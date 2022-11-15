import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { XCircleIcon } from "react-native-heroicons/solid";
import moment from "moment";
const AppointmentConfirmation = (props) => {
  const { appointsByday, handleCloseConfirmation, handleBook } = props;
  const appointment = appointsByday.find((appoint) => appoint._id == props.id);
  return (
    <View
      className="absolute bottom-0 z-10 bg-[#F9F9F9] items-center p-2 shadow-lg"
      style={{
        width: "100%",
        height: 340,
        borderRadius: 10,
      }}
    >
      <View
        className="flex-row  mb-10 items-center justify-between p-2"
        style={{
          width: "100%",
        }}
      >
        <Text className="text-xl font-bold">Appointment Info</Text>

        <TouchableOpacity
          className="rounded-full bg-gray-100"
          onPress={handleCloseConfirmation}
        >
          <XCircleIcon color="black" height={50} width={50} />
        </TouchableOpacity>
      </View>
      <Text className="font-medium text-base mb-10">
        {moment(appointment.start_time).format("MMMM Do YYYY, h:mm a") +
          ` , ${appointment.worker.firstName} ${appointment.worker.lastName}`}
      </Text>
      <TouchableOpacity
        className="rounded-lg bg-black p-5"
        onPress={handleBook}
      >
        <Text className="text-center text-white text-xl font-bold">
          Confirm and Book
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default AppointmentConfirmation;
