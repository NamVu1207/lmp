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

const Customer = () => {
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
      elec_start: 12,
      elec_end: 23,
      water_start: 1,
      water_end: 12,
      reading_date: "2024-10-05",
      elec_cost: 4000,
      water_cost: 2000,
    },
    {
      id: 2,
      house_name: "green house",
      name: "phòng 01",
      customer_name: "Nguyen Van A",
      elec_start: 12,
      elec_end: 23,
      water_start: 1,
      water_end: 12,
      reading_date: "2024-11-05",
      elec_cost: 4000,
      water_cost: 2000,
    },
  ];
  const columns = basicRenderColumns([
    {
      key: "id",
      name: "ID",
      width: 60,
      visible: false,
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
      key: "elec_start",
      name: "cs diện đầu",
      type: columnTypes.TextEditor,
    },
    {
      key: "elec_end",
      name: "cs diện cuối",
      type: columnTypes.TextEditor,
    },
    {
      key: "water_start",
      name: "cs nước đầu",
      type: columnTypes.TextEditor,
    },
    {
      key: "water_end",
      name: "cs nước cuối",
      type: columnTypes.TextEditor,
    },
    {
      key: "elec_cost",
      name: "Tiền điện",
      type: columnTypes.TextEditor,
    },
    {
      key: "water_cost",
      name: "Tiền nước",
      type: columnTypes.TextEditor,
    },
    {
      key: "month",
      name: "Tháng",
      type: columnTypes.TextEditor,
    },
    {
      key: "year",
      name: "năm",
      type: columnTypes.TextEditor,
    },
  ]);
  React.useEffect(() => {
    setTitle("TIỀN TRỌ");
  }, []);
  React.useEffect(() => {
    setRows(
      Info.map((item) => {
        const { reading_date, ...rest } = item;
        const [year, month] = reading_date.split("-");
        return { ...rest, year, month };
      })
    );
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

export default Customer;
