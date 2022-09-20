import axios from "axios";

const axiosInstance = axios.create({
//   baseURL: "http://192.168.100.72:8000/api/v1",
  baseURL: "http://localhost:8000/api/v1",
  timeout: 100000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    config.headers.common["Accept"] = "application/json";
    config.headers.common["Content-Type"] = "application/json";
    const token = window.localStorage.getItem("token");
    if (token !== null || token !== undefined) {
      config.headers.common["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error?.response) {
      if (error?.response.status === 401) {
        localStorage.clear();
        if (window.location.pathname !== "/") {
          // window.location.href = ""
        }
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
