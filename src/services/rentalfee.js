import { poster } from "./BaseService";

const endPointUser = "/rentalfee";

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

export const loadbill = async (data) => {
  const result = await poster(cpath("loadbill"), data);
  return result;
};
export const submitbill = async (data) => {
  const result = await poster(cpath("submitbill"), { data: data });
  return result;
};

export const load = async (data) => {
  const result = await poster(cpath("load"), data);
  return result;
};

export const del = async (datas) => {
  const result = await poster(cpath("delete"), datas);
  return result;
};
