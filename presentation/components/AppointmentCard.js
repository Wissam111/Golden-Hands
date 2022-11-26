import moment from 'moment'
import { View, Image, Text } from 'react-native'
import { IMAGE_BASE_URL } from '../../network/apiCall'
import { fontSmall, globalStyles, semiLarge, white } from '../styles/global'
import Spacer from './Spacer'
import { Ionicons } from '@expo/vector-icons';



const AppointmentCard = ({ appointment }) => {
    const getServiceImage = () => {
        switch (appointment.service.title) {
            case 'Massage': return require('../../assets/imgs/massage.png')
            case 'Hair Cut': return require('../../assets/imgs/hair-cutting.png')
            case 'Face Cut': return require('../../assets/imgs/beard.png')
            case 'Wax': return require('../../assets/imgs/wax.png')
        }
    }

    const getStatusColor = () => {
        switch (appointment.status) {
            case 'done': return '#D9F0D4'
            case 'canceled': return '#F4D6D6'
            case 'in-progress': return '#FAE6C7'
            case 'didnt-come': return '#FAE6C7'
            case 'hold': return '#FAE6C7'
        }
    }

    return (
        <View style={{
            backgroundColor: getStatusColor(), padding: 8, borderRadius: 38, justifyContent: 'center', alignItems: 'center', flexDirection: 'row'
        }}>

            <View style={{ backgroundColor: '#FCC878', borderRadius: 36, borderColor: white, borderWidth: 1 }}>
                <Image style={{ width: 56, height: 56, borderRadius: 36 }} source={{ uri: IMAGE_BASE_URL + appointment.customer.image + '?time=' + new Date() }} />
            </View>

            <Spacer space={8} />

            <View>
                <Text style={{ ...globalStyles.font, ...globalStyles.txtDirection, fontSize: semiLarge, fontFamily: 'poppins-bold' }}>{appointment.customer.firstName} {appointment.customer.lastName}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Ionicons name="time-outline" size={18} color="#8A8A8A" />
                    <Spacer space={4} />
                    <Text style={{ ...globalStyles.font, fontSize: fontSmall, color: '#8A8A8A' }}>{moment(appointment.start_time).format('HH:mm')} - {moment(appointment.end_time).format('HH:mm')}</Text>
                </View>
            </View>

            <Spacer space={26} />

            <Image style={{ width: 46, height: 46, }} source={getServiceImage()} />
            <Spacer space={8} />
        </View >
    )
}

export default AppointmentCard