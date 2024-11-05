import { Col, Flex, Form, message, Modal, Row, Select } from "antd";
import React from "react";

const ModalAddData = ({ handleAdd, isOpen = false, onOpen, config = [], width = 550 }) => {
  const [form] = Form.useForm();
  return (
    <Modal
      width={width}
      title="Thêm dòng"
      open={isOpen}
      onOk={() => {
        form.submit();
        const obj = form.getFieldsValue();
        if (Object.keys(obj).some((key) => obj[key] === undefined))
          message.warning("vui lòng điền đầy đủ");
        else {
          handleAdd(obj);
        }
      }}
      onCancel={() => {
        onOpen(false);
      }}
    >
      <Form form={form}>
        <Flex justify="center">
          <Row gutter={[8, 0]}>
            {config.map((item, index) => {
              return (
                <Col key={index}>
                  <Form.Item
                    name={item.name}
                    label={item.label}
                    rules={[{ required: true, message: "Please input!" }]}
                  >
                    <Select
                      allowClear
                      showSearch
                      filterOption={(input, option) =>
                        (option?.label ?? "")
                          .toLowerCase()
                          .includes(input.toLowerCase())
                      }
                      style={{ width: "140px" }}
                      options={item.option}
                      onChange={(val) => {
                        item?.handle ? item?.handle(val) : "";
                      }}
                    />
                  </Form.Item>
                </Col>
              );
            })}
          </Row>
        </Flex>
      </Form>
    </Modal>
  );
};

export default ModalAddData;
