import {
  Typography,
  Row,
  Col,
  Form,
  Input,
  Checkbox,
  Button,
  Flex,
  message,
} from "antd";
import {
  UserOutlined,
  LockOutlined,
  EyeOutlined,
  EyeInvisibleOutlined,
  LoginOutlined,
} from "@ant-design/icons";
import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { auth } from "../../services";

const { Title } = Typography;
const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  });
  const handleSubmit = async (e) => {
    setIsLoading(true);
    try {
      const result = await auth.Login(e);
      if (result) navigate("/");
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };
  return (
    <Row align={"middle"} justify={"center"} className="LoginWrapper">
      <Col className="Col" span={12}>
        <Row gutter={[0, 36]} style={{ width: "45%" }}>
          <Col className="Col" span={24}>
            <Title level={3} style={{ margin: "0px" }}>
              Quản lý nhà trọ
            </Title>
          </Col>
          <Col className="Col" span={24}>
            <Form
              style={{ width: "100%" }}
              wrapperCol={{ span: 24 }}
              name="basic"
              initialValues={{
                remember: false,
              }}
              autoComplete="off"
              onFinish={handleSubmit}
            >
              <Form.Item
                name="username"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập tên đăng nhập!",
                  },
                ]}
              >
                <Input
                  className="LoginInfor"
                  placeholder="Tên người dùng"
                  prefix={<UserOutlined />}
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập mật khẩu!",
                  },
                ]}
              >
                <Input.Password
                  className="LoginInfor"
                  placeholder="Mật khẩu"
                  prefix={<LockOutlined />}
                  iconRender={(visible) =>
                    visible ? <EyeInvisibleOutlined /> : <EyeOutlined />
                  }
                />
              </Form.Item>
              <Form.Item name="remember" valuePropName="checked">
                <Flex align="center" justify="space-between">
                  <Checkbox
                    style={{
                      fontSize: "1rem",
                      color: "#3b4bc2",
                      fontWeight: "bold",
                    }}
                  >
                    Lưu đăng nhập
                  </Checkbox>
                  <Link
                    style={{
                      color: "#3b4bc2",
                      fontSize: "1rem",
                      fontWeight: "bold",
                    }}
                  >
                    Quên mật khẩu?
                  </Link>
                </Flex>
              </Form.Item>
              <Form.Item>
                <Button
                  className="LoginButtonConfirm"
                  disabled={isLoading}
                  type="default"
                  htmlType="submit"
                  icon={<LoginOutlined />}
                >
                  Đăng nhập
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default Login;
