import moment from 'moment'
import { View, Image, Text, ActivityIndicator, TouchableOpacity, Pressable } from 'react-native'
import { IMAGE_BASE_URL } from '../../network/apiCall'
import { fontMeduim, fontSmall, globalStyles, gray1, semiLarge, white } from '../styles/global'
import Spacer from './Spacer'
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react'
import Animated, { SlideInRight, SlideOutRight } from 'react-native-reanimated'



const AppointmentCard = ({ appointment, image, text, onPress, onLongPress, isSelected, index }) => {
    const [progressBar, setProgressBar] = useState(true)

    const getServiceImage = () => {
        if (!appointment.service)
            return null
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
            case 'didnt-come': return '#F4EED6'
            case 'hold': return '#FAE6C7'
            case 'free': return '#f9f9f9'
        }
    }

    return (
        <Pressable onLongPress={onLongPress} onPress={onPress} disabled={!onPress && !onLongPress}>
            <Animated.View entering={SlideInRight.delay(index * 100)} exiting={SlideOutRight}>
                <View style={{
                    backgroundColor: getStatusColor(), padding: 8, borderRadius: 38, justifyContent: 'center', alignItems: 'center', flexDirection: 'row'
                }}>

                    <View style={{ backgroundColor: '#FCC878', borderRadius: 36, borderColor: white, borderWidth: 1, }}>
                        <Image
                            key={image}
                            defaultSource={require('../../assets/imgs/person_place_holder.jpg')}
                            style={{ width: 56, height: 56, borderRadius: 36 }}
                            source={{ uri: image ? IMAGE_BASE_URL + image : null }}
                            onLoadEnd={() => {
                                setProgressBar(false)
                            }} />

                        <View style={{ position: 'absolute', zIndex: 3, width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                            <ActivityIndicator animating={progressBar && image != null} color='#000' size='small' />
                        </View>
                    </View>

                    <Spacer space={8} />


                    <View style={{ flexGrow: 1 }}>
                        <Text style={{ ...globalStyles.font, ...globalStyles.txtDirection, fontSize: fontMeduim, fontFamily: 'poppins-bold' }}>{text}</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Ionicons name="time-outline" size={18} color={gray1} />
                            <Spacer space={4} />
                            <Text style={{ ...globalStyles.font, ...globalStyles.txtDirection, fontSize: fontSmall, color: gray1 }}>{moment(appointment.start_time).format('HH:mm')} - {moment(appointment.end_time).format('HH:mm')}</Text>
                        </View>
                    </View>

                    <Spacer space={26} style={{ flexShrink: 1 }} />

                    {appointment.service &&
                        <>
                            <Image
                                key={getServiceImage()}
                                style={{ width: 46, height: 46, flexShrink: 1 }} source={getServiceImage()} />
                            <Spacer space={8} />
                        </>
                    }

                </View >

                {isSelected && <View style={{
                    borderRadius: 38,
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0,0,0,.2)',
                    top: 0,
                    left: 0
                }} />
                }
            </Animated.View>
        </Pressable>
    )
}

export default AppointmentCard