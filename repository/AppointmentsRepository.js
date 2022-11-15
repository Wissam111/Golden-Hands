import { apiCall } from "../network/apiCall";

const AppointmentsRepository = () => {
  const getAppointments = async () => {
    const data = await apiCall("appointments");
    return data;
  };

  return { getAppointments };
};

export default AppointmentsRepository;
