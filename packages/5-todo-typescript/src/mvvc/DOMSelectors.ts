import { s as todoAppClasses } from '../components/todo-app/TodoApp';
import { s as todoItemClasses } from '../components/todo-app/todo-item/TodoItem';
import { s as doneBtnClasses } from '../components/action-btn/DoneBtn';
import { s as editBtnClasses } from '../components/action-btn/EditBtn';
import { s as deleteBtnClasses } from '../components/action-btn/DeleteBtn';

export const elementSelectors = {
  todoList: () => document.querySelector(`.${todoAppClasses.todoApp__list}`),
  actionTodoBtn: () =>
    document.querySelector(
      `.${todoAppClasses.todoApp__inputContainer__addBtn}`
    ),
  todoTxtInput: () =>
    document.querySelector(
      `.${todoAppClasses.todoApp__inputContainer__textInput}`
    ),
  getTodoItemById: (_id: string) => document.querySelector(`[id='${_id}']`),
  todoEmptyState: () =>
    document.querySelector(`.${todoAppClasses.todoApp__list__emptyState}`),
  getTodoContentElementById: (_id: string) => {
    const todoItem = elementSelectors.getTodoItemById(_id);
    return todoItem?.querySelector(
      `.${todoItemClasses.todoItem__content}`
    );
  },
  getDoneSVGElementOfTodoById: (_id: string) => {
    const todoItem = elementSelectors.getTodoItemById(_id);
    return todoItem?.querySelector(
      `.${doneBtnClasses.doneBtn}`
    );
  },
  getDeleteSVGElementOfTodoById: (_id: string) => {
    const todoItem = elementSelectors.getTodoItemById(_id);
    return todoItem?.querySelector(
      `.${deleteBtnClasses.deleteBtn}`
    );
  },
  getEditSVGElementOfTodoById: (_id: string) => {
    const todoItem = elementSelectors.getTodoItemById(_id);
    return todoItem?.querySelector(
      `.${editBtnClasses.editBtn}`
    );
  },
  getEditInputElementOfTodoById: (_id: string) => {
    const todoItem = elementSelectors.getTodoItemById(_id);
    return todoItem?.querySelector(
      `.${todoItemClasses.todoItem__editInput}`
    );
  },
  getActionsContainerElementOfTodoById: (_id: string) => {
    const todoItem = elementSelectors.getTodoItemById(_id);
    return todoItem?.querySelector(
      `.${todoItemClasses.todoItem__actions}`
    );
  },
};
