import dayjs from "dayjs";
import MCheckBox from "../Components/DataGrid/MCheckBox";
import { FORMAT_DATETIME } from "../constants";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);
export const dataConverTable = ({ column, row, onRowChange }, itemColumn) => {
  const keyValue = column.key;
  const rowValue = row[keyValue];
  let dataConvert;

  switch (keyValue) {
    case "payment_status":
      dataConvert = rowValue ? "đã thanh toán" : " chưa  thanh toán";
      break;
    case "booking_status":
      dataConvert = rowValue ? "đang cọc" : "hết hạn";
      break;
    case "elec_cost":
      dataConvert = rowValue ? (row.elec_end - row.elec_start) * rowValue : "";
      break;
    case "water_cost":
      dataConvert = rowValue
        ? (row.water_end - row.water_start) * rowValue
        : "";
      break;
    default:
      dataConvert = !!row[keyValue] ? `${row[keyValue]}` : "";
      break;
  }

  const typeColumn = itemColumn.type;
  switch (typeColumn) {
    case "Checkbox":
      dataConvert = MCheckBox({
        name: keyValue,
        defaultChecked: !!row[keyValue],
        value: !!row[keyValue],
        onRowChange: onRowChange,
        onCellChange: itemColumn.onCellChange,
        row: row,
        key: keyValue,
      });
      break;
    case "Password":
      dataConvert = "*".repeat(row[keyValue] ? row[keyValue].length : "");
      break;
    case "Select":
      dataConvert = itemColumn?.options.find(
        (item) => item.value === row[keyValue]
      ).label; 
    default:
      break;
  }
  return (
    <div
      style={
        row["isError"] && column.required
          ? {
              boxSizing: "border-box",
              height: "41px",
              padding: "0px 8px",
              border: "1px solid red",
            }
          : { boxSizing: "border-box", height: "42px", padding: "0px 8px" }
      }
    >
      {dataConvert}
    </div>
  );
};

export const basicRenderColumns = (columns = []) => {
  return columns.map((itemColumn) => {
    return {
      ...itemColumn,
      render: (itemRender) => dataConverTable(itemRender, itemColumn),
    };
  });
};
