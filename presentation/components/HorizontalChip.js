import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  Platform,
} from "react-native";
import { IMAGE_BASE_URL } from "../../network/apiCall";
import { fontMeduim, globalStyles } from "../styles/global";

const HorizontalChip = ({
  style,
  text,
  imageUrl,
  onPress,
  user,
  isSelected,
}) => {
  const [progressBar, setProgressBar] = useState(true);
  return (
    <TouchableOpacity
      disabled={onPress == null}
      style={{ ...styles.container, justifyContent: "flex-start", ...style }}
      onPress={onPress ? () => onPress(user) : () => { }}
    >
      <View
        style={{ zIndex: 2, justifyContent: "center", alignItems: "center" }}
      >
        <Image
          style={styles.image}
          source={{ uri: imageUrl ? IMAGE_BASE_URL + imageUrl : null }}
          defaultSource={require('../../assets/imgs/person_place_holder.jpg')}
          onLoadEnd={() => {
            setProgressBar(false);
          }}
        />
        <View style={{ position: 'absolute', zIndex: 3, width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator animating={progressBar && imageUrl != null} color='#000' size='small' />
        </View>
      </View>

      <View
        style={styles.chip}
        className={isSelected ? `bg-[#FF9B02]` : "bg-[#f5f5f5]"}
      >
        <Text
          style={{...globalStyles.font , fontSize: fontMeduim}}
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
    paddingVertical: Platform.OS === 'android' ? 4 : 8,
    paddingHorizontal: 20,
    borderRadius: 100,
    position: "relative",
    start: -26,
    paddingStart: 40,
    elevation: .3,
    shadowColor: 'black',
    shadowRadius: 1,
    shadowOpacity: .2,
    shadowOffset: { width: .7, height: .7 },
  },
});
