import { View, Text, TouchableOpacity, TextInput, Platform, RefreshControl } from "react-native";
import React, { useEffect, useMemo, useRef, useState } from "react";
import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import moment from "moment";
import AppointmentsInterval from "./AppointmentsInterval";
import getString from "../../localization";
import Spacer from "./Spacer";
import { EvilIcons } from "@expo/vector-icons";
import { fontMeduim, fontSmall, globalStyles, lightBlack, white } from "../styles/global";
import { Octicons } from '@expo/vector-icons';

const AppointmentsSheet = (props) => {
  const { handleSearch, numberOfActiveCustomers, selectedDay, appointments, height, height2, handleShowStatusSheet, handleShowAppoint, compineDT, handleSelectAll, handleSelectBooked, allSelected } =
    props;
  const snapPoints = useMemo(() => [height, height2], [height, height2]);
  const bottomSheetRef = useRef(null);

  const [appointmentsIntervals, setAppointmentsInterval] = useState([]);
  const [closestAppointment, setClosestAppointment] = useState(null)

  const generateHoursInterval = async () => {
    let currentDate = moment().startOf('day')
    const tt = []
    const numberOfIntervals = 24 / 2
    for (let i = 0; i < numberOfIntervals; i++) {
      tt.push({
        start: currentDate.format('HH:mm'),
        end: currentDate.add(2, 'hours').format('HH:mm'),
        appointments: []
      })
    }
    return tt;
  };


  const createIntervals = async () => {
    let intervals = await generateHoursInterval();
    let cApppintment = null
    let endDay = moment().endOf('day')

    appointments.forEach((appointment) => {
      if (!cApppintment && new Date(appointment.end_time) >= new Date() && new Date(appointment.end_time) <= endDay) {
        cApppintment = appointment
      }
      let appointS = moment(compineDT(moment(), appointment.start_time));

      let interval = intervals.find((intev) => {
        let intervalS = moment(intev.start, "HH:mm");
        let intervalE = intervalS.clone().add(2, 'hours')
        return (
          appointS.isBetween(intervalS, intervalE, null, "[]")
        )
      })
      interval?.appointments.push(appointment);
    });

    setAppointmentsInterval(intervals.filter(interval => interval.appointments.length > 0));
    setClosestAppointment(cApppintment)
  }


  useEffect(() => {
    createIntervals()
  }, [appointments]);

  return (
    <BottomSheet ref={bottomSheetRef} index={0} snapPoints={snapPoints}>

      <BottomSheetFlatList
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: 8 }}
        data={appointmentsIntervals}
        horizontal={false}
        ItemSeparatorComponent={<Spacer space={6} />}
        renderItem={({ item, index }) =>
          <View style={{ alignItems: 'flex-start' }}>
            <AppointmentsInterval
              closestAppointment={closestAppointment}
              interval={item}
              handleShowStatusSheet={handleShowStatusSheet}
              key={index}
            />
          </View>
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
                <Octicons name="diff-added" size={24} color={lightBlack} />
              </TouchableOpacity>
            </View>

            <View className="flex-row items-center flex-1 bg-gray-200 rounded-full pb-1 mt-2">
              <Spacer space={2} />
              <EvilIcons name="search" size={27} color="gray" />
              <TextInput
                style={{ flex: 1, padding: Platform.OS === 'android' ? 8 : 12, ...globalStyles.txtDirection }}
                placeholder={getString.t('search') + '...'}
                keyboardType="text"
                onChangeText={(text) => handleSearch(text)}
              />
            </View>

            <Spacer space={12} />


            <View style={{ alignSelf: 'stretch', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <View style={{ alignSelf: 'flex-start', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity
                  className={`${allSelected ? "bg-[#FF9502]" : "bg-[#F5F5F5]"} rounded-full`}
                  style={{ paddingHorizontal: 30, paddingVertical: 6, zIndex: 2 }}
                  onPress={handleSelectAll}>
                  <Text style={{ color: allSelected ? white : lightBlack }} className="text-center mt-2 font-medium">{getString.t('all')}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  className={`${!allSelected ? "bg-[#FF9502]" : "bg-[#F5F5F5]"} rounded-full`}
                  style={{ paddingHorizontal: 16, paddingVertical: 6, paddingStart: 48, position: 'relative', start: -32 }}
                  onPress={() => handleSelectBooked()}>
                  <Text style={{ color: !allSelected ? white : lightBlack }} className="text-center mt-2 font-medium">
                    {getString.t('in-progress')}
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ ...globalStyles.font, fontSize: fontMeduim }}>{getString.t('customers')}</Text>
                <Spacer space={4} />
                <Text style={{ ...globalStyles.font, fontSize: fontMeduim, fontFamily: 'poppins-bold' }}>{numberOfActiveCustomers}</Text>
              </View>
            </View>
            {
              appointments.length == 0 &&
              <>
                <Spacer space={16} />
                <Text className="text-xl text-center text-red-600 mt-10">{getString.t('no_appointment_at_this_day')}</Text>
              </>
            }
            <Spacer space={16} />




          </View>
        }
        ListFooterComponent={<View style={{ height: 20 }} />}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => { return item.start }}
      />

    </BottomSheet>
  );
};



export default AppointmentsSheet;
