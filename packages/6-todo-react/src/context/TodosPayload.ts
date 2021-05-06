import { ITodoDTO } from 'fed-todo-journey_todo-common';

export interface TodosPayload {
  todos: { [key: string]: ITodoDTO };
}
