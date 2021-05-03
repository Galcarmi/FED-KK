import { ITodoDTO } from 'fed-todo-journey_todo-common';
import { renderTodoHP } from '../views/todoHP';
import { todosService } from '../services/TodosService';
import { DOMSelectors } from './DOMSelectors';
import { Model } from './Model';
import { commonClasses } from '../styles/commonClasses';
import { ITodoClietDTO } from './ITodoClientDTO';
import { getTodoItem } from '../components/todo-app/todo-item/TodoItem';

export class ViewCtrl {
  private model: Model;

  constructor(model: Model) {
    this.model = model;
  }

  public initializeApp(): void {
    renderTodoHP({});
    this.initEventListeners();
  }

  public async initPersistedTodos(): Promise<void> {
    const todos: ITodoDTO[] = await todosService.getAllTodos();
    this.model.setTodos(todos);
    todos.forEach(this.renderTodo.bind(this))
    this.updateEmptyState();
  }

  private updateEmptyState(): void {
    const todos = Object.values(this.model.getTodos()); //todo ask ofir
    if (todos.length > 0) {
      DOMSelectors.todoEmptyState().classList.remove(commonClasses.visible);
    } else {
      DOMSelectors.todoEmptyState().classList.add(commonClasses.visible);
    }
  }

  private initEventListeners(): void {
    DOMSelectors.todoAddBtn().addEventListener('click', this.onAddTodo.bind(this));
    DOMSelectors.todoTxtInput().addEventListener('keypress', (e:KeyboardEvent)=>{
      if (e.key === 'Enter') {
        this.onAddTodo()
      }
    })
  }

  private onAddTodo(): void {
    const todoInputContent: string = DOMSelectors.todoTxtInput().value;
    if (todoInputContent) {
      this.addTodo({ content: todoInputContent, isDone: false });
    }
  }

  private async addTodo(todoToInsert: ITodoClietDTO): Promise<void> {
    const todo: ITodoDTO = await todosService.addTodo(todoToInsert);
    this.model.addTodo(todo);
    this.renderTodo(todo);
    this.clearTodoInput();
    this.updateEmptyState();
  }

  private renderTodo(todo:ITodoDTO):void{
    const todoItem : Element = document.createElement('div')
    todoItem.innerHTML = getTodoItem(todo);
    DOMSelectors.todoList().insertAdjacentElement('beforeend', todoItem);
  }

  private clearTodoInput():void{
    DOMSelectors.todoTxtInput().value = '';
  }
}
