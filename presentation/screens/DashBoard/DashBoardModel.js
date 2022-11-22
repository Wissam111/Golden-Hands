import { View, Text, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import useAuthContext from "../../../hooks/useAuthContext";
import AppointmentRepository from "../../../repository/AppointmentRepository";
import moment from "moment";
const DashBoardModel = () => {
  const { user } = useAuthContext();
  let startDate = moment();
  const [state, setState] = useState({
    appointments: [],
    dateInterval: [startDate.clone().add(4, "days")],
    worker: user,
    selectedDay: null,
    showStatusList: false,
    currentAppoint: null,
  });
  const appointmentRepository = AppointmentRepository();
  const getAppointments = async (date) => {
    try {
      const { appointments } = await appointmentRepository.getAppointments();
      const _date = moment(date).format("L");

      let appoints = appointments.filter(
        (appoint) =>
          // appoint.worker?._id == user._id &&
          _date == moment(appoint.start_time).format("L")
      );
      setState((prev) => {
        return { ...prev, appointments: appoints };
      });
    } catch (e) {
      console.log(e);
    }
  };

  const handleDateRight = () => {
    // let currDate = state.dateInterval[0].clone().add(4, "days");
    let currDate = state.dateInterval[4]; // the new startDate
    let dateInterval = [currDate];
    let dayCounter = 1;
    // [0 1 2 3 4]
    for (let i = 1; i < 5; i++) {
      let d = currDate.clone().add(dayCounter, "days");
      dateInterval.push(d);
      dayCounter++;
    }
    setState((prev) => {
      return { ...prev, dateInterval: dateInterval };
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
      return { ...prev, dateInterval: dateInterval };
    });
  };
  const handleSelectedDay = (dayId) => {
    setState((prev) => {
      return { ...prev, selectedDay: dayId };
    });
    getAppointments(state.dateInterval[dayId]);
  };

  const handleUpdateStatus = async (status) => {
    let message;
    const appointObj = {
      appointmentId: state.currentAppoint,
      status: status,
    };
    try {
      const data = await appointmentRepository.updateAppointmentStatus(
        appointObj
      );
      message = data.message;
    } catch (e) {
      console.log(e);
    }
    showAlert(message, handleShowStatusList(null, false));
  };

  const handleShowStatusList = (appointId, action) => {
    setState((prev) => {
      return { ...prev, currentAppoint: appointId, showStatusList: action };
    });
  };
  const showAlert = (message, handlePress) => {
    Alert.alert("", message, [{ text: "OK", onPress: () => handlePress }]);
  };

  useEffect(() => {
    handleDateLeft();
    handleSelectedDay(0); //bug here
  }, []);
  return {
    ...state,
    getAppointments,
    handleDateRight,
    handleDateLeft,
    handleSelectedDay,
    handleUpdateStatus,
    handleShowStatusList,
  };
};

export default DashBoardModel;
