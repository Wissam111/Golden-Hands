import { View, Text, RefreshControl } from "react-native";
import React from "react";
import HorizontalChip from "../../components/HorizontalChip";
import { useNavigation } from "@react-navigation/native";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import Card from "../../components/Card";
import moment from "moment";
import BookViewModel from "./BookViewModel";
import AppointmentConfirmationSheet from "../../components/AppointmentConfirmationSheet";
import Loader from "../../components/Loader";
import Title from "../../components/Title";
import BackButton from "../../components/BackButton";
import Spacer from "../../components/Spacer";
import getString from "../../../localization";


/*------- represent's book appointments Screen ---------- */

const BookAppointmentScreen = () => {
  const {
    refreshing,
    availableAppointments,
    workers,
    workingDates,
    selectedWorker,
    selectedDay,
    selectedService,
    selectedAppointment,
    onRefresh,
    handleSelectWorker,
    handleSelectDay,
    handleSelectService,
    handleSelectAppointment,
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
      className="pt-5 flex-1 relative">
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
      <ScrollView
        style={{ flex: 1 }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            progressBackgroundColor="#fff"
            tintColor="#000"
          />
        }>
        <View style={{ alignItems: 'flex-start' }}>
          <Text className="text-xl  m-2 mb-5 font-medium">{getString.t('select_worker')}</Text>
          <FlatList
            contentContainerStyle={{ padding: 8, flexGrow: 1 }}
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
        {
          selectedWorker && (
            <View style={{ alignItems: 'flex-start' }} >
              <Text className="text-xl  m-2 mb-5 font-medium">{getString.t('select_day')}</Text>
              <FlatList
                contentContainerStyle={{ padding: 8, flexGrow: 1 }}
                data={workingDates}
                keyExtractor={(item) => item.date}
                horizontal
                renderItem={({ item }) => (
                  <Card
                    cardContent={item}
                    id={item}
                    title={moment(item.date).calendar(null, {
                      sameDay: `[${getString.t('today')}]`,
                      nextDay: `[${getString.t('tomorrow')}]`,
                      nextWeek: 'dddd[\n]DD MMM yyyy',
                      lastDay: 'dddd[\n]DD MMM yyyy',
                      lastWeek: 'dddd[\n]DD MMM yyyy',
                      sameElse: 'dddd[\n]DD MMM yyyy',
                    })}
                    handlePress={handleSelectDay}
                    isSelected={selectedDay === item.date}
                  />
                )}
                showsHorizontalScrollIndicator={false}
              />
            </View>
          )
        }
        {
          selectedDay && (
            <View style={{ alignItems: 'flex-start' }}>
              <Text className="text-xl  m-2 mb-5 font-medium">
                {getString.t('select_service')}
              </Text>
              <FlatList
                contentContainerStyle={{ padding: 8, flexGrow: 1 }}
                data={selectedWorker?.services}
                keyExtractor={(item) => item._id}
                horizontal
                renderItem={({ item }) => (
                  <Card
                    cardContent={item}
                    id={item}
                    title={getString.t(item.title.toLowerCase())}
                    handlePress={handleSelectService}
                    isSelected={selectedService?._id === item._id}
                    price={item.price}
                  />
                )}
                showsHorizontalScrollIndicator={false}
              />
            </View>
          )
        }
        {
          selectedService && (
            <View style={{ alignItems: 'flex-start' }}>
              <Text className="text-xl  m-2 mb-5 font-medium">
                {getString.t('select_hour')}
              </Text>
              <FlatList
                contentContainerStyle={{ padding: 8, flexGrow: 1 }}
                data={availableAppointments}
                keyExtractor={(item) => item._id}
                horizontal
                renderItem={({ item }) => (
                  <Card
                    cardContent={item}
                    id={item}
                    title={moment(item.start_time).format("LT")}
                    handlePress={handleSelectAppointment}
                    isSelected={selectedAppointment?._id === item._id}
                  />
                )}
                showsHorizontalScrollIndicator={false}
              />
            </View>
          )
        }
      </ScrollView>
      {
        selectedAppointment && (
          <AppointmentConfirmationSheet
            id={selectedAppointment}
            appointment={selectedAppointment}
            handleCloseConfirmation={handleCloseConfirmation}
            handleBook={handleBook}
            selectedService={selectedService}
          />
        )
      }
    </View >
  );
};

export default BookAppointmentScreen;
