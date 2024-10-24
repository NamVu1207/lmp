import { message } from "antd";
import { poster } from "./BaseService";

const endPointUser = "/user";

const cpath = (action) => {
  return `${endPointUser}/${action}`;
};

export const load = async (params) => {
  const { department = "", role = "" } = params;
  const formData = {
    department: department,
    role: role,
  };
  const result = await poster(cpath("listusers"), formData);
  return result;
};

export const getDepartments = async () => {
  const result = await poster(cpath("departments"));
  return result;
};
export const save = async (datas) => {
  const result = await poster(cpath("saveuser"), datas);
  return result;
};
export const del = async (datas) => {
  const result = await poster(cpath("deleteuser"), datas);
  return result;
};
export const getGroups = async () => {
  const result = await poster(cpath("groups"));
  return result;
};
