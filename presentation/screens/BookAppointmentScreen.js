import { StyleSheet, SafeAreaView, View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import UserCard from "../components/UserCard";
import HorizontalChipS from "../components/HorizontalChipS";
import useHomeData from "./home/useHomeData";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import Card from "../components/Card";
import moment from "moment";
const BookAppointmentScreen = () => {
  const { workers, appointments, getWorkingDates } = useHomeData();
  const [selectedWorker, setSelectedWorker] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);

  const [workerAppointments, setWorkerAppointments] = useState([]);
  const [groupedAppoints, setGroupedAppoints] = useState([]);
  // useEffect(() => {
  //   if (!selectedWorker) {
  //     return;
  //   }
  //   filterWorkerAppoints();
  // }, [selectedWorker]);

  const filterWorkerAppoints = (worker) => {
    const today = new Date();
    let appoints = appointments.filter(
      (appoint) =>
        appoint.status == "free" &&
        appoint.worker &&
        today <= new Date(appoint.start_time) &&
        appoint.worker._id == worker._id
    );
    const groupedAppoints = appoints.reduce((results, appoint) => {
      let day = new Date(appoint.start_time).getDay() + 1;
      (results[day] = results[day] || []).push(appoint);
      return results;
    }, {});

    console.log(groupedAppoints);
    setGroupedAppoints(groupedAppoints);
    setWorkerAppointments(appoints.slice(0, 7));
  };

  const handleSelectWorker = (worker) => {
    setSelectedWorker(worker);
    filterWorkerAppoints(worker);
  };
  const handleSelectedDay = (dayId) => {};
  return (
    <SafeAreaView className="flex-1 rounded-md">
      <View
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingTop: 10,
        }}
        className="pt-5"
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        <View className="m-2 ">
          <Text className="text-xl  m-2 mb-5 font-light">Select Worker</Text>
          <FlatList
            data={workers}
            keyExtractor={(item) => item._id}
            horizontal
            renderItem={({ item }) => (
              <HorizontalChipS
                worker={item}
                handleSelectWorker={handleSelectWorker}
                isSelected={selectedWorker?._id == item._id}
              />
            )}
            showsHorizontalScrollIndicator={false}
          />
        </View>
        <View className="m-2 p-1">
          <Text className="text-xl  m-2 mb-5 font-light">Select Day</Text>
          <ScrollView
            className="flex-row"
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            {Object.entries(groupedAppoints).map(([key, appoints]) => (
              <Card
                key={key}
                title={moment(appoints[0].start_time).format("ll")}
                handlePress={handleSelectedDay}
              />
            ))}
          </ScrollView>

          {/* <FlatList
            data={workers}
            keyExtractor={(item) => item._id}
            horizontal
            renderItem={({ item }) => <Card />}
            showsHorizontalScrollIndicator={false}
          /> */}
          {/* <View className="flex-row">
            <Card cardContent={{}} title="Su 13" />
            <Card cardContent={{}} title="Mo 14" />
            <Card cardContent={{}} title="Tu 15" />
          </View> */}
        </View>
        <View className="m-2 p-1">
          <Text className="text-xl  m-2 mb-5 font-light">Select Service</Text>
          <FlatList
            data={selectedWorker?.services}
            keyExtractor={(item) => item._id}
            horizontal
            renderItem={({ item }) => (
              <Card cardContent={item} title={item.title} />
            )}
            showsHorizontalScrollIndicator={false}
          />
        </View>
        <View className="m-2 p-1">
          <Text className="text-xl  m-2 mb-5 font-light">
            Select Appointment
          </Text>

          <FlatList
            data={workerAppointments}
            keyExtractor={(item) => item._id}
            horizontal
            renderItem={({ item }) => (
              <Card cardContent={item} title={item.start_time} />
            )}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default BookAppointmentScreen;
