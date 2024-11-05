import React, { createContext, useState, useEffect } from "react";

import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import HeaderCompoent from "./Header.jsx";
import SiderCompoent from "./Sider.jsx";
import "../../Styles/Global.scss";
import { getFullAddr } from "../../services/address.js";
const { Header, Footer, Sider, Content } = Layout;
export const DataContext = createContext();

export default function DefaultLayout() {
  const [title, setTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(true);
  useEffect(() => {
    // getCityData();
  }, []);

  const getCityData = async () => {
    setIsLoading(true);
    try {
      const result = await getFullAddr();
      setData(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <DataContext.Provider value={data}>
      <Layout
        style={{
          backgroundColor: "#e2e2e2",
          minHeight: "100vh",
          width: "100vw",
        }}
      >
        {isLoading ? (
          <div>Đang tải dữ liệu.....</div>
        ) : (
          <>
            <Sider
              width={"var(--width-sider)"}
              style={{ backgroundColor: "white" }}
            >
              <SiderCompoent />
            </Sider>
            <Layout
              style={{
                backgroundColor: "transparent",
                padding: "0px 20px 0px 15px",
              }}
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
          </>
        )}
      </Layout>
    </DataContext.Provider>
  );
}
