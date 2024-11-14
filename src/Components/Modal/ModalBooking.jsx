import {
  Button,
  Col,
  DatePicker,
  Flex,
  Form,
  Input,
  message,
  Modal,
  Row,
  Typography,
} from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import React from "react";
import { booking } from "../../services/home";
import { result } from "lodash";

const ModalBooking = ({ room, isOpen = true, onClose }) => {
  const [form] = Form.useForm();
  React.useEffect(() => {}, [room]);
  const confirm = () => {
    Modal.confirm({
      title: "Xác nhận",
      icon: <ExclamationCircleOutlined />,
      content:
        "Xác nhận sẽ đăng ký cọc, vui lòng thanh toán để hoàn thành đăng ký",
      onOk: () => {
        Booking(form.getFieldsValue());
      },
    });
  };
  const Booking = async (formValue) => {
    const data = { ...formValue, room_id: room.id, price: room.price };
    const result = await booking({ data: data });
    if (result.data.success) {
      message.success(result.data.message);
      Modal.destroyAll();
      onClose();
    } else message.warning(result.data.message);
  };
  return (
    <Modal
      title={room.room_name}
      footer={null}
      open={isOpen}
      onCancel={onClose}
      width={800}
    >
      <Form form={form} onFinish={confirm}>
        <Row gutter={[16, 8]}>
          <Col span={24}>
            <Form.Item>
              <Typography style={{ color: "red", fontSize: "1.3rem" }}>
                *Lưu ý:
              </Typography>
              <Typography style={{ color: "red", fontSize: "1.2rem" }}>
                - Booking sẽ không trả lại, nên bạn chỉ cọc khi đã chắc chắn sẽ
                thuê.
              </Typography>
              <Typography style={{ color: "red", fontSize: "1.2rem" }}>
                - Nếu phân vân hoặc cần thông tin chi tiết, bạn có thể liên hệ
                để xem phòng trực tiếp trước khi quyết định cọc phòng.
              </Typography>
              <Typography style={{ color: "red", fontSize: "1.2rem" }}>
                - Số tiền cọc là một tháng tiền phòng.
              </Typography>
              <Typography style={{ color: "red", fontSize: "1.2rem" }}>
                - Thời gian làm việc từ: 7h - 20h.
              </Typography>
              <Typography style={{ fontSize: "1rem" }}>
                ( Sau khi cọc sẽ có quản lý liên hệ với bạn để xác nhận thông
                tin và hẹn lịch cụ thể. Trân trọng cảm ơn )
              </Typography>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name={"cus_name"}
              label={"Họ và tên"}
              rules={[{ required: true, message: "Please input!" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name={"cus_phone"}
              label={"SĐT"}
              rules={[{ required: true, message: "Please input!" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name={"price"}
              label={"Số tiền cọc"}
              initialValue={new Intl.NumberFormat().format(room.price)}
            >
              <Input disabled />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name={"target_date"}
              label={"Ngày hẹn"}
              rules={[{ required: true, message: "Please input!" }]}
            >
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Flex justify="flex-end">
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Xác nhận cọc
                </Button>
              </Form.Item>
            </Flex>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default ModalBooking;
