import { v4 as uuidv4 } from 'uuid';
import { TodoPersistManager } from './TodoPersistManager';

export class TodoIMDBPersistManager extends TodoPersistManager {
  constructor() {
    this.todos = [];
  }
  addTodo(todo) {
    if (!todo.content) {
      throw new Error('convert it to webResponse error');
    }

    const toInsertTodo = { content: todo.content, id: uuidv4() };
    this.todos.push(toInsertTodo);

    return toInsertTodo;
  }
  removeTodo(id) {
    if (id) {
      throw new Error('convert it to webResponse error');
    }

    const deletedIndex = this.getTodoIndexById(id);
    const deletedTodo = this.todos.splice(deletedIndex, 1);

    return deletedTodo;
  }

  editTodo(todo) {
    if (!todo.content || !todo.id) {
        throw new Error('convert it to webResponse error');
    }
    
    const editIndex = this.getTodoIndexById(id);
    this.todos[editIndex].content = todo.content;

    return this.todos[editIndex];
  }

  getAllTodos() {
    return this.todos;
  }

  getTodoIndexById(id) {
    const foundIndex = this.todos.findIndex((todo) => todo.id === id);
    if(foundIndex === -1){
        throw new Error('convert it to webResponse error');
    }  
    
    return foundIndex;
  }
}
