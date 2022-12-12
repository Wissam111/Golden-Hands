import { View, Text } from "react-native";
import React, { useRef, useMemo } from "react";
import moment from "moment";
import BottomSheet from "@gorhom/bottom-sheet";
import DefaultButton from "./DefaultButton";
import getString from "../../localization";
const AppointmentConfirmationSheet = (props) => {
  const { appointsByday, handleCloseConfirmation, handleBook } = props;
  const appointment = appointsByday.find((appoint) => appoint._id == props.id);
  const snapPoints = useMemo(() => ["20%", "50%"], []);
  const bottomSheetRef = useRef(null);

  return (
    <BottomSheet
      containerStyle={{
        elevation: 8,
        shadowColor: 'black',
        shadowRadius: 1,
        shadowOpacity: 1,
        shadowOffset: { width: .7, height: .7 },
      }}
      ref={bottomSheetRef}
      index={1}
      snapPoints={snapPoints}
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
          <Text className="text-xl font-bold">{getString.t('appointment_info')}</Text>
        </View>
        <Text className="font-medium text-base mb-10">
          {moment(appointment.start_time).format("MMMM Do YYYY, h:mm a") +
            ` , ${appointment.worker.firstName} ${appointment.worker.lastName}`}
        </Text>
        <DefaultButton text={getString.t('confirm_and_book')} onPress={handleBook} />
      </View>
    </BottomSheet>
  );
};

export default AppointmentConfirmationSheet;
