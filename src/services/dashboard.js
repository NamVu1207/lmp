import { poster } from "./BaseService";

const endPointUser = "/dashboard";

const cpath = (action) => {
  return `${endPointUser}/${action}`;
};

export const expenses = async (year) => {
  const result = await poster(cpath("expenses"), { year: year });
  return result;
};

export const roomCount = async () => {
  const result = await poster(cpath("roomcount"));
  return result;
};

export const booking = async () => {
  const result = await poster(cpath("booking"));
  return result;
};
