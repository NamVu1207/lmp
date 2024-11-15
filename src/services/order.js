import { poster } from "./BaseService";

const endPointUser = "/order";

const cpath = (action) => {
  return `${endPointUser}/${action}`;
};

export const load = async (data) => {
  const result = await poster(cpath("load"), data);
  return result;
};

export const confirm = async (datas) => {
  const result = await poster(cpath("confirm"), datas);
  return result;
};

export const save = async (datas) => {
  const result = await poster(cpath("save"), datas);
  return result;
};

export const changePassword = async (datas) => {
  const result = await poster(cpath("changepass"), datas);
  return result;
};
