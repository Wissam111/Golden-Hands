import { apiCall } from "../network/apiCall";

const BookAppointmentRepository = () => {
  const BookAppointment = async (appointObj) => {
    const data = await apiCall("appointments/book", "POST", appointObj);
    return data;
  };

  const unBookAppointment = async (appointObj) => {
    const data = await apiCall("appointments/unbook", "POST", appointObj);
    return data;
  };
  return { BookAppointment, unBookAppointment };
};

export default BookAppointmentRepository;
