import { View, Text, Alert } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import useAuthContext from "../../../hooks/useAuthContext";
import AppointmentRepository from "../../../repository/AppointmentRepository";
import WorkerRepository from "../../../repository/workerRepository";
import useLoadingContext from "../../../hooks/useLoadingContext";
import moment from "moment";
import useDialogContext from "../../../hooks/useDialogContext";
import io from 'socket.io-client'
import { useIsFocused } from "@react-navigation/native";
import { URL } from "../../../network/apiCall";

const useDashBoardModel = () => {
  const isFocused = useIsFocused();
  const { user } = useAuthContext();
  const { isLoading, dispatch: setIsLoading } = useLoadingContext();
  const { dispatch: showDialog } = useDialogContext()
  let startDate = moment().startOf('day')
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
    selectedDay: startDate,
    showStatusSheet: false,
    currentAppoint: null,
    allSelected: true,
    showServSheet: false,
    showAddAppoint: false,
    numberOfActiveCustomers: null
  });
  const [search, setSearch] = useState(null)

  const appointmentRepository = AppointmentRepository();
  const workerRepository = WorkerRepository();

  const onSocketChange = useCallback(async (data) => {
    console.log(data);
    switch (data.operationType) {
      case 'update':
        setState((prev) => {
          let numberOfActiveCustomers = 0
          const up = prev.appointments.map(item => {
            let obj = item
            if (item._id === data.documentKey._id) {
              obj = {
                ...item,
                ...data.updateDescription.updatedFields
              }
            }
            if (obj.status === 'in-progress' || obj.status === 'done' || obj.status === 'hold') {
              numberOfActiveCustomers++
            }
            return obj
          })
          return {
            ...prev,
            appointments: up,
            numberOfActiveCustomers: numberOfActiveCustomers
          }
        })
        break



      case 'delete':
        setState((prev) => {
          const up = prev.appointments.filter(item => {
            return item._id !== data.documentKey._id
          })
          return {
            ...prev,
            appointments: up
          }
        })
        break


      case 'insert':
        setState((prev) => {
          prev.appointments.push(data.fullDocument)
          prev.appointments.sort((a, b) => {
            new Date(a) <= new Date(b)
          })

          return {
            ...prev,
            appointments: [...prev.appointments]
          }
        })
        break
    }
  }, [])

  useEffect(() => {
    const socket = io(URL + 'socket/appointments')
    socket.on('change', (data) => {
       onSocketChange(data)
    })

    return function cleanup() {
      socket.close()
    };
  }, [])

  /*-------- geting all appointments by date ---------- */
  const getAppointments = async () => {
    setIsLoading({ isLoading: true });
    try {
      const start_time = new Date(state.selectedDay)
      start_time.setHours(0)
      start_time.setMinutes(0)
      start_time.setSeconds(0)
      start_time.setMilliseconds(0)
      const end_time = new Date(start_time)
      end_time.setDate(start_time.getDate() + 1)

      const { appointments, numberOfActiveCustomers } = await appointmentRepository.getAppointments({
        end_time,
        start_time,
        workerId: user._id,
        search: search,
        status: state.allSelected ? null : 'in-progress'
      });

      setState((prev) => {
        return {
          ...prev,
          appointments: appointments,
          numberOfActiveCustomers: numberOfActiveCustomers
        };
      });
    } catch (e) {
      console.log(e);
    }
    setIsLoading({ isLoading: false });
  };

  /*-------- getting worker Services by workerId ---------- */
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

  /*-------- Update the status of an appointment ---------- */
  const handleUpdateStatus = async (status, service = "") => {
    setIsLoading({ isLoading: true });
    let message;
    const appointObj = {
      appointmentId: state.currentAppoint._id,
      status: status,
      service: service,
    };
    try {
      const data = await appointmentRepository.updateAppointmentStatus(
        appointObj
      );
      message = data.message;
    } catch (e) {
      console.log(e);
      message = e.message;
    }
    showAlert(message, handleShowStatusSheet(null, false));
    setIsLoading({ isLoading: false });
  };

  /*-------- creating new Service for a worker ---------- */
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
    showDialog({
      isVisible: true,
      title: 'Service',
      message: messg,
    })
    setIsLoading({ isLoading: false });
  };
  /*--------  deleting service for a worker ---------- */
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
    showDialog({
      isVisible: true,
      title: 'Service',
      message: messg,
    })
    setIsLoading({ isLoading: false });
  };

  /*--------  creating new appointment for a worker ---------- */
  const handlePostAppoint = async (startTime, endTime, duration) => {
    const appointObj = {
      worker: user._id,
      start_time: compineDT(state.selectedDay, startTime).format('yyyy-MM-DDTHH:mm:ssZZ'),
      end_time: compineDT(state.selectedDay, endTime).format('yyyy-MM-DDTHH:mm:ssZZ'),
      duration: duration
    };
    setIsLoading({ isLoading: true });
    let messg;
    try {
      const data = duration ? await appointmentRepository.createRangeAppointment(appointObj) : await appointmentRepository.PostAppointment(appointObj);
      messg = data.message;
      handleShowAppoint();
    } catch (e) {
      messg = e.message;
    }
    showDialog({
      isVisible: true,
      message: messg,
    })
    setIsLoading({ isLoading: false });
  };
  /*--------  deleting an appointment for a worker ---------- */
  const handleDeleteAppointment = async () => {
    setIsLoading({ isLoading: true });
    let messg;
    try {
      const data = await appointmentRepository.deleteAppointment(
        state.currentAppoint._id
      );
      messg = data.message;
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
    let startDate = state.dateInterval[4].clone().add(1, 'days');
    let dates = [];
    for (let i = 0; i < 5; i++) {
      dates.push(startDate.clone().add(i, "days"));
    }
    setState((prev) => {
      return { ...prev, dateInterval: dates };
    });
  };
  const handleDateLeft = () => {
    let startDate = state.dateInterval[0].clone().subtract(5, "days");
    let dates = [];
    for (let i = 0; i < 5; i++) {
      dates.push(startDate.clone().add(i, "days"));
    }
    setState((prev) => {
      return { ...prev, dateInterval: dates };
    });
  }

  const handleSelectedDay = async (day) => {
    setState((prev) => {
      return { ...prev, selectedDay: day };
    });
  };

  const handleShowStatusSheet = async (appointment, action) => {
    setState((prev) => {
      return { ...prev, currentAppoint: appointment, showStatusSheet: action };
    });
  };

  const handleSelectAll = async () => {
    setState((prev) => {
      return { ...prev, allSelected: true };
    });
  };
  const handleSelectBooked = async () => {
    let appoints = state.appointments.filter(
      (appoint) => appoint.status == "in-progress" || appoint.status == "hold"
    );
    setState((prev) => {
      return {
        ...prev,
        appointments: appoints,
        allSelected: false,
      };
    });
  };

  const handleSearch = async (text) => {
    setSearch(text)
  };

  const handleShowServSheet = async () => {
    setState((prev) => {
      return {
        ...prev,
        showServSheet: !prev.showServSheet,
      };
    });
  };

  const compineDT = (date, time) => {
    let d = moment(date).format('yyyy-MM-DD');
    let t = moment(time).format('HH:mm');
    return moment(d + ' ' + t)
  };

  const handleShowAppoint = async (action) => {
    setState((prev) => {
      return {
        ...prev,
        showAddAppoint: !prev.showAddAppoint,
      };
    });
  };

  useEffect(() => {
    getWorkerServices();
  }, []);
  return {
    ...state,
    isLoading,
    search,
    getAppointments,
    handleDateRight,
    handleDateLeft,
    handleSelectedDay,
    handleUpdateStatus,
    handleShowStatusSheet,
    handleSelectAll,
    handleSelectBooked,
    handleSearch,
    handleShowServSheet,
    handlePostServ,
    handleDeleteServ,
    handlePostAppoint,
    handleShowAppoint,
    handleDeleteAppointment,
    compineDT,
  };
};

export default useDashBoardModel;
