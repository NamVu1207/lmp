import {
  Button,
  Col,
  DatePicker,
  Divider,
  Flex,
  Form,
  message,
  Modal,
  Row,
  Select,
} from "antd";
import React from "react";
import { loadbill, submitbill } from "../../services/rentalfee";
import Bill from "./Bill";
import { Await } from "react-router-dom";

const ModalPayBill = ({ isOpen = false, onOpen, config = [] }) => {
  const [form] = Form.useForm();
  const [form1] = Form.useForm();
  const [bill, setBill] = React.useState({});
  const [hasBill, setHasBill] = React.useState(false);
  const [totalPrice, setTotalPrice] = React.useState();
  const checkForm = (obj) => {
    return Object.keys(obj).some(
      (key) => obj[key] === undefined || obj[key] == null
    );
  };
  const CheckBill = async () => {
    form.submit();
    const obj = form.getFieldsValue();
    if (checkForm(obj)) message.warning("vui lòng điền đầy đủ");
    else {
      const result = await loadbill(obj);
      setHasBill(result.success);
      if (result.success) {
        setBill(result.data[0]);
      } else {
        setBill([]);
        message.warning(result.message);
      }
    }
  };

  const ClearModal = () => {
    setHasBill(false);
    setBill([]);
    form.resetFields();
    form1.resetFields();
    setTotalPrice("");
  };

  const submitPayment = async (billInfo) => {
    const result = await submitbill(billInfo);
    if (result.success) {
      ClearModal();
      message.success(result.message);
      onOpen(false);
    } else message.warning(result.message);
  };

  const getPayment = () => {
    if (bill.length === 0) {
      message.warning("vui lòng chọn hóa đơn trước!");
      return;
    }
    form1.submit();
    const obj = form1.getFieldsValue();
    if (checkForm(obj)) message.warning("vui lòng chọn phương thức thanh toán");
    else {
      const billInfo = {
        contract_id: bill.contract_id,
        price: totalPrice,
        payment_method: obj.paymentMethod,
        payment_month: bill.month_cons,
        payment_year: bill.year_cons,
      };
      submitPayment(billInfo);
    }
  };
  return (
    <Modal
      title="Tính tiền"
      width={900}
      open={isOpen}
      onOk={() => {}}
      onCancel={() => {
        onOpen(false);
      }}
      footer={(_, { OkBtn, CancelBtn }) => (
        <>
          <CancelBtn />
          <Button
            type="primary"
            danger
            onClick={getPayment}
            disabled={bill.payment_status}
          >
            Tính Tiền
          </Button>
        </>
      )}
    >
      <Form form={form}>
        <Row gutter={[8, 0]}>
          {config.map((item, index) => {
            return (
              <Col key={index}>
                <Form.Item
                  name={item.name}
                  label={item.label}
                  rules={[{ required: true, message: "Please input!" }]}
                >
                  <Select
                    allowClear
                    style={{ width: "140px" }}
                    options={item.option}
                  />
                </Form.Item>
              </Col>
            );
          })}
          <Col>
            <Form.Item
              name={"month"}
              label={"chọn tháng"}
              rules={[{ required: true, message: "Please input!" }]}
            >
              <DatePicker picker="month"></DatePicker>
            </Form.Item>
          </Col>
          <Col>
            <Button type="primary" onClick={CheckBill}>
              Check Bill
            </Button>
          </Col>
        </Row>
      </Form>
      <Divider style={{ borderColor: "#333", margin: "12px 0px" }} />
      {hasBill ? (
        <Bill
          data={bill}
          form={form1}
          totalPrice={totalPrice}
          setTotalPrice={setTotalPrice}
        />
      ) : (
        <div />
      )}
    </Modal>
  );
};

export default ModalPayBill;
