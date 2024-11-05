import { poster } from "./BaseService";

const endPointUser = "/house";

const cpath = (action) => {
  return `${endPointUser}/${action}`;
};

export const load = async (data) => {
  const result = await poster(cpath("load"), data);
  return result;
};

export const employee = async () => {
  const result = await poster(cpath("employee"));
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
