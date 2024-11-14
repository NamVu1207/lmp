import {
  Typography,
  Input,
  Row,
  Col,
  Dropdown,
  Button,
  Divider,
  Flex,
  Modal,
  Menu,
} from "antd";
import {
  SettingOutlined,
  BellOutlined,
  LogoutOutlined,
  MenuOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

import { DataContext } from "./Layout";
import avatar from "../../assets/avatar.jpg";
import React, { useContext } from "react";
import Login from "../../Pages/Login/Login";

const { Search } = Input;

const Header = () => {
  // const isMC = Number(user.type) === 1 ? "customer" : Number(user.type) === 2 ? "manager" : "other";
  const { hasNotice, clearNotice, notice, isLogin, setIsLogin } =
    useContext(DataContext);
  const [items, setItems] = React.useState([]);
  const [isOpenModal, setIsOpenModal] = React.useState(false);
  const [user, setUser] = React.useState({});
  const [isMC, setIsMC] = React.useState("");
  const [currentKey, setCurrentKey] = React.useState("home");
  const SETTING_ITEMS = [
    {
      key: "ManagerCus",
      label: <Link to={`/${isMC}`}>chế dộ quản lý</Link>,
      icon: <MenuOutlined />,
    },
    {
      key: "logout",
      label: <Link to="/">đăng suất</Link>,
      icon: <LogoutOutlined />,
    },
  ];
  const MENU_ITEMS = [
    {
      key: "home",
      label: <Link to={"/"}>Home</Link>,
    },
    {
      key: "info",
      label: <Link to={"/Info"}>Info</Link>,
    },
    {
      key: "contact",
      label: <Link to={"/Contact"}>Contact</Link>,
    },
  ];
  React.useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const parsedUser = JSON.parse(storedUser);
    setUser(parsedUser);
    if (parsedUser)
      setIsMC(Number(parsedUser.type) === 1 ? "customer" : "manager");
    else setIsMC("other");
  }, [isLogin]);
  React.useEffect(() => {
    if (notice.length === 0)
      setItems([{ key: "1", label: "không thông báo mới" }]);
    else setItems(notice);
  }, [notice]);

  const onClick = ({ key }) => {
    if (key === "logout") {
      setIsLogin(false);
      localStorage.clear("token");
    }
  };
  const selectMenu = ({ key }) => {
    setCurrentKey(key);
  };
  const closeModal = () => {
    setIsOpenModal(false);
  };
  return (
    <>
      <Row align="middle" justify="space-between" style={{ blockSize: "100%" }}>
        <Col>
          <Flex>
            <Typography className="SiderTitle_primary">L</Typography>
            <Typography className="SiderTitle_secondary">
              odging houses
            </Typography>
          </Flex>
        </Col>
        <Col>
          <Flex justify="center" align="center">
            {isLogin ? (
              <>
                <Search
                  size="large"
                  placeholder="Tìm kiếm"
                  className="HeaderSearch"
                ></Search>
                <Dropdown
                  menu={{ items }}
                  placement="bottomRight"
                  trigger={["click"]}
                >
                  <Button
                    size="large"
                    className="HeaderBtn"
                    icon={<BellOutlined />}
                    style={{
                      position: "relative",
                      width: "40px",
                    }}
                    onClick={clearNotice}
                  >
                    {hasNotice && (
                      <div
                        style={{
                          position: "absolute",
                          backgroundColor: "#fc6a6a",
                          width: "20px",
                          height: "20px",
                          borderRadius: "50%",
                          top: "-9px",
                          right: "-9px",
                        }}
                      />
                    )}
                  </Button>
                </Dropdown>
                <Dropdown
                  menu={{ items: SETTING_ITEMS, onClick }}
                  placement="bottomRight"
                >
                  <Button
                    size="large"
                    className="HeaderBtn"
                    icon={<SettingOutlined />}
                  />
                </Dropdown>
                <Divider
                  type="vertical"
                  style={{
                    blockSize: "30px",
                    marginInlineEnd: "40px",
                    marginInlineStart: "10px",
                  }}
                />
                <Row align={"middle"} className="HeaderAcc">
                  <Col style={{ paddingInlineEnd: "10px" }}>
                    <Typography className="HeaderAccName">
                      {user?.cus_name ?? user?.employee_name}
                    </Typography>
                    <Typography className="HeaderAccRole">
                      {user?.department ?? "customer"}
                    </Typography>
                  </Col>
                  <Col style={{ display: "flex" }}>
                    <img
                      className="HeaderAccImg"
                      src={avatar}
                      alt="avatar"
                    ></img>
                  </Col>
                </Row>
              </>
            ) : (
              <>
                <Menu
                  items={MENU_ITEMS}
                  selectedKeys={[currentKey]}
                  onClick={selectMenu}
                  mode="horizontal"
                  style={{ width: "250px" }}
                />
                <Divider
                  type="vertical"
                  style={{
                    blockSize: "32px",
                    margin: "0px 12px",
                    borderColor: "#bcbcbc",
                  }}
                />
                <Button
                  type="primary"
                  style={{ width: "80px" }}
                  onClick={() => {
                    setIsOpenModal(true);
                  }}
                >
                  Login
                </Button>
              </>
            )}
          </Flex>
        </Col>
      </Row>
      <Modal open={isOpenModal} footer={null} onCancel={closeModal}>
        <Login closeModal={closeModal} />
      </Modal>
    </>
  );
};

export default Header;
