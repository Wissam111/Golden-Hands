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

  const unbook = async (appointmentId) => {
    const data = await apiCall("appointments/unbook", 'POST', { appointmentId: appointmentId });
    return data;
  }

  return { getAppointment, getUserAppointments , unbook };
};

export default AppointmentRepository;
