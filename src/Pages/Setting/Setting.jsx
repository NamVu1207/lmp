import {
  Button,
  Card,
  Flex,
  Form,
  Input,
  message,
  Modal,
  Result,
  Typography,
} from "antd";
import { useOutletContext } from "react-router-dom";
import { changePassword } from "../../services/order";
import Customer from "../Management/Customer";

const Setting = () => {
  const [form] = Form.useForm();
  const [user, setUser] = useOutletContext();
  const checkPaasword = (pass) => {
    if (user.password !== pass.password) {
      message.warning("mật khẩu hiện tại không đúng, vui lòng nhập lại");
      return false;
    }
    if (pass.newPassword === pass.password) {
      message.warning("mật khẩu mới phải khác với hiện tại, vui lòng nhập lại");
      return false;
    }
    if (pass.newPassword !== pass.confirmPassword) {
      message.warning("mật khẩu mới không khớp, vui lòng nhập lại");
      return false;
    }
    return true;
  };
  const confirm = (data) => {
    Modal.confirm({
      icon: null,
      content: (
        <Result
          status="success"
          title={data.message}
          style={{ padding: "10px 32px" }}
        />
      ),
      footer: null,
    });
    setTimeout(() => {
      Modal.destroyAll();
    }, 1000);
  };
  const onFinish = async (formValue) => {
    if (checkPaasword(formValue)) {
      const data = {
        customerId: user.id,
        newPaasword: formValue.newPassword,
      };
      const result = await changePassword(data);
      if (result.data.success) {
        setUser((preUser) => ({ ...preUser, password: formValue.newPassword }));
        localStorage.setItem(
          "user",
          JSON.stringify({ ...user, password: formValue.newPassword })
        );
        form.resetFields();
        confirm(result.data);
      }
    }
  };
  return (
    <Flex justify="center">
      <Card
        title={"Dổi mật khẩu"}
        style={{ height: "fit-content", width: "fit-content", padding: "10px" }}
      >
        <Form
          form={form}
          onFinish={onFinish}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ width: 600, padding: "30px" }}
        >
          <Form.Item
            name={"password"}
            label={"mật khẩu hiện tại"}
            rules={[{ required: true, message: "Please input!" }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name={"newPassword"}
            label={"mật khẩu mới"}
            rules={[{ required: true, message: "Please input!" }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name={"confirmPassword"}
            label={"xác nhận mật khẩu"}
            rules={[{ required: true, message: "Please input!" }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Flex justify="flex-end">
              <Button type="primary" htmlType="submit">
                Xác nhận
              </Button>
            </Flex>
          </Form.Item>
        </Form>
      </Card>
    </Flex>
  );
};

export default Setting;
