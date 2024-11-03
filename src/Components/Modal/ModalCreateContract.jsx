import {
  Button,
  Cascader,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Mentions,
  Select,
  TreeSelect,
  Card,
  Col,
  Image,
  Modal,
  Row,
  Typography,
  Radio,
  Flex,
  message,
} from "antd";
import React from "react";

import Grid, {
  columnTypes,
  paginationTypes,
  selectionTypes,
} from "../../Components/DataGrid/index.jsx";
import { basicRenderColumns } from "../../utils/dataTable.utils";
import { addcontract } from "../../services/room.js";

const { RangePicker } = DatePicker;
const ModalCreateContract = ({
  room = {},
  isOpen = false,
  onClose,
  handleLoad,
}) => {
  const FromItem = [
    {
      label: "Họ và tên",
      name: "cus_name",
      span: 12,
      field: <Input />,
      require: true,
    },
    {
      label: "CCCD",
      name: "cccd",
      span: 12,
      field: <Input />,
      require: true,
    },
    {
      label: "Giới tính",
      name: "gender",
      span: 12,
      field: (
        <Radio.Group>
          <Radio value="m"> nam </Radio>
          <Radio value="f"> nữ </Radio>
        </Radio.Group>
      ),
      require: true,
    },
    {
      label: "Số điện thoại",
      span: 12,
      name: "phone",
      field: <Input />,
      require: true,
    },
    {
      label: "Ngày sinh",
      name: "birthday",
      span: 12,
      field: <DatePicker style={{ width: "100%" }} />,
      require: true,
    },
    {
      label: "Email",
      name: "email",
      span: 12,
      field: <Input />,
      require: true,
    },
    {
      label: "Địa chỉ",
      name: "cus_address",
      span: 24,
      field: <Input.TextArea />,
      require: true,
    },
    {
      label: "Phòng",
      name: "room_id",
      span: 12,
      field: <Input disabled />,
    },
    {
      label: "Tiền phòng",
      name: "price",
      span: 12,
      field: (
        <InputNumber
          style={{ width: "100%" }}
          // defaultValue={room.price}
          formatter={(value) =>
            `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          }
          parser={(value) => value?.replace(/(,*)/g, "")}
          addonAfter={"$"}
        />
      ),
    },
    {
      label: "Hạn hợp đồng",
      name: "effective_period",
      span: 12,
      field: <DatePicker.RangePicker format={"YYYY-MM-DD"} />,
      require: true,
    },
    {
      label: <Typography>Tiền cọc</Typography>,
      name: "booking_price",
      span: 12,
      field: (
        <InputNumber
          style={{ width: "100%" }}
          formatter={(value) =>
            `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          }
          parser={(value) => value?.replace(/(,*)/g, "")}
          addonAfter={"$"}
        />
      ),
      require: true,
    },
    {
      label: "note",
      name: "note",
      span: 24,
      field: <Input.TextArea />,
      require: true,
    },
  ];
  const Info = {
    customer_name: "",
    gender: "m",
    phone: "",
    birthday: undefined,
    email: "",
    cccd: "",
    customer_address: "",
    room_id: room.id,
    isNew: true,
  };
  const [form] = Form.useForm();
  const onFocus = () => {};
  const gridRef = React.createRef();
  const [rows, setRows] = React.useState([]);
  const [capacity, setCapacity] = React.useState(room.capacity - 1);

  const columns = basicRenderColumns([
    {
      key: "STT",
      name: "STT",
      width: 40,
    },
    {
      key: "cus_name",
      name: "Họ và tên",
      type: columnTypes.TextEditor,
      width: 140,
      editable: true,
      required: true,
    },
    {
      key: "gender",
      name: "giới tính",
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
      width: 80,
      editable: true,
      required: true,
    },
    {
      key: "phone",
      name: "số điện thoại",
      type: columnTypes.TextEditor,
      width: 100,
      editable: true,
      required: true,
    },
    {
      key: "birthday",
      name: "ngày sinh",
      type: columnTypes.DatePicker,
      width: 120,
      editable: true,
      required: true,
    },
    {
      key: "email",
      name: "email",
      type: columnTypes.TextEditor,
      width: 160,
      editable: true,
      required: true,
    },
    {
      key: "cccd",
      name: "cccd",
      type: columnTypes.TextEditor,
      width: 120,
      editable: true,
      required: true,
    },
    {
      key: "cus_address",
      name: "địa chỉ",
      type: columnTypes.TextEditor,
      width: 140,
      editable: true,
      required: true,
    },
    {
      key: "id",
      name: "phòng",
      type: columnTypes.TextEditor,
      visible: true,
      editable: true,
    },
  ]);

  React.useEffect(() => {
    setRows(
      Array(capacity)
        .fill(Info)
        .map((item) => ({ ...item }))
    );
  }, [capacity]);

  const handleChangeCapacity = (value) => {
    const reg = /^-?\d*(\.\d*)?$/;
    if ((reg.test(value) || value === "" || value === "-") && value >= 0) {
      setCapacity(value);
    }
  };

  const CheckValidate = (validate) => {
    if (!validate.isCheck) {
      message.warning("vui lòng điền đầy đủ thông tin!");
      return false;
    }
    return true;
  };

  const ConvertFormData = (data) => {
    const renter = {
      cus_name: data.cus_name,
      birthday: data.birthday,
      cccd: data.cccd,
      cus_address: data.cus_address,
      email: data.email,
      phone: data.phone,
      room_id: data.room_id,
      gender: data.gender,
    };
    const contract = {
      room_id: data.room_id,
      room_price: data.price,
      day_begin: data.effective_period[0],
      day_end: data.effective_period[1],
      booking_price: data.booking_price,
      note: data.note,
    };
    return { renter, contract };
  };

  const handleAddContract = async () => {
    try {
      const validate = gridRef.current?.Validate();
      if (!CheckValidate(validate)) return;
      const listRow = rows.filter((obj) =>
        validate.validate.some((val) => obj.STT === val.STT)
      );
      const formData = form.getFieldsValue();
      const { renter, contract } = ConvertFormData(formData);
      const data = {
        customer: listRow,
        renter: renter,
        contract: contract,
      };
      const result = await addcontract(data);
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal
      title="Hợp đồng cho thuê"
      open={isOpen}
      onCancel={() => {
        onClose();
        form.resetFields();
      }}
      onOk={async () => {
        form.submit();
        const result = await handleAddContract();
        if (result.success) {
          message.success(result.message);
          handleLoad();
          form.resetFields();
          onClose();
        } else message.warning(result.message);
      }}
      width={800}
    >
      <Form
        form={form}
        // labelCol={{ span: 8 }}
        // wrapperCol={{ span: 16 }}
        variant="filled"
        initialValues={{
          price: room.price,
          room_id: room.id,
        }}
      >
        <Row gutter={[24, 0]}>
          {FromItem.map((item, index) => {
            return (
              <Col span={item.span} key={index}>
                <Form.Item
                  label={item.label}
                  name={item.name}
                  rules={
                    item.require
                      ? [{ required: true, message: "Please input!" }]
                      : []
                  }
                  style={{ width: "auto" }}
                >
                  {item.field}
                </Form.Item>
              </Col>
            );
          })}
        </Row>
      </Form>
      <Flex align="center" style={{ paddingBottom: "12px" }}>
        <label style={{ padding: "8px" }}>số thành viên:</label>
        <InputNumber onChange={handleChangeCapacity} value={capacity} />
      </Flex>
      <Grid
        ref={gridRef}
        direction="ltr"
        columnKeySelected="STT"
        selection={selectionTypes.multi}
        columns={columns}
        rows={rows}
        groupBy={[""]}
        setRows={setRows}
        onFocus={onFocus}
        pagination={paginationTypes.scroll}
        maxHeight={800}
        limit={5}
      />
    </Modal>
  );
};

export default ModalCreateContract;
