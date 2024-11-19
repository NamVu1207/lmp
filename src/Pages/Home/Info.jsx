import React from "react";
import { Card, Col, Flex, Menu, Row, Select, Typography } from "antd";
import { getCity, getDistrict, getWard } from "../../services/address";
import { getListCity, getListhouse } from "../../services/home";
import ItemHouse from "./ItemHouse";

const Info = () => {
  const [locationData, setLocationData] = React.useState({
    city: [],
    district: [],
    ward: [],
    selectedCity: "",
    // selectedKey: "",
  });

  const [selectedKey, setSelectedKey] = React.useState("");
  const [menuItems, setMenuItems] = React.useState([]);
  const [houses, setHouses] = React.useState([]);
  const [listHouse, setListHouse] = React.useState([]);

  React.useEffect(() => {
    // Khởi tạo dữ liệu thành phố và quận khi component mount
    getCityData();
  }, []);

  React.useEffect(() => {
    if (locationData.district.length > 0) {
      getValidDistrict();
    }
  }, [locationData.district, locationData.selectedCity]);

  React.useEffect(() => {
    // Lọc các nhà khi thay đổi selectedKey (quận)
    setHouses(listHouse.filter((item) => item.district === selectedKey));
    getWardData(selectedKey);
  }, [selectedKey, listHouse]);

  React.useEffect(() => {}, [locationData.ward]);

  const getCityData = async () => {
    const result = await getCity();
    const validCity = await getListCity();
    console.log("validCity", validCity);

    setLocationData((prev) => ({
      ...prev,
      selectedCity: validCity.data[0].city,
    }));
    getDistrictData(validCity.data[0].city);

    const filteredCities = filterData(result.data, validCity.data, "city");
    console.log(formatLocationData(filteredCities));
    setLocationData((prev) => ({
      ...prev,
      city: formatLocationData(filteredCities),
    }));
  };

  const getDistrictData = async (cityId) => {
    const result = await getDistrict(cityId);
    setLocationData((prev) => ({
      ...prev,
      district: formatLocationData(result.data),
    }));
  };

  const getWardData = async (id) => {
    const result = await getWard(id);
    setLocationData((prev) => ({
      ...prev,
      ward: formatLocationData(result.data),
    }));
  };

  const getValidDistrict = async () => {
    const result = await getListhouse({ city: locationData.selectedCity });
    const filteredDistricts = filterData(
      locationData.district,
      result.data,
      "district"
    );
    const menu = formatMenuItems(filteredDistricts, "Quận");
    setListHouse(result.data);
    setMenuItems(menu);
    setSelectedKey(menu[0]?.key);
  };

  // Hàm lọc dữ liệu chung
  const filterData = (source, target, key) =>
    source.filter((item) =>
      target.some(
        (obj) => (item.id !== undefined ? item.id : item.value) === obj[key]
      )
    );

  // Hàm định dạng dữ liệu thành phố/quận/phường
  const formatLocationData = (data) =>
    data.map((item) => ({ label: item.name, value: item.id }));

  // Hàm định dạng item cho menu
  const formatMenuItems = (data, prefix) =>
    data.map((item) => ({
      label: `${prefix} ${item.label}`,
      key: item.value,
    }));

  // Xử lý khi thay đổi thành phố
  const onChangeCity = async (cityId) => {
    await getDistrictData(cityId);
    setLocationData((prev) => ({
      ...prev,
      selectedCity: cityId,
    }));
  };

  // Xử lý khi chọn quận
  const onSelectKey = (e) => {
    setSelectedKey(e.key);
  };
  return (
    <Row gutter={[0, 50]} style={{ padding: "50px 0px" }}>
      <Col offset={6} span={12}>
        <Card style={{ height: "60px" }}>
          <Flex
            style={{ height: "100%", padding: "0px 30px" }}
            align="center"
            justify="space-between"
          >
            <Menu
              items={menuItems}
              selectedKeys={[selectedKey]}
              onClick={onSelectKey}
              mode="horizontal"
              style={{ width: "100%" }}
            />
            <Select
              value={locationData.selectedCity}
              showSearch
              placeholder={"Chọn thành phố"}
              style={{ width: "160px" }}
              options={locationData.city}
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              onChange={onChangeCity}
            ></Select>
          </Flex>
        </Card>
      </Col>
      <Col offset={6} span={12}>
        {houses.map((item, index) => {
          return (
            <ItemHouse
              key={index}
              house={item}
              district={locationData.district}
              ward={locationData.ward}
              city={locationData.city}
            />
          );
        })}
      </Col>
    </Row>
  );
};

export default Info;
