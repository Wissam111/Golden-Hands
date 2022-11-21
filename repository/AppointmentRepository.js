import { apiCall } from "../network/apiCall";

const AppointmentRepository = () => {
  const getAppointment = async () => {
    const data = await apiCall("appointments/user-appointment");
    return data;
  };

  const getUserAppointments = async () => {
    const data = await apiCall("appointments/user-appointments");
    return data;
  }

  return { getAppointment  , getUserAppointments};
};

export default AppointmentRepository;
