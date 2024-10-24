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
const ModalCreateHouse = ({ isOpen = false, onClose, handleAddHouse }) => {
  const FromItem = [
    {
      label: "Tên Nhà",
      name: "house_name",
      field: <Input />,
      require: true,
    },
    {
      label: "Số Tầng",
      name: "floors",
      field: <InputNumber style={{ width: "100%" }} />,
      require: true,
    },
    {
      label: "Số Phòng",
      name: "rooms",
      field: <InputNumber style={{ width: "100%" }} />,
      require: true,
    },
    {
      label: "Địa chỉ",
      name: "house_address",
      field: <Input.TextArea />,
      require: true,
    },
  ];

  const [form] = Form.useForm();

  return (
    <Modal
      title="Thêm Nhà"
      open={isOpen}
      onCancel={onClose}
      onOk={() => {
        form.submit();
      }}
      width={400}
    >
      <Form
        form={form}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        onFinish={(val) => {
          handleAddHouse(val);
          onClose();
        }}
        variant="filled"
        initialValues={{
          variant: "filled",
        }}
      >
        {FromItem.map((item, index) => {
          return (
            <Form.Item
              key={index}
              label={item.label}
              name={item.name}
              rules={[{ required: true, message: "Please input!" }]}
            >
              {item.field}
            </Form.Item>
          );
        })}
      </Form>
    </Modal>
  );
};

export default ModalCreateHouse;
