import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";
import React, { useMemo, useRef, useCallback, useState } from "react";
import BottomSheet from "@gorhom/bottom-sheet";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AppointmentView from "./AppointmentView";
import AddAppointmentView from "./AddAppointmentView";
const AppointmentsSheet = (props) => {
  const { appointments, handleShowStatusList, h } = props;
  const snapPoints = useMemo(() => ["20%", "48%", "80%", "100%"], []);
  const [index, setIndex] = useState(0);
  const bottomSheetRef = useRef(null);
  var handleSheetChanges = useCallback(function (index) {
    setIndex(index);
  }, []);
  return (
    <View
      className="flex-1 p-24 absolute"
      style={{
        // zIndex: index == 0 || index == 1 ? -1 : 99999,
        bottom: 0,
        width: "100%",
        height: "48%",
        borderWidth: 2,
        borderColor: "red",
      }}
    >
      <BottomSheet
        ref={bottomSheetRef}
        index={1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
      >
        <View className="items-center">
          <View
            className="flex-row items-center justify-center p-2"
            style={{ width: "100%" }}
          >
            <Text className="font-bold text-lg">Appointments</Text>
            <TouchableOpacity
              className="absolute left-0 pl-1"
              onPress={() => setShowAddAppoint}
            >
              <MaterialCommunityIcons
                name="view-grid-plus-outline"
                size={30}
                color="black"
              />
            </TouchableOpacity>
          </View>
        </View>
        {appointments.length ? (
          <FlatList
            data={appointments}
            keyExtractor={(item) => item._id}
            horizontal={false}
            renderItem={({ item }) => (
              <AppointmentView
                appointment={item}
                handleShowStatusList={handleShowStatusList}
              />
            )}
            showsHorizontalScrollIndicator={false}
          />
        ) : (
          <Text className="text-xl text-center text-red-600 mt-10">
            No Appointments on this day
          </Text>
        )}
      </BottomSheet>
    </View>
  );
};

export default AppointmentsSheet;
