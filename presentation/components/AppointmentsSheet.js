import { View, Text, TouchableOpacity, TextInput, Platform, RefreshControl } from "react-native";
import React, { useEffect, useMemo, useRef, useState } from "react";
import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import moment from "moment";
import AppointmentsInterval from "./AppointmentsInterval";
import getString from "../../localization";
import Spacer from "./Spacer";
import { EvilIcons } from "@expo/vector-icons";
import { globalStyles } from "../styles/global";

const AppointmentsSheet = (props) => {
  const { handleSearch, appointments, handleShowStatusSheet, handleShowAppoint, compineDT } =
    props;
  const snapPoints = useMemo(() => ["60%", "90%"], []);
  const bottomSheetRef = useRef(null);

  const [appointmentsIntervals, setAppointmentsInterval] = useState([]);

  const generateHoursInterval = () => {
    const times = [];
    const interval = 120;
    let startHourInMinute = 60;
    let endHourInMinute = 60 * 24;
    let timesIntervals = [];
    for (let i = 0; startHourInMinute < 24 * 60; i++) {
      if (startHourInMinute > endHourInMinute) break;
      var hh = Math.floor(startHourInMinute / 60);
      var mm = startHourInMinute % 60;
      times[i] = ("0" + (hh % 24)).slice(-2) + ":" + ("0" + mm).slice(-2);

      startHourInMinute = startHourInMinute + interval;
    }
    for (let i = 0; i < times.length; i++) {
      if (i == times.length - 1) {
        timesIntervals.push({
          start: times[i],
          end: "24:00",
          appointments: [],
        });
        break;
      }
      timesIntervals.push({
        start: times[i],
        end: times[i + 1],
        appointments: [],
      });
    }
    return timesIntervals;
  };

  useEffect(() => {
    let intervals = generateHoursInterval();

    appointments.forEach((appoint) => {
      let appointS = moment(compineDT(moment(), appoint.start_time));

      let interval = intervals.find((intev) => {
        let intervalS = moment(intev.start, "HH:mm");
        let intervalE = moment(intev.end, "HH:mm")
        return (
          moment(appointS).isBetween(intervalS, intervalE, null, "[]")
        )
      })
      interval?.appointments.push(appoint);
    });
    setAppointmentsInterval(intervals);
  }, [appointments]);

  return (
      <BottomSheet ref={bottomSheetRef} index={0} snapPoints={snapPoints}>

        <BottomSheetFlatList
          style={{ flex: 1 }}
          contentContainerStyle={{ padding: 8 }}
          data={appointmentsIntervals}
          horizontal={false}
          renderItem={({ item, index }) =>
            item.appointments.length > 0 && (
              <View style={{ flex: 1 }}>
                <AppointmentsInterval
                  interval={item}
                  handleShowStatusSheet={handleShowStatusSheet}
                  key={index}
                />
              </View>
            )
          }
          ListHeaderComponent={
            <View className="items-center">
              <View
                className="flex-row items-center justify-center p-2"
                style={{ width: "100%" }}>
                <Text className="font-bold text-lg">{getString.t('appointments')}</Text>
                <TouchableOpacity
                  className="absolute left-0 pl-1"
                  onPress={handleShowAppoint}>
                  <MaterialCommunityIcons
                    name="view-grid-plus-outline"
                    size={30}
                    color="black"
                  />
                </TouchableOpacity>
              </View>

              <View className="flex-row items-center flex-1 bg-gray-200 rounded-full pb-1 mx-4 mt-2">
                <Spacer space={2} />
                <EvilIcons name="search" size={27} color="gray" />
                <TextInput
                  style={{ flex: 1, padding: Platform.OS === 'android' ? 8 : 12, ...globalStyles.txtDirection }}
                  placeholder={getString.t('search') + '...'}
                  keyboardType="text"
                  onChangeText={(text) => handleSearch(text)}
                />
              </View>

              {
                appointments.length == 0 &&
                <Text className="text-xl text-center text-red-600 mt-10">{getString.t('no_appointment_at_this_day')}</Text>
              }
              <Spacer space={16} />
            </View>
          }
          ListFooterComponent={<View style={{ height: 20 }} />}
          showsVerticalScrollIndicator={false}
        // keyExtractor={(item) => { return item._id }}
        />

      </BottomSheet>
  );
};



export default AppointmentsSheet;
