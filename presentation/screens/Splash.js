import { useEffect } from "react";
import { Image, View, Text } from "react-native";
import Spacer from "../components/Spacer";
import { backgroundColor, globalStyles, orange1, orange2, primaryColor, white } from "../styles/global";
import Animated, { FadeIn, FadeInRight } from 'react-native-reanimated';
import getString from "../../localization";


const AnimatedComponent = Animated.createAnimatedComponent(View);


const Splash = ({ navigation }) => {
    useEffect(() => {
        setTimeout(() => {
            navigation.reset({
                index: 0,
                routes: [{ name: 'DrawerNavigation' }],
            });
        }, 1000)
    })

    return (
        <View style={{ flex: 1,flexDirection:'row' ,backgroundColor: primaryColor, justifyContent: 'center', alignItems: 'center' }}>
            <View style ={{position:'absolute',backgroundColor: orange2 , height:30 , width: '100%'}}/>
            <AnimatedComponent style = {{backgroundColor: orange1 , borderRadius: 100 , padding: 20}} entering={FadeInRight}>
                <Image source={require('../../assets/imgs/barber-logo.png')} />
                <Spacer space={6} />
                <Text style={{ ...globalStyles.font, textAlign: 'center', fontFamily: 'poppins-bold', color: white }}>Golden Hands</Text>
            </AnimatedComponent>
            

        </View>
    );
}

export default Splash;