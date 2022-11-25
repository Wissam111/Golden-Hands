import { View, Text, TouchableOpacity } from "react-native";
import React, { useRef, useState, useCallback, useMemo } from "react";
import { AntDesign } from "@expo/vector-icons";
import moment from "moment";
import BottomSheet from "@gorhom/bottom-sheet";
import DefaultButton from "./DefaultButton";
const AppointmentConfirmationSheet = (props) => {
  const { appointsByday, handleCloseConfirmation, handleBook } = props;
  const appointment = appointsByday.find((appoint) => appoint._id == props.id);
  const snapPoints = useMemo(() => ["20%", "50%"], []);
  const [index, setIndex] = useState(0);
  const bottomSheetRef = useRef(null);
  var handleSheetChanges = useCallback(function (index) {
    setIndex(index);
  }, []);
  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={1}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
      onClose={handleCloseConfirmation}
      enablePanDownToClose
    >
      <View className="p-4 items-center">
        <View
          className="mb-10 items-center justify-center p-2"
          style={{
            width: "100%",
          }}
        >
          <Text className="text-xl font-bold">Appointment Info</Text>
        </View>
        <Text className="font-medium text-base mb-10">
          {moment(appointment.start_time).format("MMMM Do YYYY, h:mm a") +
            ` , ${appointment.worker.firstName} ${appointment.worker.lastName}`}
        </Text>
        <DefaultButton text="Confirm and Book" onPress={handleBook} />
      </View>
    </BottomSheet>
  );
};

export default AppointmentConfirmationSheet;
