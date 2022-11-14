import { useEffect,  useState } from "react"
import useLoadingContext from "../../../hooks/useLoadingContext"
import AppointmentRepository from "../../../repository/AppointmentRepository"
import WorkerRepository from "../../../repository/workerRepository"


const HomeViewModel = () => {
    const { isLoading, dispatch } = useLoadingContext()
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
        await getWorkers(true)
        await getAppointment(true)
        setState((prev) => { return { ...prev, refreshing: false } })
    }

    const getWorkers = async (isRefreshing) => {
        if (!isRefreshing)
            dispatch({ isLoading: true })
        try {
            const { workers } = await workerRepository.getWorkers()
            setState((prev) => { return { ...prev, workers: workers } })
        } catch (e) {
            console.log(e);
        }
        dispatch({ isLoading: false })
    }


    const getAppointment = async (isRefreshing) => {
        if (!isRefreshing)
            dispatch({ isLoading: true })
        try {
            const { appointment } = await appointmentRepository.getAppointment()
            setState((prev) => { return { ...prev, appointment: appointment } })
        } catch (e) {
            console.log(e);
        }
        dispatch({ isLoading: false })
    }

   
    return { ...state, getWorkers, getAppointment, onRefresh }
}

export default HomeViewModel;