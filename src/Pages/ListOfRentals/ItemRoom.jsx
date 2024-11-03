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

const ItemRoom = ({ room, handleLoad }) => {
  const [isDetailOpen, setIsDetailOpen] = React.useState(false);
  const [isContractOpen, setIsContractOpen] = React.useState(false);
  const [info, setInfo] = React.useState([]);
  React.useEffect(() => {
    setInfo([
      {
        icon: <HomeOutlined />,
        label: room.name,
      },
      {
        icon: <TeamOutlined />,
        label: room.capacity,
      },
      {
        icon: <UserOutlined />,
        label: room.customer_name,
      },
      {
        icon: <DollarOutlined />,
        label: room.is_rented === "rented" ? room.price_inContract : room.price,
      },
    ]);
  }, [room]);

  const handleDeleteRoom = async () => {
    const result = await deleteRoom(room.id);
    if (result.success) {
      message.success(result.message);
      handleLoad();
    } else message.warning(result.message);
  };

  const handleCancelRent = async () => {
    const result = await cancelrent(room.id);
    if (result.success) {
      message.success(result.message);
      handleLoad();
    } else message.warning(result.message);
  };

  const showDeleteConfirm = (onOk) => {
    Modal.confirm({
      title: "Cảnh báo",
      icon: <ExclamationCircleFilled />,
      content: "Thực hiện sẽ xóa các dự liệu có liên quan",
      okText: "Xác nhận",
      okType: "danger",
      cancelText: "hủy",
      onOk() {
        onOk();
      },
      onCancel() {
        return;
      },
    });
  };

  return (
    <>
      <Card
        style={{
          backgroundColor:
            room.is_rented === "rented"
              ? "#a7ecdc"
              : room.is_rented === "booking"
              ? "#ebc034"
              : "white",
          height: "fit-content",
          padding: "12px",
          borderRadius: "8px",
        }}
        onClick={() => {
          setIsDetailOpen(true);
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
            {room.is_rented === "rented" ? (
              <Button
                type="primary"
                style={{ width: "100%", backgroundColor: "#6f27db" }}
                onClick={(e) => {
                  e.stopPropagation();
                  showDeleteConfirm(handleCancelRent);
                }}
              >
                ngừng thuê
              </Button>
            ) : (
              <Button
                style={{ width: "100%" }}
                onClick={(e) => {
                  e.stopPropagation();
                  setIsContractOpen(true);
                }}
              >
                Làm hợp đồng
              </Button>
            )}
          </Col>
          <Col span={12}>
            <Button
              type="primary"
              style={{ width: "100%" }}
              danger
              onClick={(e) => {
                e.stopPropagation();
                showDeleteConfirm(handleDeleteRoom);
              }}
            >
              xóa phòng
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
      <ModalCreateContract
        room={room}
        isOpen={isContractOpen}
        onClose={() => {
          setIsContractOpen(false);
        }}
        handleLoad={handleLoad}
      />
    </>
  );
};

export default ItemRoom;
