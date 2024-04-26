import React, {useEffect, useRef, useState} from 'react';
import {Form, Input, Modal} from "antd";
import {Todo} from "../../types/state";
import {updateTodo} from "../../store/action";
import {useAppDispatch} from "../../hooks";

type EditFormProps = {
  todo: Todo,
  isEditOpen: boolean,
  onSaveEdit: (idTodo: string, text: string, description: string) => void,
}

type FieldType = {
  todoText?: string,
  description?: string
};

function EditForm({todo, onSaveEdit, isEditOpen}: EditFormProps): JSX.Element {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(isEditOpen);
  console.log(isModalOpen)

  const [form] = Form.useForm();
  const [detailsForm, setDetailsForm] = useState({
    text: todo.textTodo,
    description: todo.description
  });
  console.log(detailsForm, todo)

  const handleSaveEditForm = () => {
    onSaveEdit(todo.idTodo, detailsForm.text, detailsForm.description);
  };

  const handleCancelForm = () => {
    setIsModalOpen(false);
    form.resetFields();
  }

  return (
    <Modal title={todo.textTodo} open={isModalOpen}
           onOk={form.submit}
           onCancel={handleCancelForm}
    >
      <Form form={form} autoComplete="off" onFinish={handleSaveEditForm}>
        <Form.Item<FieldType>
          name="todoText"
          rules={[{ required: true }]}
        >
          <Input
            defaultValue={todo.textTodo} value={detailsForm.text}
            onChange={(e) =>
              setDetailsForm({...detailsForm, text: e.target.value})}
          />
        </Form.Item>
        <Form.Item<FieldType>
          name="description"
          rules={[{ required: false }]}
        >
          <Input
            defaultValue={todo.description}
            value={detailsForm.description}
            onChange={(e) =>
              setDetailsForm({...detailsForm, description: e.target.value})}
          />
        </Form.Item>
      </Form>
    </Modal>

  );
}

export default EditForm;
