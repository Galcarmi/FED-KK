import { s as todoAppClasses } from '../components/todo-app/todoApp.js';
import { s as todoItemClasses } from '../components/todo-app/todo-item/todoItem.js';
import { s as actionBtnClasses } from '../components/todo-app/todo-item/actionBtn/actionBtn';

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
  getTodoItemById: (_id) => document.querySelector(`[id='${_id}']`),
  todoEmptyState: () =>
    document.querySelector(`.${todoAppClasses.todoApp__list__emptyState}`),
  getTodoContentElementById: (_id) => {
    const todoItem = elementSelectors.getTodoItemById(_id);
    return todoItem.querySelector(
      `.${todoItemClasses.todoApp__list__item__content}`
    );
  },
  getDoneSVGElementOfTodoById: (_id) => {
    const todoItem = elementSelectors.getTodoItemById(_id);
    return todoItem.querySelector(
      `.${actionBtnClasses.todoApp__list__item__actions__done}`
    );
  },
  getDeleteSVGElementOfTodoById: (_id) => {
    const todoItem = elementSelectors.getTodoItemById(_id);
    return todoItem.querySelector(
      `.${actionBtnClasses.todoApp__list__item__actions__delete}`
    );
  },
  getEditSVGElementOfTodoById: (_id) => {
    const todoItem = elementSelectors.getTodoItemById(_id);
    return todoItem.querySelector(
      `.${actionBtnClasses.todoApp__list__item__actions__edit}`
    );
  },
  getEditInputElementOfTodoById: (_id) => {
    const todoItem = elementSelectors.getTodoItemById(_id);
    return todoItem.querySelector(
      `.${todoItemClasses.todoApp__list__item__editInput}`
    );
  },
  getActionsContainerElementOfTodoById: (_id) => {
    const todoItem = elementSelectors.getTodoItemById(_id);
    return todoItem.querySelector(
      `.${todoItemClasses['todo-app__list__item__actions']}`
    );
  },
};
