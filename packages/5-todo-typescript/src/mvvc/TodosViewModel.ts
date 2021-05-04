import { ITodoDTO } from 'fed-todo-journey_todo-common';

type TodosMap = { [key: string]: ITodoDTO };

export class TodosViewModel {
  private todos: TodosMap;

  constructor() {
    this.todos = {};
  }

  public setTodos(todos: {[key:string]:ITodoDTO}): void {
    this.todos = todos;
  }

  public getTodos(): TodosMap {
    return this.todos;
  }

  public addTodo(todo: ITodoDTO): void {
    if (todo._id) {
      this.todos[todo._id] = todo;
    }
  }

  public removeTodo(_id: string): void {
    delete this.todos[_id];
  }

  public editTodo(todo: Partial<ITodoDTO>): void {
    if (todo._id) {
      this.todos[todo._id] = { ...this.todos[todo._id], ...todo };
    }
  }
}
