import { StyleSheet, Text, View, Image } from "react-native";
import { globalStyles } from "../styles/global";

const HorizontalChip = ({ style }) => {
  return (
    <View style={{ ...style, ...styles.container }}>
      <Image
        style={styles.image}
        source={require("../../assets/imgs/tarik.jpg")}
      />
      <View style={styles.chip}>
        <Text style={globalStyles.font}>Tarik Husin</Text>
      </View>
    </View>
  );
};

export default HorizontalChip;

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
    paddingHorizontal: 20,
    borderRadius: 100,
    position: "relative",
    start: -26,
    paddingStart: 40,
    elevation: 3,
  },
});
