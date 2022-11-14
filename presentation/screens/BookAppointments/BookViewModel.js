import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";

import WorkerRepository from "../../../repository/workerRepository";
import AppointmentsRepository from "../../../repository/AppointmentsRepository";
import BookAppointmentRepository from "../../../repository/BookAppointmentRepository";

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
    appointsByService: [],
    appointsByHour: [],
  });
  const workerRepository = WorkerRepository();
  const appointmentsRepository = AppointmentsRepository();
  const bookAppointmentRepository = BookAppointmentRepository();

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
      const { appointments } = await appointmentsRepository.getAppointments();
      setState((prev) => {
        return { ...prev, appointments: appointments };
      });
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
    const groupedAppoints = appoints.slice(0, 7).reduce((results, appoint) => {
      let day = new Date(appoint.start_time).getDay() + 1;
      (results[day] = results[day] || []).push(appoint);
      return results;
    }, {});

    setState((prev) => {
      return {
        ...prev,
        // workerAppointments: appoints.slice(0, 7),
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
    // console.log(serv.title);
  };
  const handleSelectHour = (id) => {
    setState((prev) => {
      return {
        ...prev,
        selectedHour: id,
      };
    });
  };
  const handleBook = async () => {
    const appointObj = {
      appointmentId: selectedHour,
      userId: selectedWorker,
      service: selectedService,
    };

    try {
      const data = await bookAppointmentRepository.BookAppointment(appointObj);
      console.log(data);
    } catch (e) {
      console.log(e);
    }
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
