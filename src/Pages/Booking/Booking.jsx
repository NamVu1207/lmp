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
import {
  checkroom,
  del,
  gethouse,
  getroom,
  load,
  save,
} from "../../services/booking.js";
import dayjs from "dayjs";
import { Filter, filterType } from "../../Components/Fillter/index.jsx";
import ModalAddData from "../../Components/Modal/ModalAddData.jsx";

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
  const newItem = {
    id: 0,
    house_id: "",
    house_name: "",
    room_name: "",
    customer_name: "",
    customer_phone: "",
    price: 0,
    booking_date: undefined,
    target_date: undefined,
    booking_status: true,
    note: "",
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
      key: "room_name",
      name: "Phòng",
      type: columnTypes.TextEditor,
    },
    {
      key: "cus_name",
      name: "Khách thuê",
      type: columnTypes.TextEditor,
      editable: true,
      required: true,
    },
    {
      key: "cus_phone",
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
      type: columnTypes.Select,
      options: [
        {
          value: true,
          label: "đang cọc",
        },
        {
          value: false,
          label: "hết hạn",
        },
      ],
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
    setTitle("CỌC PHÒNG");
    handleSearch();
    GetListHouse();
    GetListRoom();
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
            booking_date: dayjs(item.booking_date).format("YYYY-MM-DD"),
            target_date: dayjs(item.target_date).format("YYYY-MM-DD"),
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
      return message.warning("phòng không tòn tại hoặc đã cho thuê");
    else {
      setRows([
        ...rows,
        {
          ...newItem,
          house_id: obj.house_id,
          house_name: listHouse.find((item) => item.value === obj.house_id)
            .label,
          room_name: obj.room_name,
          room_id: result.data.id,
        },
      ]);
      setIsModalOpen(false);
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
  const handleChange = () => {};
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
                      type: filterType.rangePicker,
                      config: {
                        placeholder: "Select date",
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

export default Booking;
