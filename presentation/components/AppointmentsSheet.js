import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useMemo, useRef, useState } from "react";
import BottomSheet from "@gorhom/bottom-sheet";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FlatList } from "react-native-gesture-handler";
import AppointmentView from "./AppointmentView";
import moment from "moment";
import AppointmentsInterval from "./AppointmentsInterval";
const AppointmentsSheet = (props) => {
  const { appointments, handleShowStatusSheet, handleShowAppoint, compineDT } =
    props;
  const snapPoints = useMemo(() => ["50%", "100%"], []);
  const bottomSheetRef = useRef(null);

  const [appointmentsIntervals, setAppointmentsInterval] = useState([]);

  const generateHoursInterval = () => {
    const times = [];
    const interval = 60;
    let startHourInMinute = 60;
    let endHourInMinute = 60 * 24;
    let timesIntervals = [];
    for (let i = 0; startHourInMinute < 24 * 60; i++) {
      if (startHourInMinute > endHourInMinute) break;
      var hh = Math.floor(startHourInMinute / 60);
      var mm = startHourInMinute % 60;
      times[i] = ("0" + (hh % 24)).slice(-2) + ":" + ("0" + mm).slice(-2);
      if (i % 2 == 1) {
        timesIntervals.push({
          start: times[i - 1],
          end: times[i],
          appointments: [],
        });
      }
      startHourInMinute = startHourInMinute + interval;
    }
    return timesIntervals;
  };

  useEffect(() => {
    let intervals = generateHoursInterval();
    appointments.forEach((appoint) => {
      let appointS = moment(compineDT(moment(), appoint.start_time));
      let appointE = moment(compineDT(moment(), appoint.end_time));
      let interval = intervals.find((intev) => {
        let intervalS = moment(intev.start, "HH:mm");
        let intervalE = moment(intev.end, "HH:mm");
        return (
          moment(appointS).isBetween(intervalS, intervalE, null, "[]") &&
          moment(appointE).isBetween(intervalS, intervalE, null, "[]")
        );
      });
      interval?.appointments.push(appoint);
    });
    setAppointmentsInterval(intervals);
  }, [appointments]);

  return (
    <BottomSheet ref={bottomSheetRef} index={0} snapPoints={snapPoints}>
      <View className="items-center">
        <View
          className="flex-row items-center justify-center p-2"
          style={{ width: "100%" }}
        >
          <Text className="font-bold text-lg">Appointments</Text>
          <TouchableOpacity
            className="absolute left-0 pl-1"
            onPress={handleShowAppoint}
          >
            <MaterialCommunityIcons
              name="view-grid-plus-outline"
              size={30}
              color="black"
            />
          </TouchableOpacity>
        </View>
      </View>
      {appointments.length ? (
        <FlatList
          data={appointmentsIntervals}
          horizontal={false}
          renderItem={({ item, index }) =>
            item.appointments.length > 0 && (
              <AppointmentsInterval
                interval={item}
                handleShowStatusSheet={handleShowStatusSheet}
                key={index}
              />
            )
          }
          ListFooterComponent={<View style={{ height: 420 }} />}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <Text className="text-xl text-center text-red-600 mt-10">
          No Appointments on this day
        </Text>
      )}

      {/* {appointments.length ? (
        <FlatList
          data={appointments}
          keyExtractor={(item) => item._id}
          horizontal={false}
          renderItem={({ item }) => (
            <AppointmentView
              appointment={item}
              handleShowStatusSheet={handleShowStatusSheet}
            />
          )}
          showsHorizontalScrollIndicator={false}
        />
      ) : (
        <Text className="text-xl text-center text-red-600 mt-10">
          No Appointments on this day
        </Text>
      )} */}
    </BottomSheet>
  );
};

export default AppointmentsSheet;
