/* eslint-disable react-hooks/rules-of-hooks */
import { Input } from "antd";
import React, { useState } from "react";

export function renderCellEditPassword({ row, key, onRowChange }) {
  const [value, setValue] = useState(row[key])
  return (
    <Input
      onChange={(event) => {
        setValue(event.target.value)
      }}
      onBlur={() => {
        onRowChange({ ...row, [key]: value, isEdit: true }, true)
      }}
      onPressEnter={() => {
        onRowChange({ ...row, [key]: value, isEdit: true }, true)
      }}
      type="password"
      value={value}
    />
  );
}
