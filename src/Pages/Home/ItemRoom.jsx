import React from "react";
import {
  Button,
  Card,
  Col,
  Divider,
  Image,
  message,
  Modal,
  Row,
  Typography,
} from "antd";
import {
  HomeOutlined,
  DollarOutlined,
  TeamOutlined,
  UserOutlined,
  ExclamationCircleFilled,
} from "@ant-design/icons";
import ModalDetalRoom from "../../Components/Modal/ModalDetalRoom";
import ModalCreateContract from "../../Components/Modal/ModalCreateContract";
import { cancelrent, deleteRoom } from "../../services/room";
import ModalBooking from "../../Components/Modal/ModalBooking";

const ItemRoom = ({ room, handleLoad }) => {
  const [isDetailOpen, setIsDetailOpen] = React.useState(false);
  const [info, setInfo] = React.useState([]);
  const [isBookingOpen, setIsBookingOpen] = React.useState(false);
  React.useEffect(() => {
    setInfo([
      {
        icon: <HomeOutlined />,
        label: room.name !== undefined ? room.name : room.room_name,
      },
      {
        icon: <TeamOutlined />,
        label: room.capacity,
      },
      {
        icon: <DollarOutlined />,
        label: room.is_rented === "rented" ? room.price_inContract : room.price,
      },
    ]);
  }, [room]);
  return (
    <>
      <Card
        style={{
          backgroundColor: "white",
          height: "fit-content",
          padding: "12px",
          borderRadius: "8px",
        }}
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
          <Divider style={{ borderColor: "gray", margin: "16px 0" }} />
          <Col span={12}>
            <Button
              type="primary"
              style={{ width: "100%", backgroundColor: "#6f27db" }}
              onClick={(e) => {
                setIsDetailOpen(true);
              }}
            >
              More details
            </Button>
          </Col>
          <Col span={12}>
            <Button
              type="primary"
              style={{ width: "100%" }}
              danger
              onClick={(e) => {
                setIsBookingOpen(true);
              }}
            >
              Booking
            </Button>
          </Col>
        </Row>
      </Card>
      <ModalDetalRoom
        room={room}
        isOpen={isDetailOpen}
        onClose={() => {
          setIsDetailOpen(false);
        }}
      />
      <ModalBooking
        room={room}
        isOpen={isBookingOpen}
        onClose={() => {
          setIsBookingOpen(false);
        }}
      />
    </>
  );
};

export default ItemRoom;
