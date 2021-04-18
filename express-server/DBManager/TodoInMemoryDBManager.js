const { v4 } = require('uuid');
const { TodoDBManager } = require('./TodoDBManager.js');
const { IdNotFoundError } = require('../errors/IdNotFoundError.js');
const { MissingFieldsError } = require('../errors/MissingFieldsError.js');

class TodoInMemoryDBManager extends TodoDBManager {
  constructor() {
    super();
    this.todos = {};
  }
  addTodo(todo) {
    if (!todo.content) {
      throw new MissingFieldsError('content');
    }

    const toInsertTodo = { content: todo.content, id: v4(), isDone: false };
    this.todos[toInsertTodo.id] = toInsertTodo;

    return toInsertTodo;
  }
  removeTodo(id) {
    if (!id) {
      throw new MissingFieldsError('id');
    }

    _throwIfTodoIdNotExists(id);

    const deletedTodo = this.todos[id];
    delete this.todos[id]

    return deletedTodo;
  }

  editTodo(todo) {
    if (!todo.id) {
      throw new MissingFieldsError('id');
    }

    _throwIfTodoIdNotExists(id);

    this.todos[todo.id] = {...this.todos[id], ...todo}

    return this.todos[todo.id];
  }

  getAllTodos() {
    return this.todos;
  }

  _throwIfTodoIdNotExists(id){
    if(!this.todos[id]){
      throw new IdNotFoundError(id)
    }
  }
}

module.exports = {
  TodoInMemoryDBManager
}