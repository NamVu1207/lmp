import { Typography, Row, Col, Menu, Flex } from "antd";
import {
  HomeFilled,
  InteractionFilled,
  CompassFilled,
  MessageFilled,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
const Sider = () => {
  const items = [
    {
      key: "dashboard",
      name: "dashboard",
      label: <Link to={"/"}>Tổng quát</Link>,
      icon: <HomeFilled />,
    },
    {
      key: "Rooms",
      name: "Rooms",
      label: <Link to={"/rooms"}>Danh sách trọ</Link>,
      icon: <InteractionFilled />,
    },
    {
      key: "EW",
      name: "EW",
      label: "Thống kê điện-nước",
      icon: <MessageFilled />,
    },
    {
      key: "Rentalfee",
      name: "Rentalfee",
      label: "Thống kê tiền trọ",
      icon: <MessageFilled />,
    },
    {
      key: "Operatingfee",
      name: "Operatingfee",
      label: "phí vận hành",
      icon: <MessageFilled />,
    },
    {
      key: "Management",
      name: "Management",
      label: "Quẩn lý",
      icon: <CompassFilled />,
      children: [
        {
          key: "Users",
          label: <Link to={"/users"}>Người thuê</Link>,
        },
        {
          key: "Houses",
          label: <Link to={"/houses"}>Nhà trọ</Link>,
        },
        {
          key: "typeroom",
          label: <Link to={"/typeroom"}>Phòng trọ</Link>,
        },
      ],
    },
    {
      key: "Help",
      name: "Help",
      label: "Hỗ trợ",
      icon: <MessageFilled />,
    },
  ];
  const handleClick = () => {};
  return (
    <Row className="SiderWrapper">
      <Col span={24}>
        <Link className="SiderTop" to={"/"}>
          <Flex>
            <Typography className="SiderTitle_primary">L</Typography>
            <Typography className="SiderTitle_secondary">odging houses</Typography>
          </Flex>
        </Link>
      </Col>
      <Col span={24}>
        <Menu
          style={{ border: "none" }}
          onClick={handleClick}
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
          className="SiderMenu"
        />
      </Col>
    </Row>
  );
};

export default Sider;
