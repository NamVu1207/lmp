import { Button, Col, Flex, Form, Input, Row, Typography } from "antd";

const Confirm = ({ service = {}, date, time }) => {
  return (
    <>
      <Row
        style={{ backgroundColor: "#fef1d8", padding: "8px" }}
        gutter={[0, 24]}
      >
        <Col span={24}>
          <Typography.Title
            level={4}
            style={{ margin: "0px", textAlign: "center" }}
          >
            Xác nhận
          </Typography.Title>
        </Col>
        <Col span={16} offset={4}>
          <Flex justify="space-between" align="center">
            <Typography.Title
              level={5}
              style={{ margin: "0px", textAlign: "center" }}
            >
              Tên dịch vụ:
            </Typography.Title>
            <Typography style={{ fontWeight: "500", fontSize: "1.2rem" }}>
              {service.serv_name}
            </Typography>
          </Flex>
        </Col>
        <Col span={16} offset={4}>
          <Flex justify="space-between" align="center">
            <Typography.Title
              level={5}
              style={{ margin: "0px", textAlign: "center" }}
            >
              Giá tiền:
            </Typography.Title>
            <Typography>
              {service.price} \ {service.unit}
            </Typography>
          </Flex>
        </Col>
        <Col span={16} offset={4}>
          <Flex justify="space-between" align="center">
            <Typography.Title
              level={5}
              style={{ margin: "0px", textAlign: "center" }}
            >
              Ngày:
            </Typography.Title>
            <Typography>{date}</Typography>
          </Flex>
        </Col>
        <Col span={16} offset={4}>
          <Flex justify="space-between" align="center">
            <Typography.Title
              level={5}
              style={{ margin: "0px", textAlign: "center" }}
            >
              Giờ:
            </Typography.Title>
            <Typography>{time}</Typography>
          </Flex>
        </Col>
        <Col span={16} offset={4}>
          <Form.Item name={"note"} label={"Note"}>
            <Input.TextArea></Input.TextArea>
          </Form.Item>
        </Col>
        <Col span={24}>
          <Flex justify="center" align="center">
            <Form.Item>
              <Button
                style={{ backgroundColor: "#f7b420" }}
                type="primary"
                htmlType="submit"
              >
                Confirm
              </Button>
            </Form.Item>
          </Flex>
        </Col>
      </Row>
    </>
  );
};

export default Confirm;
