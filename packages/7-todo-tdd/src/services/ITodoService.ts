import { ITodoDTO } from 'fed-todo-journey_todo-common';

export interface ITodosService {
  addTodo(content: string): Promise<ITodoDTO>;
  deleteTodo(_id: string): Promise<ITodoDTO>;
  editTodo(todo: Partial<ITodoDTO>): Promise<ITodoDTO>;
  getAllTodos(): Promise<{ [key: string]: ITodoDTO }>;
}
