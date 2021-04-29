export interface TodoDBManager {
  addTodo(todo:any):any;

  removeTodo(id:string):any;
  editTodo(todo:any):any;
  getAllTodos():any;
  getTodoIndexById(id:string):any;
}
