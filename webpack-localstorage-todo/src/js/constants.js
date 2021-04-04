export const elementClasses = {
    todoList:'.todo-app__list',
    actionTODOBtn: '.todo-app__input-container__add-btn',
    todoTxtInput:'.todo-app__input-container__text-input',
    actionDoneSVG: '.todo-app__list__item__actions__done',
    actionDeleteSVG: '.todo-app__list__item__actions__delete',
    actionEditSVG: '.todo-app__list__item__actions__edit',
    todoItemContent:'.todo-app__list__item__content',
    todoEmptyState: '.todo-app__list__empty-state',
}

export const elementSelectors = {
    todoList : ()=>document.querySelector(elementClasses.todoList),
    actionTODOBtn : ()=> document.querySelector(elementClasses.actionTODOBtn),
    todoTxtInput : ()=> document.querySelector(elementClasses.todoTxtInput),
    getTODOItemById : (id) => document.querySelector(`[id='${id}']`),
    todoEmptyState : () => document.querySelector(elementClasses.todoEmptyState),
    getTodoContentElementById : (id) =>{
        const todoItem = elementSelectors.getTODOItemById(id);
        return todoItem.querySelector(elementClasses.todoItemContent);
    }
}

export const eTODOActionBtnMode = {
    EDIT:'EDIT',
    ADD:'ADD',
}

export const eShowHide = {
    SHOW:'SHOW',
    HIDE:'HIDE',
}