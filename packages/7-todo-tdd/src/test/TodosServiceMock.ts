import { ITodoDTO, ITodoMap } from 'fed-todo-journey_todo-common';
import { ITodosService } from '../services/ITodoService';
import { Chance } from 'chance';

const chance = new Chance();
export class TodosServiceMock implements ITodosService {
  private todos: ITodoMap;

  constructor() {
    this.todos = {};
  }

  async addTodo(content: string): Promise<ITodoDTO> {
    const _id = chance.guid();
    const userId = chance.guid();
    const todoToInsert = {content, _id, userId, isDone: false}; 
    this.todos[_id] = todoToInsert ;

    return todoToInsert
  }

  async deleteTodo(_id: string): Promise<ITodoDTO> {
    throw new Error('Method not implemented.');
  }

  async editTodo(todo: Partial<ITodoDTO>): Promise<ITodoDTO> {
    throw new Error('Method not implemented.');
  }

  async getAllTodos(): Promise<{ [key: string]: ITodoDTO }> {
    return this.todos;
  }

  public initTodos(todos: ITodoMap): void {
    this.todos = todos;
  }
}
