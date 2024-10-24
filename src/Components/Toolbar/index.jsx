import { Button, Col, Modal, Row } from "antd";
import {
  CloudDownloadOutlined,
  DeleteOutlined,
  PlusCircleOutlined,
  WarningOutlined,
  ExportOutlined,
} from "@ant-design/icons";
import React from "react";
export const toolBarButtonTypes = {
  exportexcel: {
    id: "export_excel",
    label: "Xuất Excel",
    fontColor: "#555555",
    icon: <ExportOutlined />,
  },
  save: {
    id: "save",
    label: "Lưu dữ liệu",
    fontColor: "#39e3a7",
    icon: <CloudDownloadOutlined />,
    alert: true,
    message: "Bạn có muốn lưu dữ liệu?",
  },
  delete: {
    id: "delete",
    label: "Xóa dòng",
    fontColor: "#fc6a6a",
    icon: <DeleteOutlined />,
    alert: true,
    message: "Bạn có muốn xóa dữ liệu?",
  },
  add: {
    id: "add",
    label: "Thêm dòng",
    fontColor: "#1ec7fa",
    icon: <PlusCircleOutlined />,
    alert: false,
    message: "",
  },
};
const ToolBar = ({ buttonConfig, handleConfirm }) => {
  const [openModal] = React.useState(false);
  return (
    <Row gutter={[8, 0]}>
      {buttonConfig.map((item, index) => {
        return (
          <Col key={item.id}>
            <Button
              type="primary"
              icon={item.icon}
              onClick={() => {
                if (item.alert) {
                  Modal.confirm({
                    title: "Cảnh báo!",
                    content: item.message,
                    open: { openModal },
                    icon: <WarningOutlined />,
                    okText: "Xác nhận",
                    cancelText: "Hủy",
                    onCancel: () => {
                      return;
                    },
                    onOk: () => {
                      handleConfirm({ type: item.id });
                    },
                  });
                } else {
                  handleConfirm({ type: item.id });
                }
              }}
              style={{
                backgroundColor: item.fontColor,
                fontWeight: "500",
              }}
            >
              {item.label.toUpperCase()}
            </Button>
          </Col>
        );
      })}
    </Row>
  );
};

export default ToolBar;
