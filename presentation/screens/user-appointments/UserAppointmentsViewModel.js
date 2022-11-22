import { useState } from "react";
import useLoadingContext from "../../../hooks/useLoadingContext";
import AppointmentRepository from "../../../repository/AppointmentRepository";


const useUserAppointmentsViewModel = () => {
    const [state, setState] = useState({
        appointments: null
    })
    const { dispatch: setLoading } = useLoadingContext()
    const appointmentRepository = AppointmentRepository()

    const getUserAppointments = async () => {
        setLoading({ isLoading: true })
        try {
            const data = await appointmentRepository.getUserAppointments()
            setState(prev => {
                return {
                    ...prev,
                    appointments: data.appointments
                }
            })
        } catch (e) {

        }
        setLoading({ isLoading: false })
    }



    return { ...state, getUserAppointments }
}

export default useUserAppointmentsViewModel;