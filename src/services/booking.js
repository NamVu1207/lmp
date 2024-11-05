import { poster } from "./BaseService";

const endPointUser = "/booking";

const cpath = (action) => {
  return `${endPointUser}/${action}`;
};

export const gethouse = async () => {
  const result = await poster(cpath("listhouse"));
  return result;
};
export const getroom = async () => {
  const result = await poster(cpath("listroom"));
  return result;
};

export const checkroom = async (data) => {
  const result = await poster(cpath("roomvalid"), data);
  return result;
};

export const del = async (datas) => {
  const result = await poster(cpath("deleteBooking"), datas);
  return result;
};

export const load = async (data) => {
  const result = await poster(cpath("getbooking"), data);
  return result;
};

export const save = async (datas) => {
  const result = await poster(cpath("addbooking"), datas);
  return result;
};
