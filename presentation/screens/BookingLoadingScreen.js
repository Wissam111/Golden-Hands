import { View, Text, SafeAreaView, Alert } from "react-native";
import React, { useEffect } from "react";
import * as Animatable from "react-native-animatable";
import * as Progress from "react-native-progress";
import { useNavigation, useRoute } from "@react-navigation/native";

const BookingLoadingScreen = () => {
  const navigation = useNavigation();
  const {
    params: { message },
  } = useRoute();
  useEffect(() => {
    setTimeout(() => {
      showAlert();
    }, 3500);
  }, []);

  const showAlert = () => {
    Alert.alert("", message, [
      { text: "OK", onPress: () => navigation.navigate("HomeScreen") },
    ]);
  };
  return (
    <SafeAreaView className="bg-[#00CCBB] flex-1 justify-center items-center">
      <Animatable.Image
        source={require("../../assets/imgs/orderLoading.gif")}
        animation="slideInUp"
        iterationCount={1}
        className="h-96 w-96"
      />

      <Animatable.Text
        animations="slideInUp"
        iterationCount={1}
        className="text-lg my-10 text-white font-bold text-center"
      >
        Confirming ...
      </Animatable.Text>

      <Progress.Circle size={60} indeterminate={true} color="white" />
    </SafeAreaView>
  );
};

export default BookingLoadingScreen;
