import { View, Text } from "react-native";
import React, { useEffect, useState, Alert } from "react";

import WorkerRepository from "../../../repository/workerRepository";
import AppointmentRepository from "../../../repository/AppointmentRepository";
import useAuthContext from "../../../hooks/useAuthContext";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";
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

  const getAvailableAppointment = async () => {
    const format = "yyyy-MM-DDTHH:mm:ssZZ";
    const startD = moment().format(format);

    let appointObj = {
      workerId: user._id,
      startDate: startD,
    };

    try {
      const { appointments } =
        await appointmentRepository.getAvailableAppointment(appointObj);
      // setState((prev) => {
      //   return { ...prev, appointments: appointments };
      // });
      console.log("hx");
      console.log(appointments);
    } catch (e) {
      console.log(e);
    }
  };

  const filterWorkerAppoints = (worker) => {
    const today = new Date();
    let appoints = state.appointments.filter(
      (appoint) =>
        appoint.status == "free" &&
        appoint.worker &&
        today <= new Date(appoint.start_time) &&
        appoint.worker._id == worker._id
    );
    const groupedAppoints = appoints.reduce((results, appoint) => {
      let day = new Date(appoint.start_time).getDay() + 1;
      (results[day] = results[day] || []).push(appoint);
      return results;
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
    getAppointments();
    getAvailableAppointment();
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
