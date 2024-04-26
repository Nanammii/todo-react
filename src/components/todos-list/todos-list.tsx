import React, {memo, useState} from 'react';
import {Checkbox, Form, List, Modal, Tree, TreeDataNode} from "antd";
import {Todo} from "../../types/state";
import EditForm from "../edit-form/edit-form";
import {addSubtask, toggleEditTodo, toggleTodo, updateTodo} from "../../store/action";
import {useAppDispatch} from "../../hooks";
import TodosForm from "../todos-form/todos-form";

type TodosListProps = {
  list: Todo[] | TreeDataNode[] | undefined,
  onDeleteTodo: (index: string) => void
};

function TodosList({list, onDeleteTodo}: TodosListProps) {
  const dispatch = useAppDispatch();
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [form] = Form.useForm();
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);

  const handleToggleEdit = (id: string) => {
    dispatch(toggleEditTodo(id));
  }

  const acceptEdit = (idTodo: string, text: string, description: string) => {
    // setIsModalOpen(false);
    if (text !== '') {
      dispatch(updateTodo(idTodo, text, description));
      dispatch(toggleEditTodo(idTodo));
    }
  };

  const handleFormVisible = (id: string) => {
    setIsFormVisible(true);
    setSelectedTaskId(id);
  }

  const handleCloseForm = () => {
    setIsFormVisible(false);
    setSelectedTaskId(null);
  }

  const handleFormAddSubTaskSubmit = (text: string) => {
    console.log(text)
    if (text.length > 0) {
      dispatch(addSubtask(text, selectedTaskId as string));
    }
    setIsFormVisible(false);
    setSelectedTaskId(null);
  }

  const renderTodo = (todo: Todo) => (
    <List.Item
      key={todo.idTodo}
      actions={[
        <a key="add-subtask" onClick={() => handleFormVisible(todo.idTodo)}>add subtask</a>,
        <a key="list-edit" onClick={() => handleToggleEdit(todo.idTodo)}>edit</a>,
        <a key="list-delete" onClick={() => onDeleteTodo(todo.idTodo)}>delete</a>
      ]}
      style={{flexWrap: "wrap"}}
    >
      <List.Item.Meta
        title={<a href="#" >{todo.textTodo}</a>}
        description={todo.description}
      />
      {todo.isEditing &&
        <EditForm todo={todo} onSaveEdit={acceptEdit} isEditOpen={todo.isEditing} />
      }

      <Checkbox className="todos__checkbox" checked={todo.isComplete} onClick={() => dispatch(toggleTodo(todo.idTodo))}>
        {todo.textTodo}
      </Checkbox>

      {isFormVisible &&
        <Modal  open={isFormVisible} onOk={form.submit} onCancel={handleCloseForm}>
          <TodosForm formEdit={form} onFormSubmit={handleFormAddSubTaskSubmit} />
        </Modal>
      }

      {todo.subTasks && todo.subTasks?.length > 0 &&
        <List
          className="todos__list--subtask"
          itemLayout="horizontal"
          dataSource={todo.subTasks}
          renderItem={renderTodo}
        />
      }
    </List.Item>
  )

  return (
    <List
      className="todos__list"
      itemLayout="horizontal"
      dataSource={list as Todo[]}
      renderItem={renderTodo}
    />
  );
}

export default memo(TodosList);
