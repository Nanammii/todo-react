import {store} from "../store";

export type TodosActionTypes = {
  type: string,
  payload?: Todo | any,
}
//
// export type SubTask = {
//   idSubtask: string,
//   textTodo: string,
//   description: string,
//   isComplete: boolean,
//   isEditing: boolean,
// }

export type Todo = {
  idTodo: string,
  textTodo: string,
  description: string,
  isComplete: boolean,
  isEditing: boolean,
  subTasks?: Todo[]
}

export type todosState = {
  readonly todos: Todo[]
}

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
