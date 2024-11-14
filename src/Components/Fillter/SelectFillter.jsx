import * as React from "react";
import { Select, Form } from "antd";
import { DownOutlined } from "@ant-design/icons";
const SelectFillter = ({
  name = "",
  initialValue = null,
  options = [],
  placeholder = "",
}) => {
  const items = () => {
    const result = [];
    options.map((item) => {
      result.push({
        label: item.label,
        key: item.value == "" ? 0 : item.value,
      });
    });
    return result;
  };
  const onChange = (value) => {
    formInstance.setFieldValue(name, value);
  };
  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  const formInstance = Form.useFormInstance();
  return (
    <Select
      defaultValue={initialValue}
      style={{ width: "160px" }}
      allowClear
      showSearch
      placeholder={placeholder}
      optionFilterProp="children"
      onChange={onChange}
      filterOption={filterOption}
      options={options}
    />
  );
};

export default SelectFillter;
