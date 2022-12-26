import { View, StyleSheet, Text, TouchableWithoutFeedback, Modal, Keyboard, Platform } from "react-native";
import React, { useState } from "react";
import DefaultButton from "./DefaultButton";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import moment from "moment";
import { fontLarge, fontMeduim, fontSmall, globalStyles, gray1, red, white } from "../styles/global";
import Spacer from "./Spacer";
import getString from "../../localization";
import TextInputIcon from "./TextInputIcon";

/*------- Component represent's Add Working Appointment for the barber ---------- */

const AddAppointmentView = (props) => {
  const { handlePostAppoint, onClose } = props;

  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [interval, setInterval] = useState(null);


  return (
    <TouchableWithoutFeedback onPress={onClose}>
      <View
        style={{
          position: 'absolute',
          height: '100%',
          width: '100%',
          flex: 1,
          backgroundColor: 'rgba(0,0,0,.3)',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1
        }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View
            onStartShouldSetResponder={(event) => true}
            onTouchEnd={(e) => {
              e.stopPropagation();
            }}
            className="absolute bg-white  rounded-lg justify-between p-4"
            style={{
              zIndex: 10,
              width: '96%',
              elevation: 4,
              shadowColor: 'black',
              shadowRadius: 2,
              shadowOpacity: .4,
              shadowOffset: { width: .5, height: .5 },
            }}>
            <View>

              <Text style={{ ...globalStyles.font, fontSize: fontLarge, ...globalStyles.txtDirection }}>{getString.t('create_appointment')}</Text>

              <Spacer space={12} />


              <Text style={{ ...globalStyles.txtDirection, ...globalStyles.font, fontSize: fontSmall }}>{getString.t('start_time')}</Text>
              <View style={styles.datePicker}>
                <DateTimePicker
                  value={startTime}
                  mode={"time"}
                  is24Hour={true}
                  onChange={(event, value) => {
                    setEndTime(value)
                    setStartTime(value)
                  }}
                />
                <Ionicons name="time-outline" size={24} color="black" />
              </View>

              <Spacer space={6} />

              <Text style={{ ...globalStyles.txtDirection, ...globalStyles.font, fontSize: fontSmall }}>{getString.t('end_time')}</Text>
              <View style={styles.datePicker}>
                <DateTimePicker
                  value={endTime}
                  mode={"time"}
                  is24Hour={true}
                  onChange={(event, value) => {
                    setEndTime(value)
                  }}
                />
                <MaterialCommunityIcons name="timelapse" size={24} color="black" />
              </View>

              <Spacer space={6} />

              <Text style={{ ...globalStyles.txtDirection, ...globalStyles.font, fontSize: fontSmall }}>{getString.t('duration_min')}</Text>
              <TextInputIcon
                iconStart={<MaterialCommunityIcons name="timer-sand-paused" size={24} color="black" />}
                style={{ flex: 1, padding: 2, alignSelf: 'st' }}
                onChangeText={(str) => {
                  setInterval(str.length > 0 ? str : null)
                }}
                value={interval}
                placeholder={getString.t('duration')}
                keyboardType="numeric"
                maxLength={5}
              />
              <Text style={{ ...globalStyles.font, fontSize: fontSmall, color: gray1, ...globalStyles.txtDirection }}>{getString.t('filling_this_duration')}</Text>

            </View>

            <Spacer space={24} />

            <DefaultButton
            buttonStyles={{paddingVertical: Platform.OS === 'android' ? 10 : 12}}
              text={getString.t('create')}
              onPress={() => handlePostAppoint(startTime, endTime, interval)}
            />
          </View>
        </TouchableWithoutFeedback>
      </View>
    </TouchableWithoutFeedback>
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
