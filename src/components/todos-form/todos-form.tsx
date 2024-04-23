import React, { useState } from 'react';
import { Form, Input } from "antd";

type TodosFormProps = {
  onFormSubmit: (text: string) => void,
}

type FieldType = {
  todoText?: string;
};

function TodosForm({onFormSubmit}: TodosFormProps): JSX.Element {
  const [valueTodo, setValueTodo] = useState<string>("");

  const handleSubmit = () => {
    onFormSubmit(valueTodo);
    console.log(valueTodo);
    setValueTodo("");
  }

  return (
    <Form onFinish={handleSubmit} autoComplete="off">
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
