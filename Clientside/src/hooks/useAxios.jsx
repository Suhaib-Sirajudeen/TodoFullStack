import { useEffect, useState } from "react";
import axios from "../apis/todoApi.js";

export const useAxios = () => {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState([]);
  const [controller, setController] = useState();
  const [err, setErr] = useState();

  const axiosFetch = async (config) => {
    const { axiosInstance, method, url, reqConfiq = {} } = config;
    try {
      setLoading(true);
      const ctrl = new AbortController();
      setController(ctrl);
      const res = await axiosInstance[method.toLowerCase()](url, {
        ...reqConfiq,
        signal: ctrl.signal,
      });
      setResponse(res.data);
      console.log(res.data);
    } catch (e) {
      setErr(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    return () => controller && controller.abort();

    // Terminate the api call to prevnet memory leak
  }, [controller]);

  return [response, loading, err, axiosFetch];
};
