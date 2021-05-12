import { v4 as uuidv4 } from 'uuid';
import { PersistManager } from './PersistManager';

export class Model {
  constructor() {
    this.todos = [];
    this.persistManager = new PersistManager();
    this.todos = this.persistManager.getPersistedTodos();
  }

  addTodo(content) {
    const generateId = uuidv4();
    const todo = { id: generateId, content, isDone: false };
    this.todos.push(todo);
    this.persistManager.persistTodos(this.todos);

    return todo;
  }

  deleteTodoById(id) {
    const deletedIndex = this.todos.findIndex((todo) => todo.id === id);
    this.todos.splice(deletedIndex, 1);
    this.persistManager.persistTodos(this.todos);
  }

  editTodoContentById({ id, content }) {
    const editedIndex = this.todos.findIndex((todo) => todo.id === id);
    this.todos[editedIndex].content = content;
    this.persistManager.persistTodos(this.todos);
  }

  updateTodoDoneState(id) {
    const editedIndex = this.todos.findIndex((todo) => todo.id === id);
    const isDone = !this.todos[editedIndex].isDone;
    this.todos[editedIndex].isDone = isDone;
    this.persistManager.persistTodos(this.todos);

    return isDone;
  }

  getTodoItemById(id) {
    return this.todos.find((todo) => todo.id === id);
  }

  getTodos() {
    return this.todos;
  }

  setTodos(todos) {
    this.todos = [...todos];
  }
}
