import { todosService } from './TodosService';

export class Model {
  constructor() {
    this.todos = {};
  }

  async initTodos() {
    this.todos = await todosService.getAllTodos();
  }

  async addTodo(content) {
    const todo = await todosService.addTodo({ content });
    this.todos[todo.id] = todo;

    return todo;
  }

  async deleteTodoById(id) {
    await todosService.deleteTodo(id);
    delete this.todos[id];
  }

  async editTodoContentById({ id, content }) {
    await todosService.editTodo({ id, content });
    this.todos[id].content = content;
  }

  async updateTodoDoneState(id) {
    const isDone = !this.todos[id].isDone;
    await todosService.editTodo({ ...this.todos[id], isDone });

    this.todos[id].isDone = isDone;

    return isDone;
  }

  getTodoItemById(id) {
    return this.todos[id];
  }

  getTodos() {
    return this.todos;
  }
}
