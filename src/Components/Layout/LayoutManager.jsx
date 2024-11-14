import React, { useContext } from "react";
import { Outlet, useNavigate, Link } from "react-router-dom";
import { Layout, message, notification } from "antd";
import {
  HomeFilled,
  InteractionFilled,
  CompassFilled,
  MessageFilled,
} from "@ant-design/icons";

import { DataContext } from "./Layout.jsx";
import SiderCompoent from "./Sider.jsx";

const { Sider, Content } = Layout;

const LayoutManager = () => {
  const navigate = useNavigate();
  const [ws, setWs] = React.useState(null);
  const [api, contextHolder] = notification.useNotification();
  const [user, setUser] = React.useState({});
  const { addNotice, notice, clearNotice } = useContext(DataContext);

  React.useEffect(() => {
    const websocket = new WebSocket("ws://localhost:8081");
    setWs(websocket);
    websocket.onmessage = (event) => {
      const newNotification = JSON.parse(event.data);
      if (newNotification.success) {
        openNotification("Có thông báo mới");
        addNotice(newNotification);
      }
    };

    return () => {
      websocket.close();
    };
  }, []);

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    const parsedUser = JSON.parse(storedUser);
    setUser(parsedUser);
    if (!token) {
      navigate("/");
    } else if (Number(parsedUser.type) !== 2) navigate("/error");
  }, []);
  const MENU_ITEMS = [
    {
      key: "1",
      name: "Dashboard",
      label: <Link to={"/manager"}>Tổng quát</Link>,
      icon: <HomeFilled />,
    },
    {
      key: "2",
      name: "Room",
      label: <Link to={"/manager/Room"}>Danh sách trọ</Link>,
      icon: <InteractionFilled />,
    },
    {
      key: "3",
      name: "DataEW",
      label: <Link to={"/manager/DataEW"}>Chỉ số điện-nước</Link>,
      icon: <MessageFilled />,
    },
    {
      key: "4",
      name: "Rentalfee",
      label: <Link to={"/manager/Rentalfee"}>Tiền trọ</Link>,
      icon: <MessageFilled />,
    },
    {
      key: "5",
      name: "Booking",
      label: <Link to={"/manager/Booking"}>Cọc giữ phòng</Link>,
      icon: <MessageFilled />,
    },
    {
      key: "6",
      name: "Otherfee",
      label: <Link to={"/manager/Otherfee"}>Phát sinh</Link>,
      icon: <MessageFilled />,
    },
    {
      key: "sub",
      name: "Management",
      label: "Quẩn lý",
      icon: <CompassFilled />,
      children: [
        {
          key: "7",
          label: <Link to={"/manager/Customer"}>Người thuê</Link>,
        },
        {
          key: "8",
          label: <Link to={"/manager/House"}>Nhà trọ</Link>,
        },
        {
          key: "9",
          label: <Link to={"/manager/ListRoom"}>Phòng trọ</Link>,
        },
        {
          key: "10",
          label: <Link to={"/manager/Staff"}>Nhân viên</Link>,
        },
        {
          key: "11",
          label: <Link to={"/manager/Service"}>Dịch vụ</Link>,
        },
      ],
    },
    {
      key: "12",
      name: "Order",
      label: <Link to={"/manager/Order"}>Dịch vụ (order)</Link>,
      icon: <MessageFilled />,
    },
    {
      key: "Help",
      name: "Help",
      label: <Link to={"/Help"}>Hỗ trợ</Link>,
      icon: <MessageFilled />,
    },
  ];

  const openNotification = (message, type = "warning") => {
    api[type]({
      message: `Thông báo`,
      description: message,
    });
  };
  return (
    <Layout
      style={{
        backgroundColor: "transparent",
      }}
    >
      {contextHolder}
      <Sider
        width={"var(--width-sider)"}
        style={{
          backgroundColor: "white",
          boxShadow: "rgba(0, 0, 0, 0.5) 0px 10px 20px -3px",
        }}
      >
        <SiderCompoent menuItems={MENU_ITEMS} />
      </Sider>
      <Content style={{ paddingTop: "16px", paddingLeft: "16px" }}>
        <Outlet context={[user, setUser]} />
      </Content>
    </Layout>
  );
};

export default LayoutManager;
