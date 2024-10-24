import {
  Button,
  Card,
  Col,
  DatePicker,
  Divider,
  Flex,
  Input,
  Menu,
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

const Rentalfee = () => {
  const onFocus = () => {};
  const gridRef = React.createRef();
  const [rows, setRows] = React.useState([]);
  const [title, setTitle] = useOutletContext();
  const Info = [
    {
      id: 1,
      house_name: "green house",
      name: "phòng 01",
      customer_name: "Nguyen Van A",
      rentalfee: 4500000,
      payment_date: "2024-10-05",
      payment_month: 10,
      payment_year: 2024,
      payment_status: 1,
    },
    {
      id: 2,
      house_name: "green house",
      name: "phòng 02",
      customer_name: "Nguyen Van A",
      rentalfee: 4500000,
      payment_date: "2024-10-05",
      payment_month: 10,
      payment_year: 2024,
      payment_status: 0,
    },
  ];
  const columns = basicRenderColumns([
    {
      key: "id",
      name: "ID",
      width: 60,
      visible: true,
    },
    {
      key: "STT",
      name: "stt",
      width: 60,
    },
    {
      key: "house_name",
      name: "Nhà",
      type: columnTypes.TextEditor,
      editable: true,
    },
    {
      key: "name",
      name: "Phòng",
      type: columnTypes.TextEditor,
      editable: true,
    },
    {
      key: "customer_name",
      name: "Khách thuê",
      type: columnTypes.TextEditor,
      editable: true,
    },
    {
      key: "rentalfee",
      name: "tiền trọ",
      type: columnTypes.TextEditor,
    },
    {
      key: "payment_date",
      name: "ngày thanh toán",
      type: columnTypes.TextEditor,
    },
    {
      key: "payment_status",
      name: "trạng thái",
      type: columnTypes.TextEditor,
    },
    {
      key: "note",
      name: "ghi chú",
      type: columnTypes.TextEditor,
    },
    {
      key: "payment_month",
      name: "tháng",
      type: columnTypes.TextEditor,
      visible: true,
    },
    {
      key: "payment_year",
      name: "năm",
      type: columnTypes.TextEditor,
      visible: true,
    },
  ]);
  React.useEffect(() => {
    setTitle("TIỀN TRỌ");
  }, []);
  React.useEffect(() => {
    setRows(Info);
  }, []);
  const handleChange = () => {};
  return (
    <>
      <Row gutter={[8, 16]}>
        <Col span={24}>
          <Card style={{ padding: "12px" }}>
            <Row gutter={[8, 8]}>
              <Col span={12}>
                <Flex gap="middle">
                  <DatePicker onChange={handleChange} picker="month" />
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
              <Col offset={7} span={5}>
                <Flex justify="space-around" align="center">
                  <Button type="primary">Xuất Excel</Button>
                  <Button type="primary" style={{ backgroundColor: "#ffb500" }}>
                    Thêm
                  </Button>
                  <Button type="primary" danger>
                    Xóa
                  </Button>
                  <Button type="primary" style={{ backgroundColor: "#48e7db" }}>
                    Lưu
                  </Button>
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
              columnKeySelected="id"
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
    </>
  );
};

export default Rentalfee;
