import { useEffect, useState } from "react";

export const useAxios = () => {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState([]);
  const [controller, setController] = useState();
  const [msg, setMsg] = useState();
  const [status, setStatus] = useState();

  const axiosFetch = async (config) => {
    const { axiosInstance, method, url, reqConfiq = {} } = config;
    try {
      setLoading(true);
      const ctrl = new AbortController();
      setController(ctrl);
      if ((method === "post" || "put" || "delete") && method !== "get") {
        const res = await axiosInstance[method.toLowerCase()](url, {
          ...reqConfiq,
          signal: ctrl.signal,
        });
        if (res.status === 200) {
          setStatus(res.status);
          setMsg(res.data);
        }
        console.log(res, "othermethod");
      } else {
        const res = await axiosInstance[method.toLowerCase()](url, {
          ...reqConfiq,
          signal: ctrl.signal,
        });
        if (res.status === 200) {
          setResponse(res.data);
          setStatus(res.status);
        }
        console.log(res, "get");
      }
    } catch (e) {
      if (res.status === 404) {
        setMsg(res.data.message);
      } else {
        setMsg(e);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    return () => controller && controller.abort();

    // Terminate the api call to prevnet memory leak
  }, [controller]);

  return [response, loading, msg, status, axiosFetch];
};
