import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import useLoadingContext from "../../hooks/useLoadingContext";




const Loader = () => {
    const { isLoading } = useLoadingContext()
    return (
        <View pointerEvents="none" style={{ position: 'absolute', width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', zIndex: 10 }}>
            {
                isLoading &&
                <ActivityIndicator style={{ zIndex: 20 }} size="large" />
            }
        </View>
    )
}

export default Loader;


