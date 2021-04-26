import { todosService } from './TodosService';

export class Model {
  constructor() {
    this.todos = {};
  }

  async initTodos() {
    const todos = await todosService.getAllTodos();
    todos.forEach(todo=>{
      this.todos[todo._id] = todo;
    })
  }

  async addTodo(content) {
    const todo = await todosService.addTodo({ content });
    this.todos[todo._id] = todo;

    return todo;
  }

  async deleteTodoById(_id) {
    await todosService.deleteTodo(_id);
    delete this.todos[_id];
  }

  async editTodoContentById({ _id, content }) {
    await todosService.editTodo({ _id, content });
    this.todos[_id].content = content;
  }

  async updateTodoDoneState(_id) {
    const isDone = !this.todos[_id].isDone;
    await todosService.editTodo({ ...this.todos[_id], isDone });

    this.todos[_id].isDone = isDone;

    return isDone;
  }


  getTodoItemById(_id) {
    return this.todos[_id];
  }

  getTodos() {
    return this.todos;
  }
}
