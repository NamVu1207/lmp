import { poster } from "./BaseService";

const endPointUser = "/listroom";

const cpath = (action) => {
  return `${endPointUser}/${action}`;
};

export const gethouse = async () => {
  const result = await poster(cpath("listhouse"));
  return result;
};

export const getserv = async () => {
  const result = await poster(cpath("listserv"));
  return result;
};

export const loadrs = async () => {
  const result = await poster(cpath("loadrs"));
  return result;
};

export const load = async (data) => {
  const result = await poster(cpath("load"), data);
  return result;
};

export const save = async (datas) => {
  const result = await poster(cpath("save"), datas);
  return result;
};

export const del = async (datas) => {
  const result = await poster(cpath("delete"), datas);
  return result;
};
