import { useEffect } from "react";
import { Image, View, Text } from "react-native";
import Spacer from "../components/Spacer";
import { globalStyles, primaryColor, white } from "../styles/global";
import Animated, { FadeIn, FadeInRight } from 'react-native-reanimated';


const AnimatedSComponent = Animated.createAnimatedComponent(View);


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
        <View style={{ flex: 1, backgroundColor: primaryColor, justifyContent: 'center', alignItems: 'center' }}>

            <AnimatedSComponent entering={FadeInRight}>
                <Image source={require('../../assets/imgs/barber-logo.png')} />
                <Spacer space={4} />
                <Text style={{ ...globalStyles.font, color: white }}>let's get a hair cut</Text>
            </AnimatedSComponent>

        </View>
    );
}

export default Splash;