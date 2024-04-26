import React, { useState } from 'react';
import { Form, Input } from "antd";

type TodosFormProps = {
  onFormSubmit: (text: string) => void,
  formEdit?: any
}

type FieldType = {
  todoText?: string,
};

function TodosForm({onFormSubmit, formEdit}: TodosFormProps): JSX.Element {
  const [valueTodo, setValueTodo] = useState<string>("");
  const [form] = Form.useForm();

  const handleSubmit = () => {
    onFormSubmit(valueTodo);
    if (formEdit) {
      formEdit.resetFields();
    }
    form.resetFields();
  }

  return (
    <Form form={formEdit ? formEdit : form} onFinish={handleSubmit} autoComplete="off">
      <Form.Item<FieldType>
        name="todoText"
        rules={[{ required: true, message: 'What needs to be done?' }]}
      >
        <Input value={valueTodo} onChange={(e) => setValueTodo(e.target.value)}/>
      </Form.Item>
    </Form>
  );
}

export default TodosForm;
