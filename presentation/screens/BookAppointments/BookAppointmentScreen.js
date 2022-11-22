import { StyleSheet, SafeAreaView, View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import HorizontalChipS from "../../components/HorizontalChipS";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import Card from "../../components/Card";
import moment from "moment";
import BookViewModel from "./BookViewModel";
import AppointmentConfirmation from "../../components/AppointmentConfirmation";
import { CalendarDaysIcon } from "react-native-heroicons/solid";
import { Icon } from "react-native-elements";
const BookAppointmentScreen = () => {
  const {
    workers,
    appointments,
    selectedWorker,
    selectedDay,
    selectedService,
    selectedHour,
    workerAppointments,
    groupedAppoints,
    handleSelectWorker,
    handleSelectDay,
    handleSelectService,
    handleSelectHour,
    appointsByday,
    handleBook,
    handleCloseConfirmation,
  } = BookViewModel();

  return (
    <SafeAreaView className="flex-1 rounded-md bg-[#F9F9F9]">
      <View
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingTop: 10,
        }}
        className="pt-5 flex-1 relative"
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        <View
          className="mb-4 border-b-2  p-1 flex-row"
          style={{
            borderBottomColor: "#D9D9D9",
            justifyContent: "space-between",
            // width: 120,
          }}
        >
          <CalendarDaysIcon size={50} color="#1D1B1B" />

          <Icon name="calendar" size={30} color="#900" />
          <Text
            className="text-xl  m-2 mb-5 font-bold"
            style={{ color: "#1D1B1B" }}
          >
            Book an Appointment
          </Text>
        </View>

        <View className="m-1 ">
          <Text className="text-xl  m-2 mb-5 font-medium">Select Worker</Text>
          <FlatList
            data={workers}
            keyExtractor={(item) => item._id}
            horizontal
            renderItem={({ item }) => (
              <HorizontalChipS
                user={item}
                handlePress={handleSelectWorker}
                isSelected={selectedWorker?._id == item._id}
              />
            )}
            showsHorizontalScrollIndicator={false}
          />
        </View>
        {selectedWorker && (
          <View className="m-2 p-1">
            <Text className="text-xl  m-2 mb-5 font-medium">Select Day</Text>
            <ScrollView
              className="flex-row"
              horizontal
              showsHorizontalScrollIndicator={false}
            >
              {Object.entries(groupedAppoints).map(([key, appoints]) => (
                <Card
                  key={key}
                  id={key}
                  title={moment(appoints[0].start_time).format("ll")}
                  handlePress={handleSelectDay}
                  isSelected={selectedDay == key}
                />
              ))}
            </ScrollView>
          </View>
        )}
        {selectedDay && (
          <View className="m-2 p-1">
            <Text className="text-xl  m-2 mb-5 font-medium">
              Select Service
            </Text>
            <FlatList
              data={selectedWorker?.services}
              keyExtractor={(item) => item._id}
              horizontal
              renderItem={({ item }) => (
                <Card
                  cardContent={item}
                  id={item._id}
                  title={item.title}
                  handlePress={handleSelectService}
                  isSelected={selectedService == item._id}
                />
              )}
              showsHorizontalScrollIndicator={false}
            />
          </View>
        )}
        {selectedService && (
          <View className="m-2 p-1">
            <Text className="text-xl  m-2 mb-5 font-medium">
              Select Appointment
            </Text>
            <FlatList
              data={appointsByday}
              keyExtractor={(item) => item._id}
              horizontal
              renderItem={({ item }) => (
                <Card
                  cardContent={item}
                  id={item._id}
                  title={moment(item.start_time).format("hh:mm")}
                  handlePress={handleSelectHour}
                  isSelected={selectedHour == item._id}
                />
              )}
              showsHorizontalScrollIndicator={false}
            />
          </View>
        )}
        {selectedHour && (
          <AppointmentConfirmation
            id={selectedHour}
            appointsByday={appointsByday}
            handleCloseConfirmation={handleCloseConfirmation}
            handleBook={handleBook}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default BookAppointmentScreen;
