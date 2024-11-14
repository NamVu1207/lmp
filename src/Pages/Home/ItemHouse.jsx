import { Card, Col, Flex, Row, Typography } from "antd";
import React from "react";
import { getRoom } from "../../services/home";
import ItemRoom from "./ItemRoom";

const ItemHouse = ({ house, district = [], ward = [], city = [] }) => {
  const [listRomm, setListRoom] = React.useState([]);
  React.useEffect(() => {
    getListRoom();
  }, [house]);
  const getListRoom = async () => {
    const result = await getRoom({ houseId: house.id });
    setListRoom(result.data);
  };
  const findLabel = (list, value) =>
    list.find((item) => item.value === value)?.label || "Không rõ";
  return (
    <Row>
      <Col span={24}>
        <Card style={{ height: "200px" }}>
          <Flex>
            <img style={{ height: "200px" }} src="./houseTheme.jpg"></img>
            <Row style={{ paddingLeft: "40px" }}>
              <Col span={24}>
                <Typography style={{ fontSize: "1.6rem" }}>
                  Tên nhà: {house.house_name}
                </Typography>
              </Col>
              <Col span={24}>
                <Typography style={{ fontSize: "1.4rem" }}>
                  Địa chỉ: {house.house_address}, Phường{" "}
                  {findLabel(ward, house.ward)}, Quận{" "}
                  {findLabel(district, house.district)}, Thành phố{" "}
                  {findLabel(city, house.city)}
                </Typography>
              </Col>
              <Col span={24}>
                <Typography style={{ fontSize: "1.4rem" }}>
                  Quản lý: {house.manager_name || "Không rõ"}
                </Typography>
              </Col>
              <Col span={24}>
                <Typography style={{ fontSize: "1.4rem" }}>
                  Liên hệ: {house.contact || "Không có thông tin"}
                </Typography>
              </Col>
            </Row>
          </Flex>
        </Card>
      </Col>
      <Col span={24}>
        <Row gutter={[24, 24]} style={{ padding: "12px" }}>
          {listRomm.map((item) => {
            return (
              <Col span={6} key={item.id}>
                <ItemRoom room={item} />
              </Col>
            );
          })}
        </Row>
      </Col>
    </Row>
  );
};

export default ItemHouse;
