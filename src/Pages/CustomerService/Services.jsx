import React from "react";
import { Flex, Form, List, Radio } from "antd";
const Services = ({ name, defaultValue = 0, options = [] }) => {
  const [selected, setSelected] = React.useState(defaultValue);
  return (
    <Flex justify="center">
      <Form.Item
        name={name}
        rules={[{ required: true, message: "Please input!" }]}
      >
        <Radio.Group
          onChange={(e) => {
            setSelected(e.target.value);
          }}
        >
          <List
            dataSource={options}
            renderItem={(item, index) => (
              <List.Item
                style={{
                  backgroundColor: selected === item.id ? "#fef1d8" : "white",
                  margin: "8px 0px",
                  padding: "12px",
                  borderRadius: "16px",
                  border: selected === item.id && "4px solid #f7b420",
                }}
              >
                <Radio value={item.id}>
                  <Flex
                    style={{ width: "400px", paddingLeft: "12px" }}
                    align="center"
                  >
                    <List.Item.Meta
                      title={item.serv_name}
                      description={item.unit}
                    />
                    <div>{new Intl.NumberFormat().format(item.price)}</div>
                  </Flex>
                </Radio>
              </List.Item>
            )}
          />
        </Radio.Group>
      </Form.Item>
    </Flex>
  );
};

export default Services;
