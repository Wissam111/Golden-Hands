import { StyleSheet, SafeAreaView, View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import UserCard from "../components/UserCard";
import HorizontalChipS from "../components/HorizontalChipS";
import useHomeData from "./home/useHomeData";
import { FlatList } from "react-native-gesture-handler";
const BookAppointmentScreen = () => {
  const { workers, appointments } = useHomeData();
  const [selectedWorker, setSelectedWorker] = useState(null);

  const handleSelectWorker = (worker) => {
    setSelectedWorker(worker);
  };
  return (
    <SafeAreaView className="bg-white">
      <View
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingTop: 10,
        }}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        <View className="p-5">
          <Text className="text-xl  m-2 mb-5 font-light">Select Worker</Text>
          <FlatList
            data={workers}
            keyExtractor={(item) => item._id}
            horizontal
            renderItem={({ item }) => (
              <HorizontalChipS
                worker={item}
                handleSelectWorker={handleSelectWorker}
              />
            )}
            showsHorizontalScrollIndicator={false}
          />
        </View>
        <View className="p-5">
          <Text className="text-xl  m-2 mb-5 font-light">Select Day</Text>
          <FlatList
            data={workers}
            keyExtractor={(item) => item._id}
            horizontal
            renderItem={({ item }) => <Text>s</Text>}
            showsHorizontalScrollIndicator={false}
          />
        </View>
        <View className="p-5">
          <Text className="text-xl  m-2 mb-5 font-light">Select Service</Text>
          <FlatList
            data={workers}
            keyExtractor={(item) => item._id}
            horizontal
            renderItem={({ item }) => <Text>s</Text>}
            showsHorizontalScrollIndicator={false}
          />
        </View>
        <View className="p-5">
          <Text className="text-xl  m-2 mb-5 font-light">
            Select Appointment
          </Text>
          <FlatList
            data={workers}
            keyExtractor={(item) => item._id}
            horizontal
            renderItem={({ item }) => <Text>s</Text>}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default BookAppointmentScreen;
