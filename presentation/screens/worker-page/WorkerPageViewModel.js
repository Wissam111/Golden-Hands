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

const useWorkerPageViewModel = () => {
  const isFocused = useIsFocused();
  const { user } = useAuthContext();
  const { isLoading, dispatch: setIsLoading } = useLoadingContext();
  const { dispatch: showDialog } = useDialogContext()
  let startDate = moment().startOf('day')
  const [state, setState] = useState({
    dateInterval: [
      startDate,
      startDate.clone().add(1, "days"),
      startDate.clone().add(2, "days"),
      startDate.clone().add(3, "days"),
      startDate.clone().add(4, "days"),
    ],
    showStatusSheet: false,
    currentAppoint: null,
    allSelected: true,
    showServSheet: false,
    showAddAppoint: false,
    worker: user
  });

  const [showServSheet, setShowServSheet] = useState(false)
  const [numberOfActiveCustomers, setNumberOfActiveCustomers] = useState(null)
  const [selectedDay, setSelectedDay] = useState(startDate)
  const [workerServices, setWorkerServices] = useState([])
  const [appointmentsState, setAppointmentsState] = useState({
    appointments: null,
    closestAppointment: null,
    appointmentsCount: null
  })
  const [search, setSearch] = useState(null)
  const [selectedAppointments, setSelectedAppointments] = useState([])
  const appointmentRepository = AppointmentRepository();
  const workerRepository = WorkerRepository();

  const onSocketChange = useCallback(async (data) => {
    // console.log(data);
    switch (data.operationType) {
      case 'update':
        setAppointmentsState((prev) => {
          let numberOfActiveCustomers = 0

          const up = prev.appointments.map(item => {

            const appointments = item.appointments.map(appointment => {
              let obj = appointment
              if (appointment._id === data.documentKey._id) {
                obj = {
                  ...appointment,
                  ...data.updateDescription.updatedFields
                }
              }
              if (obj.status === 'in-progress' || obj.status === 'done' || obj.status === 'hold') {
                numberOfActiveCustomers++
              }
              return obj
            })

            return {
              start: item.start,
              end: item.end,
              appointments: appointments
            }
          })

          return {
            ...prev,
            appointments: up,
            numberOfActiveCustomers: numberOfActiveCustomers
          }
        })
        break

      // case 'delete':
      //   setState((prev) => {
      //     const up = prev.appointments.filter(item => {
      //       return item._id !== data.documentKey._id
      //     })
      //     return {
      //       ...prev,
      //       appointments: up
      //     }
      //   })
      //   break


      // case 'insert':
      //   setState((prev) => {
      //     prev.appointments.push(data.fullDocument)
      //     prev.appointments.sort((a, b) => {
      //       new Date(a) <= new Date(b)
      //     })

      //     return {
      //       ...prev,
      //       appointments: [...prev.appointments]
      //     }
      //   })
      //   break
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




  const generateHoursInterval = async () => {
    let currentDate = moment().startOf('day')
    const tt = []
    const numberOfIntervals = 24 / 2
    for (let i = 0; i < numberOfIntervals; i++) {
      tt.push({
        start: currentDate.format('HH:mm'),
        end: currentDate.add(2, 'hours').format('HH:mm'),
        appointments: []
      })
    }
    return tt;
  };


  const createIntervals = useCallback(async (appointments) => {
    let intervals = await generateHoursInterval();
    let cApppintment = null
    let endDay = moment().endOf('day')

    appointments.forEach((appointment) => {
      if (!cApppintment && new Date(appointment.end_time) >= new Date() && new Date(appointment.end_time) <= endDay) {
        cApppintment = appointment
      }
      let appointS = moment(compineDT(moment(), appointment.start_time));

      let interval = intervals.find((intev) => {
        let intervalS = moment(intev.start, "HH:mm");
        let intervalE = intervalS.clone().add(2, 'hours')
        return (
          appointS.isBetween(intervalS, intervalE, null, "[]")
        )
      })
      interval?.appointments.push(appointment);
    });

    setAppointmentsState({
      appointments: intervals.filter(interval => interval.appointments.length > 0),
      closestAppointment: cApppintment,
      appointmentsCount: appointments.length
    })
  }, [])



  /*-------- geting all appointments by date ---------- */
  const getAppointments = useCallback(async () => {
    setIsLoading({ isLoading: true });
    try {
      const start_time = new Date(selectedDay)
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

      // setAppointments(appointments)
      await createIntervals(appointments)
      setNumberOfActiveCustomers(numberOfActiveCustomers)
    } catch (e) {
      console.log(e);
    }
    setIsLoading({ isLoading: false });
  }, [selectedDay, search, state.allSelected])

  /*-------- getting worker Services by workerId ---------- */
  const getWorkerServices = useCallback(async () => {
    setIsLoading({ isLoading: true });
    try {
      const data = await workerRepository.getWorkerServices(user._id);
      setWorkerServices(data.services)
    } catch (e) {
      console.log(e);
    }
    setIsLoading({ isLoading: false });
  }, [user])

  /*-------- Update the status of an appointment ---------- */
  const handleUpdateStatus = useCallback(async (status, service = "") => {
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
  }, [state.currentAppoint])

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
      start_time: compineDT(selectedDay, startTime).format('yyyy-MM-DDTHH:mm:ssZZ'),
      end_time: compineDT(selectedDay, endTime).format('yyyy-MM-DDTHH:mm:ssZZ'),
      duration: duration
    };
    setIsLoading({ isLoading: true });
    let messg;
    try {
      const data = duration ? await appointmentRepository.createRangeAppointment(appointObj) : await appointmentRepository.PostAppointment(appointObj);
      getAppointments()
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
      getAppointments()
      messg = data.message;
    } catch (e) {
      messg = e.message;
    }
    showAlert(messg);
    setIsLoading({ isLoading: false });
  };


  /*--------  deleting selected appointments ---------- */
  const deleteSelectedAppointments = useCallback(async () => {
    if (selectedAppointments.length == 0) return
    setIsLoading({ isLoading: true })
    try {
      const data = await appointmentRepository.deleteManyAppointments(selectedAppointments.map(item => item._id))
      getAppointments()
      cancelSelection()
    } catch (e) {
      console.log(e)
    }
    setIsLoading({ isLoading: false })
  }, [selectedAppointments])

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
    setSelectedDay(day)
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
    setState((prev) => {
      return {
        ...prev,
        allSelected: false,
      };
    });
  };

  const handleSearch = async (text) => {
    setSearch(text)
  };

  const handleShowServSheet = async () => {
    setShowServSheet(!showServSheet)
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


  const handleSelectedAppointment = async (appointment) => {
    setSelectedAppointments([...selectedAppointments, appointment])
  }

  const cancelSelection = (appointment) => {
    if (!appointment) {
      setSelectedAppointments([])
      return
    }
    if (!isSelected(appointment))
      return
    setSelectedAppointments(selectedAppointments.filter(item => item != appointment))
  }

  const isSelected = (appointment) => selectedAppointments.includes(appointment)

  useEffect(() => {
    getWorkerServices();
  }, []);
  return {
    ...state,
    isLoading,
    search,
    selectedAppointments,
    ...appointmentsState,
    workerServices,
    selectedDay,
    numberOfActiveCustomers,
    showServSheet,
    deleteSelectedAppointments,
    isSelected,
    cancelSelection,
    handleSelectedAppointment,
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

export default useWorkerPageViewModel;
