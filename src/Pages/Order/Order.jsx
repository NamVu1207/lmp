import { Button, Card, Col, Flex, Form, message, Row } from "antd";
import React, { useContext } from "react";
import dayjs from "dayjs";

import Grid, {
  columnTypes,
  paginationTypes,
  selectionTypes,
} from "../../Components/DataGrid/index.jsx";
import { basicRenderColumns } from "../../utils/dataTable.utils.jsx";
import { Filter, filterType } from "../../Components/Fillter/index.jsx";
import { confirm, load, save } from "../../services/order.js";
import { useOutletContext } from "react-router-dom";

const Order = () => {
  const onFocus = () => {};
  const [user] = useOutletContext();
  const gridRef = React.createRef();
  const [form] = Form.useForm();
  const [rows, setRows] = React.useState([]);

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
      key: "house_name",
      name: "Nhà",
      type: columnTypes.TextEditor,
    },
    {
      key: "room_name",
      name: "Phòng",
      type: columnTypes.TextEditor,
      width: 120,
    },
    {
      key: "cus_name",
      name: "Tên người yêu cầu",
      type: columnTypes.TextEditor,
    },
    {
      key: "serv_name",
      name: "Dịch vụ",
      type: columnTypes.TextEditor,
    },
    {
      key: "target_time",
      name: "Thời gian dự kiến",
      type: columnTypes.TimePicker,
      width: 160,
    },
    {
      key: "target_date",
      name: "Ngày dự kiến",
      type: columnTypes.DatePicker,
      width: 160,
    },
    {
      key: "order_status",
      name: "Trạng thái",
      type: columnTypes.TextEditor,
      width: 160,
    },
    {
      key: "note",
      name: "Ghi chú",
      type: columnTypes.TextEditor,
      width: 400,
    },
  ]);
  React.useEffect(() => {
    handleSearch();
  }, []);

  const handleSearch = async () => {
    try {
      const filter = form.getFieldsValue();
      const result = await load(filter);
      if (result.data.length > 0) {
        const arr = result.data.map((item) => {
          return {
            ...item,
            house_name: `${item.house_id}-${item.house_name}`,
            target_date: dayjs(item.target_date).format("YYYY-MM-DD"),
          };
        });
        setRows(arr);
      } else setRows([]);
    } catch (error) {
      console.log(error);
    }
  };

  const CheckStatusToConfirm = (listRow = [], type) => {
    if (listRow.length === 0) {
      message.warning("Chọn yêu cầu để xác nhận!");
      return false;
    }
    const isProcessing = listRow.every((item) => item.order_status === type);
    if (!isProcessing) {
      message.warning(`tất cả yểu cầu đã chọn cần ở trạng thái ${type}`);
      return false;
    }
    return true;
  };

  const handleConfirm = async (type) => {
    const listRow = [...gridRef.current?.getSelectedRows()];
    const listItem = rows.filter((obj) =>
      listRow.some((STT) => obj.STT === STT)
    );
    if (CheckStatusToConfirm(listItem, type)) {
      if (listItem.length > 0) {
        const result = await confirm({ data: listItem, type: type });
        result.data.message.map((item) =>
          item.success
            ? message.success(item.message)
            : message.warning(item.message)
        );
        gridRef.current?.setSelectedRows([]);
        handleSearch();
      }
    }
  };
  const handleCancel = async () => {
    const listRow = [...gridRef.current?.getSelectedRows()];
    const listItem = rows.filter((obj) =>
      listRow.some((STT) => obj.STT === STT)
    );
    if (CheckStatusToConfirm(listItem, "processing")) {
      const result = await confirm({ data: listItem, type: "deleted" });
      result.data.message.map((item) =>
        item.success
          ? message.success(item.message)
          : message.warning(item.message)
      );
      gridRef.current?.setSelectedRows([]);
      handleSearch();
    }
  };
  return (
    <>
      <Row gutter={[0, 16]}>
        <Col span={24}>
          <Card style={{ padding: "12px" }}>
            <Row gutter={[8, 8]} align={"middle"}>
              <Col span={12}>
                <Filter
                  form={form}
                  onSearch={handleSearch}
                  items={[
                    {
                      type: filterType.input,
                      config: {
                        placeholder: "Tên khách hàng",
                        name: "cus_name",
                      },
                    },
                    {
                      type: filterType.select,
                      config: {
                        placeholder: "Trạng thái dịch vụ",
                        name: "order_status",
                        initialValue: "processing",
                        options: [
                          {
                            value: "deleted",
                            label: "đã hủy",
                          },
                          {
                            value: "processing",
                            label: "đang tiến hành",
                          },
                          {
                            value: "confirmed",
                            label: "đã xác nhận",
                          },
                          {
                            value: "done",
                            label: "đã hoàn thành",
                          },
                        ],
                      },
                    },
                  ]}
                />
              </Col>
              <Col span={12}>
                <Flex justify="flex-end" align="center">
                  {Number(user.type) === 2 ? (
                    <>
                      <Button
                        type="primary"
                        style={{
                          backgroundColor: "#1ec7fa",
                          marginRight: "4px",
                        }}
                        onClick={() => {
                          handleConfirm("processing");
                        }}
                      >
                        Xác nhận yêu cầu
                      </Button>
                      <Button
                        type="primary"
                        style={{
                          backgroundColor: "#39e3a7",
                          marginRight: "4px",
                        }}
                        onClick={() => {
                          handleConfirm("confirmed");
                        }}
                      >
                        Xác nhận hoàn thành
                      </Button>
                    </>
                  ) : (
                    <></>
                  )}
                  <Button
                    type="primary"
                    danger
                    onClick={() => {
                      handleCancel();
                    }}
                  >
                    Xác nhận hủy
                  </Button>
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
              groupBy={["house_name"]}
              setRows={setRows}
              onFocus={onFocus}
              pagination={paginationTypes.scroll}
              maxHeight={800}
              limit={5}
            />
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Order;
