import React from "react";
import { Outlet, useNavigate, Link } from "react-router-dom";
import { Layout } from "antd";
import {
  HomeFilled,
  InteractionFilled,
  CompassFilled,
  MessageFilled,
} from "@ant-design/icons";

import SiderCompoent from "./Sider.jsx";

const { Sider, Content } = Layout;

const LayoutCustomer = () => {
  const navigate = useNavigate();
  const [user, setUser] = React.useState({});
  React.useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    const parsedUser = JSON.parse(storedUser);
    setUser(parsedUser);
    if (!token) {
      navigate("/");
    } else if (Number(parsedUser?.type) !== 1) navigate("/error");
  }, []);

  const MENU_ITEMS = [
    {
      key: "1",
      name: "Order",
      label: <Link to={"/customer"}>Đặt dịch vụ</Link>,
      icon: <HomeFilled />,
    },
    {
      key: "2",
      name: "History",
      label: <Link to={"/customer/Order"}>lịch sử yêu cầu</Link>,
      icon: <InteractionFilled />,
    },
    {
      key: "3",
      name: "Setting",
      label: <Link to={"/manager/DataEW"}>Cài đặt</Link>,
      icon: <MessageFilled />,
    },
  ];
  return (
    <Layout
      style={{
        backgroundColor: "transparent",
      }}
    >
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

export default LayoutCustomer;
