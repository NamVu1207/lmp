import {
  Row,
  Col,
  Card,
  Select,
  Input,
  Button,
  Flex,
  Typography,
  Divider,
  Menu,
} from "antd";

import React from "react";

import { useOutletContext } from "react-router-dom";
import ListRoom from "./ListRoom";

const numberRoomRented = 14;

const MenuItem = [
  {
    house_id: "H01",
    house_name: "green house",
    total_rented: 7,
    total_not_rented: 3,
    rooms: [
      {
        room_id: "A1",
        room_name: "phòng A01",
        max_capacity: 4,
        floor_number: 2,
        room_type: 1,
        room_area: 45,
        is_rented: 0,
        room_price: 4500000,
        room_price_inContract: "",
        room_description: "phòng có ban công rộng, cạnh lối thoát hiểm",
        customer_name: "",
      },
      {
        room_id: "A2",
        room_name: "phòng A02",
        max_capacity: 4,
        floor_number: 1,
        room_type: 1,
        room_area: 45,
        is_rented: 1,
        room_price: 4500000,
        room_price_inContract: 4500000,
        room_description: "phòng có ban công rộng, cạnh lối thoát hiểm",
        customer_name: "Nguyễn Văn A",
      },
    ],
  },
  {
    house_id: "H02",
    house_name: "red house",
    total_rented: 6,
    total_not_rented: 3,
    rooms: [
      {
        room_id: "B1",
        room_name: "phòng 01",
        max_capacity: 4,
        floor_number: 2,
        room_type: 1,
        room_area: 45,
        is_rented: 0,
        room_price: 4500000,
        room_price_inContract: "",
        room_description: "phòng có ban công rộng, cạnh lối thoát hiểm",
        customer_name: "",
      },
      {
        room_id: "B2",
        room_name: "phòng 02",
        max_capacity: 4,
        floor_number: 1,
        room_type: 1,
        room_area: 45,
        is_rented: 1,
        room_price: 4500000,
        room_price_inContract: 4200000,
        room_description: "phòng có ban công rộng, cạnh lối thoát hiểm",
        customer_name: "Nguyễn Văn B",
      },
      {
        room_id: "B3",
        room_name: "phòng 03",
        max_capacity: 2,
        floor_number: 1,
        room_type: 1,
        room_area: 22,
        is_rented: 1,
        room_price: 3500000,
        room_price_inContract: 3200000,
        room_description: "phòng có ban công rộng, cạnh lối thoát hiểm",
        customer_name: "Nguyễn Văn C",
      },
      {
        room_id: "B1",
        room_name: "phòng 01",
        max_capacity: 4,
        floor_number: 2,
        room_type: 1,
        room_area: 45,
        is_rented: 0,
        room_price: 4500000,
        room_price_inContract: "",
        room_description: "phòng có ban công rộng, cạnh lối thoát hiểm",
        customer_name: "",
      },
      {
        room_id: "B2",
        room_name: "phòng 02",
        max_capacity: 4,
        floor_number: 1,
        room_type: 1,
        room_area: 45,
        is_rented: 1,
        room_price: 4500000,
        room_price_inContract: 4200000,
        room_description: "phòng có ban công rộng, cạnh lối thoát hiểm",
        customer_name: "Nguyễn Văn B",
      },
      {
        room_id: "B3",
        room_name: "phòng 03",
        max_capacity: 2,
        floor_number: 1,
        room_type: 1,
        room_area: 22,
        is_rented: 1,
        room_price: 3500000,
        room_price_inContract: 3200000,
        room_description: "phòng có ban công rộng, cạnh lối thoát hiểm",
        customer_name: "Nguyễn Văn C",
      },
      {
        room_id: "B1",
        room_name: "phòng 01",
        max_capacity: 4,
        floor_number: 2,
        room_type: 1,
        room_area: 45,
        is_rented: 0,
        room_price: 4500000,
        room_price_inContract: "",
        room_description: "phòng có ban công rộng, cạnh lối thoát hiểm",
        customer_name: "",
      },
      {
        room_id: "B2",
        room_name: "phòng 02",
        max_capacity: 4,
        floor_number: 1,
        room_type: 1,
        room_area: 45,
        is_rented: 1,
        room_price: 4500000,
        room_price_inContract: 4200000,
        room_description: "phòng có ban công rộng, cạnh lối thoát hiểm",
        customer_name: "Nguyễn Văn B",
      },
      {
        room_id: "B3",
        room_name: "phòng 03",
        max_capacity: 2,
        floor_number: 1,
        room_type: 1,
        room_area: 22,
        is_rented: 1,
        room_price: 3500000,
        room_price_inContract: 3200000,
        room_description: "phòng có ban công rộng, cạnh lối thoát hiểm",
        customer_name: "Nguyễn Văn C",
      },
    ],
  },
];

const ListOfRentals = () => {
  const [title, setTitle] = useOutletContext();
  const [array, setArray] = React.useState([]);
  const [menuKey, setMenuKey] = React.useState();
  const [houseSelected, setHouseSelected] = React.useState([]);
  const [totalRented, setTotalRented] = React.useState();
  const [totalNotRented, setTotalNotRented] = React.useState();

  React.useEffect(() => {
    setTitle("Phòng trọ");
  }, []);

  React.useEffect(() => {
    setTotalRented(
      MenuItem.reduce((acc, item) => {
        return acc + item.total_rented;
      }, 0)
    );
    setTotalNotRented(
      MenuItem.reduce((acc, item) => {
        return acc + item.total_not_rented;
      }, 0)
    );
    setArray(convertArray(MenuItem));
    setMenuKey(MenuItem[0].house_id);
    setHouseSelected(MenuItem[0]);
  }, []);

  const convertArray = (arr) => {
    return arr.map((item) => ({
      label: item.house_name,
      key: item.house_id,
    }));
  };

  const handleChange = () => {};

  const onClick = (e) => {
    setMenuKey(e.key);
    setHouseSelected(MenuItem.find((item) => item.house_id === e.key));
  };

  return (
    <Row gutter={[8, 16]}>
      <Col span={24}>
        <Card style={{ padding: "12px" }}>
          <Row gutter={[8, 8]}>
            <Col span={24}>
              <Flex gap="middle">
                <Select
                  placeholder="trạng thái phòng"
                  style={{
                    width: 160,
                  }}
                  allowClear
                  onChange={handleChange}
                  options={[
                    {
                      value: "0",
                      label: "chưa thuê",
                    },
                    {
                      value: "1",
                      label: "đã thuê",
                    },
                  ]}
                />
                <Select
                  placeholder="trạng thái phí"
                  style={{
                    width: 160,
                  }}
                  allowClear
                  onChange={handleChange}
                  options={[
                    {
                      value: "0",
                      label: "chưa thanh toán",
                    },
                    {
                      value: "1",
                      label: "đã thanh toán",
                    },
                  ]}
                />
                <Input
                  style={{ width: "160px" }}
                  placeholder="Tên phòng"
                ></Input>
                <Button type="primary" onClick={() => console.log(array)}>
                  Tìm kiếm
                </Button>
              </Flex>
            </Col>
            <Col>
              <Flex align="center">
                <Typography> đã thuê: {totalRented}</Typography>
                <Divider type="vertical" />
                <Typography> chưa thuê: {totalNotRented}</Typography>
                <Divider type="vertical" />
                <Typography> chưa thu phí: {numberRoomRented}</Typography>
              </Flex>
            </Col>
          </Row>
        </Card>
      </Col>
      <Col span={24}>
        <Card style={{ padding: "12px" }}>
          <Row>
            <Col span={24}>
              <Menu
                onClick={onClick}
                selectedKeys={[menuKey]}
                mode="horizontal"
                items={array}
              />
            </Col>
            <Col span={24}>
              <ListRoom house={houseSelected}></ListRoom>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  );
};

export default ListOfRentals;
