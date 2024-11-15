import React, { createContext, useState, useEffect } from "react";

import { Layout, Typography } from "antd";
import { Outlet } from "react-router-dom";
import HeaderCompoent from "./Header.jsx";
import "../../Styles/Global.scss";
import { getFullAddr } from "../../services/address.js";
const { Header } = Layout;
export const DataContext = createContext();

export default function DefaultLayout() {
  const [isLoading, setIsLoading] = useState(false);
  const [fullAddr, setFullAddr] = useState([]);
  const [hasNotice, setHasNotice] = useState(false);
  const [notice, setNotice] = useState([]);
  const [isLogin, setIsLogin] = useState(false);
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const parsedUser = JSON.parse(storedUser);
    if (parsedUser) setIsLogin(true);
    getCityData();
  }, []);

  const getCityData = async () => {
    setIsLoading(true);
    try {
      const result = await getFullAddr();
      setFullAddr(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const addNotice = (newNotification = {}) => {
    console.log(newNotification);
    setNotice((prevNotifications) => [
      ...prevNotifications,
      {
        key: `${prevNotifications.length + 1}`,
        label: (
          <>
            <strong>{newNotification.title}</strong>
            <Typography>{newNotification.message}, kiểm tra ngay</Typography>
          </>
        ),
      },
    ]);
    setHasNotice(true);
  };

  // Hàm để đánh dấu đã đọc thông báo
  const clearNotice = () => {
    setHasNotice(false);
  };

  return (
    <DataContext.Provider
      value={{
        fullAddr,
        notice,
        hasNotice,
        addNotice,
        clearNotice,
        isLogin,
        setIsLogin,
      }}
    >
      <Layout
        style={{
          backgroundColor: "#dff1f7",
          minHeight: "100vh",
          width: "100vw",
        }}
      >
        {isLoading ? (
          <div>Đang tải dữ liệu.....</div>
        ) : (
          <>
            <Header
              style={{
                backgroundColor: "white",
                height: "var(--height-header)",
                padding: "0px 30px",
              }}
            >
              <HeaderCompoent />
            </Header>
            <Outlet />
          </>
        )}
      </Layout>
    </DataContext.Provider>
  );
}
