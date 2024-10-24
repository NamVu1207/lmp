import { isString } from "lodash";

const characters =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

export const generateString = (length) => {
  let result = " ";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
};

export const convertChildToChildren = (obj) => {
  if (typeof obj !== "object" || obj === null) {
    return obj;
  }
  const newObj = Array.isArray(obj) ? [] : {};
  for (const key in obj) {
    const value = obj[key];
    const newKey = key === "child" ? "children" : key;
    newObj[newKey] = convertChildToChildren(value);
  }
  return newObj;
};

export const ensureString = (value) => {
  try {
    if (value !== undefined && value !== null) {
      if (isString(value)) {
        return value;
      } else if (typeof value === "object") {
        return JSON.stringify(value);
      } else {
        return `${value}`;
      }
    }
  } catch (error) {
    return "";
  }
  return "";
};
