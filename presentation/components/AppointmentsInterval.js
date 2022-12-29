import { View, Text, Image, FlatList } from "react-native";
import React from "react";
import AppointmentCard from "./AppointmentCard";
import Spacer from "./Spacer";
import getString from "../../localization";
import { fontSmall, globalStyles, green } from "../styles/global";
import Rating from "./Rating";


const IntervalAppointmentCard = ({ item, selectionMode, isSelected, index, handleSelectedAppointment, handleShowStatusSheet, cancelSelection, closestAppointment }) => {
  const getAppointmentCardName = (appointment) => {
    if (appointment.customer) {
      return `${appointment.customer.firstName} ${appointment.customer.lastName}`
    }

    if (appointment.status === 'hold') {
      return getString.t('hold_by_worker')
    }
    return getString.t('free_appointment')
  }

  return (
    <View style={{ alignItems: 'flex-start' }}>
      {closestAppointment?._id === item._id &&
        <View style={{ width: '100%' }}>
          <Text style={{ ...globalStyles.font, color: '#000', fontSize: fontSmall, ...globalStyles.txtDirection, fontFamily: 'poppins-bold' }}>{getString.t('current')}</Text>
          <Spacer space={2} />
          <View style={{ width: '100%', height: 2, backgroundColor: green, opacity: 0.3, borderRadius: 20 }} />
          <Spacer space={4} />
        </View>
      }

      <AppointmentCard
        index={index}
        isSelected={isSelected(item)}
        onLongPress={!selectionMode ? () => { handleSelectedAppointment(item) } : () => { }}
        onPress={!selectionMode ? () => { handleShowStatusSheet(item, true) } : () => {
          isSelected(item) ? cancelSelection(item) : handleSelectedAppointment(item)
        }}
        appointment={item}
        text={getAppointmentCardName(item)}
        image={item.customer?.image} />

      <View style={{ alignSelf: 'flex-start' }}>
        {item.status === 'done' && item.rating &&
          <Rating rating={item.rating} showRatingMsg={item.rating == null} from={5} />
        }
      </View>
    </View>)
}



const AppointmentsInterval = (props) => {
  const { interval, cancelSelection, selectionMode, isSelected, handleShowStatusSheet, closestAppointment, handleSelectedAppointment } = props;

  return (
    <View style={{ flexDirection: 'row', padding: 8 }}>

      <View style={{ alignItems: 'center' }}>
        <Text style={{ fontSize: fontSmall }} className="text-gray-500"> {interval.start}</Text>
        <View
          style={{
            overflow: 'hidden',
            borderWidth: 1,
            borderStartWidth: 1,
            borderEndWidth: 1,
            borderColor: "#cecece",
            height: "100%",
            borderStyle: "dashed",
            flex: 1,
            width: 6,
          }} />

        <Image
          source={require("../.././assets/imgs/scissors.png")}
          style={{
            width: 20,
            height: 20,
            top: "30%",
            position: 'absolute',
          }}
        />

        <Text style={{ fontSize: fontSmall }} className="text-gray-500">{interval.end}</Text>
      </View>

      <Spacer space={4} />

      <FlatList
        data={interval.appointments}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={<Spacer space={6} />}
        style={{ flex: 1 }}
        renderItem={({ item, index }) => (
          <IntervalAppointmentCard
            selectionMode={selectionMode}
            index={index}
            item={item}
            isSelected={isSelected}
            handleSelectedAppointment={handleSelectedAppointment}
            handleShowStatusSheet={handleShowStatusSheet}
            cancelSelection={cancelSelection}
            closestAppointment={closestAppointment}
          />
        )}
        keyExtractor={(item) => item._id}
      />

    </View>
  );
};

export default AppointmentsInterval;
