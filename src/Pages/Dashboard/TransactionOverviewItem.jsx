import { Card, Col, Typography, Row } from "antd";
import { UserOutlined } from "@ant-design/icons";

const TransactionOverviewItem = ({
  icon,
  amount = "",
  title = "",
  percentChange = "",
  style = {},
  lineSpace = 4,
}) => {
  return (
    <Card style={style} className="DashboardCardInfo">
      <Row gutter={[8, lineSpace]}>
        <Col span={24}>{icon !== null ? icon : <></>}</Col>
        <Col span={24}>
          <Typography
            style={{
              fontSize: "1.2rem",
              fontWeight: "400",
            }}
            className="DashDashboardTitle"
          >
            {title}
          </Typography>
        </Col>
        <Col span={24}>
          <Typography
            style={{
              fontSize: "1.5rem",
              fontWeight: "bold",
            }}
            className="DashDashboardTitle"
          >
            {amount}
          </Typography>
        </Col>
        <Col span={24}>
          <Typography className="DashDashboardTitle">
            {percentChange}
          </Typography>
        </Col>
      </Row>
    </Card>
  );
};

export default TransactionOverviewItem;
