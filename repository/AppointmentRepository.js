import apiCall from "../network/apiCall"




const AppointmentRepository = () => {

    const getAppointment = async () => {
        const data = await apiCall('appointments/user-appointment')
        return data
    }


    return { getAppointment }
}

export default AppointmentRepository;