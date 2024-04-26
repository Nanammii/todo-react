import {ActionTypes} from "../const";

export const addTodo = (text: string) => ({
  type: ActionTypes.ADD_TODO,
  payload: {
    idTodo: crypto.randomUUID(),
    textTodo: text,
    description: '',
    isComplete: false,
    isEditing: false
  }
})

export const addSubtask = (text: string, parentId: string) => ({
  type: ActionTypes.ADD_SUBTASK,
  payload: {
    parentId,
    text
  }
})

export const deleteTodo = (index: string) => ({
  type: ActionTypes.DELETE_TODO,
  payload: {idTodo: index}
});

export const updateTodo = (id: string, text: string, description: string) => ({
  type: ActionTypes.UPDATE_TODO,
  payload: { idTodo: id, textTodo: text, description: description }
})

export const toggleTodo = (id: string) => ({
  type: ActionTypes.TOGGLE_TODO,
  payload: {id}
});

export const toggleEditTodo = (id: string) => ({
  type: ActionTypes.TOGGLE_EDIT_TODO,
  payload: {idTodo: id}
});

export const loadRequest = () => ({
  type: ActionTypes.LOAD_REQUEST
});

export const EDIT_TODO = ({ type: ActionTypes.EDIT_TODO });

