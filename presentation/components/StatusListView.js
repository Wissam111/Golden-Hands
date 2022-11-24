import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import SelectDropdown from "react-native-select-dropdown";
import { FontAwesome } from "@expo/vector-icons";
const StatusListView = (props) => {
  const { handleUpdateStatus } = props;
  const [selectedStatus, setSelectStatus] = useState(null);
  const statusList = [
    { status: "done", color: "red" },
    { status: "in-progress", color: "red" },
    { status: "didnt-come", color: "red" },
    { status: "canceled", color: "red" },
    { status: "free", color: "red" },
    { status: "hold", color: "red" },
  ];
  const services = ["Hair Cut", "Face Cut", "Wax", "Massage"];
  return (
    <View
      className="absolute  bg-[#f1f3f2] rounded-xl shadow-xl items-center p-8"
      style={{
        zIndex: 99999,
        top: 200,
        left: 65,
        width: "65%",
        height: "55%",
      }}
    >
      {
        <FlatList
          data={statusList}
          horizontal={false}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              className="m-1 shadow-inner p-3 items-center rounded-md"
              onPress={
                item.status == "hold" || item.status == "in-progress"
                  ? () => setSelectStatus(item.status)
                  : () => handleUpdateStatus(item.status)
              }
              style={{
                borderWidth: 1,
                borderColor: "gray",
                shadowOffset: { width: 0, height: 3 },
                shadowColor: "#171717",
                shadowOpacity: 0.1,
                shadowRadius: 2,
              }}
            >
              <Text className="text-md font-semibold" key={index}>
                {item.status}{" "}
              </Text>
            </TouchableOpacity>
          )}
          showsHorizontalScrollIndicator={false}
        />
      }
      {selectedStatus && (
        <View className="rounded-full " style={styles.shadow}>
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
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  shadow: {
    shadowColor: "black",
    backgroundColor: "white",
    elevation: 10,
    shadowOffset: { width: 1, height: 1 },
    shadowRadius: 3,
    shadowOpacity: 0.5,
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

export default StatusListView;
