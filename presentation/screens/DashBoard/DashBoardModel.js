import { View, Text, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import useAuthContext from "../../../hooks/useAuthContext";
import AppointmentRepository from "../../../repository/AppointmentRepository";
import WorkerRepository from "../../../repository/workerRepository";
import useLoadingContext from "../../../hooks/useLoadingContext";
import moment from "moment";
const DashBoardModel = () => {
  const { user } = useAuthContext();
  const { isLoading, dispatch: setIsLoading } = useLoadingContext();
  let startDate = moment();
  const [state, setState] = useState({
    appointments: [],
    dateInterval: [
      startDate,
      startDate.clone().add(1, "days"),
      startDate.clone().add(2, "days"),
      startDate.clone().add(3, "days"),
      startDate.clone().add(4, "days"),
    ],
    worker: user,
    workerServices: [],
    selectedDay: null,
    showStatusList: false,
    currentAppoint: null,
    allSelected: true,
    showServSheet: false,
    showAddAppoint: false,
  });

  const appointmentRepository = AppointmentRepository();
  const workerRepository = WorkerRepository();

  /*------------------api functions use-------------------*/

  const getAppointments = async (date) => {
    setIsLoading({ isLoading: true });
    try {
      const { appointments } = await appointmentRepository.getAppointments();
      const _date = moment(date).format("L");

      let appoints = appointments.filter(
        (appoint) => _date == moment(appoint.start_time).format("L")
      );
      setState((prev) => {
        return {
          ...prev,
          appointments: appoints,
        };
      });
    } catch (e) {
      console.log(e);
    }
    setIsLoading({ isLoading: false });
  };

  const getWorkerServices = async () => {
    setIsLoading({ isLoading: true });
    try {
      const data = await workerRepository.getWorkerServices(user._id);
      setState((prev) => {
        return { ...prev, workerServices: data.services };
      });
    } catch (e) {
      console.log(e);
    }
    setIsLoading({ isLoading: false });
  };

  const handleUpdateStatus = async (status, service = "") => {
    setIsLoading({ isLoading: true });
    let message;
    const appointObj = {
      appointmentId: state.currentAppoint,
      status: status,
      service: service,
    };
    try {
      const data = await appointmentRepository.updateAppointmentStatus(
        appointObj
      );
      getAppointments(state.dateInterval[state.selectedDay]);
      message = data.message;
    } catch (e) {
      console.log(e);
    }
    showAlert(message, handleShowStatusList(null, false));
    setIsLoading({ isLoading: false });
  };

  const handlePostServ = async (servObj) => {
    setIsLoading({ isLoading: true });
    let messg;
    try {
      const data = await workerRepository.postService(servObj);
      messg = data.message;
      getWorkerServices();
    } catch (e) {
      console.log(e);
      messg = e.message;
    }
    showAlert(messg);
    setIsLoading({ isLoading: false });
  };

  const handleDeleteServ = async (servId) => {
    setIsLoading({ isLoading: true });
    let messg;
    try {
      const data = await workerRepository.deleteService(servId);
      messg = data.message;
      getWorkerServices();
    } catch (e) {
      messg = e.message;
    }
    showAlert(messg);
    setIsLoading({ isLoading: false });
  };

  const handlePostAppoint = async (startTime, endTime) => {
    let date = state.dateInterval[state.selectedDay];
    const appointObj = {
      worker: user._id,
      start_time: compineDT(date, startTime),
      end_time: compineDT(date, endTime),
    };
    setIsLoading({ isLoading: true });
    let messg;
    try {
      const data = await appointmentRepository.PostAppointment(appointObj);
      messg = data.message;
      getAppointments(date);
      handleShowAppoint();
    } catch (e) {
      messg = e.message;
    }
    showAlert(messg);
    setIsLoading({ isLoading: false });
  };

  /*------------------handle/healper functions-------------------*/

  const showAlert = async (message, handlePress) => {
    Alert.alert("", message, [{ text: "OK", onPress: () => handlePress }]);
  };

  const handleDateRight = () => {
    let currDate = state.dateInterval[4];
    let dateInterval = [currDate];
    let dayCounter = 1;
    // [0 1 2 3 4]
    for (let i = 1; i < 5; i++) {
      let d = currDate.clone().add(dayCounter, "days");
      dateInterval.push(d);
      dayCounter++;
    }
    setState((prev) => {
      return { ...prev, selectedDay: null, dateInterval: dateInterval };
    });
  };
  const handleDateLeft = () => {
    let currDate = state.dateInterval[0].clone().subtract(4, "days"); //the new endDate
    let dateInterval = [currDate];
    let dayCounter = 1;
    for (let i = 0; i < 4; i++) {
      let d = currDate.clone().add(dayCounter, "days");
      dateInterval.push(d);
      dayCounter++;
    }
    setState((prev) => {
      return { ...prev, selectedDay: null, dateInterval: dateInterval };
    });
  };
  const handleSelectedDay = (dayId) => {
    setState((prev) => {
      return { ...prev, selectedDay: dayId };
    });
    getAppointments(state.dateInterval[dayId]);
  };

  const handleShowStatusList = (appointId, action) => {
    setState((prev) => {
      return { ...prev, currentAppoint: appointId, showStatusList: action };
    });
  };

  const handleSelectAll = () => {
    setState((prev) => {
      return { ...prev, allSelected: true };
    });
    getAppointments(state.dateInterval[state.selectedDay]);
  };
  const handleSelectBooked = () => {
    let appoints = state.appointments.filter(
      (appoint) => appoint.user != null || appoint.status == "hold"
    );
    setState((prev) => {
      return {
        ...prev,
        appointments: appoints,
        allSelected: false,
      };
    });
  };
  const handleSearch = (text) => {
    if (state.allSelected) {
      return;
    }
    console.log(text);
    let temp = [...state.appointments];
    let tempSearched = temp.filter((appoint) => {
      return (
        appoint?.user?.phone.includes(text) ||
        appoint?.user.firstName.toLowerCase().includes(text.toLowerCase())
      );
    });
    setState((prev) => {
      return {
        ...prev,
        appointments: tempSearched,
      };
    });
  };
  const handleShowServSheet = () => {
    setState((prev) => {
      return {
        ...prev,
        showServSheet: !prev.showServSheet,
      };
    });
  };

  function compineDT(date, time) {
    let d = JSON.stringify(date);
    let t = JSON.stringify(time);
    let compineD = `${d.split("T")[0]}T${t.split("T")[1]}`;
    const format = "yyyy-MM-DDTHH:mm:ssZZ";
    return moment(compineD, format).format(format);
  }

  const handleShowAppoint = () => {
    setState((prev) => {
      return {
        ...prev,
        showAddAppoint: !prev.showAddAppoint,
      };
    });
  };

  useEffect(() => {
    // handleDateLeft();
    handleSelectedDay(0); //bug here
    getWorkerServices();
    // getWorker();
  }, []);
  return {
    ...state,
    getAppointments,
    handleDateRight,
    handleDateLeft,
    handleSelectedDay,
    handleUpdateStatus,
    handleShowStatusList,
    handleSelectAll,
    handleSelectBooked,
    handleSearch,
    handleShowServSheet,
    handlePostServ,
    handleDeleteServ,
    handlePostAppoint,
    handleShowAppoint,
  };
};

export default DashBoardModel;
