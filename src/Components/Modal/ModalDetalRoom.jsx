import { Card, Col, Image, Modal, Row } from "antd";

const ModalDetalRoom = ({ room, isOpen = false, onClose }) => {
  return (
    <Modal
      title={room.room_name}
      centered
      footer={null}
      open={isOpen}
      onCancel={onClose}
      onOk={onClose}
      width={800}
    >
      <Row gutter={[16, 8]}>
        <Col span={14}>
          <Image src="./view_room.jpg"></Image>
        </Col>
        <Col span={10}>
          <Card
            title={"thông tin chi tiết"}
            style={{ boxShadow: "none", border: "none" }}
          >
            <p>- Tên phòng trọ: {room.room_name}</p>
            <p>- Số lượng tối đa: {room.max_capacity}</p>
            <p>- Tầng: {room.floor_number}</p>
            <p>
              - Diện tích phòng: {room.room_area} m<sup>2</sup>
            </p>
            <p>- Giá thuê: {room.room_price}</p>
            <p>- Thông tin thêm: {room.room_description}</p>
            <p>
              - Trạng thái phòng: {room.is_rented ? "đã thuê" : "chưa thuê"}
            </p>
            {room.is_rented ? <p>- người thuê: {room.customer_name}</p> : <></>}
          </Card>
        </Col>
      </Row>
    </Modal>
  );
};

export default ModalDetalRoom;
