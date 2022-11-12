import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { globalStyles } from "../styles/global";

const HorizontalChipS = (props) => {
  const { style, worker, handleSelectWorker } = props;
  return (
    <TouchableOpacity
      style={{ ...style, ...styles.container }}
      onPress={() => handleSelectWorker(worker)}
    >
      <View style={styles.chip}>
        <Text style={globalStyles.font}>
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
    backgroundColor: "#f5f5f5",
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 100,
    position: "relative",
    start: 11,
    paddingStart: 40,
    elevation: 3,
    // marginLeft: 4,
  },
});
