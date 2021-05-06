import { ITodoDTO } from 'fed-todo-journey_todo-common';

export interface TodosState {
  todos: { [key: string]: ITodoDTO };
}
