import { useState } from "react";
import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import HeaderCompoent from "./Header.jsx";
import SiderCompoent from "./Sider.jsx";
import "../../Styles/Global.scss";
const { Header, Footer, Sider, Content } = Layout;
export default function DefaultLayout() {
  const [title, setTitle] = useState("");
  return (
    <Layout
      style={{ backgroundColor: "#e2e2e2", minHeight: "100vh", width: "100vw" }}
    >
      <Sider width={"var(--width-sider)"} style={{ backgroundColor: "white" }}>
        <SiderCompoent />
      </Sider>
      <Layout
        style={{ backgroundColor: "transparent", padding: "0px 20px 0px 15px" }}
      >
        <Header
          style={{
            backgroundColor: "transparent",
            height: "var(--height-header)",
            padding: "10px 10px",
          }}
        >
          <HeaderCompoent title={title} />
        </Header>
        <Content>
          <Outlet context={[title, setTitle]} />
        </Content>
      </Layout>
    </Layout>
  );
}
