import { Card, Col, Divider, Flex, Form, message, Row, Typography } from "antd";
import React from "react";
import { useOutletContext } from "react-router-dom";
import Grid, {
  columnTypes,
  paginationTypes,
  selectionTypes,
} from "../../Components/DataGrid/index.jsx";
import { basicRenderColumns } from "../../utils/dataTable.utils.jsx";
import { Filter, filterType } from "../../Components/Fillter/index.jsx";
import ToolBar, {
  toolBarButtonTypes,
} from "../../Components/Toolbar/index.jsx";
import {
  load,
  gethouse,
  getserv,
  save,
  loadrs,
  del,
} from "../../services/listroom.js";

const ListRoom = () => {
  const [title, setTitle] = useOutletContext();
  const onFocus = () => {};
  const gridRef = React.createRef();
  const gridRefDetail = React.createRef();
  const [form] = Form.useForm();
  const [rows, setRows] = React.useState([]);
  const [rowDetail, setRowDetail] = React.useState([]);
  const [listHouse, setListHouse] = React.useState([]);
  const [listServ, setListServ] = React.useState([]);
  const [optServ, setOptServ] = React.useState([]);
  const [roomServ, setRoomServ] = React.useState([]);
  const newItem = {
    id: "",
    room_id: "",
    service_id: "",
    amount: 0,
    active: true,
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
      key: "room_name",
      name: "Tên phòng",
      type: columnTypes.TextEditor,
      width: 120,
      editable: true,
      required: true,
    },
    {
      key: "cus_name",
      name: "Tên khách thuê",
      type: columnTypes.TextEditor,
    },
    {
      key: "cccd",
      name: "cccd",
      type: columnTypes.TextEditor,
    },
    {
      key: "current_capacity",
      name: "Số người hiện tại",
      width: 160,
      type: columnTypes.TextEditor,
    },
    {
      key: "capacity",
      name: "Số người tối đa",
      width: 160,
      type: columnTypes.TextEditor,
      editable: true,
      required: true,
    },
    {
      key: "floor",
      name: "Tầng",
      width: 120,
      type: columnTypes.TextEditor,
      editable: true,
      required: true,
    },
    {
      key: "area",
      name: "Diện tích (m2)",
      width: 150,
      type: columnTypes.TextEditor,
      editable: true,
      required: true,
    },
    {
      key: "price",
      name: "gia thuê (vnd)",
      type: columnTypes.TextEditor,
      editable: true,
      required: true,
    },
    {
      key: "is_rented",
      name: "trạng thái",
      type: columnTypes.TextEditor,
    },
  ]);
  const columnDetail = basicRenderColumns([
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
      key: "room_id",
      name: "room_id",
      type: columnTypes.TextEditor,
      visible: true,
    },
    {
      key: "service_id",
      name: "Tên dịch vụ",
      type: columnTypes.Select,
      options: optServ,
      editable: true,
      required: true,
    },
    {
      key: "amount",
      name: "Số lượng",
      type: columnTypes.TextEditor,
      editable: true,
      required: true,
    },
    {
      key: "active",
      name: "trạng thái",
      type: columnTypes.Checkbox,
      editable: true,
    },
  ]);

  React.useEffect(() => {
    setTitle("PHỒNG TRỌ");
    GetListHouse();
    handleSearch();
    GetServ();
  }, []);

  React.useEffect(() => {
    const selectedRow = [...gridRef.current?.getSelectedRows()][0];
    if (selectedRow) {
      const houseId = getRoomInfo(selectedRow).house_id;
      getOptionServ(houseId);
    }
  }, [rowDetail]);

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
  const GetServ = async () => {
    const result = await getserv();
    if (result.data.length > 0) {
      return setListServ(result.data);
    }
  };
  const CheckValidate = (validate, validateDetail) => {
    if (
      validate.validate.length === 0 &&
      validateDetail.validate.length === 0
    ) {
      message.warning("không có gì thay đổi");
      return false;
    }
    if (!validate.isCheck || !validateDetail.isCheck) {
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
      const rs = await loadrs();
      setRoomServ(rs.data);
    } catch (error) {
      console.log(error);
    }
  };
  const getRoomInfo = (selectedRow) => {
    const obj = rows.find((item) => item.STT === selectedRow);
    return obj;
  };
  const handleAddRow = () => {
    const selectedRow = [...gridRef.current?.getSelectedRows()][0];
    setRowDetail([
      ...rowDetail,
      {
        ...newItem,
        room_id: getRoomInfo(selectedRow).id,
      },
    ]);
  };
  const handleDeleteRow = async (listRow) => {
    if (listRow.length === 0) {
      message.warning("vui lòng chọn dòng cần xóa");
      return;
    }
    const listRowDel = rowDetail.filter(
      (obj) => listRow.some((STT) => obj.STT === STT) && !obj.isNew
    );
    const newRow = rowDetail.filter(
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
    gridRefDetail.current?.setSelectedRows([]);
    setRowDetail(newRow);
  };
  const handleSaveData = async () => {
    try {
      const validate = gridRef.current?.Validate();
      const validateDetail = gridRefDetail.current?.Validate();
      if (!CheckValidate(validate, validateDetail)) return;
      const listRow = rows.filter((obj) =>
        validate.validate.some((val) => obj.STT === val.STT)
      );
      const listDetail = rowDetail.filter((obj) =>
        validateDetail.validate.some((val) => obj.STT === val.STT)
      );
      const result = await save({ listRow: listRow, listDetail: listDetail });
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
        handleDeleteRow([...gridRefDetail.current?.getSelectedRows()]);
        break;
      case "add":
        handleAddRow();
        break;
      case "save":
        handleSaveData();
        break;
      case "export_excel":
        // console.log("exportExcel");
        // gridRef.current?.exportExcel();
        break;
      default:
        break;
    }
  };

  const getOptionServ = (houseId = "") => {
    const hasOption = listServ.some((item) => item.house_id === houseId);
    if (hasOption) {
      const arr = listServ.map((item) => {
        if (item.house_id === houseId) {
          return { value: item.id, label: item.serv_name };
        }
      });
      setOptServ([{ value: "", label: "" }, ...arr]);
    } else {
      message.warning("không có dịch vụ");
      setOptServ([{ value: "", label: "" }]);
    }
  };

  const handleLoadDetail = (val) => {
    if (val) {
      const roomId = getRoomInfo(val).id;
      const detail = roomServ.filter((item) => item.room_id === Number(roomId));
      setRowDetail(detail);
    } else setRowDetail([]);
  };
  return (
    <>
      <Row gutter={[8, 16]}>
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
                        placeholder: "Tên phòng",
                        name: "room_name",
                      },
                    },
                    {
                      type: filterType.input,
                      config: {
                        placeholder: "Tên khách / cccd",
                        name: "cus_info",
                      },
                    },
                  ]}
                />
              </Col>
              <Col span={12}>
                <Flex justify="flex-end">
                  <ToolBar
                    buttonConfig={[
                      toolBarButtonTypes.exportexcel,
                      toolBarButtonTypes.add,
                      toolBarButtonTypes.delete,
                      toolBarButtonTypes.save,
                    ]}
                    handleConfirm={buttonConfirm}
                  />
                </Flex>
              </Col>
              <Col span={24}>
                <Flex align="center">
                  <Typography> đã thuê:</Typography>
                  <Divider type="vertical" />
                  <Typography> chưa thuê:</Typography>
                  <Divider type="vertical" />
                  <Typography> chưa thu phí:</Typography>
                </Flex>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col style={{ height: "400px" }} span={24}>
          <Card>
            <Grid
              ref={gridRef}
              direction="ltr"
              columnKeySelected="STT"
              selection={selectionTypes.single}
              columns={columns}
              rows={rows}
              groupBy={["house_name"]}
              setRows={setRows}
              onFocus={onFocus}
              pagination={paginationTypes.scroll}
              maxHeight={800}
              onCellClick
              limit={5}
              handleGetSelected={handleLoadDetail}
            />
          </Card>
        </Col>
        <Col style={{ height: "300px" }} span={24}>
          <Card>
            <Grid
              ref={gridRefDetail}
              direction="ltr"
              columnKeySelected="STT"
              selection={selectionTypes.single}
              columns={columnDetail}
              rows={rowDetail}
              setRows={setRowDetail}
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

export default ListRoom;
