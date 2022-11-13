import { useState, useEffect } from "react";
import moment from "moment/moment";
const useHomeData = () => {
  const ApiUrl = "https://saloon-ibra-api.herokuapp.com/api/";
  //   const [state, setState] = useState({
  //     workers: [{ name: "tarik" }, { name: "wissam" }],
  //     appointments: [],
  //   });
  const [workers, setWorkers] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzFiODViNjdmYjkxNjI2M2ZkMzNjMzQiLCJpYXQiOjE2NjgyODE0MjUsImV4cCI6MTY2ODg4NjIyNX0.XiZo1Sy-Z-DF67L14M-2tLP2fhgkK0xPty-btnlkvCo";

  const getWorkers = async () => {
    try {
      let res = await fetch(ApiUrl + "workers", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        method: "GET",
      });
      const dataJ = await res.json();
      setWorkers(dataJ.workers);
    } catch (e) {
      console.log(e);
    }
  };

  const getAppointments = async () => {
    try {
      let res = await fetch(ApiUrl + "appointments", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        method: "GET",
      });
      const dataJ = await res.json();
      setAppointments(dataJ.appointments);
    } catch (e) {
      console.log(e);
    }
  };

  const getWorkingDates = async (workerId) => {
    let date = moment(new Date(), "yyyy-MM-DDTHH:mm:ssZZ");
    let params = {
      workerId: workerId,
      fromData: date,
    };
    // var url = new URL(ApiUrl + "worker/working-dates");
    // url.search = new URLSearchParams(params).toString();
    let query = Object.keys(params)
      .map((k) => encodeURIComponent(k) + "=" + encodeURIComponent(params[k]))
      .join("&");
    let url = ApiUrl + "worker/working-dates" + query;

    try {
      let res = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        // body: JSON.stringify(workerData),
        method: "GET",
      });
      console.log(res);
      const dataJ = await res.json();
      console.log(dataJ);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getWorkers();
    getAppointments();
  }, []);

  return { workers, appointments, getWorkingDates };
};

export default useHomeData;
