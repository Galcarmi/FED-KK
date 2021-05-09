import { ITodoDTO } from 'fed-todo-journey_todo-common';

type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

export enum TodosActionTypes {
  SET_TODOS,
  ADD_EDIT_TODO,
  REMOVE_TODO,
}

type TodoPayload = {
  [TodosActionTypes.ADD_EDIT_TODO]: ITodoDTO;
  [TodosActionTypes.REMOVE_TODO]: ITodoDTO;
  [TodosActionTypes.SET_TODOS]: { [key: string]: ITodoDTO };
};

export type TodosActions = ActionMap<TodoPayload>[keyof ActionMap<TodoPayload>];
