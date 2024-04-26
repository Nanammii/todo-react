import {Todo, TodosActionTypes, todosState} from "../types/state";
import {ActionTypes} from "../const";

const addSubtask = (todos: Todo[], parentId: string | undefined, newSubtask: Todo): Todo[] => {
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

const initialState: todosState = {
  todos: [{
    idTodo: crypto.randomUUID(),
    textTodo: 'task 1',
    description: '',
    isComplete: false,
    isEditing: false,
    subTasks: []
  }]
}


export const todoReducer = (state = initialState, action: TodosActionTypes): todosState => {
  switch (action.type) {
    case ActionTypes.ADD_TODO:
      return {
        ...state,
        todos: [...state.todos,
          {
            idTodo: crypto.randomUUID(),
            textTodo: action.payload.textTodo,
            description: '',
            isComplete: false,
            isEditing: false,
            subTasks: []
          }]}

    case ActionTypes.ADD_SUBTASK:
      const findId = (acc: Todo | null, el: Todo): Todo | null => {
        if (el.idTodo === action.payload.parentId) return el;
        if (el.subTasks) return el.subTasks.reduce(findId, acc);
        return acc;
      }

      const currentTodo = state.todos.reduce(findId, null);
      const currentId = currentTodo?.idTodo

      const newSubTask: Todo = {
        idTodo: crypto.randomUUID(),
        textTodo: action.payload.text,
        description: '',
        isComplete: false,
        isEditing: false,
        subTasks: []
      };
      const updatedTodos = addSubtask(state.todos, currentId, newSubTask);

      return {
        ...state,
        todos: updatedTodos
      }

    case ActionTypes.DELETE_TODO:
      const todoIndex = action.payload.idTodo;
      return {
        ...state,
        todos: state.todos.filter((item) => item.idTodo !== todoIndex)
      }

    case ActionTypes.UPDATE_TODO:
      debugger
      return {
        todos: state.todos.map((item) => (item.idTodo === action.payload.idTodo
        ? {...item, textTodo: action.payload.textTodo, description: action.payload.description}
        : item
        ))
      }

    case ActionTypes.TOGGLE_TODO:
      return {
        todos: state.todos.map((item) => (item.idTodo === action.payload.idTodo
        ? {...item, isComplete: !item.isComplete}
        : item
        ))
      }

    case ActionTypes.TOGGLE_EDIT_TODO:
      return {
        todos: state.todos.map((item) => (item.idTodo === action.payload.idTodo
        ? {...item, isEditing: !item.isEditing}
        : item
        ))
      }

    case ActionTypes.LOAD_REQUEST:
      return {...state}

    default:
      return state;
  }
}
