import { DatePicker, Form, Row, Col } from "antd";
export default function MonthPickerFilter({ name = "", placeholder = "" }) {
  const formInstance = Form.useFormInstance();
  return (
    <DatePicker
      name={name}
      placeholder={placeholder}
      picker="month"
      onChange={(m) => {
        formInstance.setFieldValue(name, m);
      }}
    />
  );
}