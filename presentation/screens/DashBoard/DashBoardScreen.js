import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
} from "react-native";
import React from "react";
import HorizontalChip from "../../components/HorizontalChip";
import CalendarView from "../../components/CalendarView";
import DayView from "../../components/DayView";
import AppointmentsSheet from "../../components/AppointmentsSheet";
import DashBoardModel from "./DashBoardModel";
import StatusSheet from "../../components/StatusSheet";
import BarberServicesSheet from "../../components/BarberServicesSheet";
import { EvilIcons } from "@expo/vector-icons";
import AddAppointmentView from "../../components/AddAppointmentView";

const DashBoardScreen = () => {
  const {
    appointments,
    worker,
    dateInterval,
    selectedDay,
    showStatusSheet,
    allSelected,
    showServSheet,
    showAddAppoint,
    workerServices,
    handleDateRight,
    handleDateLeft,
    handleSelectedDay,
    handleUpdateStatus,
    handleShowStatusSheet,
    handleSelectAll,
    handleSelectBooked,
    handleSearch,
    handleShowServSheet,
    handlePostServ,
    handleDeleteServ,
    handlePostAppoint,
    handleShowAppoint,
    handleDeleteAppointment,
  } = DashBoardModel();

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView className="flex-1">
        <View className="bg-[#1D1B1B] flex-1 relative">
          <View>
            <View className="flex-row items-center space-x-10 mt-4">
              <View className="ml-4">
                <HorizontalChip
                  text={worker.firstName + " " + worker.lastName}
                  imageUrl={worker.image}
                  user={worker}
                />
              </View>

              <TouchableOpacity onPress={handleShowServSheet}>
                <Image
                  source={require("../../../assets/imgs/designtools.png")}
                  className="w-7 h-7 "
                />
              </TouchableOpacity>
            </View>
            <CalendarView
              dateInterval={dateInterval}
              handleDateRight={handleDateRight}
              handleDateLeft={handleDateLeft}
            />
            <View className="flex-row space-x-9 p-4 items-center justify-between">
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
                <EvilIcons name="search" size={27} color="gray" />
                <TextInput
                  placeholder="Search..."
                  keyboardType="default"
                  onChangeText={(text) => handleSearch(text)}
                />
              </View>
            </View>
            <View className="flex-row items-center p-2 space-x-10 justify-center mt-2">
              <TouchableOpacity
                className={`${
                  allSelected ? "bg-[#F4EBD0]" : "bg-[#F5F5F5]"
                } rounded-full`}
                style={{ width: 85, height: 32 }}
                onPress={handleSelectAll}
              >
                <Text className="text-center mt-2 font-medium">show all</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className={`${
                  !allSelected ? "bg-[#F4EBD0]" : "bg-[#F5F5F5]"
                } rounded-full`}
                style={{ width: 85, height: 32 }}
                onPress={() => handleSelectBooked()}
              >
                <Text className="text-center mt-2 font-medium">Booked</Text>
              </TouchableOpacity>
            </View>
          </View>

          <AppointmentsSheet
            appointments={appointments}
            handleShowStatusSheet={handleShowStatusSheet}
            handleShowAppoint={handleShowAppoint}
          />
          {showServSheet && (
            <BarberServicesSheet
              worker={worker}
              workerServices={workerServices}
              handleShowServSheet={handleShowServSheet}
              handlePostServ={handlePostServ}
              handleDeleteServ={handleDeleteServ}
            />
          )}

          {showStatusSheet && (
            <StatusSheet
              handleUpdateStatus={handleUpdateStatus}
              handleShowStatusSheet={handleShowStatusSheet}
              handleDeleteAppointment={handleDeleteAppointment}
            />
          )}
          {showAddAppoint && (
            <AddAppointmentView
              date={dateInterval[selectedDay]}
              handlePostAppoint={handlePostAppoint}
            />
          )}
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default DashBoardScreen;
