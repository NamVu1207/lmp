import { DatePicker } from "antd";
import dayjs from "dayjs";
import { FORMAT_DATETIME } from "../../constants";

export function renderCellEditDatePicker({ row, key, onRowChange }) {
  return (
    <DatePicker
      style={{
        width: "100%",
        height: "100%",
      }}
      format={"YYYY-MM-DD"}
      value={dayjs(row[key])}
      onChange={(date, dateString) => {
        onRowChange({ ...row, [key]: dateString, isEdit: true }, true);
      }}
      autoFocus
    />
  );
}