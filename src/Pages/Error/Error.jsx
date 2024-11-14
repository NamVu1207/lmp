import { Empty, Typography } from "antd";

const Error = () => {
  return (
    <Empty
      style={{ width: "100wh" }}
      description={
        <Typography.Text>Bạn không có quyền truy cập</Typography.Text>
      }
    ></Empty>
  );
};

export default Error;
