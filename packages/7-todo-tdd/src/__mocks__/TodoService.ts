import { ITodoDTO, ITodoMap } from 'fed-todo-journey_todo-common';
import { ITodosService } from '../services/ITodoService';
import { Chance } from 'chance';

const chance = new Chance();
class TodosService implements ITodosService {
  private todos: ITodoMap;

  constructor(todos?: ITodoMap) {
    this.todos = todos ? todos : {};
  }

  async addTodo(content: string): Promise<ITodoDTO> {
    const _id = chance.guid();
    const userId = chance.guid();
    const todoToInsert = { content, _id, userId, isDone: false };
    this.todos[_id] = todoToInsert;

    return todoToInsert;
  }

  async deleteTodo(_id: string): Promise<ITodoDTO> {
    const foundTodo:ITodoDTO = this.todos[_id];
    delete this.todos[_id];

    return foundTodo;
  }

  async editTodo(todo: Partial<ITodoDTO>): Promise<ITodoDTO> {
    const foundTodo:ITodoDTO = this.todos[todo._id as string];
    const updatedTodo = {...foundTodo, ...todo};
    this.todos[todo._id as string] = updatedTodo;
    
    return updatedTodo;
  }

  async getAllTodos(): Promise<ITodoMap> {
    return this.todos;
  }
}

export const todosService = new TodosService();