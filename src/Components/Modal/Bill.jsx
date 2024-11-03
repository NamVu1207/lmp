import { Col, Flex, Form, Row, Select, Typography } from "antd";
import dayjs from "dayjs";
import { basicRenderColumns } from "../../utils/dataTable.utils";
import Grid from "../DataGrid";
import React from "react";

const { Title } = Typography;

const Bill = ({ data = {}, form, totalPrice, setTotalPrice }) => {
  const date = dayjs().date();
  const month = dayjs().month() + 1;
  const year = dayjs().year();
  const gridRef = React.createRef();
  const [rows, setRows] = React.useState([]);

  React.useEffect(() => {
    const item = [
      {
        ItemName: "Tiền phòng",
        Quantity: 1,
        UnitPrice: data.room_price,
      },
      {
        ItemName: "Tiền điện",
        Quantity: data.elec_quantity,
        UnitPrice: data.elec_cost,
      },
      {
        ItemName: "Tiền nước",
        Quantity: data.water_quantity,
        UnitPrice: data.water_cost,
      },
    ];
    const service = data.services.map((item) => {
      if (item.no_service) return { ItemName: "NoService" };
      return {
        ItemName: item.name,
        Quantity: item.quantity,
        UnitPrice: item.price,
      };
    });
    if (service[0].ItemName === "NoService") setRows([...item]);
    else
      setRows([
        ...item,
        { ItemName: "Services", Quantity: 0, UnitPrice: 0 },
        ...service,
      ]);
  }, [data]);
  React.useEffect(() => {
    const price = rows.reduce(
      (prev, item) => prev + Number(item.Quantity) * Number(item.UnitPrice),
      0
    );
    setTotalPrice(price);
  }, [rows]);
  const columns = basicRenderColumns([
    {
      key: "STT",
      name: "STT",
      width: 60,
      colSpan(args) {
        if (args.type === "SUMMARY") {
          return 4;
        }
      },
      renderSummaryCell() {
        return <Flex justify="center">Tổng Tiền</Flex>;
      },
    },
    {
      key: "ItemName",
      name: "Nội dung",
      width: 240,
      colSpan(args) {
        if (args.type === "ROW") {
          if (args.row.STT === 4) return 4;
        }
      },
    },
    {
      key: "Quantity",
      name: "Số lượng",
    },
    {
      key: "UnitPrice",
      name: "Đơn giá",
    },
    {
      key: "TotalPrice",
      name: "Thành tiền",
      renderSummaryCell({ row }) {
        return (
          <Flex justify="center">
            {new Intl.NumberFormat().format(row.totalPrice)}
          </Flex>
        );
      },
    },
  ]);
  return (
    <>
      <Row gutter={[0, 8]}>
        <Col span={24}>
          <Typography>
            ngày {date} tháng {month} năm {year}
          </Typography>
        </Col>
        <Col span={24}>
          <Flex justify="center">
            <Title level={4}>HÓA ĐƠN PHÒNG TRỌ THÁNG {data.month_cons}</Title>
          </Flex>
        </Col>
        <Col span={24}>
          <Flex justify="space-between">
            <Typography>Phòng: {data.room_name}</Typography>
            <Typography>Mã hợp đồng: {data.contract_id}</Typography>
          </Flex>
        </Col>
        <Col span={12}>
          <Form form={form}>
            <Form.Item
              name={"paymentMethod"}
              label={"Phương thức thanh toán"}
              rules={[{ required: true, message: "Please input!" }]}
            >
              <Select
                style={{ width: "160px" }}
                placeholder="select payment"
                allowClear
                options={[
                  { value: "cash", label: "tiền mặt" },
                  { value: "credit_card", label: "thẻ tín dụng" },
                  { value: "bank_transfer", label: "Chuyển khoản" },
                ]}
              />
            </Form.Item>
          </Form>
        </Col>
        <Col span={12}>
          <Flex justify="center">
            <Typography
              style={{
                fontSize: "20px",
                fontWeight: "500",
                color: data.payment_status ? "#04e04e" : "#eb0707",
              }}
            >
              {data.payment_status ? "đã thanh toán" : "chưa thanh toán"}
            </Typography>
          </Flex>
        </Col>
        <Col span={24} style={{ height: "400px" }}>
          <Grid
            ref={gridRef}
            columns={columns}
            columnKeySelected="STT"
            bottomSummaryRows={[
              {
                id: "total_0",
                totalPrice: totalPrice,
              },
            ]}
            rows={rows}
            setRows={setRows}
          />
        </Col>
      </Row>
    </>
  );
};

export default Bill;
