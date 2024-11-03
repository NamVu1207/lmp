import {
  Button,
  Card,
  Col,
  DatePicker,
  Divider,
  Flex,
  Form,
  Input,
  Menu,
  message,
  Modal,
  notification,
  Row,
  Select,
  Typography,
} from "antd";
import React from "react";
import { useOutletContext } from "react-router-dom";
import Grid, {
  columnTypes,
  paginationTypes,
  selectionTypes,
} from "../../Components/DataGrid/index.jsx";
import { basicRenderColumns } from "../../utils/dataTable.utils.jsx";
import {
  checkroom,
  del,
  gethouse,
  getroom,
  load,
  save,
} from "../../services/ew.js";
import { Filter, filterType } from "../../Components/Fillter/index.jsx";
import ToolBar, {
  toolBarButtonTypes,
} from "../../Components/Toolbar/index.jsx";
import dayjs from "dayjs";
import ModalAddData from "../../Components/Modal/ModalAddData.jsx";

const DataEW = () => {
  const onFocus = () => {};
  const [form] = Form.useForm();
  const gridRef = React.createRef();
  const [rows, setRows] = React.useState([]);
  const [title, setTitle] = useOutletContext();
  const [listHouse, setListHouse] = React.useState([]);
  const [listRoom, setListRoom] = React.useState([]);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const newItem = {
    house_name: "",
    room_name: "",
    customer_name: "",
    elec_start: 0,
    elec_end: 0,
    water_start: 0,
    water_end: 0,
    reading_date: "",
    elec_cost: 0,
    water_cost: 0,
    month_cons: dayjs().month() + 1,
    year_cons: dayjs().year(),
    isNew: true,
  };
  const columns = basicRenderColumns([
    {
      key: "ew_id",
      name: "ID",
      width: 60,
      visible: true,
    },
    {
      key: "STT",
      name: "STT",
      width: 60,
    },
    {
      key: "house_id",
      name: "id nhà",
      type: columnTypes.TextEditor,
      visible: true,
      width: 150,
    },
    {
      key: "house_name",
      name: "Nhà",
      type: columnTypes.TextEditor,
      width: 150,
    },
    {
      key: "room_name",
      name: "Phòng",
      width: 120,
      type: columnTypes.TextEditor,
    },
    {
      key: "cus_name",
      name: "Khách thuê",
      type: columnTypes.TextEditor,
    },
    {
      key: "contract_id",
      name: "contract_id",
      type: columnTypes.TextEditor,
    },
    {
      key: "elec_start",
      name: "cs diện đầu",
      type: columnTypes.TextEditor,
      editable: true,
      required: true,
    },
    {
      key: "elec_end",
      name: "cs diện cuối",
      type: columnTypes.TextEditor,
      editable: true,
      required: true,
    },
    {
      key: "water_start",
      name: "cs nước đầu",
      type: columnTypes.TextEditor,
      editable: true,
      required: true,
    },
    {
      key: "water_end",
      name: "cs nước cuối",
      type: columnTypes.TextEditor,
      editable: true,
      required: true,
    },
    {
      key: "elec_cost",
      name: "Tiền điện",
      type: columnTypes.TextEditor,
      editable: true,
      required: true,
    },
    {
      key: "water_cost",
      name: "Tiền nước",
      type: columnTypes.TextEditor,
      editable: true,
      required: true,
    },
    {
      key: "reading_date",
      name: "ngày ghi",
      type: columnTypes.TextEditor,
      visible: true,
    },
    {
      key: "month_cons",
      name: "Tháng",
      type: columnTypes.TextEditor,
    },
    {
      key: "year_cons",
      name: "năm",
      type: columnTypes.TextEditor,
    },
  ]);
  React.useEffect(() => {
    setTitle("CHỈ SỐ ĐIỆN - NƯỚC");
    handleSearch();
    GetListHouse();
    GetListRoom();
  }, []);
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
  const GetListRoom = async () => {
    const result = await getroom();
    if (result.data.length > 0) {
      const arr = result.data.map((item) => {
        return { value: item.room_name, label: item.room_name };
      });
      return setListRoom(arr);
    }
    return setListRoom([]);
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
  const checkEwValid = (listRoom) => {
    return listRoom.every((item) => {
      const waterValid =
        Number(item.water_end) === 0 ||
        Number(item.water_end) > Number(item.water_start);
      const electricityValid =
        Number(item.elec_end) === 0 ||
        Number(item.elec_end) > Number(item.elec_start);
      return waterValid && electricityValid;
    });
  };
  const handleAddRow = async (obj) => {
    const result = await checkroom({
      house_id: obj.house_id,
      room_name: obj.room_name,
    });
    if (result.success) {
      setRows([
        ...rows,
        {
          ...newItem,
          house_id: obj.house_id,
          house_name: listHouse.find((item) => item.value === obj.house_id)
            .label,
          room_name: obj.room_name,
          cus_name: result.data.name,
          contract_id: result.data.contractId,
        },
      ]);
      setIsModalOpen(false);
    } else message.warning(result.data);
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
        item.status ? message.success(item.mess) : message.warning(item.mess)
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
      console.log(listRow);
      if (!checkEwValid(listRow))
        return message.warning("chỉ số điện/nước cuối phải lớn hơn chỉ số đầu");
      else {
        const result = await save({ datas: listRow });
        if (result.success) {
          result.data.message.map((item) =>
            item.status
              ? message.success(item.mess)
              : message.warning(item.mess)
          );
          handleSearch();
        }
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
      case "export_excel":
        // console.log("exportExcel");
        // gridRef.current?.exportExcel();
        break;
      default:
        break;
    }
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
                      type: filterType.monthPicker,
                      config: {
                        placeholder: "tháng",
                        name: "date",
                      },
                    },
                    {
                      type: filterType.select,
                      config: {
                        options: listHouse,
                        placeholder: "Nhà",
                        name: "house_id",
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
        <Col style={{ height: "500px" }} span={24}>
          <Card>
            <Grid
              ref={gridRef}
              direction="ltr"
              columnKeySelected="STT"
              selection={selectionTypes.multi}
              columns={columns}
              rows={rows}
              groupBy={["house_name", "room_name"]}
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
          {
            name: "room_name",
            label: "chọn phòng",
            option: listRoom,
          },
        ]}
      />
    </>
  );
};

export default DataEW;
