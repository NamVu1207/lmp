import { ensureString } from "../utils";
import http from "./AxiosService";

export const fetcher = async (url, params) => {
  if (params && Object.keys(params).length) {
    const searchParams = new URLSearchParams();
    Object.keys(params).forEach((key) => {
      if (params[key] !== undefined && params[key] !== null) {
        searchParams.append(key, ensureString(params[key]));
      }
    });
    url += `${url.includes("?") ? "&" : "?"}${searchParams.toString()}`;
  }
  const { data } = await http.get(url);
  return data;
};

export const poster = async (url, params) => {
  const { data } = await http.post(url, params);
  return data;
};

export const puter = async (url, params) => {
  const { data } = await http.put(url, params);
  return data;
};

export const deleter = async (url, params) => {
  const { data } = await http.delete(url, params);
  return data;
};
