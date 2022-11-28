import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, { useState, useMemo, useRef, useCallback } from "react";
import SelectDropdown from "react-native-select-dropdown";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import BottomSheet from "@gorhom/bottom-sheet";
import { ScrollView } from "react-native-gesture-handler";
import { getIconByStatus } from "./AppointmentView";
const StatusSheet = (props) => {
  const { handleUpdateStatus, handleShowStatusSheet } = props;
  const [selectedStatus, setSelectStatus] = useState(null);
  const snapPoints = useMemo(() => ["25%", "50%"], []);
  const [index, setIndex] = useState(0);
  const bottomSheetRef = useRef(null);
  var handleSheetChanges = useCallback(function (index) {
    setIndex(index);
  }, []);

  const statusList = [
    "done",
    "in-progress",
    "didnt-come",
    "canceled",
    "free",
    "hold",
  ];
  const services = ["Hair Cut", "Face Cut", "Wax", "Massage"];
  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={1}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
      enablePanDownToClose
      onClose={() => handleShowStatusSheet(null, false)}
    >
      <TouchableOpacity className="absolute left-3 top-4">
        <FontAwesome5 name="trash-alt" size={24} color="black" />
      </TouchableOpacity>
      <View
        className="mt-12 flex-row flex-1 justify-between p-1"
        // style={{ borderWidth: 2, borderColor: "red" }}
      >
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
                    item == "hold" || item == "in-progress"
                      ? () => setSelectStatus(item)
                      : () => handleUpdateStatus(item)
                  }
                  style={styles.statusCard}
                >
                  <View>{getIconByStatus(item).icon}</View>
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
