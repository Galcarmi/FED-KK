import { elementSelectors, eShowHide } from './DOMSelectors';
import { createTodoIndexPage } from '../pages/todoIndexPage';
import { createTodoItem } from '../components/todo-app/todoItem';
import { classes as contentUtilsClasses } from '../styles/utils/contentUtils';

export class ViewCtrl {
  constructor(model) {
    this.model = model;
    createTodoIndexPage();
    this._initEventListeners();
    this._initPersistedTodos();
    this._updateEmptyState();
  }

  _addTodo({ content, id, isDone }) {
    const todoHTMLList = elementSelectors.todoList();
    todoHTMLList.insertAdjacentHTML(
      'beforeend',
      this._getTodoTemplate({ content, id, isDone })
    );
    this._addEventListenersForTodoItem(id);
  }

  _deleteTodoById(id) {
    const todoList = elementSelectors.todoList();
    const todoItem = elementSelectors.getTodoItemById(id);
    todoList.removeChild(todoItem);
  }

  _updateTodoContent({ content, id }) {
    const contentElement = elementSelectors.getTodoContentElementById(id);
    contentElement.innerHTML = content;
  }

  _updateEmptyState(showHideConstant) {
    switch (showHideConstant) {
      case eShowHide.HIDE: {
        elementSelectors.todoEmptyState().classList.remove('visible');
        break;
      }
      case eShowHide.SHOW: {
        elementSelectors.todoEmptyState().classList.add('visible');
        break;
      }
    }
  }

  _toggleDoneTodoById(id, isDone) {
    const contentElement = elementSelectors.getTodoContentElementById(id);
    isDone
      ? contentElement.classList.add(contentUtilsClasses.crossedContent)
      : contentElement.classList.remove(contentUtilsClasses.crossedContent);
  }

  _focusOnTextInput() {
    elementSelectors.todoTxtInput().focus();
  }

  _getTextInputContent() {
    return elementSelectors.todoTxtInput().value;
  }

  _eraseTextInputContent() {
    elementSelectors.todoTxtInput().value = '';
  }

  _updateEmptyStateVisibility(visible) {
    switch (visible) {
      case eShowHide.HIDE: {
        elementSelectors.todoEmptyState().classList.remove(contentUtilsClasses.visible);
        break;
      }
      case eShowHide.SHOW: {
        elementSelectors.todoEmptyState().classList.add(contentUtilsClasses.visible);
        break;
      }
    }
  }

  _showTodoEditInputById({ id, content }) {
    const inputElement = elementSelectors.getEditInputElementOfTodoById(id);
    inputElement.value = content;
    inputElement.classList.add(contentUtilsClasses.displayBlock);
    inputElement.focus();

    const contentElement = elementSelectors.getTodoContentElementById(id);
    contentElement.classList.add(contentUtilsClasses.displayNone);
  }

  _hideTodoEditInputById(id) {
    const inputElement = elementSelectors.getEditInputElementOfTodoById(id);
    inputElement.classList.remove(contentUtilsClasses.displayBlock);

    const contentElement = elementSelectors.getTodoContentElementById(id);
    contentElement.classList.remove(contentUtilsClasses.displayNone);
  }

  _onAddTodo() {
    const textInputContent = this._getTextInputContent();
    if (!textInputContent) {
      return;
    }

    const todo = this.model.addTodo(textInputContent);
    this._addTodo(todo);
    this._eraseTextInputContent();
    this._focusOnTextInput();
    this._updateEmptyState();
  }

  _onDoneTodo(id) {
    this._hideTodoEditInputById(id);
    const isDone = this.model.updateTodoDoneState(id);
    this._toggleDoneTodoById(id, isDone);
  }

  _onDeleteDoto(id) {
    this._hideTodoEditInputById(id);
    this.model.deleteTodoById(id);
    this._deleteTodoById(id);
    this._updateEmptyState();
  }

  _onEditTodoBtnClick(id) {
    const todo = this.model.getTodoItemById(id);
    this._showTodoEditInputById(todo);
  }

  _onEditTodo({ id, content }) {
    this.model.editTodoContentById({ id, content });
    this._hideTodoEditInputById(id);
    this._updateTodoContent({ id, content });
  }

  _updateEmptyState() {
    const todos = this.model.getTodos();
    if (!todos.length) {
      this._updateEmptyStateVisibility(eShowHide.SHOW);
    } else {
      this._updateEmptyStateVisibility(eShowHide.HIDE);
    }
  }

  _initPersistedTodos() {
    this.model.getTodos().forEach(this._addTodo.bind(this));
  }

  _initEventListeners() {
    elementSelectors.actionTodoBtn().addEventListener('click', (e) => {
      this._onAddTodo();
      e.stopPropagation();
    });

    elementSelectors.todoTxtInput().addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        this._onAddTodo();
      }
    });
  }

  _getTodoTemplate({ content, id, isDone }) {
    return createTodoItem({ content, id, isDone });
  }

  _addEventListenersForTodoItem(id) {
    const doneSVG = elementSelectors.getDoneSVGElementOfTodoById(id);
    const deleteSVG = elementSelectors.getDeleteSVGElementOfTodoById(id);
    const editSVG = elementSelectors.getEditSVGElementOfTodoById(id);
    const inputElement = elementSelectors.getEditInputElementOfTodoById(id);

    doneSVG.addEventListener('click', () => {
      this._onDoneTodo(id);
    });

    deleteSVG.addEventListener('click', () => {
      this._onDeleteDoto(id);
    });

    editSVG.addEventListener('click', () => {
      this._onEditTodoBtnClick(id);
    });

    inputElement.addEventListener('focusout', () => {
      const editedContent = inputElement.value;
      this._onEditTodo({
        id,
        content: editedContent,
      });
    });

    inputElement.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        const editedContent = inputElement.value;
        this._onEditTodo({
          id,
          content: editedContent,
        });
      }
    });
  }
}
