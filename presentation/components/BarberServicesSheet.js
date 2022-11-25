import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  // ScrollView,
} from "react-native";

import React, { useMemo, useRef, useState } from "react";
import BottomSheet from "@gorhom/bottom-sheet";
import { AntDesign } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";

import AddServiceView from "./AddServiceView";

const BarberServicesSheet = (props) => {
  const {
    worker,
    workerServices,
    handleShowServSheet,
    handlePostServ,
    handleDeleteServ,
  } = props;
  const snapPoints = useMemo(() => ["30%", "67%"], []);
  const bottomSheetRef = useRef(null);

  const confirmAlert = (message, servId) => {
    Alert.alert("", message, [
      { text: "confirm", onPress: () => handleDeleteServ(servId) },
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
      onClose={handleShowServSheet}
    >
      <Text className="p-3 text-center text-xl font-semibold">
        Manage your services
      </Text>
      <ScrollView contentContainerStyle={{ padding: 7 }}>
        <View>
          {workerServices.map((serv) => (
            <View
              key={serv._id}
              className="flex-row justify-between m-2 items-center   p-3 rounded-md"
              style={styles.shadow}
            >
              <TouchableOpacity
                onPress={() =>
                  confirmAlert(
                    "Are you sure you want to delete this item?",
                    serv._id
                  )
                }
              >
                <AntDesign name="minuscircle" size={22} color="red" />
              </TouchableOpacity>
              <View className="mr-2">
                <Text className="font-bold mb-1">{serv.title}</Text>
                <Text className="font-bold">{"Price ש" + serv.price}</Text>
              </View>
            </View>
          ))}
        </View>
        <AddServiceView handlePostServ={handlePostServ} worker={worker} />
      </ScrollView>
    </BottomSheet>
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
});

export default BarberServicesSheet;