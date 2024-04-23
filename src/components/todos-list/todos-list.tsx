import React, {useState} from 'react';
import {Checkbox, List, Modal} from "antd";
import TodosForm from "../todos-form/todos-form";

type TodosListProps = {
  list: string[],
  onDeleteTodo: (index: number) => void
};

function TodosList({list, onDeleteTodo}: TodosListProps) {

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  }

  const handleOkModal = () => {
    setIsModalOpen(false);
  }

  const handleCancelModal = () => {
    setIsModalOpen(false);
  }

  // const handleEditSubmit = (idTodo: number, textTodo: string) => {
  //   const updatedTodo = list.map((item: string, index: number) => index === idTodo
  //     ? {...item, textTodo}
  //     : item
  //   );
  //   console.log(updatedTodo)
  // }

  return (
    <List
      className="todos__list"
      itemLayout="horizontal"
      dataSource={list}
      renderItem={(item: string, index: number) => (
        <List.Item
          key={item}
          actions={[
            <a key="list-edit" >edit</a>,
            <a key="list-delete" onClick={() => onDeleteTodo(index)}>delete</a>
          ]}
        >
          <List.Item.Meta
            title={<a href="#" onClick={handleOpenModal}>{item}</a>}
            description={"description"}
          />
          <Checkbox className="todos__checkbox">{item}</Checkbox>
          <Modal title={item} open={isModalOpen} onOk={handleOkModal} onCancel={handleCancelModal}>
            {/*<TodosForm onFormSubmit={} />*/}
          </Modal>
        </List.Item>
      )}
    />
  );
}

export default TodosList;
