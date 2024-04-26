import {Todo, TodosActionTypes, todosState} from "../types/state";
import {ActionTypes} from "../const";
import {addSubtask, deleteTodo, toggleEditTodo, toggleTodo, updateTodo} from "../utils";

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
      const updatedTodosDelete = deleteTodo(state.todos, todoIndex)
      return {
        ...state,
        todos: updatedTodosDelete
      }

    case ActionTypes.UPDATE_TODO:
      const editingTodos = updateTodo(state.todos, action.payload.idTodo, action.payload.textTodo, action.payload.description);
      return {
        todos: editingTodos
      }

    case ActionTypes.TOGGLE_TODO:
      const updatedTodosCompleted = toggleTodo(state.todos, action.payload.idTodo)
      return {
        todos: updatedTodosCompleted
      }

    case ActionTypes.TOGGLE_EDIT_TODO:
      const updatedTodosEdited = toggleEditTodo(state.todos, action.payload.idTodo)
      return {
        todos: updatedTodosEdited
      }

    default:
      return state;
  }
}
