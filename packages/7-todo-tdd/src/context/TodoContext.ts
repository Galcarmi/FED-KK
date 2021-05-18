import { ITodoMap } from 'fed-todo-journey_todo-common';
import React from 'react';
import { ITodosService } from '../services/ITodoService';
import { TodosService } from '../services/TodoService';
import { TodosServiceMock } from '../test/TodosServiceMock';

export interface ITodoContext {
  todos: ITodoMap;
  todosService: ITodosService;
  setTodos: React.Dispatch<React.SetStateAction<ITodoMap>>;
}

export class TodosState implements ITodoContext {
  public todosService: ITodosService;

  constructor(
    public todos: ITodoMap,
    public setTodos: React.Dispatch<React.SetStateAction<ITodoMap>>
  ) {
    try {
      this.todosService = process.env.TEST
        ? new TodosServiceMock()
        : new TodosService();
    } catch (e) {
      this.todosService = new TodosService();
    }
  }
}

export const TodoContext = React.createContext<ITodoContext>(
  new TodosState({}, () => {})
);
