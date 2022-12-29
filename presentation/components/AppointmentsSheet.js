import { View, Text, TouchableOpacity, TextInput, Platform, RefreshControl } from "react-native";
import React, { useEffect, useMemo, useRef, useState } from "react";
import BottomSheet, { BottomSheetFlatList, BottomSheetTextInput } from "@gorhom/bottom-sheet";
import moment from "moment";
import AppointmentsInterval from "./AppointmentsInterval";
import getString from "../../localization";
import Spacer from "./Spacer";
import { EvilIcons } from "@expo/vector-icons";
import { blue, fontLarge, fontMeduim, fontMeduim2, fontSmall, globalStyles, lightBlack, orange2, red, white } from "../styles/global";
import { Octicons } from '@expo/vector-icons';
import useLoadingContext from "../../hooks/useLoadingContext";

const Header = (
  { search,
    handleSearch,
    numberOfActiveCustomers,
    allSelected,
    handleSelectAll,
    appointmentsCount,
    handleShowAppoint,
    handleSelectBooked }) => {

  const { isLoading } = useLoadingContext()
  return (
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
        <BottomSheetTextInput
          style={{ flex: 1, padding: Platform.OS === 'android' ? 8 : 12, ...globalStyles.txtDirection }}
          placeholder={getString.t('search') + '...'}
          keyboardType="text"
          onChangeText={(text) => handleSearch(text)}
          value={search}
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

        <Text style={{ ...globalStyles.font, fontSize: fontMeduim, marginEnd: 8, color: lightBlack }}>{getString.t('customers')}  <Text style={{ fontFamily: 'poppins-bold', fontSize: fontLarge, color: '#000' }}>{numberOfActiveCustomers}</Text></Text>
      </View>
      {
        !appointmentsCount && !isLoading &&
        <>
          <Spacer space={16} />
          <Text style={{ ...globalStyles.font, fontSize: fontMeduim2, color: red }}>{getString.t('no_appointment_at_this_day')}</Text>
        </>
      }
      <Spacer space={16} />
    </View>)
}


const AppointmentsSheet = (props) => {
  const {
    appointmentsCount,
    cancelSelection,
    selectionMode,
    isSelected,
    handleSearch,
    search,
    numberOfActiveCustomers,
    handleSelectedAppointment,
    appointments,
    closestAppointment,
    height,
    height2,
    handleShowStatusSheet,
    handleShowAppoint,
    handleSelectAll,
    handleSelectBooked,
    allSelected } =
    props;
  const snapPoints = useMemo(() => [height, height2], [height, height2]);
  const bottomSheetRef = useRef(null);


  return (
    <BottomSheet ref={bottomSheetRef} index={0} snapPoints={snapPoints}>

      <BottomSheetFlatList
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: 8 }}
        data={appointments}
        horizontal={false}
        ItemSeparatorComponent={<Spacer space={6} />}
        renderItem={({ item, index }) => {
          { console.log(index) }
          return <AppointmentsInterval
            cancelSelection={cancelSelection}
            selectionMode={selectionMode}
            isSelected={isSelected}
            handleSelectedAppointment={handleSelectedAppointment}
            closestAppointment={closestAppointment}
            interval={item}
            handleShowStatusSheet={handleShowStatusSheet}
            key={index}
          />
        }
        }
        ListHeaderComponent={
          <Header
            search={search}
            handleSearch={handleSearch}
            numberOfActiveCustomers={numberOfActiveCustomers}
            allSelected={allSelected}
            handleSelectAll={handleSelectAll}
            appointmentsCount={appointmentsCount}
            handleShowAppoint={handleShowAppoint}
            handleSelectBooked={handleSelectBooked}
          />}
        ListFooterComponent={<View style={{ height: 20 }} />}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => { return item.start }}
      />

    </BottomSheet>
  );
};



export default AppointmentsSheet;
