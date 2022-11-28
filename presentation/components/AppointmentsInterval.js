import { View, Text, Image } from "react-native";
import React from "react";
import AppointmentView from "./AppointmentView";
import DashedLine from "react-native-dashed-line";
const AppointmentsInterval = (props) => {
  const { interval, handleShowStatusSheet } = props;
  return (
    <View className="flex-1">
      <View className="p-2 mb-4 relative flex-1">
        <View
          className="absolute right-7 top-8"
          style={{
            borderWidth: 1,
            borderRightWidth: 1,
            borderColor: "gray",
            height: "75%",
            borderStyle: "dashed",
            borderRadius: 1,
          }}
        ></View>

        <Image
          className="rotate-180 mt-3 absolute right-5"
          source={require("../.././assets/imgs/scissors.png")}
          style={{
            width: 20,
            height: 30,
            top: "30%",
          }}
        />

        <Text className="text-gray-500"> {interval.start}</Text>
        <View>
          {interval.appointments.map((appoint) => (
            <AppointmentView
              appointment={appoint}
              handleShowStatusSheet={handleShowStatusSheet}
              key={appoint._id}
            />
          ))}
        </View>
        <Text style={{ zIndex: 9999 }} className="text-gray-500">
          {" "}
          {interval.end}
        </Text>
      </View>
    </View>
  );
};

export default AppointmentsInterval;
