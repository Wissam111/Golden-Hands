import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";
import React, { useRef, useState } from "react";
import DefaultButton from "./DefaultButton";
import SelectDropdown from "react-native-select-dropdown";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import getString from "../../localization";
import Spacer from "./Spacer";
import { backgroundColor, fontMeduim, fontSmall, globalStyles, lightBlack, white } from "../styles/global";
import TextInputIcon from "./TextInputIcon";
import { MaterialIcons } from '@expo/vector-icons';



const AddServiceView = (props) => {
  const { worker, handlePostServ } = props;
  const priceInputRef = useRef(null);
  const services = ['Hair Cut', 'Face Cut', 'Wax', 'Massage'];
  const [selectedServ, setSelectedServ] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");
  const [showAddServ, setShowAddServ] = useState(false);


  return (
    <View className="p-3 m-2 rounded-md" style={styles.shadow}>
      <View className="flex-row justify-between items-center">
        <Text className="font-bold text-lg">{getString.t('add_service')}</Text>
        <Spacer style={{ flex: 1 }} />
        <TouchableOpacity
          onPress={() => setShowAddServ(!showAddServ)}>
          <AntDesign name="pluscircle" size={24} color="green" />
        </TouchableOpacity>
      </View>


      {showAddServ && (
        <View style={{}}>
          <Spacer space={16} />
          <View style={{ justifyContent: 'center', alignItems: 'space-around', flexDirection: 'row' }}>

            <View>
              <SelectDropdown
                data={services.map(item => getString.t(item.toLowerCase()))}
                onSelect={(selectedItem, index) => {
                  setSelectedServ(index);
                }}
                defaultButtonText={getString.t('select_service')}
                buttonTextAfterSelection={(selectedItem, index) => {
                  return selectedItem;
                }}
                rowTextForSelection={(item, index) => {
                  return item;
                }}
                renderDropdownIcon={(isOpened) => {
                  return (
                    <FontAwesome
                      name={isOpened ? "chevron-up" : "chevron-down"}
                      color={lightBlack}
                      size={12}
                    />
                  );
                }}
                buttonStyle={styles.dropdown1BtnStyle}
                buttonTextStyle={styles.dropdown1BtnTxtStyle}
                dropdownStyle={styles.dropdown1DropdownStyle}
                rowStyle={styles.dropdown1RowStyle}
                rowTextStyle={styles.dropdown1RowTxtStyle}
                dropdownIconPosition={"right"}
              />
            </View>

            <Spacer space={6} />

            <TextInputIcon
              style={{ flex: 1, padding: 2, alignSelf: 'st' }}
              iconStart={<MaterialIcons name="attach-money" size={18} color="black" />}
              onChangeText={(str) => { setSelectedPrice(str) }}
              value={selectedPrice}
              placeholder={getString.t('price')}
              keyboardType="numeric"
              maxLength={4}
            />

          </View>


          <View className="mt-5">
            <DefaultButton
              text={getString.t('add')}
              buttonStyles={{ paddingVertical: Platform.OS === 'android' ? 12 : 14 }}
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
    flex: 1,
    backgroundColor: white,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#333",
  },
  dropdown1BtnTxtStyle: {
    textAlign: "left",
    ...globalStyles.font,
    fontSize: fontMeduim,
  },
  dropdown1DropdownStyle: { backgroundColor: backgroundColor , borderRadius: 8},
  dropdown1RowStyle: {
    backgroundColor: backgroundColor,
    borderBottomColor: "#C5C5C5",
  },
  dropdown1RowTxtStyle: { color: lightBlack, textAlign: "left" },
});
export default AddServiceView;
