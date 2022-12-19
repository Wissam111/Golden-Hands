import { useState } from "react";
import useLoadingContext from "../../../hooks/useLoadingContext";
import getString from "../../../localization";
import AppointmentRepository from "../../../repository/AppointmentRepository";
import showAlert from "../../components/ShowAlert";


const useUserAppointmentsViewModel = () => {
    const [state, setState] = useState({
        appointments: null
    })
    const [refresh, setRefresh] = useState(false)
    const [cancelSheet, setCancelSheet] = useState(false)
    const [cancelAppointment, setCancelAppointment] = useState(null)
    const { dispatch: setLoading } = useLoadingContext()
    const appointmentRepository = AppointmentRepository()


    const setCancelSheetState = async (state, cancelAppointment) => {
        setCancelAppointment(cancelAppointment)
        setCancelSheet(state)
    }

    const onRefresh = async () => {
        setRefresh(true)
        await getUserAppointments(true)
        setRefresh(false)
    }

    const getUserAppointments = async (isRefreshing) => {
        if (!isRefreshing) setLoading({ isLoading: true })
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


    const unbook = async () => {
        if (!cancelAppointment) return

        setLoading({ isLoading: true })
        try {
            const data = await appointmentRepository.unbook(cancelAppointment._id)
            setState((prev) => {
                return {
                    ...prev,
                    appointments: prev.appointments.filter(item => item._id !== cancelAppointment._id)
                }
            })
        } catch (e) {
            showAlert(getString.t('error'), getString.t('something_went_wrong'))
        }
        setCancelSheet(false)
        setCancelAppointment(null)
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
            console.log('rateAppointment', e);
            showAlert(getString.t('error'), getString.t('something_went_wrong'))
        }
        setLoading({ isLoading: false })
    }


    return { ...state, refresh, onRefresh, cancelAppointment, cancelSheet, getUserAppointments, unbook, rateAppointment, setCancelSheetState }
}

export default useUserAppointmentsViewModel;