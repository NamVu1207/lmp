import { Card, Col, Divider, Flex, Form, message, Row, Typography } from "antd";
import React from "react";
import Grid, {
  columnTypes,
  paginationTypes,
  selectionTypes,
} from "../../Components/DataGrid/index.jsx";
import { basicRenderColumns } from "../../utils/dataTable.utils.jsx";
import { Filter, filterType } from "../../Components/Fillter/index.jsx";
import { del, load, save } from "../../services/staff.js";
import ToolBar, {
  toolBarButtonTypes,
} from "../../Components/Toolbar/index.jsx";

const Staff = () => {
  const onFocus = () => {};
  const gridRef = React.createRef();
  const [form] = Form.useForm();
  const [rows, setRows] = React.useState([]);
  const newItem = {
    id: "",
    employee_name: "",
    phone: "",
    username: "",
    pass: "",
    department: "",
    isNew: true,
  };
  const columns = basicRenderColumns([
    {
      key: "STT",
      name: "STT",
      width: 60,
    },
    {
      key: "id",
      name: "ID",
      visible: true,
    },
    {
      key: "employee_name",
      name: "Tên nhân viên",
      type: columnTypes.TextEditor,
      editable: true,
      required: true,
    },
    {
      key: "phone",
      name: "SĐT",
      type: columnTypes.TextEditor,
      editable: true,
      required: true,
    },
    {
      key: "username",
      name: "Tên tài khoản",
      type: columnTypes.TextEditor,
      editable: true,
      required: true,
    },
    {
      key: "pass",
      name: "Mật khẩu",
      type: columnTypes.TextEditor,
      editable: true,
    },
    {
      key: "department",
      name: "bộ phận",
      type: columnTypes.TextEditor,
      editable: true,
      required: true,
    },
  ]);
  React.useEffect(() => {
    handleSearch();
  }, []);
  const CheckValidate = (validate) => {
    if (validate.validate.length === 0) {
      message.warning("không có gì thay đổi");
      return false;
    }
    if (!validate.isCheck) {
      message.warning("vui lòng điền đầy đủ thông tin!");
      return false;
    }
    return true;
  };
  const handleSearch = async () => {
    try {
      const filter = form.getFieldsValue();
      const result = await load(filter);
      console.log(result);

      if (result.data.length > 0) {
        const arr = result.data.map((item) => {
          return {
            ...item,
            house_name: `${item.house_id}-${item.house_name}`,
          };
        });
        setRows(arr);
      } else setRows([]);
    } catch (error) {
      console.log(error);
    }
  };
  const handleAddRow = () => {
    setRows([...rows, newItem]);
  };
  const handleDeleteRow = async (listRow) => {
    if (listRow.length === 0) {
      message.warning("vui lòng chọn dòng cần xóa");
      return;
    }
    const listRowDel = rows.filter(
      (obj) => listRow.some((STT) => obj.STT === STT) && !obj.isNew
    );
    if (listRowDel.length > 0) {
      const result = await del({ data: listRowDel });
      result.data.message.map((item) =>
        item.success
          ? message.success(item.message)
          : message.warning(item.message)
      );
    }
    gridRef.current?.setSelectedRows([]);
    handleSearch();
  };
  const handleSaveData = async () => {
    try {
      const validate = gridRef.current?.Validate();
      if (!CheckValidate(validate)) return;
      const listRow = rows.filter((obj) =>
        validate.validate.some((val) => obj.STT === val.STT)
      );
      const result = await save({ datas: listRow });
      if (result.success) {
        result.data.message.map((item) =>
          item.success
            ? message.success(item.message)
            : message.warning(item.message)
        );
        handleSearch();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const buttonConfirm = async (props) => {
    switch (props.type) {
      case "delete":
        handleDeleteRow([...gridRef.current?.getSelectedRows()]);
        break;
      case "add":
        handleAddRow();
        break;
      case "save":
        handleSaveData();
        break;
    }
  };
  return (
    <>
      <Row gutter={[0, 16]}>
        <Col span={24}>
          <Card style={{ padding: "12px" }}>
            <Row gutter={[8, 8]}>
              <Col span={12}>
                <Filter
                  form={form}
                  onSearch={handleSearch}
                  items={[
                    {
                      type: filterType.input,
                      config: {
                        placeholder: "Tên nhân viên",
                        name: "staff_name",
                      },
                    },
                  ]}
                />
              </Col>
              <Col span={12}>
                <Flex justify="flex-end">
                  <ToolBar
                    buttonConfig={[
                      toolBarButtonTypes.add,
                      toolBarButtonTypes.delete,
                      toolBarButtonTypes.save,
                    ]}
                    handleConfirm={buttonConfirm}
                  />
                </Flex>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col style={{ height: "500px" }} span={24}>
          <Card>
            <Grid
              ref={gridRef}
              direction="ltr"
              columnKeySelected="STT"
              selection={selectionTypes.multi}
              columns={columns}
              rows={rows}
              groupBy={["house_name"]}
              setRows={setRows}
              onFocus={onFocus}
              pagination={paginationTypes.scroll}
              maxHeight={800}
              limit={5}
            />
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Staff;
