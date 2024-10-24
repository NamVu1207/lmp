import { message } from "antd";
import { poster } from "./BaseService";

const endPointUser = "/auth";

const cpathUser = (action) => {
  return `${endPointUser}/${action}`;
};

export const Login = async (value) => {
  let result;
  try {
    const res = await poster(cpathUser("login"), {
      username: value.username,
      password: value.password,
    });
    if (res.status === 200) {
      message.success(res.message);
      localStorage.setItem("token", res.access_token);
      return res;
    } else if (res.status === 400) message.warning(res.message);
    return;
  } catch (error) {
    result = error.response.data.ok;
    message.error(error.response.data.message);
    console.log(error);
    return result;
  }
};