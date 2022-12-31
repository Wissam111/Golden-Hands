import React, { useMemo, useRef } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import BottomSheet, { BottomSheetView, useBottomSheetDynamicSnapPoints } from "@gorhom/bottom-sheet";
import { backgroundColor, fontLarge, fontMeduim, globalStyles, gray1, lightBlack, red } from "../styles/global";
import DefaultButton from "./DefaultButton";
import Spacer from "./Spacer";
import { useEffect } from "react";
import getString from "../../localization";
import moment from "moment";


const CancelAppointmentBottomSheet = ({ isVisible, onClose, onCancel, appointment }) => {
    const bottomSheetRef = useRef(null);

    const initialSnapPoints = useMemo(() => ['CONTENT_HEIGHT'], []);


    useEffect(() => {
        if (isVisible) {
            bottomSheetRef.current.expand()
        }
        else {
            bottomSheetRef.current.close()
        }
    }, [isVisible])

    const {
        animatedHandleHeight,
        animatedSnapPoints,
        animatedContentHeight,
        handleContentLayout,
    } = useBottomSheetDynamicSnapPoints(initialSnapPoints);



    return (

        <BottomSheet
            onClose={onClose}
            index={-1}
            enablePanDownToClose
            style={{
                borderRadius: 16,
                shadowColor: '#000000',
                shadowOffset: {
                    width: .5,
                    height: .5,
                },
                shadowOpacity: 0.3,
                shadowRadius: 1.5,
                elevation: 4,
            }}

            containerStyle={{
                marginHorizontal: 24,
            }}
            contentContainerStyle={{
                padding: 8,
                flex: 1,
                alignItems: "center",
            }}
            ref={bottomSheetRef}
            snapPoints={animatedSnapPoints}
            handleHeight={animatedHandleHeight}
            contentHeight={animatedContentHeight}
            bottomInset={46}
            detached={true}>

            <BottomSheetView
                onLayout={handleContentLayout}
                style={styles.contentContainer}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image style={{ width: 30, height: 30 }} source={require('../../assets/imgs/cancelled.png')} />
                    <Spacer space={8} />
                    <Text style={{ ...globalStyles.font, fontSize: fontMeduim, fontFamily: 'poppins-bold' }}>{getString.t('cancel_appointment')}</Text>
                </View>
                <Spacer space={8} />

                {appointment &&
                    <>
                        <Text style={{ color: lightBlack }} className="font-medium text-base">
                            {moment(appointment.start_time).calendar(null, {
                                sameDay: `[${getString.t('today')}]`,
                                nextDay: `[${getString.t('tomorrow')}]`,
                                nextWeek: 'dddd',
                                lastDay: 'dddd',
                                lastWeek: 'dddd',
                                sameElse: 'dddd'
                            }) + " "}
                            {moment(appointment.start_time).format(`DD-MM-yyyy [${getString.t('at')}] HH:mm`)}
                        </Text>

                        <Spacer space={2} />
                        <Text style={{ ...globalStyles.font, fontSize: fontMeduim, color: lightBlack, fontFamily: 'poppins-bold' }}>{getString.t('with')} {`${appointment.worker.firstName} ${appointment.worker.lastName}`} {getString.t('for')} {getString.t(appointment.service.title.toLowerCase())}</Text>
                        <Spacer space={24}/>
                    </>
                }

                <Text style={{ color: gray1 }}>{getString.t('cancel_appointment_info')}</Text>
                <Spacer space={16} />
                <DefaultButton onPress={onCancel} style={{ alignSelf: 'stretch' }} color={red} text={getString.t('cancel')} />
                <Spacer space={16} />
            </BottomSheetView>
        </BottomSheet>
    );
}

export default CancelAppointmentBottomSheet;


const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
        alignItems: "center",
        padding: 8
    },
});
