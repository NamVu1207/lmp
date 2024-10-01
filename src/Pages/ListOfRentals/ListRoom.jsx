import { Col, Row } from "antd";

import ItemRoom from "./ItemRoom";
import React from "react";

const ListRoom = ({ house = {}, colCounts = 6 }) => {
  return (
    <Row gutter={[24, 24]} style={{ padding: "12px" }}>
      {house.rooms &&
        house.rooms.map((item, index) => {
          return (
            <Col span={24 / colCounts} key={index}>
              <ItemRoom room={item} />
            </Col>
          );
        })}
    </Row>
  );
};

export default ListRoom;
