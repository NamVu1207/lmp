import { Row, Col, Menu } from "antd";
import React from "react";
const Sider = ({ menuItems }) => {
  const [key, setKey] = React.useState(
    () => localStorage.getItem("selectedMenuKey") || "1"
  );

  React.useEffect(() => {
    const savedKey = localStorage.getItem("selectedMenuKey");
    if (savedKey) {
      setKey(savedKey);
    }
  }, []);

  const handleClick = (e) => {
    setKey(e.key);
    localStorage.setItem("selectedMenuKey", e.key);
  };
  return (
    <Row className="SiderWrapper">
      <Col span={24}>
        <Menu
          style={{ border: "none" }}
          onClick={handleClick}
          defaultSelectedKeys={[key]}
          mode="inline"
          items={menuItems}
          className="SiderMenu"
        />
      </Col>
    </Row>
  );
};

export default Sider;
