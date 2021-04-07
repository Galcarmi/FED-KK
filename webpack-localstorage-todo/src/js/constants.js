export const elementClasses = {
  todoList: '.todo-app__list',
  actionTodoBtn: '.todo-app__input-container__add-btn',
  todoTxtInput: '.todo-app__input-container__text-input',
  actionDoneSVG: '.todo-app__list__item__actions__done',
  actionDeleteSVG: '.todo-app__list__item__actions__delete',
  actionEditSVG: '.todo-app__list__item__actions__edit',
  todoItemContent: '.todo-app__list__item__content',
  todoEmptyState: '.todo-app__list__empty-state',
  todoEditInput: '.todo-app__list__item__edit-input',
  todoActionsContainer: '.todo-app__list__item__actions',
};

export const elementSelectors = {
  todoList: () => document.querySelector(elementClasses.todoList),
  actionTodoBtn: () => document.querySelector(elementClasses.actionTodoBtn),
  todoTxtInput: () => document.querySelector(elementClasses.todoTxtInput),
  getTodoItemById: (id) => document.querySelector(`[id='${id}']`),
  todoEmptyState: () => document.querySelector(elementClasses.todoEmptyState),
  getTodoContentElementById: (id) => {
    const todoItem = elementSelectors.getTodoItemById(id);
    return todoItem.querySelector(elementClasses.todoItemContent);
  },
  getDoneSVGElementOfTodoById: (id) => {
    const todoItem = elementSelectors.getTodoItemById(id);
    return todoItem.querySelector(elementClasses.actionDoneSVG);
  },
  getDeleteSVGElementOfTodoById: (id) => {
    const todoItem = elementSelectors.getTodoItemById(id);
    return todoItem.querySelector(elementClasses.actionDeleteSVG);
  },
  getEditSVGElementOfTodoById: (id) => {
    const todoItem = elementSelectors.getTodoItemById(id);
    return todoItem.querySelector(elementClasses.actionEditSVG);
  },
  getEditInputElementOfTodoById: (id) => {
    const todoItem = elementSelectors.getTodoItemById(id);
    return todoItem.querySelector(elementClasses.todoEditInput);
  },
  getActionsContainerElementOfTodoById: (id) => {
    const todoItem = elementSelectors.getTodoItemById(id);
    return todoItem.querySelector(elementClasses.todoActionsContainer);
  },
};

export const eShowHide = {
  SHOW: 'SHOW',
  HIDE: 'HIDE',
};
