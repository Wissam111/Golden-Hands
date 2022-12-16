import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import useLoadingContext from "../../hooks/useLoadingContext";
import { orange1, orange2 } from "../styles/global";

const Loader = () => {
  const { isLoading } = useLoadingContext();
  return (
    <View
      pointerEvents="none"
      style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 10,
      }}
    >
      {
        <ActivityIndicator
          animating={isLoading}
          style={{
            zIndex: 20,
            elevation: .3,
            shadowColor: 'black',
            shadowRadius: 1,
            shadowOpacity: .6,
            shadowOffset: { width: 1, height: 1 },
          }}
          size="large"
          color={orange2}
        />
      }
    </View>
  );
};

export default Loader;
