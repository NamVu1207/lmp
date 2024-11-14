import { Card, Col, Divider, Flex, Form, message, Row, Typography } from "antd";
import React from "react";
import Grid, {
  columnTypes,
  paginationTypes,
  selectionTypes,
} from "../../Components/DataGrid/index.jsx";
import { basicRenderColumns } from "../../utils/dataTable.utils.jsx";
import { Filter, filterType } from "../../Components/Fillter/index.jsx";
import { del, gethouse, load, save } from "../../services/service.js";
import ToolBar, {
  toolBarButtonTypes,
} from "../../Components/Toolbar/index.jsx";
import ModalAddData from "../../Components/Modal/ModalAddData.jsx";

const Service = () => {
  const onFocus = () => {};
  const gridRef = React.createRef();
  const [form] = Form.useForm();
  const [rows, setRows] = React.useState([]);
  const [listHouse, setListHouse] = React.useState([]);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const newItem = {
    id: "",
    house_name: "",
    serv_name: "",
    price: 0,
    unit: "",
    service_type: "fixed",
    active: true,
    note: "",
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
      key: "house_id",
      name: "house_id",
      type: columnTypes.TextEditor,
      visible: true,
    },
    {
      key: "house_name",
      name: "Nhà",
      type: columnTypes.TextEditor,
    },
    {
      key: "serv_name",
      name: "Tên dịch vụ",
      type: columnTypes.TextEditor,
      editable: true,
      required: true,
    },
    {
      key: "price",
      name: "giá tiền",
      type: columnTypes.TextEditor,
      editable: true,
      required: true,
    },
    {
      key: "unit",
      name: "đơn vị",
      type: columnTypes.TextEditor,
      editable: true,
      required: true,
    },
    {
      key: "service_type",
      name: "loại dịch vụ",
      type: columnTypes.Select,
      options: [
        {
          value: "fixed",
          label: "cố dịnh",
        },
        {
          value: "ordered",
          label: "order",
        },
      ],
      editable: true,
      required: true,
    },
    {
      key: "active",
      name: "trạng thái",
      type: columnTypes.Checkbox,
      editable: true,
    },
    {
      key: "note",
      name: "ghi chú",
      type: columnTypes.TextEditor,
      editable: true,
    },
  ]);
  React.useEffect(() => {
    GetListHouse();
    handleSearch();
  }, []);
  const GetListHouse = async () => {
    const result = await gethouse();
    if (result.data.length > 0) {
      const arr = result.data.map((item) => {
        return { value: item.id, label: `${item.id}-${item.house_name}` };
      });
      return setListHouse(arr);
    }
    return setListHouse([]);
  };
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
  const handleAddRow = (obj) => {
    setRows([
      ...rows,
      {
        ...newItem,
        house_id: obj.house_id,
        house_name: listHouse.find((item) => item.value === obj.house_id).label,
      },
    ]);
    setIsModalOpen(false);
  };
  const handleDeleteRow = async (listRow) => {
    if (listRow.length === 0) {
      message.warning("vui lòng chọn dòng cần xóa");
      return;
    }
    const listRowDel = rows.filter(
      (obj) => listRow.some((STT) => obj.STT === STT) && !obj.isNew
    );
    const newRow = rows.filter(
      (obj) => !listRow.some((STT) => obj.STT === STT)
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
    setRows(newRow);
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
        setIsModalOpen(true);
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
                      type: filterType.select,
                      config: {
                        options: listHouse,
                        placeholder: "Nhà",
                        name: "house_id",
                      },
                    },
                    {
                      type: filterType.input,
                      config: {
                        placeholder: "Tên dịch vụ",
                        name: "serv_name",
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
      <ModalAddData
        handleAdd={handleAddRow}
        isOpen={isModalOpen}
        onOpen={setIsModalOpen}
        config={[
          {
            name: "house_id",
            label: "chọn nhà",
            option: listHouse,
          },
        ]}
      />
    </>
  );
};

export default Service;
