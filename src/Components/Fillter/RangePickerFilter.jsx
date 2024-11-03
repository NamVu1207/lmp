import { DatePicker, Form, Row, Col } from "antd";
import { useState } from "react";
export default function RangePickerFilter({ name = "", placeholder = "" }) {
  const formInstance = Form.useFormInstance();
  return (
    <DatePicker.RangePicker
      name={name}
      placeholder={placeholder}
      onChange={(val) => {
        if (val !== null) formInstance.setFieldValue(name, val);
        else formInstance.setFieldValue(name, []);
      }}
    />
  );
}
