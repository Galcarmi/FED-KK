const { v4 } = require('uuid');
const { TodoDBManager } = require('./TodoDBManager.js');
const { IdNotFoundError } = require('../errors/IdNotFoundError.js');
const { MissingFieldsError } = require('../errors/MissingFieldsError.js');

class TodoInMemoryDBManager extends TodoDBManager {
  constructor() {
    super();
    this.todos = {};
  }
  addTodo(userId, todo) {
    if (!todo.content) {
      throw new MissingFieldsError('content');
    }
    this._createEmptyTodosIfUserIdNotExists(userId);
    const toInsertTodo = { content: todo.content, id: v4(), isDone: false };
    this.todos[userId][toInsertTodo.id] = toInsertTodo;

    return toInsertTodo;
  }

  removeTodo(userId, id) {
    if (!id) {
      throw new MissingFieldsError('id');
    }
    
    this._createEmptyTodosIfUserIdNotExists(userId);
    this._throwIfTodoIdNotExists(userId, id);
    const deletedTodo = this.todos[userId][id];
    delete this.todos[userId][id]

    return deletedTodo;
  }

  editTodo(userId, todo) {
    if (!todo.id) {
      throw new MissingFieldsError('id');
    }
    this._createEmptyTodosIfUserIdNotExists(userId);
    this._throwIfTodoIdNotExists(userId, todo.id);

    this.todos[userId][todo.id] = {...this.todos[userId][todo.id], ...todo}

    return this.todos[userId][todo.id];
  }

  getAllTodos(userId) {
    this._createEmptyTodosIfUserIdNotExists(userId);
    return this.todos[userId];
  }

  _throwIfTodoIdNotExists(userId, id){
    if(!this.todos[userId][id]){
      throw new IdNotFoundError(id)
    }
  }

  _createEmptyTodosIfUserIdNotExists(userId){
    if(!this.todos[userId]){
      this.todos[userId] = {}; 
    }
  }
}

module.exports = {
  TodoInMemoryDBManager
}