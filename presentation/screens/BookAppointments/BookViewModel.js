import { View, Text } from "react-native";
import React, { useEffect, useState, Alert } from "react";

import WorkerRepository from "../../../repository/workerRepository";
import AppointmentRepository from "../../../repository/AppointmentRepository";
import useAuthContext from "../../../hooks/useAuthContext";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import useLoadingContext from "../../../hooks/useLoadingContext";
const BookViewModel = () => {
  const [state, setState] = useState({
    workers: [],
    appointments: [],
    selectedWorker: null,
    selectedDay: null,
    selectedService: null,
    selectedHour: null,
    workerAppointments: [],
    groupedAppoints: [],
    appointsByday: [],
  });
  const navigation = useNavigation();
  const workerRepository = WorkerRepository();
  const appointmentRepository = AppointmentRepository();
  const { isLoading, dispatch: setIsLoading } = useLoadingContext();
  const { user } = useAuthContext();

  const getWorkers = async () => {
    try {
      const { workers } = await workerRepository.getWorkers();
      setState((prev) => {
        return { ...prev, workers: workers };
      });
    } catch (e) {
      console.log(e);
    }
  };

  const getAppointments = async () => {
    try {
      const { appointments } = await appointmentRepository.getAppointments();
      setState((prev) => {
        return { ...prev, appointments: appointments };
      });
    } catch (e) {
      console.log(e);
    }
  };

  const handleBook = async () => {
    const appointObj = {
      appointmentId: state.selectedHour,
      userId: user._id,
      service: state.selectedService,
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

  const getAvailableAppointment = async (workerId) => {
    const format = "yyyy-MM-DDTHH:mm:ssZZ";
    const startD = moment().format(format);
    let appointObj = {
      workerId: workerId,
      fromDate: startD,
    };
    setIsLoading({ isLoading: true });
    let appoints;
    try {
      const { availableAppointments } =
        await appointmentRepository.getAvailableAppointment(appointObj);
      appoints = availableAppointments;
    } catch (e) {
      console.log(e);
    }
    setIsLoading({ isLoading: false });
    return appoints;
  };

  const filterWorkerAppoints = async (worker) => {
    setState((prev) => {
      //for not showing prev worker data
      return {
        ...prev,
        groupedAppoints: [],
      };
    });
    let appointments = await getAvailableAppointment(worker._id);
    let appoints = appointments.filter((appoint) => appoint.status == "free");
    const groupedAppoints = appoints.reduce((groups, appoint) => {
      const date = new Date(appoint.start_time).getDay() + 1;
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(appoint);
      return groups;
    }, {});
    setState((prev) => {
      return {
        ...prev,
        groupedAppoints: groupedAppoints,
      };
    });
  };

  const handleSelectWorker = (worker) => {
    setState((prev) => {
      return {
        ...prev,
        selectedWorker: worker,
        selectedDay: null,
        selectedService: null,
        selectedHour: null,
      };
    });
    filterWorkerAppoints(worker);
  };
  const handleSelectDay = (key) => {
    let _appointsByDay = state.groupedAppoints[key];
    setState((prev) => {
      return {
        ...prev,
        selectedDay: key,
        appointsByday: _appointsByDay,
        selectedService: null,
        selectedHour: null,
      };
    });
  };

  const handleSelectService = (id) => {
    setState((prev) => {
      return {
        ...prev,

        selectedService: id,
        selectedHour: null,
      };
    });
  };
  const handleSelectHour = (id) => {
    setState((prev) => {
      return {
        ...prev,
        selectedHour: id,
      };
    });
  };

  const handleCloseConfirmation = () => {
    setState((prev) => {
      return {
        ...prev,
        selectedHour: null,
      };
    });
  };

  useEffect(() => {
    getWorkers();
  }, []);

  return {
    ...state,
    handleSelectWorker,
    handleSelectDay,
    handleSelectService,
    handleSelectHour,
    handleBook,
    handleCloseConfirmation,
  };
};

export default BookViewModel;
