import React, { useState, useEffect, createRef, useRef } from "react";
import {
  Card,
  Col,
  Form,
  Row,
  Button,
  Typography,
  Flex,
  Input,
  List,
} from "antd";
import dayjs from "dayjs";
// import DataGrid, {
//   columnTypes,
//   paginationTypes,
//   selectionTypes,
// } from "../../Components/DataGrid/index.jsx";
import { UserOutlined } from "@ant-design/icons";
// import { Filter, filterType } from "../../Components/Fillter";
// import ToolBar, { toolBarButtonTypes } from "../../Components/ToolbarButton";
// import { basicRenderColumns } from "../../utils/dataTable.utils.js";
import TransactionOverviewItem from "./TransactionOverviewItem.jsx";
import VirtualList from "rc-virtual-list";
import { useOutletContext } from "react-router-dom";

const { Title } = Typography;
const { Search } = Input;

const Dashboard = () => {
  const onFocus = () => {};
  const gridRef = createRef();
  const vesselSelectRef = useRef();
  const [rows, setRows] = useState([]);
  const [data, setData] = useState([]);
  const [form] = Form.useForm();
  const [title, setTitle] = useOutletContext();

  React.useEffect(() => {
    setTitle("TỔNG QUÁT");
  }, []);

  const OverviewItem = [
    {
      icon: <UserOutlined className="DashboardIcon" />,
      amount: "10",
      title: "Số phòng đã thuê",
    },
    {
      icon: <UserOutlined className="DashboardIcon" />,
      amount: "12.000.000",
      title: "Tổng doanh thu",
      percentChange: "Tháng 9",
    },
    {
      icon: <UserOutlined className="DashboardIcon" />,
      amount: "2.000.000",
      title: "Số tiền đã chi",
      percentChange: "Tháng 9",
    },
  ];

  const NoticeItems = [
    {
      id: 1,
      icon: <UserOutlined className="DashboardIcon" />,
      title: "phòng 121",
      description: "2.000.000",
    },
    {
      id: 2,
      icon: <UserOutlined className="DashboardIcon" />,
      title: "phòng 211",
      description: "4.500.000",
    },
    {
      id: 3,
      icon: <UserOutlined className="DashboardIcon" />,
      title: "sửa đường ống nước",
      description: "300.000",
    },
    {
      id: 4,
      icon: <UserOutlined className="DashboardIcon" />,
      title: "sửa cầu thang",
      description: "500.000",
    },
  ];

  const buttonConfirm = () => {}; // Action cua cac button
  const handleLoadData = () => {}; // xu ly nap ddu lieu
  const handleExport = () => {}; // xu ly xuat excel
  return (
    <Row gutter={[30, 30]}>
      <Col span={15}>
        <Card
          style={{
            padding: "30px",
            borderRadius: "20px",
          }}
        >
          <Row gutter={[0, 12]}>
            <Col span={24}>
              <Title style={{ margin: "0px", fontWeight: "bold" }} level={4}>
                Sơ lược 
              </Title>
            </Col>
            <Col span={24}>
              <Typography style={{ fontSize: "1.1rem" }}>năm 2024</Typography>
            </Col>
            <Col span={24}>
              <Flex justify="space-around">
                {OverviewItem.map((item) => {
                  return (
                    <TransactionOverviewItem
                      icon={item.icon}
                      amount={item.amount}
                      title={item.title}
                      percentChange={item.percentChange}
                      style={{
                        width: "250px",
                        height: "186px",
                        padding: "20px",
                        boxShadow: "none",
                      }}
                    />
                  );
                })}
              </Flex>
            </Col>
          </Row>
        </Card>
      </Col>
      <Col span={9}>
        <Card
          style={{
            padding: "20px",
            borderRadius: "20px",
          }}
        >
          <Row>
            <Col span={24}>
              <Title
                style={{
                  margin: "0px",
                  paddingBottom: "16px",
                  fontWeight: "bold",
                }}
                level={4}
              >
                Thu chi gần đây
              </Title>
            </Col>
            <Col span={24}>
              <TransactionOverviewItem
                style={{
                  width: "100%",
                  height: "90px",
                  padding: "10px",
                  paddingLeft: "30px",
                }}
                title="Tháng 9"
                amount="số lượng giao dịch: 20"
                lineSpace={0}
              />
            </Col>
            <Col span={24}>
              <List>
                <VirtualList
                  data={NoticeItems}
                  height={200}
                  itemHeight={40}
                  itemKey={"id"}
                >
                  {(item) => (
                    <List.Item key={item.id}>
                      <List.Item.Meta
                        avatar={item.icon}
                        title={item.title}
                        description={item.description}
                      />
                      <div>Content</div>
                    </List.Item>
                  )}
                </VirtualList>
              </List>
            </Col>
          </Row>
        </Card>
      </Col>
      <Col span={12}></Col>
      <Col span={12}></Col>
      <Col span={17}></Col>
      <Col span={7}></Col>
    </Row>
  );
};

export default Dashboard;
