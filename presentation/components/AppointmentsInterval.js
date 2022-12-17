import { View, Text, Image } from "react-native";
import React from "react";
import AppointmentView from "./AppointmentView";
import DashedLine from "react-native-dashed-line";
import AppointmentCard from "./AppointmentCard";
import Spacer from "./Spacer";
import getString from "../../localization";
import { fontSmall } from "../styles/global";
import Rating from "./Rating";
const AppointmentsInterval = (props) => {
  const { interval, handleShowStatusSheet } = props;
  return (
    <View style={{ flexDirection: 'row' }} className="p-2 mb-4 relative flex-1">

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


      <View>
        {interval.appointments.map((appoint) => (
          <View key={appoint._id}>
            <AppointmentCard
              onPress={() => { handleShowStatusSheet(appoint._id, true) }}
              appointment={appoint}
              text={appoint.customer ? `${appoint.customer.firstName} ${appoint.customer.lastName}` : getString.t('free_appointment')}
              image={appoint.customer?.image} />

            <View style={{ alignSelf: 'flex-start' }}>
              {appoint.status === 'done' && appoint.rating &&
                <Rating rating={appoint.rating} showRatingMsg={appoint.rating == null} from={5} />
              }
            </View>

            <Spacer space={6} />
          </View>
        ))}
      </View>

    </View>
  );
};

export default AppointmentsInterval;
