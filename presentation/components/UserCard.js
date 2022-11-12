import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import tw from "tailwind-react-native-classnames";
const UserCard = () => {
  return (
    <TouchableOpacity
      className="flex-row items-center ml-2 p-5 w-25 h-20"
      style={{ borderWidth: 2, borderColor: "red" }}
    >
      <View className="bg-orange-500 text-center rounded-full">
        <Text className="text-white w-25 h-25">טארק חוסין</Text>
      </View>
      <Image
        source={require("../../assets/imgs/tarik.jpg")}
        // className="h-20 w-20 rounded-full"
        style={{
          height: 50,
          width: 50,
          borderRadius: "50%",
        }}
      />
    </TouchableOpacity>
  );
};

export default UserCard;
