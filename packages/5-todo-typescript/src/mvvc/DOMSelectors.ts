import { s as todoAppClasses } from '../components/todo-app/TodoApp';
import { s as todoItemClasses } from '../components/todo-app/todo-item/TodoItem';
import { s as doneBtnClasses } from '../components/action-btn/DoneBtn';
import { s as editBtnClasses } from '../components/action-btn/EditBtn';
import { s as deleteBtnClasses } from '../components/action-btn/DeleteBtn';

export const DOMSelectors = {
  todoList: (): Element =>
    <Element>document.querySelector(`.${todoAppClasses.todoApp__list}`),
  todoAddBtn: (): Element =>
    <Element>(
      document.querySelector(
        `.${todoAppClasses.todoApp__inputContainer__addBtn}`
      )
    ),
  todoTxtInput: (): HTMLInputElement =>
    <HTMLInputElement>(
      document.querySelector(
        `.${todoAppClasses.todoApp__inputContainer__textInput}`
      )
    ),
  getTodoItemById: (_id: string): Element =>
    <Element>document.querySelector(`[id='${_id}']`),
  todoEmptyState: (): Element =>
    <Element>(
      document.querySelector(`.${todoAppClasses.todoApp__list__emptyState}`)
    ),
  getTodoContentElementById: (_id: string): Element => {
    const todoItem = DOMSelectors.getTodoItemById(_id);
    return <Element>(
      todoItem.querySelector(`.${todoItemClasses.todoItem__content}`)
    );
  },
  getDoneSVGElementOfTodoById: (_id: string): SVGAElement => {
    const todoItem = DOMSelectors.getTodoItemById(_id);
    return <SVGAElement>todoItem.querySelector(`.${doneBtnClasses.doneBtn}`);
  },
  getDeleteSVGElementOfTodoById: (_id: string): SVGAElement => {
    const todoItem = DOMSelectors.getTodoItemById(_id);
    return <SVGAElement>(
      todoItem.querySelector(`.${deleteBtnClasses.deleteBtn}`)
    );
  },
  getEditSVGElementOfTodoById: (_id: string): SVGAElement => {
    const todoItem = DOMSelectors.getTodoItemById(_id);
    return <SVGAElement>todoItem.querySelector(`.${editBtnClasses.editBtn}`);
  },
  getEditInputElementOfTodoById: (_id: string): HTMLInputElement => {
    const todoItem = DOMSelectors.getTodoItemById(_id);
    return <HTMLInputElement>(
      todoItem.querySelector(`.${todoItemClasses.todoItem__editInput}`)
    );
  },
  getActionsContainerElementOfTodoById: (_id: string): Element => {
    const todoItem = DOMSelectors.getTodoItemById(_id);
    return <Element>(
      todoItem.querySelector(`.${todoItemClasses['todo-item__actions']}`)
    );
  },
};
