import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
  ActivityIndicator,
  Modal,
} from "react-native";
import React, { useState, useMemo, useRef } from "react";
import SelectDropdown from "react-native-select-dropdown";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import BottomSheet, { BottomSheetFlatList, BottomSheetView, useBottomSheetDynamicSnapPoints } from "@gorhom/bottom-sheet";
import { getIconByStatus } from "./AppointmentView";
import getString from "../../localization";
import Spacer from "./Spacer";
import { backgroundColor, fontLarge, fontMeduim, fontSmall, globalStyles, gray1, green, white } from "../styles/global";
import DefaultButton from "./DefaultButton";
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { dialPhoneNumber, openWhatsapp } from "../../core/linking";
import { IMAGE_BASE_URL } from "../../network/apiCall";
import moment from "moment";

const StatusSheet = (props) => {
  const { handleUpdateStatus, handleShowStatusSheet, handleDeleteAppointment, appointment, navigateToProfile } =
    props;
  const [selectedStatus, setSelectStatus] = useState(null)
  const snapPoints = useMemo(() => ["10%", 'CONTENT_HEIGHT'], [])
  const bottomSheetRef = useRef(null)

  const {
    animatedHandleHeight,
    animatedSnapPoints,
    animatedContentHeight,
    handleContentLayout,
  } = useBottomSheetDynamicSnapPoints(snapPoints)

  const statusList = [
    "done",
    "in-progress",
    "didnt-come",
    "canceled",
    "free",
    "hold",
  ]

  const services = ["Hair Cut", "Face Cut", "Wax", "Massage"];
  const confirmAlert = (message) => {
    Alert.alert("", message, [
      { text: "confirm", onPress: () => handleDeleteAppointment() },
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
      },
    ]);
  };
  return (
    <BottomSheet
      containerStyle={{
        elevation: 8,
        shadowColor: 'black',
        shadowRadius: 1,
        shadowOpacity: 1,
        shadowOffset: { width: .7, height: .7 },
      }}
      handleStyle={{ backgroundColor: appointment.customer ? '#f9f9f9' : 'white', borderTopEndRadius: 26, borderTopStartRadius: 26 }}
      handleHeight={animatedHandleHeight}
      contentHeight={animatedContentHeight}
      ref={bottomSheetRef}
      index={1}
      snapPoints={animatedSnapPoints}
      enablePanDownToClose
      onClose={() => handleShowStatusSheet(null, false)}>

      {/* <View className="flex-row p-4 justify-between">
        <Text className="text-xl font-semibold">
          {getString.t('change_status')}
        </Text>


        <TouchableOpacity
          onPress={() =>
            confirmAlert("Are you sure you want to delete this item?")
          }>
          <FontAwesome5 name="trash-alt" size={24} color="black" />
        </TouchableOpacity>

      </View> */}

      {/* <View className="mt-8 flex-row flex-1 justify-between p-1">
        <View className="rounded-full" style={{ width: 50 }}>
          {selectedStatus && (
            <SelectDropdown
              data={services}
              onSelect={(selectedItem, index) => {
                handleUpdateStatus(selectedStatus, selectedItem);
              }}
              defaultButtonText={"Select Service"}
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem;
              }}
              rowTextForSelection={(item, index) => {
                return item;
              }}
              buttonStyle={styles.dropdown1BtnStyle}
              buttonTextStyle={styles.dropdown1BtnTxtStyle}
              renderDropdownIcon={(isOpened) => {
                return (
                  <FontAwesome
                    name={isOpened ? "chevron-up" : "chevron-down"}
                    color={"#444"}
                    size={18}
                  />
                );
              }}
              dropdownIconPosition={"right"}
              dropdownStyle={styles.dropdown1DropdownStyle}
              rowStyle={styles.dropdown1RowStyle}
              rowTextStyle={styles.dropdown1RowTxtStyle}
            />
          )}
        </View>
        <View className="pr-3">
          {
            <BottomSheetFlatList
              data={statusList}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  className="m-1 p-4 items-center rounded-md flex-row justify-between"
                  onPress={
                    item == "hold"
                      ? () => setSelectStatus(item)
                      : () => handleUpdateStatus(item)
                  }
                  style={styles.statusCard}>
                  <View>
                    {getIconByStatus(item, getIconByStatus(item).color).icon}
                  </View>
                  <Spacer space={6} />
                  <Text className="text-base  font-semibold" key={index}>{item}</Text>
                </TouchableOpacity>
              )}
              showsVerticalScrollIndicator={false}
            />
          }
        </View>
      </View> */}



      <BottomSheetView onLayout={handleContentLayout} style={{ flex: 1, justifyContent: 'flex-end', backgroundColor: '#f9f9f9', borderBottomEndRadius: 26, borderBottomStartRadius: 26 }}>

        {appointment.customer &&
          <BottomSheetView style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 12, marginBottom: 8 }}>

            <TouchableOpacity onPress={() => { navigateToProfile(appointment.customer._id) }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ borderRadius: 36, borderColor: white, borderWidth: 2 }}>
                  <Image
                    defaultSource={require('../../assets/imgs/person_place_holder.jpg')}
                    style={{ width: 46, height: 46, borderRadius: 36 }}
                    source={{ uri: appointment.customer.image ? IMAGE_BASE_URL + appointment.customer.image : null }}
                  />
                </View>

                <Spacer space={4} />
                <View>
                  <Text style={{ ...globalStyles.font, fontSize: fontLarge, fontFamily: 'poppins-bold' }}>{appointment.customer.firstName} {appointment.customer.lastName}</Text>
                  <Text style={{ alignSelf: 'flex-start', color: gray1 }}>{getString.t(appointment.status)}</Text>
                </View>
              </View>

            </TouchableOpacity>

            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity onPress={() => { openWhatsapp(appointment.customer.phone) }}>
                <FontAwesome name="whatsapp" size={24} color={green} />
              </TouchableOpacity>

              <Spacer space={8} />

              <TouchableOpacity onPress={() => { dialPhoneNumber(appointment.customer.phone) }}>
                <AntDesign name="phone" size={24} color={green} />
              </TouchableOpacity>
            </View>

          </BottomSheetView>
        }



        <BottomSheetView style={{
          flex: 1,
          borderRadius: appointment.customer ? 26 : 0,
          backgroundColor: white,
          padding: 16,
          paddingTop: 26,
          shadowColor: '#000000',
          shadowOffset: {
            width: 0,
            height: -4,
          },
          shadowOpacity: 0.1,
          shadowRadius: 2,
          elevation: 4,
        }}>

          <Text style={{ ...globalStyles.font, fontSize: fontSmall, alignSelf: 'flex-start' }}>{moment(appointment.start_time).format('HH:mm')} - {moment(appointment.end_time).format('HH:mm')}</Text>
          <Spacer space={6} />

          <View style={{ flex: 1 }}>

            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
              {(appointment.status === 'free' || appointment.status === 'canceled' || appointment.status === 'didnt-come') &&
                <TouchableOpacity style={{ flex: 1 }} onPress={() => { setSelectStatus('hold') }}>
                  < View style={{ ...styles.statusOp, flex: 3 }}>
                    <Image style={{ width: 20, height: 20 }} source={require('../../assets/imgs/time-management.png')} />
                    <Spacer space={6} />
                    <Text style={{ ...globalStyles.font, fontSize: fontSmall }}>{getString.t('hold')}</Text>
                  </View>
                </TouchableOpacity>
              }


              {(appointment.status === 'in-progress' || appointment.status === 'hold' || appointment.status === 'done' || appointment.status === 'didnt-come') &&
                <TouchableOpacity style={{ flex: 1 }} onPress={() => { handleUpdateStatus('canceled') }}>
                  <View style={{ ...styles.statusOp, backgroundColor: '#F4D6D6', borderWidth: 0 }}>
                    <Image style={{ width: 20, height: 20 }} source={require('../../assets/imgs/close.png')} />
                    <Spacer space={6} />
                    <Text style={{ ...globalStyles.font, fontSize: fontSmall }}>{getString.t('cancel')}</Text>
                  </View>
                </TouchableOpacity>
              }
            </View>




            <View className="rounded-full" style={{ width: 50 }}>
              {selectedStatus && (
                <>
                  <Spacer space={6} />
                  <SelectDropdown
                    data={services}
                    onSelect={(selectedItem, index) => {
                      handleUpdateStatus(selectedStatus, selectedItem);
                    }}
                    defaultButtonText={"Select Service"}
                    buttonTextAfterSelection={(selectedItem, index) => {
                      return selectedItem;
                    }}
                    rowTextForSelection={(item, index) => {
                      return item;
                    }}
                    buttonStyle={styles.dropdown1BtnStyle}
                    buttonTextStyle={styles.dropdown1BtnTxtStyle}
                    renderDropdownIcon={(isOpened) => {
                      return (
                        <FontAwesome
                          name={isOpened ? "chevron-up" : "chevron-down"}
                          color={"#444"}
                          size={18}
                        />
                      );
                    }}
                    dropdownIconPosition={"right"}
                    dropdownStyle={styles.dropdown1DropdownStyle}
                    rowStyle={styles.dropdown1RowStyle}
                    rowTextStyle={styles.dropdown1RowTxtStyle}
                  />
                </>
              )}
            </View>


            <Spacer space={6} />


            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
              {(appointment.status === 'in-progress' || appointment.status === 'hold' || appointment.status === 'canceled' || appointment.status === 'done') &&
                < TouchableOpacity style={{ flex: 1 }} onPress={() => { handleUpdateStatus('didnt-come') }}>
                  <View style={{ ...styles.statusOp, flex: 1 }}>
                    <FontAwesome5 name="walking" size={24} color="black" />
                    <Spacer space={6} />
                    <Text style={{ ...globalStyles.font, fontSize: fontSmall }}>{getString.t('didnt-come')}</Text>
                  </View>
                </TouchableOpacity>

              }

              {(appointment.status === 'in-progress' || appointment.status === 'canceled' || appointment.status === 'didnt-come' || appointment.status === 'hold') &&
                <TouchableOpacity style={{ flex: 1 }} onPress={() => { handleUpdateStatus('free') }}>
                  <View style={{ ...styles.statusOp }}>
                    <Image style={{ width: 20, height: 20 }} source={require('../../assets/imgs/appointment-free.png')} />
                    <Spacer space={6} />
                    <Text style={{ ...globalStyles.font, fontSize: fontSmall }}>{getString.t('free')}</Text>
                  </View>
                </TouchableOpacity>
              }
            </View>

            <Spacer space={6} />


            <TouchableOpacity style={{ flex: 1 }} onPress={() => { confirmAlert("Are you sure you want to delete this item?") }}>
              <View style={{ ...styles.statusOp }}>
                <FontAwesome5 name="trash-alt" size={24} color="black" />
                <Spacer space={6} />
                <Text style={{ ...globalStyles.font, fontSize: fontSmall }}>{getString.t('delete')}</Text>
              </View>
            </TouchableOpacity>

          </View>

          <Spacer space={24} />

          {(appointment.status === 'in-progress' || appointment.status === 'hold' || appointment.status === 'done' || appointment.status === 'canceled') &&
            <DefaultButton onPress={() => { handleUpdateStatus('done') }} color={green} text={getString.t('done')} style={{ borderRadius: 24 }} />
          }
          <Spacer space={20} />
        </BottomSheetView>

      </BottomSheetView>



      {/* <Modal
        animationType="fade"
        transparent={true}
        visible={true}>

        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,.3)', padding: 8 }}>
          <View style={{ backgroundColor: white, padding: 8, alignSelf: 'stretch', minHeight: 100, borderRadius: 12 }}>
            <Text style={{ ...globalStyles.font, fontSize: fontMeduim }}>Hold Appointment</Text>

            <Spacer space={8} />

            <SelectDropdown
              data={services}
              onSelect={(selectedItem, index) => {
                handleUpdateStatus(selectedStatus, selectedItem);
              }}
              defaultButtonText={"Select Service"}
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem;
              }}
              rowTextForSelection={(item, index) => {
                return item;
              }}
              buttonStyle={styles.dropdown1BtnStyle}
              buttonTextStyle={styles.dropdown1BtnTxtStyle}
              renderDropdownIcon={(isOpened) => {
                return (
                  <FontAwesome
                    name={isOpened ? "chevron-up" : "chevron-down"}
                    color={"#444"}
                    size={18}
                  />
                );
              }}
              dropdownIconPosition={"right"}
              dropdownStyle={styles.dropdown1DropdownStyle}
              rowStyle={styles.dropdown1RowStyle}
              rowTextStyle={styles.dropdown1RowTxtStyle}
            />
          </View>
        </View>

      </Modal> */}


    </BottomSheet >
  );
};
const styles = StyleSheet.create({
  statusOp: {
    borderRadius: 12,
    padding: 8,
    paddingHorizontal: 12,
    borderWidth: .5,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: gray1,
    flex: 1,
    margin: 2
  },
  statusCard: {
    shadowColor: "black",
    backgroundColor: "white",
    elevation: .2,
    shadowOffset: { width: 1, height: 1 },
    shadowRadius: 2,
    shadowOpacity: 0.2,
  },
  dropdown1BtnStyle: {
    backgroundColor: "#FFF",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#444",
  },
  dropdown1BtnTxtStyle: { color: "#444", textAlign: "left" },
  dropdown1DropdownStyle: { backgroundColor: "#EFEFEF" },
  dropdown1RowStyle: {
    backgroundColor: "#EFEFEF",
    borderBottomColor: "#C5C5C5",
  },
  dropdown1RowTxtStyle: { color: "#444", textAlign: "left" },
});

export default StatusSheet;
