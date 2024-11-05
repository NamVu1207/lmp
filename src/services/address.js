import axios from "axios";

const baseURL = import.meta.env.VITE_API_ADDRESS_URL;

export const getCity = async () => {
  const result = await axios.get(`${baseURL}/1/0.htm`);
  return result.data;
};

export const getDistrict = async (id) => {
  const result = await axios.get(`${baseURL}/2/${id}.htm`);
  return result.data;
};

export const getWard = async (id) => {
  const result = await axios.get(`${baseURL}/3/${id}.htm`);
  return result.data;
};

export const getFullAddr = async (id) => {
  const result = await axios.get(`${baseURL}/4/0.htm`);
  const city = result.data.data.map((item) => ({
    label: item.name,
    value: item.id,
  }));
  let district = [];
  let ward = [];
  result.data.data.map((item) => {
    item.data2.map((dist) => {
      district.push({
        city: item.id,
        label: dist.name,
        value: dist.id,
      });
      dist.data3.map((wd) => {
        ward.push({ district: dist.id, label: wd.name, value: wd.id });
      });
    });
  });
  return { city: city, district: district, ward: ward };
};
