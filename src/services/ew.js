import { message } from "antd";
import { poster } from "./BaseService";

const endPointUser = "/ew";

const cpath = (action) => {
  return `${endPointUser}/${action}`;
};

export const load = async (data) => {
  const result = await poster(cpath("getew"), data);
  return result;
};

export const gethouse = async () => {
  const result = await poster(cpath("listhouse"));
  return result;
};
export const getroom = async () => {
  const result = await poster(cpath("listroom"));
  return result;
};
export const del = async (datas) => {
  const result = await poster(cpath("deleteEw"), datas);
  return result;
};
export const save = async (datas) => {
  const result = await poster(cpath("addew"), datas);
  return result;
};
export const getGroups = async () => {
  const result = await poster(cpath("groups"));
  return result;
};
