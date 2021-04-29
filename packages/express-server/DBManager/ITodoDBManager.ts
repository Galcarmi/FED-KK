import { ITodo } from './ITodo';

export interface TodoDBManager {
  addTodo(userId:string, todo:ITodo):Promise<ITodo>;
  removeTodo(userId:string, _id:string):Promise<ITodo>;
  editTodo(userId:string, todo:ITodo):Promise<ITodo>;
  getAllTodos(userId:string):Promise<ITodo[]>;
}
