import moment from "moment/moment";
import { apiCall } from "../network/apiCall";

const WorkerRepository = () => {

  /**
   * get the workers
   * @returns 
   */
  const getWorkers = async () => {
    const data = await apiCall("workers");
    return data;
  };


  /**
   * get worker data with id
   * @param {*} id 
   * @returns 
   */
  const getWorker = async (id) => {
    const data = await apiCall(`workers/${id}`);
    return data;
  };


  /**
   * get worker services
   * @param {*} id 
   * @returns 
   */
  const getWorkerServices = async (id) => {
    const data = await apiCall(`workers/services/${id}`);
    return data;
  };


  const getWorkingDates = async (workerId, fromDate, limit) => {
    const data = await apiCall(`workers/working-dates`, 'GET', null, { workerId: workerId, fromDate: fromDate, timezone: moment(new Date()).format('ZZ'), limit: limit });
    return data;
  }



  /**
   * create a new service
   * @param {*} servObj 
   * @returns 
   */
  const postService = async (servObj) => {
    const data = await apiCall(`workers/services`, "POST", servObj);
    return data;
  };

  /**
   * delete a service from the database
   * @param {*} servId 
   * @returns 
   */
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
    getWorkingDates
  }
}

export default WorkerRepository;
