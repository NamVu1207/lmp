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
import {
  checkroom,
  del,
  gethouse,
  getroom,
  load,
  save,
} from "../../services/customer.js";
import ToolBar, {
  toolBarButtonTypes,
} from "../../Components/Toolbar/index.jsx";
import ModalAddData from "../../Components/Modal/ModalAddData.jsx";
import dayjs from "dayjs";

const Customer = () => {
  const onFocus = () => {};
  const gridRef = React.createRef();
  const [form] = Form.useForm();
  const [rows, setRows] = React.useState([]);
  const [listHouse, setListHouse] = React.useState([]);
  const [listRoom, setListRoom] = React.useState([]);
  const [title, setTitle] = useOutletContext();
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const newItem = {
    id: "",
    cus_name: "",
    gender: "m",
    phone: "",
    birthday: undefined,
    email: "",
    cccd: "",
    cus_address: "",
    contract_status: true,
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
      key: "room_id",
      name: "room_id",
      type: columnTypes.TextEditor,
      visible: true,
    },
    {
      key: "capacity",
      name: "capacity",
      type: columnTypes.TextEditor,
      visible: true,
    },
    {
      key: "room_name",
      name: "Phòng",
      type: columnTypes.TextEditor,
    },
    {
      key: "contract_id",
      name: "mã hợp đồng",
      width: 120,
      type: columnTypes.TextEditor,
    },
    {
      key: "cus_name",
      name: "Tên khách hàng",
      type: columnTypes.TextEditor,
      editable: true,
      required: true,
    },
    {
      key: "gender",
      name: "giới tính",
      width: 80,
      type: columnTypes.Select,
      options: [
        {
          value: "m",
          label: "nam",
        },
        {
          value: "f",
          label: "nữ",
        },
      ],
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
      key: "birthday",
      name: "ngày sinh",
      width: 120,
      type: columnTypes.DatePicker,
      editable: true,
      required: true,
    },
    {
      key: "email",
      name: "Email",
      type: columnTypes.TextEditor,
      width: 200,
      editable: true,
      required: true,
    },
    {
      key: "cccd",
      name: "cccd",
      type: columnTypes.TextEditor,
      editable: true,
      required: true,
    },
    {
      key: "cus_address",
      name: "đia chỉ",
      type: columnTypes.TextEditor,
      editable: true,
      required: true,
    },
    {
      key: "contract_status",
      name: "trạng thái thuê",
      width: 120,
      type: columnTypes.TextEditor,
    },
  ]);
  React.useEffect(() => {
    setTitle("KHÁCH HÀNG");
    GetListHouse();
    GetListRoom();
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
  const handleSearch = async () => {
    try {
      const filter = form.getFieldsValue();
      const result = await load(filter);
      if (result.data.length > 0) {
        const arr = result.data.map((item) => {
          return {
            ...item,
            house_name: `${item.house_id}-${item.house_name}`,
            birthday: dayjs(item.birthday).format("YYYY-MM-DD"),
          };
        });
        setRows(arr);
      } else setRows([]);
    } catch (error) {
      console.log(error);
    }
  };
  const handleAddRow = async (obj) => {
    const result = await checkroom({
      house_id: obj.house_id,
      room_name: obj.room_name,
    });
    if (!result.success)
      return message.warning("phòng không tòn tại hoặc chưa cho thuê");
    else {
      const val = rows.find(
        (item) =>
          item.house_id === obj.house_id &&
          item.room_name === obj.room_name &&
          item.contract_status === true
      );
      setRows([
        ...rows,
        {
          ...newItem,
          contract_id: val.contract_id,
          house_id: val.house_id,
          house_name: val.house_name,
          room_name: val.room_name,
          room_id: val.room_id,
          capacity: val.capacity,
        },
      ]);
      setIsModalOpen(false);
    }
  };
  const checkCapacity = (listrow) => {
    return listrow.every(
      (item) =>
        rows.filter((obj) => obj.contract_id === item.contract_id).length <=
        item.capacity
    );
  };
  const handleSaveData = async () => {
    try {
      const validate = gridRef.current?.Validate();
      if (!CheckValidate(validate)) return;
      const listRow = rows.filter((obj) =>
        validate.validate.some((val) => obj.STT === val.STT)
      );
      if (!checkCapacity(listRow)) {
        message.warning(
          "số lượng khách trong một phòng vượt quá lượng khách tối đa"
        );
      } else {
        const result = await save({ datas: listRow });
        console.log(result);
        if (result.success) {
          result.data.message.map((item) =>
            item.success
              ? message.success(item.message)
              : message.warning(item.message)
          );
          handleSearch();
        }
      }
    } catch (error) {
      console.log(error);
    }
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
      console.log(result);
      result.data.message.map((item) =>
        item.success
          ? message.success(item.message)
          : message.warning(item.message)
      );
    }
    gridRef.current?.setSelectedRows([]);
    handleSearch();
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
                      type: filterType.select,
                      config: {
                        options: listHouse,
                        placeholder: "Nhà",
                        name: "house_id",
                      },
                    },
                    {
                      type: filterType.select,
                      config: {
                        options: [
                          {
                            value: true,
                            label: "đang thuê",
                          },
                          {
                            value: false,
                            label: "hết hợp đồng",
                          },
                        ],
                        placeholder: "trạng thái thuê",
                        name: "contractActive",
                      },
                    },
                    {
                      type: filterType.input,
                      config: {
                        placeholder: "Tên khách hàng / cccd",
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
        <Col style={{ height: "500px" }} span={24}>
          <Card>
            <Grid
              ref={gridRef}
              direction="ltr"
              columnKeySelected="STT"
              selection={selectionTypes.multi}
              columns={columns}
              rows={rows}
              groupBy={["house_name", "room_name", "contract_id"]}
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

export default Customer;
