import { View, Text, FlatList, TextInput, StyleSheet } from "react-native";
import React, { useRef, useState } from "react";
import DefaultButton from "./DefaultButton";
import SelectDropdown from "react-native-select-dropdown";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
const AddServiceView = (props) => {
  const { worker, handlePostServ } = props;
  const priceInputRef = useRef(null);
  const services = ["Hair Cut", "Face Cut", "Wax", "Massage"];
  const [selectedServ, setSelectedServ] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");
  return (
    <View className="p-2 m-3 " style={styles.shadow}>
      <View className="mr-2 mb-5 mt-2">
        <AntDesign name="pluscircle" size={30} color="green" />
      </View>

      <View className="flex-row justify-between items-center">
        <SelectDropdown
          data={services}
          onSelect={(selectedItem, index) => {
            // console.log(selectedItem, index);
            setSelectedServ(index);
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
        <TextInput
          className="mr-2 rounded-md bg-[#F4EBD0] text-xl text-center text-[#1D1B1B] font-medium"
          style={{
            width: 70,
            height: 60,
          }}
          ref={priceInputRef}
          onChangeText={(txtPrc) => setSelectedPrice(txtPrc)}
          keyboardType="numeric"
          maxLength={10} //setting limit of input
        />
      </View>
      <View className="mt-5">
        <DefaultButton
          text={"Add"}
          onPress={() =>
            handlePostServ({
              workerId: worker._id,
              title: services[selectedServ],
              price: selectedPrice,
            })
          }
        />
      </View>
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
export default AddServiceView;
