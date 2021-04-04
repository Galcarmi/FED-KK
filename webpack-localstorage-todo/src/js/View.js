import { eEvents, elementSelectors, eShowHide } from "./constants";
import { eventManager } from './EventManager';

export class View {
  constructor() {
    this._initEventListeners();
  }

  addTodo({ content, id }) {
    const todoHTMLList = elementSelectors.todoList();
    todoHTMLList.insertAdjacentHTML(
      "beforeend",
      this._getTODOTemplate({ content, id })
    );
    this._addEventListenersForTodoItem(id);
  }

  deleteTodoById(id) {
    const todoList = elementSelectors.todoList();
    const todoItem = elementSelectors.getTODOItemById(id);
    todoList.removeChild(todoItem);
  }

  reRenderTodoContentById({ content, id }) {
    const contentElement = elementSelectors.getTodoContentElementById(id);
    contentElement.innerHTML = content;
  }

  updateEmptyState(showHideConstant) {
    switch (showHideConstant) {
      case eShowHide.HIDE: {
        elementSelectors.todoEmptyState().classList.remove("visible");
        break;
      }
      case eShowHide.SHOW: {
        elementSelectors.todoEmptyState().classList.add("visible");
        break;
      }
    }
  }

  toggleDoneTodoById(id) {
    const contentElement = elementSelectors.getTodoContentElementById(id);
    contentElement.classList.toggle("crossed-content");
  }

  focusOnTextInput() {
    elementSelectors.todoTxtInput().focus();
  }

  getTextInputContent() {
    return elementSelectors.todoTxtInput().value;
  }

  eraseTextInputContent() {
    elementSelectors.todoTxtInput().value = "";
  }

  updateEmptyStateVisibility(visible) {
    switch (visible) {
      case eShowHide.HIDE: {
        elementSelectors.todoEmptyState().classList.remove("visible");
        break;
      }
      case eShowHide.SHOW: {
        elementSelectors.todoEmptyState().classList.add("visible");
        break;
      }
    }
  }

  _initEventListeners() {
    elementSelectors.actionTODOBtn().addEventListener("click", (e) => {
        eventManager.fireEvent(eEvents.handleAddActionTodo);
      e.stopPropagation();
    });

    elementSelectors.todoTxtInput().addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        eventManager.fireEvent(eEvents.handleAddActionTodo);
      }
    });
  }

  _getTODOTemplate({ content, id }) {
    return `
        <div class="todo-app__list__item" id="${id}">
            <input type="text" class="todo-app__list__item__edit-input">
            <div class="todo-app__list__item__content">${content}</div>
            <div class="todo-app__list__item__actions">
              <svg
                class="todo-app__list__item__actions__done"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm4.393 7.5l-5.643 5.784-2.644-2.506-1.856 1.858 4.5 4.364 7.5-7.643-1.857-1.857z"
                />
              </svg>
              <svg
                class="todo-app__list__item__actions__delete"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6 16.538l-4.592-4.548 4.546-4.587-1.416-1.403-4.545 4.589-4.588-4.543-1.405 1.405 4.593 4.552-4.547 4.592 1.405 1.405 4.555-4.596 4.591 4.55 1.403-1.416z"
                />
              </svg>
              <svg
                class="todo-app__list__item__actions__edit"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-3.994 12.964l3.106 3.105-4.112.931 1.006-4.036zm9.994-3.764l-5.84 5.921-3.202-3.202 5.841-5.919 3.201 3.2z"
                />
              </svg>
            </div>
          </div>`;
  }

  _addEventListenersForTodoItem(id) {
    const doneSVG = elementSelectors.getDoneSVGElementOfTODOById(id);
    const deleteSVG = elementSelectors.getDeleteSVGElementOfTODOById(id);
    const editSVG = elementSelectors.getEditSVGElementOfTODOById(id);
    const inputElement = elementSelectors.getEditInputElementOfTODOById(id);

    doneSVG.addEventListener("click", () => {
        eventManager.fireEvent(eEvents.handleTODODoneActionClick, id);
    });

    deleteSVG.addEventListener("click", () => {
        eventManager.fireEvent(eEvents.handleTODODeleteActionClick, id);
    });

    editSVG.addEventListener("click", () => {
        eventManager.fireEvent(eEvents.handleTODOEditActionClick, id);
    });

    inputElement.addEventListener("focusout", () => {
      const editedContent = inputElement.value;
      eventManager.fireEvent(eEvents.handleTODOEditAction, {
        id,
        content: editedContent,
      });
    });

    inputElement.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        const editedContent = inputElement.value;
        eventManager.fireEvent(eEvents.handleTODOEditAction, {
          id,
          content: editedContent,
        });
      }
    });
  }

  showTODOEditInputById({ id, content }) {
    const inputElement = elementSelectors.getEditInputElementOfTODOById(id);
    inputElement.value = content;
    inputElement.classList.add("display-block");
    inputElement.focus();

    const contentElement = elementSelectors.getTodoContentElementById(id);
    contentElement.classList.add("display-none");
  }

  hideTODOEditInputById(id) {
    const inputElement = elementSelectors.getEditInputElementOfTODOById(id);
    inputElement.classList.remove("display-block");

    const contentElement = elementSelectors.getTodoContentElementById(id);
    contentElement.classList.remove("display-none");
  }
}
