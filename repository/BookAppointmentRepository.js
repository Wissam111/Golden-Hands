import { apiCall } from "../network/apiCall";

const BookAppointmentRepository = (appointObj) => {
  const BookAppointment = async () => {
    const data = await apiCall("appointments/book", "POST", appointObj);
    return data;
  };

  return { BookAppointment };
};

export default BookAppointmentRepository;
