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
      key: "Dashboard",
      name: "Dashboard",
      label: <Link to={"/manager"}>Tổng quát</Link>,
      icon: <HomeFilled />,
    },
    {
      key: "Room",
      name: "Room",
      label: <Link to={"/manager/Room"}>Danh sách trọ</Link>,
      icon: <InteractionFilled />,
    },
    {
      key: "DataEW",
      name: "DataEW",
      label: <Link to={"/manager/DataEW"}>Chỉ số điện-nước</Link>,
      icon: <MessageFilled />,
    },
    {
      key: "Rentalfee",
      name: "Rentalfee",
      label: <Link to={"/manager/Rentalfee"}>Tiền trọ</Link>,
      icon: <MessageFilled />,
    },
    {
      key: "Booking",
      name: "Booking",
      label: <Link to={"/manager/Booking"}>Cọc giữ phòng</Link>,
      icon: <MessageFilled />,
    },
    {
      key: "Otherfee",
      name: "Otherfee",
      label: <Link to={"/manager/Otherfee"}>Phát sinh</Link>,
      icon: <MessageFilled />,
    },
    {
      key: "Management",
      name: "Management",
      label: "Quẩn lý",
      icon: <CompassFilled />,
      children: [
        {
          key: "Customer",
          label: <Link to={"/manager/Customer"}>Người thuê</Link>,
        },
        {
          key: "House",
          label: <Link to={"/manager/House"}>Nhà trọ</Link>,
        },
        {
          key: "ListRoom",
          label: <Link to={"/manager/ListRoom"}>Phòng trọ</Link>,
        },
        {
          key: "Staff",
          label: <Link to={"/manager/Staff"}>Nhân viên</Link>,
        },
        {
          key: "Service",
          label: <Link to={"/manager/Service"}>Dịch vụ</Link>,
        },
      ],
    },
    {
      key: "Help",
      name: "Help",
      label: <Link to={"/Help"}>Hỗ trợ</Link>,
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
            <Typography className="SiderTitle_secondary">
              odging houses
            </Typography>
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
