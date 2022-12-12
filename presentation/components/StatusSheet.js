import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import React, { useState, useMemo, useRef } from "react";
import SelectDropdown from "react-native-select-dropdown";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import BottomSheet from "@gorhom/bottom-sheet";
import { getIconByStatus } from "./AppointmentView";
const StatusSheet = (props) => {
  const { handleUpdateStatus, handleShowStatusSheet, handleDeleteAppointment } =
    props;
  const [selectedStatus, setSelectStatus] = useState(null);
  const snapPoints = useMemo(() => ["25%", "50%"], []);
  const bottomSheetRef = useRef(null);

  const statusList = [
    "done",
    "in-progress",
    "didnt-come",
    "canceled",
    "free",
    "hold",
  ];
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
      ref={bottomSheetRef}
      index={1}
      snapPoints={snapPoints}
      enablePanDownToClose
      onClose={() => handleShowStatusSheet(null, false)}
    >
      <View className="flex-row p-4 justify-between">
        <TouchableOpacity
          onPress={() =>
            confirmAlert("Are you sure you want to delete this item?")
          }
        >
          <FontAwesome5 name="trash-alt" size={24} color="black" />
        </TouchableOpacity>
        <Text className="text-xl font-semibold">
          Change <Text className="text-gray-500">Status</Text>
        </Text>
      </View>

      <View className="mt-8 flex-row flex-1 justify-between p-1">
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
            <FlatList
              data={statusList}
              horizontal={false}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  className="m-1 p-4 items-center rounded-md flex-row justify-between"
                  onPress={
                    item == "hold"
                      ? () => setSelectStatus(item)
                      : () => handleUpdateStatus(item)
                  }
                  style={styles.statusCard}
                >
                  <View>
                    {getIconByStatus(item, getIconByStatus(item).color).icon}
                  </View>
                  <Text className="text-base  font-semibold" key={index}>
                    {item}{" "}
                  </Text>
                </TouchableOpacity>
              )}
              showsVerticalScrollIndicator={false}
            />
          }
        </View>
      </View>
    </BottomSheet>
  );
};
const styles = StyleSheet.create({
  statusCard: {
    shadowColor: "black",
    backgroundColor: "white",
    elevation: 10,
    shadowOffset: { width: 1, height: 1 },
    shadowRadius: 2,
    shadowOpacity: 0.2,
    width: 150,
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
