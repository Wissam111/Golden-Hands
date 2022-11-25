import { apiCall } from "../network/apiCall";

const AppointmentRepository = () => {
  const getAppointment = async () => {
    const data = await apiCall("appointments/user-appointment");
    return data;
  };
  const getAppointments = async () => {
    const data = await apiCall("appointments");
    return data;
  };
  // /api/appointments/available
  const getAvailableAppointment = async () => {
    const data = await apiCall("appointments/available", "GET");
    return data;
  };

  const getUserAppointments = async () => {
    const data = await apiCall("appointments/user-appointments");
    return data;
  };

  const BookAppointment = async (appointObj) => {
    const data = await apiCall("appointments/book", "POST", appointObj);
    return data;
  };
  const unBookAppointment = async (appointObj) => {
    const data = await apiCall("appointments/unbook", "POST", appointObj);
    return data;
  };
  const updateAppointmentStatus = async (appointObj) => {
    const data = await apiCall(
      "appointments/update-status",
      "PATCH",
      appointObj
    );
    return data;
  };

  const PostAppointment = async (appointObj) => {
    const data = await apiCall("appointments", "POST", appointObj);
    return data;
  };

  const unbook = async (appointmentId) => {
    const data = await apiCall("appointments/unbook", "POST", {
      appointmentId: appointmentId,
    });
    return data;
  };

  return {
    getAppointment,
    getAppointments,
    BookAppointment,
    unBookAppointment,
    updateAppointmentStatus,
    getAppointment,
    getUserAppointments,
    unbook,
    PostAppointment,
  };
};

export default AppointmentRepository;
