import { View, Text, Image, FlatList } from "react-native";
import React from "react";
import AppointmentView from "./AppointmentView";
import DashedLine from "react-native-dashed-line";
import AppointmentCard from "./AppointmentCard";
import Spacer from "./Spacer";
import getString from "../../localization";
import { fontSmall, globalStyles, green } from "../styles/global";
import Rating from "./Rating";
import { BottomSheetFlatList } from "@gorhom/bottom-sheet";



const AppointmentsInterval = (props) => {
  const { interval, handleShowStatusSheet, closestAppointment } = props;

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
        renderItem={({ item }) => (
          <View style={{ alignItems: 'flex-start', }}>
            {closestAppointment?._id === item._id &&
              <View style={{ width: '100%' }}>
                <Text style={{ ...globalStyles.font, fontSize: fontSmall , fontFamily: 'poppins-bold'}}>{getString.t('current')}</Text>
                <Spacer space={2} />
                <View style={{ width: '100%', height: 2, backgroundColor: green, opacity: 0.3, borderRadius: 20 }} />
                <Spacer space={4} />
              </View>
            }

            <AppointmentCard
              onPress={() => { handleShowStatusSheet(item, true) }}
              appointment={item}
              text={getAppointmentCardName(item)}
              image={item.customer?.image} />

            <View style={{ alignSelf: 'flex-start' }}>
              {item.status === 'done' && item.rating &&
                <Rating rating={item.rating} showRatingMsg={item.rating == null} from={5} />
              }
            </View>
          </View>
        )}
        keyExtractor={(item) => item._id}
      />

    </View>
  );
};

export default AppointmentsInterval;
