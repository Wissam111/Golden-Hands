import { View, Text, Image, Platform } from "react-native";
import React, { useRef, useMemo } from "react";
import moment from "moment";
import BottomSheet, { BottomSheetView, useBottomSheetDynamicSnapPoints } from "@gorhom/bottom-sheet";
import DefaultButton from "./DefaultButton";
import getString from "../../localization";
import Spacer from "./Spacer";
import { fontMeduim, globalStyles, gray1, green, lightBlack, orange2 } from "../styles/global";
const AppointmentConfirmationSheet = (props) => {
  const { appointment, selectedService, handleCloseConfirmation, handleBook } = props;
  const snapPoints = useMemo(() => ['CONTENT_HEIGHT'], []);
  const bottomSheetRef = useRef(null);


  const {
    animatedHandleHeight,
    animatedSnapPoints,
    animatedContentHeight,
    handleContentLayout,
  } = useBottomSheetDynamicSnapPoints(snapPoints);

  const getServiceImage = () => {
    if (!selectedService) return
    switch (selectedService.title) {
      case 'Massage': return require('../../assets/imgs/massage.png')
      case 'Hair Cut': return require('../../assets/imgs/hair-cutting.png')
      case 'Face Cut': return require('../../assets/imgs/beard.png')
      case 'Wax': return require('../../assets/imgs/wax.png')
    }
  }

  return (
    <BottomSheet
      containerStyle={{
        elevation: 8,
        shadowColor: 'black',
        shadowRadius: 1,
        shadowOpacity: 1,
        shadowOffset: { width: .7, height: .7 },
      }}
      ref={bottomSheetRef}
      index={0}
      snapPoints={animatedSnapPoints}
      handleHeight={animatedHandleHeight}
      contentHeight={animatedContentHeight}
      onClose={handleCloseConfirmation}
      enablePanDownToClose
    >
      <BottomSheetView
        style={{ justifyContent: 'center', alignItems: 'center', padding: 16 }}
        onLayout={handleContentLayout}>

        <Text style={{ color: '#000' }} className="text-xl font-bold">{getString.t('appointment_info')}</Text>

        <Spacer space={20} />

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

        <Spacer space={8} />
        <Text style={{ ...globalStyles.font, fontSize: fontMeduim, color: lightBlack, fontFamily: 'poppins-bold' }}>{getString.t('with')} {`${appointment.worker.firstName} ${appointment.worker.lastName}`} {getString.t('for')} {getString.t(selectedService.title.toLowerCase())}</Text>


        <Spacer space={16} />
        <Image style={{ width: 46, height: 46, }} source={getServiceImage()} />

        <Spacer space={16} />
        <DefaultButton style={{ alignSelf: 'stretch' }} buttonStyles={{ paddingVertical: Platform.OS === 'android' ? 12 : 14 }} text={getString.t('confirm_and_book')} onPress={handleBook} />
        <Spacer space={30} />
      </BottomSheetView>
    </BottomSheet>
  );
};

export default AppointmentConfirmationSheet;
