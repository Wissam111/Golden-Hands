import { View, StyleSheet, Platform, Text } from "react-native";
import React, { useState } from "react";
import DefaultButton from "./DefaultButton";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import moment from "moment";
/*------- Component represent's Add Working Appointment for the barber ---------- */

const AddAppointmentView = (props) => {
  const { handlePostAppoint } = props;
  const isAndroid = Platform.OS === "android";

  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [showStart, setShowStart] = useState(!isAndroid);
  const [showEnd, setShowEnd] = useState(!isAndroid);
  const handleStartTime = (event, value) => {
    if (isAndroid) {
      if (event.type == "set") {
        setStartTime(value);
        setShowStart(false);
      } else {
        setShowStart(false);
      }
    } else {
      setStartTime(value);
    }
  };
  const handleEndTime = (event, value) => {
    if (isAndroid) {
      if (event.type == "set") {
        setEndTime(value);
        setShowEnd(false);
      } else {
        setShowEnd(false);
      }
    } else {
      setEndTime(value);
    }
  };
  return (
    <View
      className="absolute bg-white  rounded-lg justify-between p-4"
      style={{ zIndex: 99999, top: 200, left: 50, height: 300, width: 280 }}
    >
      <View className="space-y-5 mt-4">
        <View style={styles.datePicker}>
          {showStart && (
            <DateTimePicker
              value={startTime}
              mode={"time"}
              is24Hour={true}
              onChange={(event, value) => handleStartTime(event, value)}
            />
          )}
          {isAndroid && (
            <Text className="ml-2">{moment(startTime).format("LT")}</Text>
          )}

          <Ionicons
            name="time-outline"
            size={24}
            color="black"
            onPress={() => setShowStart(true)}
          />
        </View>
        <View style={styles.datePicker}>
          {showEnd && (
            <DateTimePicker
              value={endTime}
              mode={"time"}
              is24Hour={true}
              onChange={(event, value) => handleEndTime(event, value)}
            />
          )}
          {isAndroid && (
            <Text className="ml-2">{moment(endTime).format("LT")}</Text>
          )}
          <MaterialCommunityIcons
            name="timelapse"
            size={24}
            color="black"
            onPress={() => setShowEnd(true)}
          />
        </View>
      </View>

      <DefaultButton
        text="Create"
        onPress={() => handlePostAppoint(startTime, endTime)}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  datePicker: {
    borderWidth: 1,
    borderColor: "gray",
    width: "100%",
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 4,
  },
});

export default AddAppointmentView;
