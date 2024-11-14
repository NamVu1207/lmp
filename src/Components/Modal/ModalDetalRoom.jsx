import { Card, Col, Image, Modal, Row } from "antd";
import imgroom from "../../assets/view_room.jpg";

const ModalDetalRoom = ({ room, isOpen = false, onClose }) => {
  // const imgroom = "./view_room.jpg";
  return (
    <Modal
      title={room.name}
      centered
      footer={null}
      open={isOpen}
      onCancel={onClose}
      onOk={onClose}
      width={800}
    >
      <Row gutter={[16, 8]}>
        <Col span={14}>
          <Image src={imgroom}></Image>
        </Col>
        <Col span={10}>
          <Card
            title={"thông tin chi tiết"}
            style={{ boxShadow: "none", border: "none" }}
          >
            <p>- Tên phòng trọ: {room.name}</p>
            <p>- Số lượng tối đa: {room.capacity}</p>
            <p>- Tầng: {room.floor}</p>
            <p>
              - Diện tích phòng: {room.area} m<sup>2</sup>
            </p>
            <p>- Giá thuê: {room.price}</p>
            <p>- Thông tin thêm: {room.description}</p>
            <p>
              - Trạng thái phòng:{" "}
              {room.is_rented === "rented"
                ? "đã thuê"
                : room.is_rented === "available"
                ? "chưa thuê"
                : "đã đặt cọc"}
            </p>
            {room.is_rented === "rented" ? (
              <p>- người thuê: {room.customer_name}</p>
            ) : (
              <></>
            )}
          </Card>
        </Col>
      </Row>
    </Modal>
  );
};

export default ModalDetalRoom;
