import { useState } from "react"
import AppointmentRepository from "../../../repository/AppointmentRepository"
import WorkerRepository from "../../../repository/WorkerRepository"


const HomeViewModel = () => {
    const [state, setState] = useState({
        workers: null,
        isLoading: false,
        refreshing: false,
        appointment: null,
    })

    const appointmentRepository = AppointmentRepository()
    const workerRepository = WorkerRepository()

    const onRefresh = async () => {
        setState((prev) => { return { ...prev, refreshing: true } })
        await getWorkers()
        await getAppointment()
        setState((prev) => { return { ...prev, refreshing: false } })
    }

    const getWorkers = async () => {
        setState((prev) => { return { ...prev, isLoading: true } })
        try {
            const { workers } = await workerRepository.getWorkers()
            setState((prev) => { return { ...prev, workers: workers } })
        } catch (e) {
            console.log(e);
        }
        setState((prev) => { return { ...prev, isLoading: false } })
    }


    const getAppointment = async () => {
        setState((prev) => { return { ...prev, isLoading: true } })
        try {
            const { appointment } = await appointmentRepository.getAppointment()
            setState((prev) => { return { ...prev, appointment: appointment } })
        } catch (e) {
            console.log(e);
        }
        setState((prev) => { return { ...prev, isLoading: false } })
    }



    return { ...state, getWorkers, getAppointment, onRefresh }
}

export default HomeViewModel;