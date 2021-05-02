import { v4 } from 'uuid';
import { ITodoDBManager } from './ITodoDBManager.js';
import { IdNotFoundError } from '../errors/IdNotFoundError.js';
import { MissingFieldsError } from '../errors/MissingFieldsError.js';
import { ITodoDTO } from '../dto/todo/ITodoDTO.js';

export class TodoInMemoryDBManager implements ITodoDBManager {
  private todos:ITodoDTO[];

  constructor() {
    this.todos = {};
  }

  public async addTodo(userId, todo) {
    if (!todo.content) {
      throw new MissingFieldsError('content');
    }
    this._createEmptyTodosIfUserIdNotExists(userId);
    const toInsertTodo = { content: todo.content, id: v4(), isDone: false };
    this.todos[userId][toInsertTodo.id] = toInsertTodo;

    return toInsertTodo;
  }

  public async removeTodo(userId, id) {
    if (!id) {
      throw new MissingFieldsError('id');
    }
    
    this._createEmptyTodosIfUserIdNotExists(userId);
    this._throwIfTodoIdNotExists(userId, id);
    const deletedTodo = this.todos[userId][id];
    delete this.todos[userId][id]

    return deletedTodo;
  }

  public async editTodo(userId, todo) {
    if (!todo.id) {
      throw new MissingFieldsError('id');
    }
    this._createEmptyTodosIfUserIdNotExists(userId);
    this._throwIfTodoIdNotExists(userId, todo.id);

    this.todos[userId][todo.id] = {...this.todos[userId][todo.id], ...todo}

    return this.todos[userId][todo.id];
  }

  public async getAllTodos(userId) {
    this._createEmptyTodosIfUserIdNotExists(userId);
    return this.todos[userId];
  }

  private _throwIfTodoIdNotExists(userId, id){
    if(!this.todos[userId][id]){
      throw new IdNotFoundError(id)
    }
  }

  private _createEmptyTodosIfUserIdNotExists(userId){
    if(!this.todos[userId]){
      this.todos[userId] = {}; 
    }
  }
}
