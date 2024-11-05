import React from "react";
import {
  Row,
  Col,
  Card,
  Select,
  Input,
  Button,
  Flex,
  Typography,
  Divider,
  Menu,
  Form,
  Empty,
  message,
  Modal,
} from "antd";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { useOutletContext } from "react-router-dom";
import ListRoom from "./ListRoom";
import ModalCreateHouse from "../../Components/Modal/ModalCreateHouse";
import { Filter, filterType } from "../../Components/Fillter";

import { addhouse, addroom, deleteHouse, load } from "../../services/room";

const numberRoomRented = 14;

const ListOfRentals = () => {
  const [form] = Form.useForm();
  const [title, setTitle] = useOutletContext();
  const [menuItem, setMenuItem] = React.useState([]);
  const [menuKey, setMenuKey] = React.useState("");
  const [houseSelected, setHouseSelected] = React.useState({});
  const [totalRented, setTotalRented] = React.useState();
  const [totalNotRented, setTotalNotRented] = React.useState();
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [listHouse, setListHouse] = React.useState([]);
  React.useEffect(() => {
    setTitle("DANH SÁCH TRỌ");
    handleSearch();
  }, []);
  React.useEffect(() => {
    setTotalRented(
      listHouse.reduce((acc, item) => {
        return acc + Number(item.total_rented);
      }, 0)
    );
    setTotalNotRented(
      listHouse.reduce((acc, item) => {
        return acc + Number(item.total_not_rented);
      }, 0)
    );
    if (listHouse.length > 0) {
      setMenuItem(convertMenuItem(listHouse));
      const isMenuKey = listHouse.some((item) => item.house_id === menuKey);
      if (menuKey === "" || !isMenuKey) {
        setMenuKey(listHouse[0].house_id);
        setHouseSelected(listHouse[0]);
      } else
        setHouseSelected(listHouse.find((item) => item.house_id === menuKey));
    } else setMenuItem([]);
  }, [listHouse]);

  const convertMenuItem = (arr) => {
    return arr.map((item) => ({
      label: `${item.house_id}-${item.house_name}`,
      key: item.house_id,
    }));
  };

  const handleAddHouse = async (val) => {
    const result = await addhouse([val]);
    if (result.success) {
      message.success(result.message);
      handleSearch();
    } else message.warning(result.message);
  };

  const handleDeleteHouse = async () => {
    const result = await deleteHouse(Number(menuKey));
    if (result.success) {
      message.success(result.message);
      handleSearch();
    } else message.warning(result.message);
  };

  const handleSearch = async () => {
    try {
      const data = form.getFieldsValue();
      const result = await load(data);
      if (result.data.length !== 0) {
        setListHouse(result.data);
      } else setListHouse([]);
    } catch (error) {
      console.log(error);
    }
  };

  const onClick = (e) => {
    setMenuKey(e.key);
    setHouseSelected(listHouse.find((item) => item.house_id === e.key));
  };

  const showModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const showDeleteConfirm = () => {
    Modal.confirm({
      title: "Cảnh báo",
      icon: <ExclamationCircleFilled />,
      content: "Thực hiện sẽ xóa các dự liệu có liên quan",
      okText: "Xác nhận",
      okType: "danger",
      cancelText: "hủy",
      onOk() {
        handleDeleteHouse();
      },
      onCancel() {
        return;
      },
    });
  };

  return (
    <>
      <Row gutter={[8, 16]}>
        <Col span={24}>
          <Card style={{ padding: "12px" }}>
            <Row gutter={[8, 8]}>
              <Col span={24}>
                <Filter
                  form={form}
                  onSearch={handleSearch}
                  items={[
                    {
                      type: filterType.select,
                      config: {
                        name: "is_rented",
                        options: [
                          {
                            value: "available",
                            label: "chưa thuê",
                          },
                          {
                            value: "rented",
                            label: "đã thuê",
                          },
                        ],
                        placeholder: "trạng thái phòng",
                      },
                    },
                    {
                      type: filterType.select,
                      config: {
                        name: "room_status",
                        options: [
                          {
                            value: 0,
                            label: "chưa thanh toán",
                          },
                          {
                            value: 1,
                            label: "đã thanh toán",
                          },
                        ],
                        placeholder: "trạng thái phí",
                      },
                    },
                    {
                      type: filterType.input,
                      config: {
                        name: "room_name",
                        placeholder: "Tên phòng",
                      },
                    },
                  ]}
                />
              </Col>
              <Col>
                <Flex align="center">
                  <Typography> đã thuê: {totalRented}</Typography>
                  <Divider type="vertical" />
                  <Typography> chưa thuê: {totalNotRented}</Typography>
                  <Divider type="vertical" />
                  <Typography> chưa thu phí: {numberRoomRented}</Typography>
                </Flex>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col span={24}>
          <Card style={{ padding: "12px" }}>
            <Row>
              <Col span={12}>
                <Menu
                  onClick={onClick}
                  selectedKeys={[menuKey]}
                  mode="horizontal"
                  items={menuItem}
                />
              </Col>
              <Col span={12}>
                <Flex justify="end" align="center">
                  <Button type="primary" onClick={showModal}>
                    Thêm nhà
                  </Button>
                  <Button
                    style={{ marginLeft: "4px" }}
                    type="primary"
                    danger
                    onClick={showDeleteConfirm}
                  >
                    Xóa nhà
                  </Button>
                </Flex>
              </Col>
              <Col span={24}>
                {listHouse.length === 0 ? (
                  <Empty />
                ) : (
                  <ListRoom
                    house={houseSelected}
                    handleLoad={handleSearch}
                  ></ListRoom>
                )}
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
      <ModalCreateHouse
        isOpen={isModalOpen}
        onClose={closeModal}
        handleAddHouse={handleAddHouse}
      />
    </>
  );
};

export default ListOfRentals;
