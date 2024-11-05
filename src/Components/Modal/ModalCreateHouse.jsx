import { DatePicker, Form, Input, InputNumber, Modal, Select } from "antd";
import React from "react";
import { getCity, getDistrict, getWard } from "../../services/address";

const { RangePicker } = DatePicker;
const ModalCreateHouse = ({ isOpen = false, onClose, handleAddHouse }) => {
  const [city, setCity] = React.useState([]);
  const [district, setDistrict] = React.useState([]);
  const [ward, setWard] = React.useState([]);
  const [form] = Form.useForm();
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
      label: "Thành phố",
      name: "city",
      field: (
        <Select
          allowClear
          showSearch
          style={{ width: "100%" }}
          filterOption={(input, option) =>
            (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
          }
          options={city}
          onChange={(val) => {
            getDistrictData(val);
          }}
        />
      ),
      require: true,
    },
    {
      label: "Quận",
      name: "district",
      field: (
        <Select
          allowClear
          showSearch
          style={{ width: "100%" }}
          filterOption={(input, option) =>
            (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
          }
          options={district}
          onChange={(val) => {
            getWardData(val);
          }}
        />
      ),
      require: true,
    },
    {
      label: "Phường",
      name: "ward",
      field: (
        <Select
          allowClear
          showSearch
          style={{ width: "100%" }}
          filterOption={(input, option) =>
            (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
          }
          options={ward}
        />
      ),
      require: true,
    },
    {
      label: "Địa chỉ",
      name: "house_address",
      field: <Input.TextArea />,
      require: true,
    },
  ];
  React.useEffect(() => {
    getCityData();
  }, []);
  const getCityData = async () => {
    const result = await getCity();
    const ct = result.data.map((item) => ({
      label: item.name,
      value: item.id,
    }));
    setCity(ct);
  };
  const getDistrictData = async (id) => {
    const result = await getDistrict(id);
    const dist = result.data.map((item) => ({
      label: item.name,
      value: item.id,
    }));
    setDistrict(dist);
  };
  const getWardData = async (id) => {
    const result = await getWard(id);
    const wd = result.data.map((item) => ({
      label: item.name,
      value: item.id,
    }));
    setWard(wd);
  };

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
