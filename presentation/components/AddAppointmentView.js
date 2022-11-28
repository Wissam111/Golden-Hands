import { View, StyleSheet } from "react-native";
import React, { useState } from "react";
import DefaultButton from "./DefaultButton";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

const AddAppointmentView = (props) => {
  const { handlePostAppoint } = props;
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());

  return (
    <View
      className="absolute bg-white  rounded-lg justify-between p-4"
      style={{ zIndex: 99999, top: 200, left: 50, height: 300, width: 280 }}
    >
      <View className="space-y-5 mt-4">
        <View style={styles.datePicker}>
          <DateTimePicker
            value={startTime}
            mode={"time"}
            is24Hour={true}
            onChange={(event, value) => setStartTime(value)}
          />

          <Ionicons name="time-outline" size={24} color="black" />
        </View>
        <View style={styles.datePicker}>
          <DateTimePicker
            value={endTime}
            mode={"time"}
            is24Hour={true}
            onChange={(event, value) => setEndTime(value)}
          />
          <MaterialCommunityIcons name="timelapse" size={24} color="black" />
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
