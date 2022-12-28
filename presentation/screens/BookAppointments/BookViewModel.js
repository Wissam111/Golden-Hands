import { useEffect, useState } from "react";

import WorkerRepository from "../../../repository/workerRepository";
import AppointmentRepository from "../../../repository/AppointmentRepository";
import useAuthContext from "../../../hooks/useAuthContext";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import useLoadingContext from "../../../hooks/useLoadingContext";


const WORKING_DATES_LIMIT = 7

const useBookViewModel = () => {
  const [state, setState] = useState({
    workers: null,
    availableAppointments: null,
    workingDates: null,
    selectedWorker: null,
    selectedDay: null,
    selectedService: null,
    selectedAppointment: null,
  });
  const [refreshing, setRefresh] = useState(false)
  const navigation = useNavigation();
  const workerRepository = WorkerRepository();
  const appointmentRepository = AppointmentRepository();
  const { isLoading, dispatch: setIsLoading } = useLoadingContext();
  const { user } = useAuthContext();



  const onRefresh = async () => {
    setRefresh(true)
    await getWorkers(true)
    setRefresh(false)
  }

  /*------- fetching workers from the server ---------- */

  const getWorkers = async (isRefreshing) => {
    if (!isRefreshing) setIsLoading({ isLoading: true })
    try {
      const { workers } = await workerRepository.getWorkers();
      setState((prev) => {
        return { workers: workers };
      });
    } catch (e) {
      console.log(e);
    }
    setIsLoading({ isLoading: false })
  };

  const handleBook = async () => {
    const appointObj = {
      appointmentId: state.selectedAppointment._id,
      userId: user._id,
      service: state.selectedService._id,
    };
    let messg;
    try {
      const data = await appointmentRepository.BookAppointment(appointObj);
      navigation.navigate({
        name: "HomeScreen",
        params: { message: data.message },
      });
      messg = data.message;
    } catch (e) {
      console.log(e);
      messg = e.message;
    }
    navigation.navigate({
      name: "BookingLoadingScreen",
      params: { message: messg },
    });
  };

  /*-------- Fetching all free appointments from the current date ---------- */

  const handleSelectWorker = async (worker) => {
    setState((prev) => {
      return {
        ...prev,
        selectedWorker: worker,
        selectedDay: null,
        selectedService: null,
        selectedAppointment: null,
        availableAppointments: null
      };
    });

    setIsLoading({ isLoading: true });

    const data = await workerRepository.getWorkingDates(worker._id, new Date() , WORKING_DATES_LIMIT)

    setState((prev) => {
      return {
        ...prev,
        workingDates: data.workingDates
      };
    });

    setIsLoading({ isLoading: false });
  };
  const handleSelectDay = async (selectedDate) => {
    setState((prev) => {
      return {
        ...prev,
        selectedDay: selectedDate.date,
        selectedService: null,
        selectedAppointment: null,
        availableAppointments: null
      };
    });
  };



  const handleSelectService = async (service) => {
    setState((prev) => {
      return {
        ...prev,
        selectedService: service,
        selectedAppointment: null,
      };
    });

    setIsLoading({ isLoading: true });

    const availableAppointmentsResult = await appointmentRepository.getAvailableAppointment({
      workerId: state.selectedWorker._id,
      fromDate: moment().format('yyyy-MM-DDTHH:mm:ssZZ'),
      workingDate: state.selectedDay
    })


    setState((prev) => {
      return {
        ...prev,
        selectedService: service,
        selectedAppointment: null,
        availableAppointments: availableAppointmentsResult.availableAppointments
      };
    });

    setIsLoading({ isLoading: false });
  };



  const handleSelectAppointment = (selectedAppointment) => {
    setState((prev) => {
      return {
        ...prev,
        selectedAppointment: selectedAppointment,
      };
    });
  };

  const handleCloseConfirmation = async () => {
    setState((prev) => {
      return {
        ...prev,
        selectedAppointment: null,
      };
    });
  };

  useEffect(() => {
    getWorkers();
  }, []);

  return {
    ...state,
    refreshing,
    isLoading,
    onRefresh,
    handleSelectWorker,
    handleSelectDay,
    handleSelectService,
    handleSelectAppointment,
    handleBook,
    handleCloseConfirmation,
  };
};

export default useBookViewModel;
