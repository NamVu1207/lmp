import dayjs from "dayjs";
import React from "react";
import { useOutletContext } from "react-router-dom";
import {
  Button,
  Col,
  Flex,
  Form,
  message,
  Modal,
  Row,
  Steps,
  Typography,
} from "antd";
import {
  CheckCircleOutlined,
  LeftOutlined,
  RightOutlined,
} from "@ant-design/icons";

import Services from "./Services";
import DateTimePicker from "./DateTimePicker";
import Confirm from "./Confirm";

import { load } from "../../services/service.js";
import { save } from "../../services/order.js";

const CustomerService = () => {
  const [form] = Form.useForm();
  const [user] = useOutletContext();
  const [currentStep, setCurrentStep] = React.useState(0);
  const [services, setServices] = React.useState([]);
  React.useEffect(() => {
    getService(user.house_id);
  }, [user]);

  const steps = [
    {
      title: "Select Service",
      name: "service",
      content: (
        <Services
          name={"service"}
          defaultValue={form.getFieldsValue().items?.service ?? 0}
          options={services}
        />
      ),
    },
    {
      title: "Select Time",
      name: "datetime",
      content: <DateTimePicker name={"datetime"} />,
    },
    {
      title: "Confirm",
      name: "confirm",
      content: (
        <Confirm
          service={services.find(
            (item) => item.id === form.getFieldsValue().items?.service
          )}
          date={dayjs(form.getFieldsValue().items?.date).format("YYYY-MM-DD")}
          time={dayjs(form.getFieldsValue().items?.time).format("HH:mm:ss")}
        />
      ),
    },
  ];

  const getService = async (house_id) => {
    const filter = {
      house_id: house_id,
      service_type: "ordered",
    };
    const result = await load(filter);
    setServices(result.data);
  };

  const next = () => {
    setCurrentStep(currentStep + 1);
  };

  const prev = () => {
    setCurrentStep(currentStep - 1);
  };

  const showConfirm = (message) => {
    Modal.confirm({
      icon: <div />,
      content: (
        <Flex vertical justify="center" align="center">
          <CheckCircleOutlined
            style={{ fontSize: "3rem", color: "#39e3a7", marginBottom: "12px" }}
          />
          <strong>{message}</strong>
        </Flex>
      ),
      footer: (_, { OkBtn }) => (
        <>
          <OkBtn />
        </>
      ),
    });
    setTimeout(() => {
      Modal.destroyAll();
    }, 1500);
  };

  const onFinish = async (e) => {
    if (!e.items?.service) {
      message.warning("bạn chưa chọn dịch vụ");
      return;
    }
    const data = [
      {
        house_id: user.house_id,
        room_id: user.room_id,
        customer_id: user.id,
        service_id: e.items.service,
        target_date: e.items?.date,
        target_time: e.items?.time,
        note: e.items?.note,
      },
    ];
    const result = await save({ datas: data });
    if (result.data.message[0].success) {
      showConfirm(result.data.message[0].message);
      form.resetFields();
      setCurrentStep(0);
    }
  };

  const items = steps.map((item, index) => ({
    key: index,
    title:
      currentStep === index
        ? item.title
        : currentStep > index
        ? "Finished"
        : "Waiting",
  }));
  return (
    <Flex vertical align="center">
      <Typography.Title level={3}>
        Welcome back, {user.cus_name}
      </Typography.Title>
      <Row
        align="middle"
        justify="space-between"
        gutter={[0, 50]}
        style={{ marginTop: 24, width: "70%" }}
      >
        <Col>
          <Button
            type="outline"
            icon={<LeftOutlined />}
            iconPosition="start"
            disabled={currentStep === 0}
            style={{
              fontWeight: "500",
              fontSize: "1rem",
              color: currentStep === 0 && "gray",
            }}
            onClick={() => prev()}
          >
            Previous
          </Button>
        </Col>
        <Col span={10}>
          <Steps current={currentStep} items={items} />
        </Col>
        <Col>
          <Button
            icon={<RightOutlined />}
            iconPosition="end"
            disabled={currentStep === steps.length - 1}
            style={{
              fontWeight: "500",
              fontSize: "1rem",
              color: currentStep === steps.length - 1 && "gray",
            }}
            type="outline"
            onClick={next}
          >
            Next
          </Button>
        </Col>
        <Col span={10} offset={7}>
          <Form form={form} onFinish={onFinish}>
            <Form.List name={"items"}>
              {() => {
                return steps[currentStep].content;
              }}
            </Form.List>
          </Form>
        </Col>
      </Row>
    </Flex>
  );
};

export default CustomerService;
