import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { XCircleIcon } from "react-native-heroicons/solid";
const AppointmentConfirmation = (props) => {
  const { appointment, handleCloseConfirmation, hanldeBook } = props;

  return (
    <View
      className="absolute bottom-0 z-10 bg-[#F9F9F9] items-center p-2 shadow-lg"
      style={{
        // borderWidth: 2,
        // borderColor: "red",
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
        monday, 03-11-2022 at 11:00, barbar wissam
      </Text>
      <TouchableOpacity
        className="rounded-lg bg-black p-5"
        onPress={hanldeBook}
      >
        <Text className="text-center text-white text-xl font-bold">
          Confirm and Book
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default AppointmentConfirmation;
