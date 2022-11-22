import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React from "react";

const StatusListView = (props) => {
  const { handleUpdateStatus } = props;
  const statusList = [
    { status: "done", color: "red" },
    { status: "in-progress", color: "red" },
    { status: "didnt-come", color: "red" },
    { status: "canceled", color: "red" },
    { status: "free", color: "red" },
    { status: "hold", color: "red" },
  ];
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
              onPress={() => handleUpdateStatus(item.status)}
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
    </View>
  );
};

export default StatusListView;
