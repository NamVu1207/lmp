import React from "react";
import {
  Button,
  Card,
  Col,
  Divider,
  Image,
  Modal,
  Row,
  Typography,
} from "antd";
import {
  HomeOutlined,
  DollarOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import ModalDetalRoom from "../../Components/Modal/ModalDetalRoom";

const ItemRoom = ({ room }) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [info, setInfo] = React.useState([]);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  React.useEffect(() => {
    setInfo([
      {
        icon: <HomeOutlined />,
        label: room.room_name,
      },
      {
        icon: <TeamOutlined />,
        label: room.max_capacity,
      },
      {
        icon: <UserOutlined />,
        label: room.customer_name,
      },
      {
        icon: <DollarOutlined />,
        label: room.is_rented ? room.room_price_inContract : room.room_price,
      },
    ]);
  }, [room]);
  return (
    <>
      <Card
        style={{
          backgroundColor: room.is_rented ? "#a7ecdc" : "white",
          height: "fit-content",
          padding: "12px",
          borderRadius: "8px",
        }}
        onClick={showModal}
      >
        <Row gutter={[8, 8]}>
          {info.map((item, index) => {
            return (
              <Col span={24} key={index}>
                <Typography
                  style={{
                    fontSize: index === info.length - 1 ? "22px" : "18px",
                  }}
                >
                  {item.icon}
                  <span style={{ padding: "0 4px" }} />
                  {item.label}
                </Typography>
              </Col>
            );
          })}
        </Row>
        <Divider style={{ borderColor: "gray" }} />
        <Button
          style={{ width: "100%" }}
          disabled={room.is_rented ? true : false}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          Làm hợp đồng
        </Button>
      </Card>
      <ModalDetalRoom room={room} isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
};

export default ItemRoom;
