import { Button, Col, Empty, message, Row } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";

import ItemRoom from "./ItemRoom";
import React from "react";
import ModalCreateRoom from "../../Components/Modal/ModalCreateRoom";
import { addroom } from "../../services/room";

const ListRoom = ({ house = {}, colCounts = 6, handleLoad}) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const handleAddRoom = async (val, house_id) => {
    const data = { ...val, house_id: Number(house_id) };
    const result = await addroom([data]);
    if (result.success) {
      message.success(result.message);
      handleLoad();
    } else message.warning(result.message);
  };
  return (
    <>
        <Row gutter={[24, 24]} style={{ padding: "12px" }}>
          { Object.keys(house).length === 0 || house.rooms[0].no_room ? (
            <></>
          ) : (
            house.rooms.map((item) => {
              return (
                <Col span={24 / colCounts} key={item.id}>
                  <ItemRoom room={item} handleLoad={handleLoad}/>
                </Col>
              );
            })
          )}
          <Col span={24 / colCounts}>
            <Button
              style={{ width: "100%", height: "100%" }}
              icon={
                <PlusCircleOutlined
                  style={{ fontSize: "60px", color: "#cdcdcd" }}
                />
              }
              onClick={showModal}
            />
          </Col>
        </Row>
      <ModalCreateRoom
        house={house}
        isOpen={isModalOpen}
        onClose={closeModal}
        handleAddRoom={handleAddRoom}
      />
    </>
  );
};

export default ListRoom;
