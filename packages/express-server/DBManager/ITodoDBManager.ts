import { ITodoDTO } from '../dto/todo/ITodoDTO';

export interface ITodoDBManager {
  addTodo(userId: string, todo: ITodoDTO): Promise<ITodoDTO>;
  removeTodo(userId: string, _id: string): Promise<ITodoDTO>;
  editTodo(userId: string, todo: ITodoDTO): Promise<ITodoDTO>;
  getAllTodos(userId: string): Promise<ITodoDTO[]>;
}
