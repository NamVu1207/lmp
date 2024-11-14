import { Col, Flex, Row, Typography } from "antd";
import {
  CompassFilled,
  EnvironmentFilled,
  LockFilled,
} from "@ant-design/icons";

const Home = () => {
  return (
    <>
      <Row style={{ padding: "50px" }} justify={"center"} align={"middle"}>
        <Col span={8}>
          <Row gutter={[0, 24]}>
            <Col span={24}>
              <Typography
                style={{
                  fontSize: "2.4rem",
                  fontWeight: "500",
                }}
              >
                Hệ thống
              </Typography>
            </Col>
            <Col span={24}>
              <Typography
                style={{
                  fontSize: "5.2rem",
                  fontWeight: "700",
                  lineHeight: "1",
                  letterSpacing: "6px",
                }}
              >
                STATORI
              </Typography>
              <Typography
                style={{
                  fontSize: "5.2rem",
                  fontWeight: "700",
                  lineHeight: "1.2",
                  letterSpacing: "6px",
                }}
              >
                HOUSE
              </Typography>
            </Col>
            <Col span={24}>
              <Typography style={{ fontSize: "1.4rem" }}>
                Căn phòng mơ ước của bạn đang chờ đón! Khám phá hàng ngàn tùy
                chọn phòng trọ đa dạng, từ phòng trọ đơn giản đến căn hộ cao
                cấp, tất cả đều có sẵn trên hệ thống của chúng tôi.
              </Typography>
            </Col>
            <Col span={24}>
              <Row gutter={[50, 50]}>
                <Col span={12}>
                  <Flex>
                    <EnvironmentFilled
                      style={{
                        fontSize: "3rem",
                        marginRight: "16px",
                        color: "#00b2bc",
                      }}
                    />
                    <Typography style={{ fontSize: "1.1rem" }}>
                      Vị trí tiện lợi gần trường học hoặc các khu trung tâm
                    </Typography>
                  </Flex>
                </Col>
                <Col span={12}>
                  <Flex>
                    <CompassFilled
                      style={{
                        fontSize: "3rem",
                        marginRight: "16px",
                        color: "#00b2bc",
                      }}
                    />
                    <Typography style={{ fontSize: "1.1rem" }}>
                      Đa dạng tiện ích: không giới hạn số lượng xe, có thang
                      máy,....
                    </Typography>
                  </Flex>
                </Col>
                <Col span={12}>
                  <Flex>
                    <LockFilled
                      style={{
                        fontSize: "3rem",
                        marginRight: "16px",
                        color: "#00b2bc",
                      }}
                    />
                    <Typography style={{ fontSize: "1.1rem" }}>
                      Bảo mật vân tay 2 lớp, có camera giám sát ở tát cả khu vực
                    </Typography>
                  </Flex>
                </Col>
                <Col span={12}></Col>
              </Row>
            </Col>
          </Row>
        </Col>
        <Col span={16}>
          <Row gutter={[16, 0]} align={"middle"} justify={"center"}>
            <Col span={4}>
              <Row gutter={[0, 16]}>
                <Col span={24}>
                  <img src="./homeImg2.png" style={{ width: "100%" }} />
                </Col>
                <Col span={24}>
                  <img src="./homeImg3.jpg" style={{ width: "100%" }} />
                </Col>
                <Col span={24}>
                  <img src="./homeImg4.png" style={{ width: "100%" }} />
                </Col>
              </Row>
            </Col>
            <Col span={16}>
              <img src="./homeImg1.jpg" />
            </Col>
          </Row>
        </Col>
      </Row>
      <div
        style={{
          position: "absolute",
          bottom: "0",
          width: "100vw",
          backgroundColor: "#00b2bc",
          height: "60px",
        }}
      >
        <Flex
          style={{ height: "100%", padding: "0px 50px" }}
          align="center"
          justify="space-between"
        >
          <Typography
            style={{
              color: "white",
              fontSize: "1.1rem",
              fontWeight: "500",
              letterSpacing: "2px",
            }}
          >
            (+84)967-113-1212
          </Typography>
          <Typography
            style={{
              color: "white",
              fontSize: "1.1rem",
              fontWeight: "500",
              letterSpacing: "2px",
            }}
          >
            www.youtube.com
          </Typography>
        </Flex>
      </div>
    </>
  );
};

export default Home;
