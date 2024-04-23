import React, {useState} from 'react';
import TodosForm from "../components/todos-form/todos-form";
import TodosList from "../components/todos-list/todos-list";
import {Flex, Form, Input, Layout} from 'antd';

const {Header, Content} = Layout;
const headerStyle: React.CSSProperties = {
  textAlign: 'center',
  color: '#000000',
  height: 180,
  paddingInline: 58,
  lineHeight: '64px',
  backgroundColor: '#eeeeee',
};

const contentStyle: React.CSSProperties = {
  textAlign: 'center',
  minHeight: 120,
  lineHeight: '120px',
  color: '#000000',
  backgroundColor: '#eeeeee',
};

const layoutStyle = {
  overflow: 'hidden',
  width: '100%',
  maxWidth: '100%',
};

function MainPage(): JSX.Element {
  const [todos, setTodos] = useState<string[]>(['task 1']);
  console.log(todos)

  const handleSubmitForm = (todoText: string) => {
    if (todoText.length > 0) {
      setTodos([...todos, todoText])
    }
  }

  const handleDeleteTodo = (index: number) => {
    const currentTodos = todos.filter((_, idTodo) => idTodo !== index);
    setTodos(currentTodos);
  }



  return (
    <Layout style={layoutStyle}>
      <Header style={headerStyle}>
        <div className="header__wrapper">
          <h1 className="header__title">todos</h1>
        </div>
      </Header>
      <Content style={contentStyle}>
        <Flex vertical>
          <div className="todos">
            <TodosForm onFormSubmit={handleSubmitForm}/>

            <div className="todos__wrapper">
              <TodosList
                list={todos}
                onDeleteTodo={handleDeleteTodo}
              />
            </div>

          </div>
        </Flex>
      </Content>
    </Layout>
  );
}

export default MainPage;
