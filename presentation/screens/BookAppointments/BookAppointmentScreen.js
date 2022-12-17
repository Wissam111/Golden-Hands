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
import Title from "../../components/Title";
import BackButton from "../../components/BackButton";
import Spacer from "../../components/Spacer";
import getString from "../../../localization";
import { backgroundColor, globalStyles } from "../../styles/global";

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
    <View
      style={{ backgroundColor: '#f9f9f9' }}
      contentContainerStyle={{
        paddingHorizontal: 20,
        paddingTop: 10,
      }}
      className="pt-5 flex-1 relative"
      horizontal
      showsHorizontalScrollIndicator={false}>
      <Loader />
      <View
        className="mb-4  p-1 flex-row ml-2 items-center"
        style={{
          borderBottomColor: "#D9D9D9",
          justifyContent: "space-between",
        }}>
      
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <BackButton onPress={navigation.goBack} />
          <Spacer space={6} />
          <Title text={getString.t('book_appointment')} />
        </View>

      </View>

      <View style={{ alignItems: 'flex-start' }} className="m-1 ">
        <Text className="text-xl  m-2 mb-5 font-medium">{getString.t('select_worker')}</Text>
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
        <View style={{ alignItems: 'flex-start' }} className="m-2">
          <Text className="text-xl  m-2 mb-5 font-medium">{getString.t('select_day')}</Text>
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
        <View style={{ alignItems: 'flex-start' }} className="m-2">
          <Text className="text-xl  m-2 mb-5 font-medium">
            {getString.t('select_service')}
          </Text>
          <FlatList
            data={selectedWorker?.services}
            keyExtractor={(item) => item._id}
            horizontal
            renderItem={({ item }) => (
              <Card
                cardContent={item}
                id={item._id}
                title={getString.t(item.title.toLowerCase())}
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
        <View style={{ alignItems: 'flex-start' }} className="m-2">
          <Text className="text-xl  m-2 mb-5 font-medium">
            {getString.t('select_hour')}
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
  );
};

export default BookAppointmentScreen;
