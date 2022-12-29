import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  Platform,
  Modal,
} from "react-native";
import React, { useEffect, useState } from "react";
import HorizontalChip from "../../components/HorizontalChip";
import CalendarView from "../../components/CalendarView";
import DayView from "../../components/DayView";
import AppointmentsSheet from "../../components/AppointmentsSheet";
import DashBoardModel from "./DashBoardModel";
import StatusSheet from "../../components/StatusSheet";
import BarberServicesSheet from "../../components/BarberServicesSheet";
import AddAppointmentView from "../../components/AddAppointmentView";
import { useIsFocused } from "@react-navigation/native";
import Constants from 'expo-constants';
import BottomDeleteView from "../../components/BottomDeleteView";
import { primaryColor } from "../../styles/global";
import useDialogContext from "../../../hooks/useDialogContext";

/*------- represent's worker Dashboard Screen ---------- */





const DashBoardScreen = ({ navigation }) => {
  const isFocused = useIsFocused();
  const [h, setH] = useState(1)
  const [h2, setH2] = useState(1)

  const {
    appointmentsCount,
    closestAppointment,
    selectedAppointments,
    numberOfActiveCustomers,
    appointments,
    worker,
    search,
    dateInterval,
    selectedDay,
    showStatusSheet,
    allSelected,
    showServSheet,
    showAddAppoint,
    workerServices,
    currentAppoint,
    isSelected,
    cancelSelection,
    deleteSelectedAppointments,
    handleSelectedAppointment,
    getAppointments,
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
    compineDT,
  } = DashBoardModel();
  const { isVisible: dialogVisible } = useDialogContext()

  useEffect(() => {
    if (isFocused) {
      getAppointments()
    }
  }, [isFocused, selectedDay, allSelected, search])



  return (
    <TouchableWithoutFeedback style={{ flex: 1 }} onPress={Keyboard.dismiss} accessible={false}>
      <View style={{ flex: 1, backgroundColor: primaryColor }}>
        <View
          onLayout={(event) => {
            const { height } = event.nativeEvent.layout
            setH(Dimensions.get('window').height - height - Constants.statusBarHeight)
          }}>

          <View
            onLayout={(event) => {
              const { height } = event.nativeEvent.layout
              setH2(Dimensions.get('window').height - height - Constants.statusBarHeight - 20)
            }}
            className="flex-row items-center mt-4">
            <View className="ml-4">
              <SafeAreaView />
              <HorizontalChip
                text={worker.firstName + " " + worker.lastName}
                imageUrl={worker.image}
                user={worker}
              />
            </View>

            <TouchableOpacity onPress={handleShowServSheet}>
              <Image
                source={require("../../../assets/imgs/designtools.png")}
                className="w-6 h-6"
              />
            </TouchableOpacity>
          </View>

          <CalendarView
            dateInterval={dateInterval}
            handleDateRight={handleDateRight}
            handleDateLeft={handleDateLeft} />


          <View className="flex-row space-x-9 p-4 items-center justify-between">
            {dateInterval.map((date, index) => {
              return (
                <DayView
                  key={index}
                  date={date}
                  isSelected={date.isSame(selectedDay)}
                  handleSelectedDay={handleSelectedDay}
                />
              )
            })}
          </View>
        </View>

        {selectedAppointments.length > 0 &&
          <BottomDeleteView
            onCancel={() => { cancelSelection(null) }}
            onExcute={deleteSelectedAppointments} />
        }


        <AppointmentsSheet
          appointmentsCount={appointmentsCount}
          closestAppointment={closestAppointment}
          selectionMode={selectedAppointments.length > 0}
          isSelected={isSelected}
          cancelSelection={cancelSelection}
          handleSelectedAppointment={handleSelectedAppointment}
          numberOfActiveCustomers={numberOfActiveCustomers}
          height={h}
          height2={h2}
          handleSelectAll={handleSelectAll}
          handleSelectBooked={handleSelectBooked}
          allSelected={allSelected}
          selectedDay={selectedDay}
          appointments={appointments}
          handleShowStatusSheet={handleShowStatusSheet}
          handleShowAppoint={handleShowAppoint}
          compineDT={compineDT}
          handleSearch={handleSearch}
          search={search}
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
            navigateToProfile={(id) => { navigation.navigate('ProfileScreen', { userId: id }) }}
            handleUpdateStatus={handleUpdateStatus}
            handleShowStatusSheet={handleShowStatusSheet}
            handleDeleteAppointment={handleDeleteAppointment}
            appointment={currentAppoint}
            services={workerServices}
          />
        )}


        <Modal
          style={{ zIndex: 9 }}
          animationType="fade"
          transparent={true}
          visible={showAddAppoint && !dialogVisible}>
          <AddAppointmentView
            date={dateInterval[selectedDay]}
            handlePostAppoint={handlePostAppoint}
            onClose={handleShowAppoint}
          />
        </Modal>

      </View>
    </TouchableWithoutFeedback>
  );
};

export default DashBoardScreen;
