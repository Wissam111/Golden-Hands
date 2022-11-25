import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { IMAGE_BASE_URL } from "../../network/apiCall";
import { globalStyles } from "../styles/global";

const HorizontalChip = ({
  style,
  text,
  imageUrl,
  onPress,
  user,
  isSelected,
}) => {
  const [showDefualtImage, setDefaultImage] = useState(false);
  const [progressBar, setProgressBar] = useState(true);
  return (
    <TouchableOpacity
      style={{ ...styles.container, justifyContent: "flex-start", ...style }}
      onPress={onPress ? () => onPress(user) : () => {}}
    >
      <View
        style={{ zIndex: 2, justifyContent: "center", alignItems: "center" }}
      >
        <Image
          style={styles.image}
          source={
            showDefualtImage
              ? require("../../assets/imgs/person_place_holder.jpg")
              : { uri: IMAGE_BASE_URL + imageUrl }
          }
          onLoadEnd={() => {
            setProgressBar(false);
          }}
          onError={(e) => {
            setDefaultImage(true);
          }}
        />
        <View style={{ position: 'absolute', zIndex: 3,  width:'100%' , height:'100%' , justifyContent:'center' , alignItems:'center' }}>
          {progressBar && <ActivityIndicator />}
        </View>
      </View>

      <View
        style={styles.chip}
        className={isSelected ? `bg-[#FF9B02]` : "bg-[#f5f5f5]"}
      >
        <Text
          style={globalStyles.font}
          className={`${isSelected ? "text-white" : "text-black"}`}
        >
          {text}
        </Text>
      </View>
    </TouchableOpacity>
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
    borderWidth: 2,
    borderColor: "#f9f9f9",
    zIndex: 2,
  },
  chip: {
    // backgroundColor: isSelected ? "#FF9B02" : "#f5f5f5",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 100,
    position: "relative",
    start: -26,
    paddingStart: 40,
    elevation: 3,
  },
});
