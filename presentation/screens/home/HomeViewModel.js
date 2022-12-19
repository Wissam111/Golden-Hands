import { useEffect } from "react";
import { useState } from "react";
import useAuthContext from "../../../hooks/useAuthContext";
import useLoadingContext from "../../../hooks/useLoadingContext";
import getString from "../../../localization";
import AppointmentRepository from "../../../repository/AppointmentRepository";
import WorkerRepository from "../../../repository/workerRepository";
import AddServiceView from "../../components/AddServiceView";
import showAlert from "../../components/ShowAlert";

const useHomeViewModel = () => {
  const { dispatch: setIsLoading } = useLoadingContext();
  const { user } = useAuthContext()
  const [workers, setWorkers] = useState(null)
  const [refreshing, setRefreshing] = useState(false)
  const [appointment, setAppointment] = useState(null)

  const appointmentRepository = AppointmentRepository();
  const workerRepository = WorkerRepository();

  const onRefresh = async () => {
    setRefreshing(true)
    await getWorkers(true);
    if (user)
      await getAppointment(true);
    setRefreshing(false)
  };


  // get all workers
  const getWorkers = async (isRefreshing) => {
    if (!isRefreshing) setIsLoading({ isLoading: true });
    try {
      const { workers } = await workerRepository.getWorkers();
      setWorkers(workers)
    } catch (e) {
      showAlert(getString.t('error'), getString.t('something_went_wrong'))
    }
    setIsLoading({ isLoading: false });
  };


  // get the current loggedin user appointment ( if he has one )
  const getAppointment = async (isRefreshing) => {
    if (!user)
      return
    if (!isRefreshing) setIsLoading({ isLoading: true });
    try {
      const { appointment } = await appointmentRepository.getAppointment();
      setAppointment(appointment)
    } catch (e) {
      showAlert(getString.t('error'), getString.t('something_went_wrong'))
    }
    setIsLoading({ isLoading: false });
  };




  return { appointment, refreshing, workers, getWorkers, getAppointment, onRefresh };
};

export default useHomeViewModel;
