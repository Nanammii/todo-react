import {Todo} from "../types/state";

export const addSubtask = (todos: Todo[], parentId: string | undefined, newSubtask: Todo): Todo[] => {
  return todos.map((todo) => {
    if (todo.idTodo === parentId){
      return {
        ...todo,
        subTasks: todo.subTasks ? [...todo.subTasks, newSubtask] : [newSubtask]
      }
    } else if (todo.subTasks) {
      return {
        ...todo,
        subTasks: addSubtask(todo.subTasks, parentId, newSubtask)
      }
    }

    return todo;
  })
};

export const deleteTodo = (todos: Todo[], id: string) => {
  return todos.filter((todo) => {
    if (todo.idTodo === id) {
      return false;
    }
    if (todo.subTasks && todo.subTasks.length > 0) {
      todo.subTasks = deleteTodo(todo.subTasks, id)
    }
    return true;
  })
}

export const updateTodo = (todos: Todo[], id: string, text: string, description: string) => {
  return todos.map((todo) => {
    if (todo.idTodo === id) {
      return {...todo, textTodo: text, description}
    }
    if (todo.subTasks && todo.subTasks.length > 0) {
      todo.subTasks = updateTodo(todo.subTasks, id, text, description)
    }
    return todo;
  })
}

export const toggleTodo = (todos: Todo[], id: string) => {
  return todos.map((todo) => {
    if (todo.idTodo === id) {
      return {...todo, isComplete: !todo.isComplete}
    }
    if (todo.subTasks && todo.subTasks.length > 0) {
      todo.subTasks = toggleTodo(todo.subTasks, id)
    }
    return todo;
  })
}

export const toggleEditTodo = (todos: Todo[], id: string) => {
  return todos.map((todo) => {
    if (todo.idTodo === id) {
      return {...todo, isEditing: !todo.isEditing}
    }
    if (todo.subTasks && todo.subTasks.length > 0) {
      todo.subTasks = toggleEditTodo(todo.subTasks, id)
    }
    return todo;
  })
}
