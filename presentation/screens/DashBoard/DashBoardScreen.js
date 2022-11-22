import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import useAuthContext from "../../../hooks/useAuthContext";
import HorizontalChipS from "../../components/HorizontalChipS";
import { MagnifyingGlassIcon } from "react-native-heroicons/outline";
import CalendarView from "../../components/CalendarView";
import DayView from "../../components/DayView";
import AppointmentsSheet from "../../components/AppointmentsSheet";
import DashBoardModel from "./DashBoardModel";
import StatusListView from "../../components/StatusListView";
import moment from "moment";
const DashBoardScreen = () => {
  const {
    appointments,
    worker,
    getAppointments,
    dateInterval,
    selectedDay,
    showStatusList,
    handleDateRight,
    handleDateLeft,
    handleSelectedDay,
    handleUpdateStatus,
    handleShowStatusList,
  } = DashBoardModel();

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
        handleShowStatusList(null, false);
      }}
      accessible={false}
    >
      <SafeAreaView className="flex-1">
        <View
          className="bg-[#1D1B1B] flex-1 relative"
          // style={{ borderWidth: 2, borderColor: "yellow", zIndex: 9999 }}
        >
          <View className="flex-row items-center space-x-10 mt-4">
            <HorizontalChipS user={worker} />
            <Image
              source={require("../../../assets/imgs/designtools.png")}
              className="w-7 h-7 "
            />
          </View>
          <CalendarView
            dateInterval={dateInterval}
            handleDateRight={handleDateRight}
            handleDateLeft={handleDateLeft}
          />

          <View
            className="flex-row space-x-9 p-4 items-center justify-between"
            // style={{ borderWidth: 2, borderColor: "red" }}
          >
            {dateInterval.map((date, index) => (
              <DayView
                key={index}
                id={index}
                date={date}
                isSelected={index == selectedDay}
                handleSelectedDay={handleSelectedDay}
              />
            ))}
          </View>

          <View className="flex-row items-center space-x-2 pb-1 mx-4 mt-2">
            <View className="flex-row flex-1 space-x-2  bg-gray-200 p-3 rounded-full">
              <MagnifyingGlassIcon color="gray" size={25} />
              <TextInput placeholder="Search..." keyboardType="default" />
            </View>
          </View>
          <View className="flex-row items-center p-2 space-x-10 justify-center mt-2">
            <TouchableOpacity
              className="bg-[#F5F5F5] rounded-full"
              style={{ width: 85, height: 32 }}
            >
              <Text className="text-center mt-2 font-medium">show all</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="bg-[#F5F5F5] rounded-full"
              style={{ width: 85, height: 32 }}
            >
              <Text className="text-center mt-2 font-medium">Booked</Text>
            </TouchableOpacity>
          </View>
          <AppointmentsSheet
            appointments={appointments}
            handleShowStatusList={handleShowStatusList}
          />
          {showStatusList && (
            <StatusListView handleUpdateStatus={handleUpdateStatus} />
          )}
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default DashBoardScreen;
