import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { globalStyles } from "../styles/global";

const HorizontalChipS = (props) => {
  const { style, worker, handleSelectWorker, isSelected } = props;
  return (
    <TouchableOpacity
      style={{ ...style, ...styles.container }}
      onPress={() => handleSelectWorker(worker)}
    >
      <View
        style={styles.chip}
        className={isSelected ? `bg-orange-400` : "bg-[#f5f5f5]"}
      >
        <Text
          style={globalStyles.font}
          className={`pr-5 pt-1 pb-1 ${
            isSelected ? "text-white" : "text-black"
          }`}
        >
          {worker.firstName + " " + worker.lastName}{" "}
        </Text>
      </View>
      <Image
        style={styles.image}
        source={{
          uri:
            worker?.image != null
              ? `https://saloon-ibra-api.herokuapp.com/imgs/${worker?.image}`
              : require("../../assets/imgs/tarik.jpg"),
        }}
      />
    </TouchableOpacity>
  );
};

export default HorizontalChipS;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    borderRadius: 100,
    width: 60,
    height: 60,
    borderWidth: 1,
    borderColor: "#f9f9f9",
    zIndex: 1,
  },
  chip: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 100,
    position: "relative",
    start: 25,
    paddingStart: 40,
    elevation: 3,
  },
});
