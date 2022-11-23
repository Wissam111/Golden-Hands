import { apiCall } from "../network/apiCall";

const WorkerRepository = () => {
  const getWorkers = async () => {
    const data = await apiCall("workers");
    return data;
  };

  const getWorker = async (id) => {
    const data = await apiCall(`workers/${id}`);
    return data;
  };
  const getWorkerServices = async (id) => {
    const data = await apiCall(`workers/services/${id}`);
    return data;
  };

  const postService = async (servObj) => {
    const data = await apiCall(`workers/services`, "POST", servObj);
    return data;
  };
  const deleteService = async (servId) => {
    const data = await apiCall(`workers/services/${servId}`, "DELETE");
    return data;
  };

  return {
    getWorkers,
    getWorker,
    getWorkerServices,
    postService,
    deleteService,
  };
};

export default WorkerRepository;
