import {
  Button,
  Card,
  Col,
  Divider,
  Flex,
  Form,
  message,
  Row,
  Typography,
} from "antd";
import React from "react";
import { useOutletContext } from "react-router-dom";
import Grid, {
  columnTypes,
  paginationTypes,
  selectionTypes,
} from "../../Components/DataGrid/index.jsx";
import { basicRenderColumns } from "../../utils/dataTable.utils.jsx";
import { Filter, filterType } from "../../Components/Fillter/index.jsx";
import ToolBar, {
  toolBarButtonTypes,
} from "../../Components/Toolbar/index.jsx";
import ModalPayBill from "../../Components/Modal/ModalPayBill.jsx";
import { gethouse, getroom, load, del } from "../../services/rentalfee.js";

const Rentalfee = () => {
  const onFocus = () => {};
  const gridRef = React.createRef();
  const [form] = Form.useForm();
  const [rows, setRows] = React.useState([]);
  const [listHouse, setListHouse] = React.useState([]);
  const [listRoom, setListRoom] = React.useState([]);
  const [title, setTitle] = useOutletContext();
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const columns = basicRenderColumns([
    {
      key: "STT",
      name: "STT",
      width: 60,
    },
    {
      key: "id",
      name: "ID",
      visible: true,
    },
    {
      key: "house_id",
      name: "house_id",
      type: columnTypes.TextEditor,
      visible: true,
    },
    {
      key: "house_name",
      name: "Nhà",
      type: columnTypes.TextEditor,
    },
    {
      key: "room_id",
      name: "room_id",
      type: columnTypes.TextEditor,
      visible: true,
    },
    {
      key: "room_name",
      name: "Phòng",
      type: columnTypes.TextEditor,
    },
    {
      key: "contract_id",
      name: "contract_id",
      type: columnTypes.TextEditor,
      visible: true,
    },
    {
      key: "price",
      name: "giá tiền",
      type: columnTypes.TextEditor,
    },
    {
      key: "payment_method",
      name: "p.thức thanh toán",
      type: columnTypes.Checkbox,
    },
    {
      key: "payment_month",
      name: "tháng",
      type: columnTypes.TextEditor,
    },
    {
      key: "payment_year",
      name: "nắm",
      type: columnTypes.TextEditor,
    },
    {
      key: "payment_status",
      name: "trạng thái",
      type: columnTypes.TextEditor,
    },
  ]);
  React.useEffect(() => {
    setTitle("TIỀN PHÒNG");
    GetListHouse();
    GetListRoom();
    handleSearch();
  }, []);
  const GetListHouse = async () => {
    const result = await gethouse();
    if (result.data.length > 0) {
      const arr = result.data.map((item) => {
        return { value: item.id, label: `${item.id}-${item.house_name}` };
      });
      return setListHouse(arr);
    }
    return setListHouse([]);
  };
  const GetListRoom = async () => {
    const result = await getroom();
    if (result.data.length > 0) {
      const arr = result.data.map((item) => {
        return { value: item.room_name, label: item.room_name };
      });
      return setListRoom(arr);
    }
    return setListRoom([]);
  };
  const handleSearch = async () => {
    try {
      const filter = form.getFieldsValue();
      const result = await load(filter);
      if (result.data.length > 0) {
        const arr = result.data.map((item) => {
          return {
            ...item,
            house_name: `${item.house_id}-${item.house_name}`,
          };
        });
        setRows(arr);
      } else setRows([]);
    } catch (error) {
      console.log(error);
    }
  };
  const handleDeleteRow = async (listRow) => {
    if (listRow.length === 0) {
      message.warning("vui lòng chọn dòng cần xóa");
      return;
    }
    const listRowDel = rows.filter(
      (obj) => listRow.some((STT) => obj.STT === STT) && !obj.isNew
    );
    if (listRowDel.length > 0) {
      const result = await del({ data: listRowDel });
      result.data.message.map((item) =>
        item.success
          ? message.success(item.message)
          : message.warning(item.message)
      );
      gridRef.current?.setSelectedRows([]);
      handleSearch();
    }
  };
  const buttonConfirm = async (props) => {
    switch (props.type) {
      case "delete":
        handleDeleteRow([...gridRef.current?.getSelectedRows()]);
        break;
    }
  };
  return (
    <>
      <Row gutter={[8, 16]}>
        <Col span={24}>
          <Card style={{ padding: "12px" }}>
            <Row gutter={[8, 8]}>
              <Col span={12}>
                <Filter
                  form={form}
                  onSearch={handleSearch}
                  items={[
                    {
                      type: filterType.select,
                      config: {
                        options: listHouse,
                        placeholder: "Nhà",
                        name: "house_id",
                      },
                    },
                    {
                      type: filterType.select,
                      config: {
                        options: listRoom,
                        placeholder: "Phòng",
                        name: "room_name",
                      },
                    },
                    {
                      type: filterType.monthPicker,
                      config: {
                        placeholder: "Tháng",
                        name: "month",
                      },
                    },
                  ]}
                />
              </Col>
              <Col span={12}>
                <Flex justify="flex-end">
                  <Button
                    type="primary"
                    style={{ marginRight: "8px", fontWeight: "500" }}
                    onClick={() => {
                      setIsModalOpen(true);
                    }}
                  >
                    Tính tiền
                  </Button>
                  <ToolBar
                    buttonConfig={[toolBarButtonTypes.delete]}
                    handleConfirm={buttonConfirm}
                  />
                </Flex>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col style={{ height: "500px" }} span={24}>
          <Card>
            <Grid
              ref={gridRef}
              direction="ltr"
              columnKeySelected="STT"
              selection={selectionTypes.multi}
              columns={columns}
              rows={rows}
              groupBy={["house_name", "room_name"]}
              setRows={setRows}
              onFocus={onFocus}
              pagination={paginationTypes.scroll}
              maxHeight={800}
              limit={5}
            />
          </Card>
        </Col>
      </Row>
      <ModalPayBill
        isOpen={isModalOpen}
        onOpen={setIsModalOpen}
        config={[
          {
            name: "house_id",
            label: "chọn nhà",
            option: listHouse,
          },
          {
            name: "room_name",
            label: "chọn phòng",
            option: listRoom,
          },
        ]}
      />
    </>
  );
};

export default Rentalfee;
