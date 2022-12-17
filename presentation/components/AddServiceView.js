import {
  View,
  Text,
  FlatList,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useRef, useState } from "react";
import DefaultButton from "./DefaultButton";
import SelectDropdown from "react-native-select-dropdown";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import getString from "../../localization";
import Spacer from "./Spacer";
const AddServiceView = (props) => {
  const { worker, handlePostServ } = props;
  const priceInputRef = useRef(null);
  const services = ["Hair Cut", "Face Cut", "Wax", "Massage"];
  const [selectedServ, setSelectedServ] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");
  const [showAddServ, setShowAddServ] = useState(false);
  return (
    <View className="p-3 m-2 rounded-md" style={styles.shadow}>
      <View className="flex-row justify-between items-center">
        {!showAddServ && (
          <Text className="font-bold text-lg">{getString.t('add_service')}</Text>
        )}
        <Spacer style={{ flex: 1 }} />
        <TouchableOpacity
          onPress={() => setShowAddServ(!showAddServ)}
        >
          <AntDesign name="pluscircle" size={24} color="green" />
        </TouchableOpacity>
      </View>
      {showAddServ && (
        <View>
          <Spacer space={6} />
          <View className="flex-row justify-between items-center">
            <SelectDropdown
              data={services}
              onSelect={(selectedItem, index) => {
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
              text={getString.t('add')}
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
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  shadow: {
    shadowColor: "black",
    backgroundColor: "white",
    elevation: 2,
    shadowOffset: { width: .5, height: .5 },
    shadowRadius: 1.5,
    shadowOpacity: 0.3,
  },
  dropdown1BtnStyle: {
    backgroundColor: "#FFF",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#444",
  },
  dropdown1BtnTxtStyle: { color: "#444", textAlign: "left" },
  dropdown1DropdownStyle: { backgroundColor: "#EFEFEF", borderRadius: 16 },
  dropdown1RowStyle: {
    backgroundColor: "#EFEFEF",
    borderBottomColor: "#C5C5C5",
  },
  dropdown1RowTxtStyle: { color: "#444", textAlign: "left" },
});
export default AddServiceView;
