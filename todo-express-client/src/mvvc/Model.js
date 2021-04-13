import { todosService } from './TodosService';

export class Model {
  constructor() {
    this.todos = [];
  }

  async initTodos(){
    this.todos = await todosService.getAllTodos();
  }

  async addTodo(content) {
    const todo = await todosService.addTodo({content});
    this.todos.push(todo);

    return todo;
  }

  async deleteTodoById(id) {
    await todosService.deleteTodo(id);
    const deletedIndex = this.todos.findIndex((todo) => todo.id === id);
    this.todos.splice(deletedIndex, 1);
  }

  async editTodoContentById({ id, content }) {
    await todosService.editTodo({ id, content })  
    const editedIndex = this.todos.findIndex((todo) => todo.id === id);
    this.todos[editedIndex].content = content;
  }

  async updateTodoDoneState(id) {
    const editedIndex = this.todos.findIndex((todo) => todo.id === id);
    const isDone = !this.todos[editedIndex].isDone;

    await todosService.editTodo({...this.todos[editedIndex], isDone})

    this.todos[editedIndex].isDone = isDone;

    return isDone;
  }

  getTodoItemById(id) {
    return this.todos.find((todo) => todo.id === id);
  }

  getTodos() {
    return this.todos;
  }

}
