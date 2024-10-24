import { message } from "antd";
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
