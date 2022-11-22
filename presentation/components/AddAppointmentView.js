import { View, Text, TextInput } from "react-native";
import React from "react";

const AddAppointmentView = () => {
  return (
    <View>
      <TextInput placeholder="start time" />
      <TextInput placeholder="end time" />
      <TextInput />
    </View>
  );
};

export default AddAppointmentView;
