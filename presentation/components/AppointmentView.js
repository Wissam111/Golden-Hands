import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import useAuthContext from "../../hooks/useAuthContext";
import moment from "moment";
import {
  Feather,
  MaterialCommunityIcons,
  MaterialIcons,
  Ionicons,
  AntDesign,
} from "@expo/vector-icons";
const AppointmentView = (props) => {
  const { appointment, handleShowStatusSheet } = props;
  const { user } = useAuthContext();

  return (
    <View className="justify-left m-2 flex-row items-center">
      <TouchableOpacity
        className="rounded-full flex-row justify-between items-center p-2 pl-4 bg-white"
        onPress={() => handleShowStatusSheet(appointment._id, true)}
        style={{
          shadowColor: getIconByStatus(appointment.status).color,
          elevation: 10,
          shadowOffset: { width: 1, height: 1 },
          shadowRadius: 5,
          shadowOpacity: 0.5,
          width: "80%",
          height: 70,
        }}
      >
        <View>{getIconByStatus(appointment.status).icon}</View>
        <View className="items-end">
          {appointment.customer && (
            <Text className="text-gray-600">
              {appointment.customer.firstName +
                " " +
                appointment.customer.lastName}
            </Text>
          )}
          <View className="flex-row space-x-2 items-center">
            <Text className="text-base text-gray-400">
              {moment(appointment.start_time).format("LT") +
                " - " +
                moment(appointment.end_time).format("LT")}
            </Text>
            <Feather name="clock" size={20} color="gray" />
          </View>
        </View>

        <Image
          source={require("../.././assets/imgs/barber-chair.png")}
          style={{
            width: 45,
            height: 45,
          }}
        />
      </TouchableOpacity>
      <View className="items-center relative  m-1 mr-10">
        <Text className="text-gray-500">
          {" "}
          {moment(appointment.start_time).format("LT")}
        </Text>
        <View>
          <Image
            className="rotate-90 mt-3"
            source={require("../.././assets/imgs/sciss.png")}
            style={{
              width: 56,
              height: 40,
            }}
          />
        </View>

        <Text className="mt-1 z-50 text-gray-500">
          {" "}
          {moment(appointment.end_time).format("LT")}
        </Text>
      </View>
    </View>
  );
};

export const getIconByStatus = (status, color) => {
  let IconColor = color ? color : "black";
  switch (status) {
    case "done":
      return {
        icon: <Feather name="check-circle" size={23} color={IconColor} />,
        color: "green",
      };
    case "hold":
      return {
        icon: <AntDesign name="lock" size={24} color={IconColor} />,
        color: "#68AEC9",
      };

    case "in-progress":
      return {
        icon: (
          <MaterialCommunityIcons
            name="progress-clock"
            size={24}
            color={IconColor}
          />
        ),
        color: "orange",
      };
    case "canceled":
      return {
        icon: <MaterialIcons name="cancel" size={24} color={IconColor} />,
        color: "red",
      };
    case "didnt-come":
      return {
        icon: (
          <MaterialIcons name="not-interested" size={24} color={IconColor} />
        ),
        color: "red",
      };
    case "free":
      return {
        icon: (
          <Ionicons name="ios-lock-open-outline" size={24} color={IconColor} />
        ),
        color: "#F4EBD0",
      };

    default:
      return {
        icon: <AntDesign name="frowno" size={24} color={IconColor} />,
        color: "#F4EBD0",
      };
  }
};

export default AppointmentView;
