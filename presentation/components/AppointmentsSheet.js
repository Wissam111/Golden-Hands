import { View, Text, TouchableOpacity } from "react-native";
import React, { useMemo, useRef, useCallback, useState } from "react";
import BottomSheet from "@gorhom/bottom-sheet";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AppointmentView from "./AppointmentView";
import { FlatList } from "react-native-gesture-handler";
const AppointmentsSheet = (props) => {
  const { appointments, handleShowStatusList, handleShowAppoint } = props;
  const snapPoints = useMemo(() => ["50%", "100%"], []);
  const [index, setIndex] = useState(0);
  const bottomSheetRef = useRef(null);
  var handleSheetChanges = useCallback(function (index) {
    setIndex(index);
  }, []);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={0}
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
            onPress={handleShowAppoint}
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
  );
};

export default AppointmentsSheet;
