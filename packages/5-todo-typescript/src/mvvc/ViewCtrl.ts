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
    todos.forEach(this.renderTodo.bind(this));
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
    DOMSelectors.todoAddBtn().addEventListener(
      'click',
      this.onAddTodo.bind(this)
    );
    DOMSelectors.todoTxtInput().addEventListener(
      'keypress',
      (e: KeyboardEvent) => {
        if (e.key === 'Enter') {
          this.onAddTodo();
        }
      }
    );
  }

  private onAddTodo(): void {
    const todoInputContent: string = DOMSelectors.todoTxtInput().value;
    if (todoInputContent) {
      this.addTodo({ content: todoInputContent, isDone: false });
    }
  }

  private async addTodo(todoToInsert: ITodoClietDTO): Promise<void> {
    const todo: ITodoDTO = await todosService.addTodo(todoToInsert);
    this.clearTodoInput();
    this.model.addTodo(todo);
    this.renderTodo(todo);
    this.updateEmptyState();
  }

  private renderTodo(todo: ITodoDTO): void {
    if (todo._id) {
      const todoElement: Element = document.createElement('div');
      todoElement.innerHTML = getTodoItem(todo);
      DOMSelectors.todoList().insertAdjacentElement('beforeend', todoElement);
      this.addEventListenersForTodoElement(todo._id);
    }
  }

  private clearTodoInput(): void {
    DOMSelectors.todoTxtInput().value = '';
  }

  private addEventListenersForTodoElement(_id: string): void {
    DOMSelectors.getDeleteSVGElementOfTodoById(_id).addEventListener(
      'click',
      this.onTodoDelete.bind(this, _id)
    );
    DOMSelectors.getEditSVGElementOfTodoById(_id).addEventListener(
      'click',
      this.onTodoEdit.bind(this, _id)
    );
    DOMSelectors.getDoneSVGElementOfTodoById(_id).addEventListener(
      'click',
      this.onTodoDone.bind(this, _id)
    );
  }

  private async onTodoDone(_id: string): Promise<void> {
    const oldTodo = this.model.getTodos()[_id];
    const updatedTodo: ITodoDTO = { ...oldTodo, isDone: !oldTodo.isDone };
    await todosService.editTodo(updatedTodo);
    this.model.editTodo(updatedTodo);
    this.reRenderTodo(updatedTodo);
  }

  private async onTodoEdit(): Promise<void> {}

  private async onTodoDelete(): Promise<void> {}

  private reRenderTodo(todo: ITodoDTO): void {
    if (todo._id) {
      const todoElement: Element = DOMSelectors.getTodoContentElementById(
        todo._id
      );
      todoElement.innerHTML = todo.content;
      this.updateDoneStateForTodoElement(todoElement, todo.isDone);
    }
  }

  private updateDoneStateForTodoElement(
    todoElement: Element,
    isDone: boolean
  ): void {
    if (isDone) {
      todoElement.classList.add(commonClasses.crossedContent);
    } else {
      todoElement.classList.remove(commonClasses.crossedContent);
    }
  }
}
