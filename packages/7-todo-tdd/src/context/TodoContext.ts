import { ITodoMap } from 'fed-todo-journey_todo-common';
import React from 'react';
import { ITodosService } from '../services/ITodoService';
import { todosService } from '../services/TodoService';

export interface ITodoContext {
  todos: ITodoMap;
  todosService: ITodosService;
  setTodos: React.Dispatch<React.SetStateAction<ITodoMap>>;
}

export class TodosState implements ITodoContext {
  constructor(
    public todos: ITodoMap,
    public setTodos: React.Dispatch<React.SetStateAction<ITodoMap>>,
    public todosService: ITodosService
  ) {}
}

export const TodoContext = React.createContext<ITodoContext>(
  new TodosState({}, () => {}, todosService)
);
