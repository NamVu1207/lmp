import { Form, Radio } from "antd";

export default function RadioGroupFilter({
  options = [],
  name = "",
  initialValues,
}) {
  const formInstance = Form.useFormInstance();
  return (
    <Radio.Group
      name={name}
      defaultValue={initialValues}
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "1px",
      }}
      onChange={(event) => formInstance.setFieldValue(name, event.target.value)}
    >
      {options.map(({ value, label }) => (
        <Radio key={value} value={value}>
          {label}
        </Radio>
      ))}
    </Radio.Group>
  );
}
