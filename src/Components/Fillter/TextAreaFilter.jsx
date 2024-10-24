import { Form, Input } from "antd";
const { TextArea } = Input

export default function TextAreaFilter({ name = "", placeholder = "" }) {
    const formInstance = Form.useFormInstance();
    return (
        <TextArea
            name={name}
            placeholder={placeholder}
            onChange={(event) => formInstance.setFieldValue(name, event.target.value)}
        />
    );
}
