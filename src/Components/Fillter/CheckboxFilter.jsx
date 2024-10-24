import { Form, Checkbox } from "antd";

export default function CheckboxFilter({
    name = "",
    defaultChecked = false,
    label = ""
}) {
    const formInstance = Form.useFormInstance();

    return (
        <Checkbox
            name={name}
            defaultChecked={defaultChecked}
            onChange={(event) => formInstance.setFieldValue(name, event.target.checked)}
        >
            {label}
        </Checkbox>
    );
}
