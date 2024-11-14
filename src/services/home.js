import { poster } from "./BaseService";

const endPointUser = "/home";

const cpath = (action) => {
  return `${endPointUser}/${action}`;
};

export const getListCity = async () => {
  const result = await poster(cpath("listcity"));
  return result;
};

export const getListhouse = async (city) => {
  const result = await poster(cpath("listhouse"), city);
  return result;
};

export const getRoom = async (houseId) => {
  const result = await poster(cpath("getroom"), houseId);
  return result;
};

export const booking = async (data) => {
  const result = await poster(cpath("booking"), data);
  return result;
};
