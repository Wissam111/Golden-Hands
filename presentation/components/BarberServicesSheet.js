import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";

import React, { useMemo, useRef, useState } from "react";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { AntDesign } from "@expo/vector-icons";

import AddServiceView from "./AddServiceView";
import getString from "../../localization";
import useDialogContext from "../../hooks/useDialogContext";

const BarberServicesSheet = (props) => {
  const {
    worker,
    workerServices,
    handleShowServSheet,
    handlePostServ,
    handleDeleteServ,
  } = props;
  const snapPoints = useMemo(() => ["67%"], []);
  const bottomSheetRef = useRef(null);
  const { dispatch: showDialog } = useDialogContext()



  return (
    <BottomSheet
      containerStyle={{
        elevation: 8,
        shadowColor: 'black',
        shadowRadius: 1,
        shadowOpacity: 1,
        shadowOffset: { width: .7, height: .7 },
      }}
      ref={bottomSheetRef}
      index={0}
      snapPoints={snapPoints}
      enablePanDownToClose
      onClose={handleShowServSheet}
    >
      <Text className="p-3 text-center text-xl font-semibold">
        {getString.t('manage_your_services')}
      </Text>
      <BottomSheetScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: 7 }}>
        <View>
          {workerServices.map((serv) => (
            <View
              key={serv._id}
              className="flex-row justify-between m-2 items-center p-3 rounded-md"
              style={styles.shadow}>
              <View className="mr-2">
                <Text style={{ alignSelf: 'flex-start' }} className="font-bold mb-1">{getString.t(serv.title.toLowerCase())}</Text>
                <Text className="font-bold">{getString.t('price') + " " + serv.price + "₪"}</Text>
              </View>
              <TouchableOpacity
                onPress={() =>
                  showDialog({
                    isVisible: true,
                    title: getString.t('service'),
                    message: "Are you sure you want to delete this item?",
                    onDone: () => { handleDeleteServ(serv._id) }
                  })
                }
              >
              <AntDesign name="minuscircle" size={22} color="red" />
            </TouchableOpacity>
            </View>
          ))}
      </View>
      <AddServiceView handlePostServ={handlePostServ} worker={worker} />
    </BottomSheetScrollView>
    </BottomSheet >
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
});

export default BarberServicesSheet;
