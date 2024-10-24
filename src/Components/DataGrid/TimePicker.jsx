import { TimePicker } from "antd";
import dayjs from "dayjs";
import { FORMAT_DATETIME } from "../../constants";

export function renderCellEditTimePicker({ row, key, onRowChange }) {
  return (
    <TimePicker
      style={{
        width: "100%",
        height: "100%",
      }} 
      format={"HH:mm:ss"}
      onChange={(time, timeString) => {
        onRowChange({ ...row, [key]: time, isEdit: true }, true);
      }}
      autoFocus
    />
  );
}
