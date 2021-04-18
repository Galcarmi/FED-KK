const { v4 } = require('uuid');
const { TodoDBManager } = require('./TodoDBManager.js');
const { IdNotFoundError } = require('../errors/IdNotFoundError.js');
const { MissingFieldsError } = require('../errors/MissingFieldsError.js');

class TodoInMemoryDBManager extends TodoDBManager {
  constructor() {
    super();
    this.todos = [];
  }
  addTodo(todo) {
    if (!todo.content) {
      throw new MissingFieldsError('content');
    }

    const toInsertTodo = { content: todo.content, id: v4(), isDone: false };
    this.todos.push(toInsertTodo);

    return toInsertTodo;
  }
  removeTodo(id) {
    if (!id) {
      throw new MissingFieldsError('id');
    }

    const deletedIndex = this.getTodoIndexById(id);
    const deletedTodo = this.todos.splice(deletedIndex, 1);

    return deletedTodo;
  }

  editTodo(todo) {
    if (!todo.id) {
      throw new MissingFieldsError('id');
    }

    const editIndex = this.getTodoIndexById(todo.id);
    this.todos[editIndex] = { ...this.todos[editIndex], ...todo };

    return this.todos[editIndex];
  }

  getAllTodos() {
    return this.todos;
  }

  getTodoIndexById(id) {
    const foundIndex = this.todos.findIndex((todo) => todo.id === id);
    if (foundIndex === -1) {
      throw new IdNotFoundError(id);
    }

    return foundIndex;
  }
}

module.exports = {
  TodoInMemoryDBManager
}