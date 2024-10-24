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
} from "antd";

const { RangePicker } = DatePicker;
const ModalCreateRoom = ({
  house = {},
  isOpen = false,
  onClose,
  handleAddRoom,
}) => {
  const FromItem = [
    {
      label: "Tên phòng",
      name: "room_name",
      field: <Input />,
      require: true,
    },
    {
      label: "Nhà",
      name: "house_id",
      field: <Input disabled />,
    },
    {
      label: "số lượng tối đa",
      name: "capacity",
      field: <InputNumber style={{ width: "100%" }} />,
      require: true,
    },
    {
      label: "Tầng",
      name: "floor",
      field: <InputNumber style={{ width: "100%" }} />,
      require: true,
    },
    {
      label: "Diện tích",
      name: "area",
      field: (
        <InputNumber
          style={{ width: "100%" }}
          addonAfter={
            <>
              m<sup>2</sup>
            </>
          }
        />
      ),
      require: true,
    },
    {
      label: "Tiền thuê",
      name: "price",
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
      label: "Mô tả",
      name: "note",
      field: <Input.TextArea />,
    },
  ];

  const [form] = Form.useForm();

  return (
    <Modal
      title="Thêm Phòng"
      open={isOpen}
      onCancel={() => {
        onClose();
        form.resetFields();
      }}
      onOk={() => {
        form.submit();
      }}
      width={400}
    >
      <Form
        form={form}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        onFinish={(val) => {
          handleAddRoom(val, house.house_id);
          onClose();
        }}
        variant="filled"
        initialValues={{
          variant: "filled",
          house_id: house.house_name,
        }}
      >
        {FromItem.map((item, index) => {
          return (
            <Form.Item
              key={index}
              label={item.label}
              name={item.name}
              rules={
                item.require
                  ? [{ required: true, message: "Please input!" }]
                  : []
              }
            >
              {item.field}
            </Form.Item>
          );
        })}
      </Form>
    </Modal>
  );
};

export default ModalCreateRoom;
