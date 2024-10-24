import { Form, Input } from "antd";

export default function InputFilter({ name = "", placeholder = "" }) {
  const formInstance = Form.useFormInstance();
  return (
    <Input
      name={name}
      placeholder={placeholder}
      onChange={(event) => formInstance.setFieldValue(name, event.target.value)}
    />
  );
}
