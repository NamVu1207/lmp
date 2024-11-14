import React from "react";
import dayjs from "dayjs";
import { Calendar, Col, Form, Row, TimePicker } from "antd";
const DateTimePicker = () => {
  return (
    <Row>
      <Col span={17} offset={3}>
        <Form.Item
          name={"date"}
          rules={[{ required: true, message: "Please input!" }]}
        >
          <Calendar fullscreen={false} />
        </Form.Item>
        <Form.Item
          name={"time"}
          label="Chọn thời gian"
          rules={[{ required: true, message: "Please input!" }]}
        >
          <TimePicker style={{ width: "100%" }} />
        </Form.Item>
      </Col>
    </Row>
  );
};

export default DateTimePicker;
