import { View, StyleSheet, Text, TouchableWithoutFeedback, Keyboard, Platform, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import DefaultButton from "./DefaultButton";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import moment from "moment";
import { fontLarge, fontSmall, globalStyles, gray1, } from "../styles/global";
import Spacer from "./Spacer";
import getString from "../../localization";
import TextInputIcon from "./TextInputIcon";
import Loader from "./Loader";

/*------- Component represent's Add Working Appointment for the barber ---------- */

const AddAppointmentView = (props) => {
  const { handlePostAppoint, onClose } = props;

  const [interval, setInterval] = useState(null);
  const [showDatePicker1, setShowDatePicker1] = useState({
    visible: false,
    startTime: new Date()
  })
  const [showDatePicker2, setShowDatePicker2] = useState({
    visible: false,
    endTime: new Date()
  })


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
            className="absolute bg-white rounded-lg justify-between p-4"
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
              <TouchableOpacity onPress={() => { setShowDatePicker1((prev) => { return { ...prev, visible: true } }) }}>
                <View style={styles.datePicker}>
                  <Ionicons name="time-outline" size={24} color="black" />
                  <Spacer space={6} />
                  <Text>{moment(showDatePicker1.startTime).format('HH:mm')}</Text>
                </View>
              </TouchableOpacity>
              {showDatePicker1.visible &&
                <DateTimePicker
                  testID="dateTimePicker"
                  style={{ opacity: showDatePicker1 ? 1 : 0 }}
                  value={showDatePicker1.startTime}
                  mode={"time"}
                  is24Hour={true}
                  onChange={(event, value) => {
                    setShowDatePicker1((prev) => { return { startTime: value, visible: Platform.OS === 'android' ? false : event.type === 'dismissed' ? false : true } })
                    setShowDatePicker2((prev) => { return { endTime: value, visible: false } })
                  }} />
              }

              <Spacer space={6} />

              <Text style={{ ...globalStyles.txtDirection, ...globalStyles.font, fontSize: fontSmall }}>{getString.t('end_time')}</Text>
              <TouchableOpacity onPress={() => { setShowDatePicker2((prev) => { return { ...prev, visible: true } }) }}>

                <View style={styles.datePicker}>
                  <MaterialCommunityIcons name="timelapse" size={24} color="black" />
                  <Spacer space={6} />
                  <Text>{moment(showDatePicker2.endTime).format('HH:mm')}</Text>
                </View>
              </TouchableOpacity>

              {showDatePicker2.visible &&
                <DateTimePicker
                  testID="dateTimePicker"
                  value={showDatePicker2.endTime}
                  mode={"time"}
                  is24Hour={true}
                  onChange={(event, value) => {
                    setShowDatePicker2((prev) => { return { endTime: value, visible: Platform.OS === 'android' ? false : event.type === 'dismissed' ? false : true } })
                  }} />
              }

              <Spacer space={6} />

              <Text style={{ ...globalStyles.txtDirection, ...globalStyles.font, fontSize: fontSmall }}>{getString.t('duration_min')}</Text>
              <TextInputIcon
                iconStart={<MaterialCommunityIcons name="timer-sand-paused" size={24} color="black" />}
                style={{ flex: 1, padding: 2 }}
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
              buttonStyles={{ paddingVertical: Platform.OS === 'android' ? 10 : 12 }}
              text={getString.t('create')}
              onPress={() => handlePostAppoint(showDatePicker1.startTime, showDatePicker2.endTime, interval)}
            />

            <Loader />

          </View>
        </TouchableWithoutFeedback>
      </View >
    </TouchableWithoutFeedback >
  );
};
const styles = StyleSheet.create({
  datePicker: {
    borderWidth: 1,
    borderColor: gray1,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 4
  },
});

export default AddAppointmentView;
