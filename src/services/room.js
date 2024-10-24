import { message } from "antd";
import { poster } from "./BaseService";
import { Content } from "antd/es/layout/layout";

const endPointUser = "/rooms";

const cpath = (action) => {
  return `${endPointUser}/${action}`;
};

export const load = async (params) => {
  const { is_rented = "", room_name = "" } = params;
  const formData = {
    is_rented: is_rented,
    room_name: room_name,
  };
  const result = await poster(cpath("getroom"), formData);
  return result;
};
export const addhouse = async (datas) => {
  const result = await poster(cpath("addhouse"), datas);
  return result;
};
export const addroom = async (datas) => {
  const result = await poster(cpath("addroom"), datas);
  return result;
};
export const deleteRoom = async (id) => {
  const result = await poster(cpath("deleteroom"), { data: id });
  return result;
};
export const deleteHouse = async (id) => {
  const result = await poster(cpath("deletehouse"), { data: id });
  return result;
};

export const addcontract = async (data) => {
  const result = await poster(cpath("addcontract"), data);
  return result;
};

export const cancelrent = async (id) => {
  const result = await poster(cpath("cancelrent"), { data: id });
  return result;
};
