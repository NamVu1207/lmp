import { Select } from "antd";

export function renderCellEditSelect({
  row,
  key,
  options,
  onRowChange,
  baseColumn,
}) {
  return (
    <Select
      style={{
        width: "100%",
        height: "100%",
      }}
      value={row[key]}
      options={options}
      onChange={(value) => {
        onRowChange({ ...row, [key]: value, isEdit: true }, true);
      }}
      autoFocus
    />
  );
}
