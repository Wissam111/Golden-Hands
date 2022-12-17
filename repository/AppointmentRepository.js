import { apiCall } from "../network/apiCall";

const AppointmentRepository = () => {
  // get the current user active appointment
  const getAppointment = async () => {
    const data = await apiCall("appointments/user-appointment");
    return data;
  };

  // get all appointments
  const getAppointments = async (queryParams) => {
    const data = await apiCall("appointments" , 'GET' , null , queryParams);
    return data;
  };

  // rate an appointment
  const rateAppointment = async (appointmentId, rate) => {
    const data = await apiCall("appointments/rate", "POST", {
      appointmentId,
      rate,
    });
    return data;
  };

  // get the available appointment
  const getAvailableAppointment = async (appointObj) => {
    const data = await apiCall(
      "appointments/available",
      "GET",
      null,
      appointObj
    );
    return data;
  };

  // get the current user appointments
  const getUserAppointments = async () => {
    const data = await apiCall("appointments/user-appointments");
    return data;
  };

  // book an appointment
  const BookAppointment = async (appointObj) => {
    const data = await apiCall("appointments/book", "POST", appointObj);
    return data;
  };
  // delete an appointment
  const deleteAppointment = async (appointId) => {
    const data = await apiCall(`appointments/${appointId}`, "DELETE");
    return data;
  };

  // update the current status of the appointment
  const updateAppointmentStatus = async (appointObj) => {
    const data = await apiCall(
      "appointments/update-status",
      "PATCH",
      appointObj
    );
    return data;
  };

  // create a new appointment
  const PostAppointment = async (appointObj) => {
    const data = await apiCall("appointments", "POST", appointObj);
    return data;
  };
  // unbook a new appointment
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
    updateAppointmentStatus,
    getAppointment,
    getUserAppointments,
    unbook,
    PostAppointment,
    rateAppointment,
    getAvailableAppointment,
    deleteAppointment,
  };
};

export default AppointmentRepository;
