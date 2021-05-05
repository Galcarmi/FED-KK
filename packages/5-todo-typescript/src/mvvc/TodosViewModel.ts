import { ITodoDTO } from 'fed-todo-journey_todo-common';

type TodosMap = { [key: string]: ITodoDTO };

export class TodosViewModel {
  private todos: TodosMap;
  private todosCounter: number;

  constructor() {
    this.todos = {};
    this.todosCounter = 0;
  }

  public setTodos(todos: { [key: string]: ITodoDTO }): void {
    this.todos = todos;
    Object.values(todos).forEach((value) => {
      this.todosCounter++;
    });
  }

  public getTodos(): TodosMap {
    return this.todos;
  }

  public addTodo(todo: ITodoDTO): void {
    this.todos[todo._id] = todo;
    this.todosCounter++;
  }

  public removeTodo(_id: string): void {
    delete this.todos[_id];
    this.todosCounter--;
  }

  public editTodo(todo: Partial<ITodoDTO>): void {
    if (todo._id) {
      this.todos[todo._id] = { ...this.todos[todo._id], ...todo };
    } else {
      throw new Error('missing property _id');
    }
  }

  public getTodosCount(): number {
    return this.todosCounter;
  }
}
