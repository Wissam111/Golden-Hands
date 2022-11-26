import { useState } from "react";
import useLoadingContext from "../../../hooks/useLoadingContext";
import getString from "../../../localization";
import AppointmentRepository from "../../../repository/AppointmentRepository";
import showAlert from "../../components/ShowAlert";


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
            showAlert(getString.t('error'), getString.t('something_went_wrong'))
        }
        setLoading({ isLoading: false })
    }


    const unbook = async (id) => {
        setLoading({ isLoading: true })
        try {
            const data = await appointmentRepository.unbook(id)
        } catch (e) {
            showAlert(getString.t('error'), getString.t('something_went_wrong'))
        }
        setLoading({ isLoading: false })
    }


    const rateAppointment = async (id, stars, index) => {
        setLoading({ isLoading: true })
        try {
            const data = await appointmentRepository.rateAppointment(id, stars)
            state.appointments[index] = data.appointment
            setState(prev => {
                return {
                    ...prev
                }
            })

        } catch (e) {
            showAlert(getString.t('error'), getString.t('something_went_wrong'))
        }
        setLoading({ isLoading: false })
    }


    return { ...state, getUserAppointments, unbook, rateAppointment }
}

export default useUserAppointmentsViewModel;