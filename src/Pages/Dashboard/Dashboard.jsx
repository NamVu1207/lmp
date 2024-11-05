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
  Tooltip,
  Divider,
} from "antd";
import dayjs from "dayjs";
import { UserOutlined } from "@ant-design/icons";
import TransactionOverviewItem from "./TransactionOverviewItem.jsx";
import VirtualList from "rc-virtual-list";
import { useNavigate, useOutletContext } from "react-router-dom";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  Bar,
} from "recharts";
import { booking, expenses, roomCount } from "../../services/dashboard.js";

const { Title } = Typography;
const { Search } = Input;

const COLORS = ["#9d7afc", "#82ca9d", "#ffc658"];

const Dashboard = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useOutletContext();
  const [itemBarChart, setItemBarChart] = useState([]);
  const [itemPieChart, setItemPieChart] = useState([]);
  const [itemBooking, setItemBooking] = useState([]);
  const imgHouse = "./house.png";

  React.useEffect(() => {
    setTitle("TỔNG QUÁT");
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
    getItemBarChart();
    getItemPieChart();
    getBooking();
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

  const getItemBarChart = async () => {
    const year = 2024;
    const result = await expenses(year);
    const arr = result.data.map((item) => ({
      ...item,
      month: dayjs()
        .month(item.month - 1)
        .format("MMM"),
    }));
    setItemBarChart(arr);
  };

  const getItemPieChart = async () => {
    const result = await roomCount();
    const arr = result.data.map((item) => ({
      name: item.status,
      value: Number(item.count),
    }));
    setItemPieChart(arr);
  };

  const getBooking = async () => {
    const result = await booking();
    if (result.success) setItemBooking(result.data);
  };

  const buttonConfirm = () => {}; // Action cua cac button
  const handleLoadData = () => {}; // xu ly nap ddu lieu
  const handleExport = () => {}; // xu ly xuat excel
  return (
    <Row gutter={[30, 30]}>
      <Col span={15}>
        <Card
          style={{
            padding: "24px",
            backgroundColor: "#ffe9e0",
            position: "relative",
          }}
        >
          <Title style={{ margin: "0px" }} level={2}>
            Welcome Back !
          </Title>
          <Typography
            style={{ fontSize: "16px", fontWeight: "500", color: "gray" }}
          >
            Thống kê dữ liệu các phòng hiện có theo trạng thái phòng
          </Typography>
          <Flex align="center">
            <PieChart width={240} height={240}>
              <Pie
                dataKey="value"
                isAnimationActive={false}
                data={itemPieChart}
                // cx={120}
                // cy={120}
                outerRadius={80}
                fill="#8884d8"
                label
              >
                {itemPieChart.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart>
            <div>
              <Typography>Tổng số phòng</Typography>
              <Title style={{ margin: "0px" }}>
                {itemPieChart.reduce((prev, item) => prev + item.value, 0)}
              </Title>
            </div>
            <Divider
              type="vertical"
              style={{
                height: "160px",
                borderColor: "#fc9878",
                margin: "0px 20px",
              }}
            />
            <div>
              {itemPieChart.map((entry, index) => (
                <Typography
                  key={index}
                  style={{
                    borderLeft: "8px solid #333",
                    paddingLeft: "8px",
                    margin: "12px",
                    borderColor: COLORS[index % COLORS.length],
                    fontWeight: "500",
                  }}
                >
                  {entry.name}
                </Typography>
              ))}
            </div>
          </Flex>
          <img
            src={imgHouse}
            style={{ position: "absolute", right: "0px", bottom: "0px" }}
          ></img>
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
                title={`Tháng ${dayjs().month() + 1}`}
                amount={`số lượng đặt cọc: ${itemBooking.length}`}
                lineSpace={0}
              />
            </Col>
            <Col span={24}>
              <List>
                <VirtualList
                  data={itemBooking}
                  height={200}
                  itemHeight={40}
                  itemKey={"id"}
                >
                  {(item) => (
                    <List.Item key={item.id}>
                      <List.Item.Meta
                        title={`${item.house_name} - ${item.room_name}`}
                        description={item.cus_name}
                      />
                      <div>{dayjs(item.target_date).format("YYYY-MM-DD")}</div>
                    </List.Item>
                  )}
                </VirtualList>
              </List>
            </Col>
          </Row>
        </Card>
      </Col>
      <Col span={15}>
        <Card title={"Tổng thi chi năm 2024"}>
          <BarChart width={900} height={350} data={itemBarChart}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="rental_fee" fill="#8884d8" />
            <Bar dataKey="other_fee" fill="#82ca9d" />
          </BarChart>
        </Card>
      </Col>
    </Row>
  );
};

export default Dashboard;
