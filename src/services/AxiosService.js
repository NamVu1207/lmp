import axios from "axios";
import { UNAUTHORIZED_ERROR } from "../constants/errors";

const http = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

http.interceptors.request.use(async (config) => {
  const token = localStorage.getItem("token");
  const header = {
    Accept: "application/json",
    Authorization: `Bearer ${token ?? ""}`,
  };

  config.headers = header;
  return config;
});

http.interceptors.response.use(undefined, function (error) {
  if (
    error &&
    error.response &&
    error.response.status === UNAUTHORIZED_ERROR.status
  ) {
    window.location.href = "/login";
  }
});

export default http;
