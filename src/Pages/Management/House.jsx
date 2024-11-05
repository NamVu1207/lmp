import { Card, Col, Flex, Form, message, Row } from "antd";
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
import ModalAddData from "../../Components/Modal/ModalAddData.jsx";

import { employee, load, save, del } from "../../services/house.js";
import { getCity, getDistrict, getWard } from "../../services/address.js";

import { DataContext } from "../../Components/Layout/Layout.jsx";

const House = () => {
  const onFocus = () => {};
  const gridRef = React.createRef();
  const [title, setTitle] = useOutletContext();
  const [form] = Form.useForm();
  const [rows, setRows] = React.useState([]);
  const [city, setCity] = React.useState([]);
  const [district, setDistrict] = React.useState([]);
  const [ward, setWard] = React.useState([]);
  const [cityOpt, setCityOpt] = React.useState([]);
  const [districtOpt, setDistrictOpt] = React.useState([]);
  const [wardOpt, setWardOpt] = React.useState([]);
  const [manager, setManager] = React.useState([]);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const dataAddr = React.useContext(DataContext);

  const newItem = {
    id: "",
    house_name: "",
    manager: "",
    floors: 0,
    rooms: 0,
    house_address: "",
    ward: "",
    district: "",
    city: "",
    isNew: true,
  };

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
      editable: true,
      required: true,
    },
    {
      key: "manager",
      name: "Quản lý",
      type: columnTypes.Select,
      options: manager,
      editable: true,
    },
    {
      key: "floors",
      name: "Số tầng",
      type: columnTypes.TextEditor,
      editable: true,
      required: true,
    },
    {
      key: "rooms",
      name: "Số phòng",
      type: columnTypes.TextEditor,
      editable: true,
      required: true,
    },
    {
      key: "house_address",
      name: "địa chỉ",
      type: columnTypes.TextEditor,
      editable: true,
      required: true,
    },
    {
      key: "ward",
      name: "Phường",
      type: columnTypes.Select,
      options: ward,
    },
    {
      key: "district",
      name: "Quận",
      type: columnTypes.Select,
      options: district,
    },
    {
      key: "city",
      name: "Thành phố",
      type: columnTypes.Select,
      options: city,
    },
  ]);

  React.useEffect(() => {
    setTitle("NHÀ");
    getCityData();
    setCity(dataAddr.city);
    setDistrict(dataAddr.district);
    setWard(dataAddr.ward);
    GetListEmployee();
    handleSearch();
  }, []);

  const GetListEmployee = async () => {
    const result = await employee();
    if (result.data.length > 0) {
      const arr = result.data.map((item) => {
        return { value: item.id, label: item.employee_name };
      });
      return setManager([{ value: "", label: "" }, ...arr]);
    }
    return setManager([]);
  };
  const CheckValidate = (validate) => {
    if (validate.validate.length === 0) {
      message.warning("không có gì thay đổi");
      return false;
    }
    if (!validate.isCheck) {
      message.warning("vui lòng điền đầy đủ thông tin!");
      return false;
    }
    return true;
  };
  const handleSearch = async () => {
    try {
      const filter = form.getFieldsValue();
      const result = await load(filter);
      if (result.data.length > 0) {
        setRows(result.data);
      } else setRows([]);
    } catch (error) {
      console.log(error);
    }
  };
  const handleAddRow = (obj) => {
    setRows([
      ...rows,
      {
        ...newItem,
        ward: obj.ward,
        district: obj.district,
        city: obj.city,
      },
    ]);
    setIsModalOpen(false);
  };
  const handleDeleteRow = async (listRow) => {
    if (listRow.length === 0) {
      message.warning("vui lòng chọn dòng cần xóa");
      return;
    }
    const listRowDel = rows.filter(
      (obj) => listRow.some((STT) => obj.STT === STT) && !obj.isNew
    );
    const newRow = rows.filter(
      (obj) => !listRow.some((STT) => obj.STT === STT)
    );
    if (listRowDel.length > 0) {
      const result = await del({ data: listRowDel });
      console.log(result);
      result.data.message.map((item) =>
        item.success
          ? message.success(item.message)
          : message.warning(item.message)
      );
    }
    gridRef.current?.setSelectedRows([]);
    setRows(newRow);
  };
  const handleSaveData = async () => {
    try {
      const validate = gridRef.current?.Validate();
      if (!CheckValidate(validate)) return;
      const listRow = rows.filter((obj) =>
        validate.validate.some((val) => obj.STT === val.STT)
      );
      const result = await save({ datas: listRow });
      if (result.success) {
        result.data.message.map((item) =>
          item.success
            ? message.success(item.message)
            : message.warning(item.message)
        );
        handleSearch();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const buttonConfirm = async (props) => {
    switch (props.type) {
      case "delete":
        handleDeleteRow([...gridRef.current?.getSelectedRows()]);
        break;
      case "add":
        setIsModalOpen(true);
        break;
      case "save":
        handleSaveData();
        break;
    }
  };

  const getCityData = async () => {
    const result = await getCity();
    const ct = result.data.map((item) => ({
      label: item.name,
      value: item.id,
    }));
    setCityOpt(ct);
  };
  const getDistrictData = async (id) => {
    const result = await getDistrict(id);
    const dist = result.data.map((item) => ({
      label: item.name,
      value: item.id,
    }));
    setDistrictOpt(dist);
  };
  const getWardData = async (id) => {
    const result = await getWard(id);
    const wd = result.data.map((item) => ({
      label: item.name,
      value: item.id,
    }));
    setWardOpt(wd);
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
                        placeholder: "Thành phố",
                        name: "city",
                        options: dataAddr.city,
                      },
                    },
                  ]}
                />
              </Col>
              <Col span={12}>
                <Flex justify="flex-end">
                  <ToolBar
                    buttonConfig={[
                      toolBarButtonTypes.add,
                      toolBarButtonTypes.delete,
                      toolBarButtonTypes.save,
                    ]}
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
              setRows={setRows}
              onFocus={onFocus}
              pagination={paginationTypes.scroll}
              maxHeight={800}
              limit={5}
            />
          </Card>
        </Col>
      </Row>
      <ModalAddData
        width={800}
        handleAdd={handleAddRow}
        isOpen={isModalOpen}
        onOpen={setIsModalOpen}
        config={[
          {
            name: "city",
            label: "Thành phố",
            option: cityOpt,
            handle: getDistrictData,
          },
          {
            name: "district",
            label: "Quận",
            option: districtOpt,
            handle: getWardData,
          },
          {
            name: "ward",
            label: "Phường",
            option: wardOpt,
          },
        ]}
      />
    </>
  );
};

export default House;
