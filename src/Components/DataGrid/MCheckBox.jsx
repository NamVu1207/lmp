import { Checkbox } from "antd";

function MCheckBox({
  name = "",
  defaultChecked = false,
  label = "",
  onGetData,
  onGetEvent,
  onRowChange,
  key,
  row,
  value,
  onCellChange,
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        marginTop: "10px",
        justifyContent: "center",
      }}
    >
      <Checkbox
        value={value}
        name={name}
        checked={value}
        defaultChecked={defaultChecked}
        onChange={(event) => {
          onGetData && onGetData(event.target.value);
          onGetEvent && onGetEvent(event);
          onRowChange &&
            key &&
            row &&
            onRowChange(
              {
                ...row,
                [key]: event.target.checked ? true : false,
                isEdit: true,
              },
              true
            );
          onCellChange &&
            onCellChange({ row, key, value: event.target.checked });
        }}
      >
        {label}
      </Checkbox>
    </div>
  );
}

export default MCheckBox;
