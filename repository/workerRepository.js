import { apiCall } from "../network/apiCall";

const WorkerRepository = () => {
  const getWorkers = async () => {
    const data = await apiCall("workers");
    return data;
  };

  return { getWorkers };
};

export default WorkerRepository;
