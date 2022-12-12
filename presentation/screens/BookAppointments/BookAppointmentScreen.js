import { SafeAreaView, View, Text, TouchableOpacity } from "react-native";
import React from "react";
import HorizontalChip from "../../components/HorizontalChip";
import { useNavigation } from "@react-navigation/native";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import Card from "../../components/Card";
import moment from "moment";
import BookViewModel from "./BookViewModel";
import AppointmentConfirmationSheet from "../../components/AppointmentConfirmationSheet";
import { Entypo } from "@expo/vector-icons";
import Loader from "../../components/Loader";

/*------- represent's book appointments Screen ---------- */

const BookAppointmentScreen = () => {
  const {
    workers,
    selectedWorker,
    selectedDay,
    selectedService,
    selectedHour,
    groupedAppoints,
    handleSelectWorker,
    handleSelectDay,
    handleSelectService,
    handleSelectHour,
    appointsByday,
    handleBook,
    handleCloseConfirmation,
  } = BookViewModel();
  const navigation = useNavigation();
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
        <Loader />
        <View
          className="mb-4 border-b-2  p-1 flex-row ml-2 items-center"
          style={{
            borderBottomColor: "#D9D9D9",
            justifyContent: "space-between",
          }}
        >
          <TouchableOpacity
            onPress={() =>
              navigation.navigate({
                name: "HomeScreen",
              })
            }
          >
            <Entypo name="arrow-with-circle-right" size={28} color="black" />
          </TouchableOpacity>

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
              <HorizontalChip
                text={item.firstName + " " + item.lastName}
                imageUrl={item.image}
                user={item}
                onPress={handleSelectWorker}
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
                  price={item.price}
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
                  title={moment(item.start_time).format("LT")}
                  handlePress={handleSelectHour}
                  isSelected={selectedHour == item._id}
                />
              )}
              showsHorizontalScrollIndicator={false}
            />
          </View>
        )}
        {selectedHour && (
          <AppointmentConfirmationSheet
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
