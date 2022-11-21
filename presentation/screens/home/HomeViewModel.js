import { useState } from "react";
import useAuthContext from "../../../hooks/useAuthContext";
import useLoadingContext from "../../../hooks/useLoadingContext";
import AppointmentRepository from "../../../repository/AppointmentRepository";
import WorkerRepository from "../../../repository/workerRepository";
import showAlert from "../../components/ShowAlert";

const useHomeViewModel = () => {
  const { isLoading, dispatch: setIsLoading } = useLoadingContext();
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


  // get all workers
  const getWorkers = async (isRefreshing) => {
    if (!isRefreshing) setIsLoading({ isLoading: true });
    try {
      const { workers } = await workerRepository.getWorkers();
      setState((prev) => {
        return { ...prev, workers: workers };
      });
    } catch (e) {
      showAlert(getString.t('error'), getString.t('something_went_wrong'))
    }
    setIsLoading({ isLoading: false });
  };


  // get the current loggedin user appointment ( if he has one )
  const getAppointment = async (isRefreshing) => {
    if (!token)
      return
    if (!isRefreshing) setIsLoading({ isLoading: true });
    try {
      const { appointment } = await appointmentRepository.getAppointment();
      setState((prev) => {
        return { ...prev, appointment: appointment };
      });
    } catch (e) {
      showAlert(getString.t('error'), getString.t('something_went_wrong'))
    }
    setIsLoading({ isLoading: false });
  };


  



  return { ...state, getWorkers, getAppointment, onRefresh };
};

export default useHomeViewModel;
