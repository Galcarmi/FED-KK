import { ITodoDTO } from 'fed-todo-journey_todo-common';
import { renderTodoHP } from '../views/todoHP';
import { todosService } from '../services/TodosService';
import { DOMSelectors } from './DOMSelectors';
import { TodosViewModel } from './TodosViewModel';
import { s as commonClasses } from '../styles/commonClasses';
import { ITodoPartialDTO } from './ITodoPartialDTO';
import { getTodoItem } from '../components/todo-app/todo-item/TodoItem';

export class ViewCtrl {
  private model: TodosViewModel;

  constructor(model: TodosViewModel) {
    this.model = model;
  }

  public async initializeApp(): Promise<void> {
    renderTodoHP({});
    await this.fetchTodos();
    this.initEventListeners();
  }

  public async fetchTodos(): Promise<void> {
    const todos: { [key: string]: ITodoDTO } = await todosService.getAllTodos();
    this.model.setTodos(todos);
    Object.values(todos).forEach(this.renderTodo.bind(this));
    this.updateEmptyState();
  }

  public initEventListeners(): void {
    DOMSelectors.todoAddBtn().addEventListener(
      'click',
      this.onAddTodo.bind(this)
    );
    DOMSelectors.todoTxtInput().addEventListener(
      'keypress',
      (e: KeyboardEvent): void => {
        if (e.key === 'Enter') {
          this.onAddTodo();
        }
      }
    );
  }

  private updateEmptyState(): void {
    const todos: ITodoDTO[] = Object.values(this.model.getTodos()); //todo ask ofir
    if (todos.length > 0) {
      DOMSelectors.todoEmptyState().classList.remove(commonClasses.visible);
    } else {
      DOMSelectors.todoEmptyState().classList.add(commonClasses.visible);
    }
  }

  private onAddTodo(): void {
    const todoInputContent: string = DOMSelectors.todoTxtInput().value;
    if (todoInputContent) {
      this.addTodo(todoInputContent);
    }
  }

  private async addTodo(content: string): Promise<void> {
    const todo: ITodoDTO = await todosService.addTodo(content);
    this.clearTodoInput();
    this.model.addTodo(todo);
    this.renderTodo(todo);
    this.updateEmptyState();
  }

  private renderTodo(todo: ITodoDTO): void {
    const todoItemTemplate: string = getTodoItem(todo);
    DOMSelectors.todoList().insertAdjacentHTML('beforeend', todoItemTemplate);
    this.addEventListenersForTodoElement(todo._id);
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
      this.onTodoEditClick.bind(this, _id)
    );
    DOMSelectors.getDoneSVGElementOfTodoById(_id).addEventListener(
      'click',
      this.onTodoDone.bind(this, _id)
    );
    DOMSelectors.getEditInputElementOfTodoById(_id).addEventListener(
      'keypress',
      (e: KeyboardEvent): void => {
        if (e.key === 'Enter') {
          this.onTodoEdit(_id);
        }
      }
    );
    DOMSelectors.getEditInputElementOfTodoById(_id).addEventListener(
      'focusout',
      this.onTodoEdit.bind(this, _id)
    );
  }

  private async onTodoDone(_id: string): Promise<void> {
    const oldTodo: ITodoDTO = this.model.getTodos()[_id];
    const updatedTodo: ITodoDTO = { ...oldTodo, isDone: !oldTodo.isDone };
    await todosService.editTodo(updatedTodo);
    this.model.editTodo(updatedTodo);
    this.reRenderTodo(updatedTodo);
  }

  private async onTodoEditClick(_id: string): Promise<void> {
    if (this.isEditInputVisible(_id)) {
      this.onTodoEdit(_id);
    } else {
      this.showEditInput(_id);
    }
  }

  private async onTodoEdit(_id: string): Promise<void> {
    const updatedTodoContent = DOMSelectors.getEditInputElementOfTodoById(_id)
      .value;
    if (updatedTodoContent) {
      const oldTodo: ITodoDTO = this.model.getTodos()[_id];
      const updatedTodo: ITodoDTO = { ...oldTodo, content: updatedTodoContent };
      await todosService.editTodo(updatedTodo);
      this.model.getTodos()[_id].content = updatedTodoContent;
      this.reRenderTodo(updatedTodo);
    }
    this.hideEditInput(_id);
  }

  private async onTodoDelete(_id: string): Promise<void> {
    await todosService.deleteTodo(_id);
    this.model.removeTodo(_id);
    this.removeRenderedTodo(_id);
  }

  private reRenderTodo(todo: ITodoDTO): void {
    const todoElement: Element = DOMSelectors.getTodoContentElementById(
      todo._id
    );
    todoElement.innerHTML = todo.content;
    this.updateDoneStateForTodoElement(todoElement, todo.isDone);
  }

  private removeRenderedTodo(_id: string): void {
    const todoList: Element = DOMSelectors.todoList();
    const todoItem: Element = DOMSelectors.getTodoItemById(_id);
    todoList.removeChild(todoItem);
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

  private showEditInput(_id: string): void {
    const editInput: HTMLInputElement = DOMSelectors.getEditInputElementOfTodoById(
      _id
    );
    editInput.value = this.model.getTodos()[_id].content;
    editInput.classList.add(commonClasses.displayBlock);
    editInput.focus();
  }

  private hideEditInput(_id: string): void {
    const editInput: HTMLInputElement = DOMSelectors.getEditInputElementOfTodoById(
      _id
    );
    editInput.classList.remove(commonClasses.displayBlock);
  }

  private isEditInputVisible(_id: string): boolean {
    return DOMSelectors.getEditInputElementOfTodoById(_id).classList.contains(
      commonClasses.displayBlock
    );
  }
}
