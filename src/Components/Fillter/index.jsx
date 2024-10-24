import { Button, Col, Divider, Form, Row, Typography } from "antd";
import { Fragment, useMemo } from "react";
import InputFilter from "./InputFilter";
import RadioGroupFilter from "./RadioGroupFilter";
import RangePickerFilter from "./RangePickerFilter";
import SelectFillter from "./SelectFillter";
import MonthPickerFilter from "./MonthPickerFilter";
const { Text } = Typography;
const pickComponent = (type) =>
  ({
    [filterType.radio]: RadioGroupFilter,
    [filterType.input]: InputFilter,
    [filterType.monthPicker]: MonthPickerFilter,
    [filterType.rangePicker]: RangePickerFilter,
    [filterType.select]: SelectFillter,
  }[type]);

export const filterType = {
  radio: "radio",
  input: "input",
  rangePicker: "rangePicker",
  monthPicker: "textarea",
  select: "select",
};

export const Filter = (
  /** @type {{items: Array<{type: String, label: String, config: any}>,form: FormInstance<any>, ,onSearch: function<any>}} */ {
    items = [],
    form = null,
    onSearch,
  }
) => {
  const initialValues = useMemo(() => {
    const result = items.reduce((init, { config }) => {
      init[config["name"]] = config["initialValues"];
      return init;
    }, {});

    return result;
  }, [items]);

  return (
    <Form
      form={form}
      initialValues={initialValues}
      style={{ maxWidth: "none" }}
      onFinish={onSearch}
    >
      <Row gutter={[16, 0]} style={{ marginTop: "10px" }}>
        {items.map(({ type, label, config }, index) => {
          const Component = pickComponent(type);
          return (
            <Col key={index}>
              <Form.Item style={{ marginBottom: "4px" }} name={config.name}>
                <Component {...config} />
              </Form.Item>
            </Col>
          );
        })}
        <Col>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              tìm kiếm
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};
