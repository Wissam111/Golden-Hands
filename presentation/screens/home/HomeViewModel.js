import { useEffect, useState } from "react";
import useAuthContext from "../../../hooks/useAuthContext";
import useLoadingContext from "../../../hooks/useLoadingContext";
import AppointmentRepository from "../../../repository/AppointmentRepository";
import WorkerRepository from "../../../repository/workerRepository";

const useHomeViewModel = () => {
  const { isLoading, dispatch } = useLoadingContext();
  const { token } = useAuthContext()
  const [state, setState] = useState({
    workers: null,
    isLoading: false,
    refreshing: false,
    appointment: null,
  });

  const appointmentRepository = AppointmentRepository();
  const workerRepository = WorkerRepository();

  const onRefresh = async () => {
    setState((prev) => {
      return { ...prev, refreshing: true };
    });
    await getWorkers(true);
    if (token)
      await getAppointment(true);
    setState((prev) => {
      return { ...prev, refreshing: false };
    });
  };

  const getWorkers = async (isRefreshing) => {
    if (!isRefreshing) dispatch({ isLoading: true });
    try {
      const { workers } = await workerRepository.getWorkers();
      setState((prev) => {
        return { ...prev, workers: workers };
      });
    } catch (e) {
      console.log('getWorkers:', e);
    }
    dispatch({ isLoading: false });
  };

  const getAppointment = async (isRefreshing) => {
    if (!token)
      return
    if (!isRefreshing) dispatch({ isLoading: true });
    try {
      const { appointment } = await appointmentRepository.getAppointment();
      setState((prev) => {
        return { ...prev, appointment: appointment };
      });
    } catch (e) {
      console.log('getAppointment:', e);
    }
    dispatch({ isLoading: false });
  };

  return { ...state, getWorkers, getAppointment, onRefresh };
};

export default useHomeViewModel;
