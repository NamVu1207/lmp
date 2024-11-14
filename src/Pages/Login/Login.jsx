import { useNavigate, Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
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
  Radio,
} from "antd";
import {
  UserOutlined,
  LockOutlined,
  EyeOutlined,
  EyeInvisibleOutlined,
  LoginOutlined,
} from "@ant-design/icons";
import { auth } from "../../services";
import { DataContext } from "../../Components/Layout/Layout";

const { Title } = Typography;
const Login = ({ closeModal }) => {
  const [form] = Form.useForm();
  const { setIsLogin } = useContext(DataContext);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    const parsedUser = JSON.parse(storedUser);
    if (token) {
      setIsLogin(true);
      if (Number(parsedUser.type) === 2) navigate("/manager");
      else if (Number(parsedUser.type) === 1) navigate("/customer");
    }
  }, []);
  const handleSubmit = async (e) => {
    setIsLoading(true);
    try {
      const result = await auth.Login(e);
      if (result) {
        if (result.type === 2) navigate("/manager");
        else if (result.type === 1) navigate("/customer");
        form.resetFields();
        setIsLogin(true);
        closeModal();
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };
  return (
    <Row align={"middle"} justify={"center"} className="LoginWrapper">
      <Col className="Col" span={24}>
        <Row gutter={[0, 36]}>
          <Col className="Col" span={24}>
            <Title level={3} style={{ margin: "0px" }}>
              ĐĂNG NHẬP
            </Title>
          </Col>
          <Col className="Col" span={24}>
            <Form
              form={form}
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
                name={"usertype"}
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập tên đăng nhập!",
                  },
                ]}
              >
                <Radio.Group>
                  <Radio value={1}>Khách hàng</Radio>
                  <Radio value={2}>Quản lý</Radio>
                </Radio.Group>
              </Form.Item>
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
