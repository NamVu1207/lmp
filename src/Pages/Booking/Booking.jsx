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
  Modal,
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
import ToolBar, {
  toolBarButtonTypes,
} from "../../Components/Toolbar/index.jsx";
import { gethouse, getroom } from "../../services/booking.js";

const Booking = () => {
  const onFocus = () => {};
  const gridRef = React.createRef();
  const [form] = Form.useForm();
  const [form1] = Form.useForm();
  const [rows, setRows] = React.useState([]);
  const [title, setTitle] = useOutletContext();
  const [listHouse, setListHouse] = React.useState([]);
  const [listRoom, setListRoom] = React.useState([]);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const Info = [
    {
      id: 1,
      house_name: "green house",
      name: "phòng 03",
      customer_name: "Nguyen Van A",
      customer_phone: "0912345612",
      price: 2000000,
      booking_date: "2024-10-25",
      target_date: "2024-11-05",
      booking_status: 1,
    },
    {
      id: 2,
      house_name: "green house",
      name: "phòng 03",
      customer_name: "Nguyen Van A",
      customer_phone: "0912345612",
      price: 2000000,
      booking_date: "2024-10-25",
      target_date: "2024-11-05",
      booking_status: 0,
    },
  ];
  const newItem = {
    house_id: "",
    house_name: "",
    room_name: "",
    customer_name: "",
    customer_phone: "",
    price: 0,
    booking_date: undefined,
    target_date: undefined,
    booking_status: true,
    isNew: true,
  };
  const columns = basicRenderColumns([
    {
      key: "id",
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
    },
    {
      key: "room_name",
      name: "Phòng",
      type: columnTypes.TextEditor,
    },
    {
      key: "customer_name",
      name: "Khách thuê",
      type: columnTypes.TextEditor,
      editable: true,
      required: true,
    },
    {
      key: "customer_phone",
      name: "SDT",
      type: columnTypes.TextEditor,
      editable: true,
      required: true,
    },
    {
      key: "price",
      name: "Tiền cọc",
      type: columnTypes.TextEditor,
      editable: true,
      required: true,
    },
    {
      key: "booking_date",
      name: "ngày đặt cọc",
      type: columnTypes.DatePicker,
      editable: true,
      required: true,
    },
    {
      key: "target_date",
      name: "ngày dự kiến đến",
      type: columnTypes.DatePicker,
      editable: true,
      required: true,
    },
    {
      key: "booking_status",
      name: "Trạng thái",
      type: columnTypes.TextEditor,
    },
  ]);
  React.useEffect(() => {
    setTitle("TIỀN TRỌ");
    GetListHouse();
    GetListRoom();
  }, []);
  React.useEffect(() => {
    setRows(Info);
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
  const handleAddRow = () => {
    form1.submit();
    const obj = form1.getFieldsValue();
    if (!Object.keys(obj).some((key) => obj[key] === undefined)) {
      setRows([
        ...rows,
        {
          ...newItem,
          house_id: obj.house_id,
          house_name: listHouse.find((item) => item.value === obj.house_id)
            .label,
          room_name: obj.room_name,
        },
      ]);
      setIsModalOpen(false);
    } else message.warning("vui lòng chọn đầy đủ");
  };
  const handleSaveData = async () => {
    try {
      const validate = gridRef.current?.Validate();
      if (!CheckValidate(validate)) return;
      const listRow = rows.filter((obj) =>
        validate.validate.some((val) => obj.STT === val.STT)
      );
      console.log(listRow);

      // const result = await save({ datas: listRow });
      // if (result.success) {
      //   result.data.message.map((item) =>
      //     item.status ? message.success(item.mess) : message.warning(item.mess)
      //   );
      //   handleSearch();
      // }
    } catch (error) {
      console.log(error);
    }
  };
  const buttonConfirm = async (props) => {
    switch (props.type) {
      case "delete":
        // handleDeleteRow([...gridRef.current?.getSelectedRows()]);
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
  const handleChange = () => {};
  return (
    <>
      <Row gutter={[8, 16]}>
        <Col span={24}>
          <Card style={{ padding: "12px" }}>
            <Row gutter={[8, 8]}>
              <Col span={12}>
                <Flex gap="middle">
                  <DatePicker.RangePicker onChange={handleChange} />
                  <Select
                    placeholder="Nhà"
                    style={{
                      width: 160,
                    }}
                    allowClear
                    onChange={handleChange}
                    options={[
                      {
                        value: "H01",
                        label: "green house",
                      },
                      {
                        value: "H02",
                        label: "red house",
                      },
                    ]}
                  />
                  <Input
                    style={{ width: "160px" }}
                    placeholder="Tên phòng"
                  ></Input>
                  <Button type="primary">Tìm kiếm</Button>
                </Flex>
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
      <Modal
        title="Thêm dòng"
        open={isModalOpen}
        onOk={handleAddRow}
        onCancel={() => {
          setIsModalOpen(false);
        }}
      >
        <Form form={form1}>
          <Flex justify="space-between">
            <Form.Item
              name={"house_id"}
              label={"chọn nhà"}
              rules={[{ required: true, message: "Please input!" }]}
            >
              <Select
                allowClear
                style={{ width: "140px" }}
                options={listHouse}
              />
            </Form.Item>
            <Form.Item
              name={"room_name"}
              label={"chọn phòng"}
              rules={[{ required: true, message: "Please input!" }]}
            >
              <Select
                allowClear
                showSearch
                style={{ width: "140px" }}
                options={listRoom}
              />
            </Form.Item>
          </Flex>
        </Form>
      </Modal>
    </>
  );
};

export default Booking;
