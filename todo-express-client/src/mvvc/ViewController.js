import { elementSelectors } from './DOMSelectors';
import { eShowHide } from './constants';
import { classes as helperClasses } from '../styles/helperClasses';
import { renderTodoPage } from '../pages/todoPage';
import { getTodoItem } from '../components/todo-app/todo-item/todoItem';

export class ViewCtrl {
  constructor(model) {
    this.model = model;
  }

  async initPersistedTodos() {
    await this.model.initTodos();
    Object.entries(this.model.getTodos()).map(todoEntry=>todoEntry[1]).forEach((todo)=>{this._addTodo(todo)});
    this._updateEmptyState();
  }

  initEventListeners() {
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

  renderTodoPage() {
    renderTodoPage();
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
        elementSelectors
          .todoEmptyState()
          .classList.remove(helperClasses.visible);
        break;
      }
      case eShowHide.SHOW: {
        elementSelectors.todoEmptyState().classList.add(helperClasses.visible);
        break;
      }
    }
  }

  _toggleDoneTodoById(id, isDone) {
    const contentElement = elementSelectors.getTodoContentElementById(id);
    isDone
      ? contentElement.classList.add(helperClasses.crossedContent)
      : contentElement.classList.remove(helperClasses.crossedContent);
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
        elementSelectors
          .todoEmptyState()
          .classList.remove(helperClasses.visible);
        break;
      }
      case eShowHide.SHOW: {
        elementSelectors.todoEmptyState().classList.add(helperClasses.visible);
        break;
      }
    }
  }

  _showTodoEditInputById({ id, content }) {
    const inputElement = elementSelectors.getEditInputElementOfTodoById(id);
    inputElement.value = content;
    inputElement.classList.add(helperClasses.displayBlock);
    inputElement.focus();

    const contentElement = elementSelectors.getTodoContentElementById(id);
    contentElement.classList.add(helperClasses.displayNone);
  }

  _hideTodoEditInputById(id) {
    const inputElement = elementSelectors.getEditInputElementOfTodoById(id);
    inputElement.classList.remove(helperClasses.displayBlock);

    const contentElement = elementSelectors.getTodoContentElementById(id);
    contentElement.classList.remove(helperClasses.displayNone);
  }

  async _onAddTodo() {
    const textInputContent = this._getTextInputContent();
    if (!textInputContent) {
      return;
    }

    const todo = await this.model.addTodo(textInputContent);
    this._addTodo(todo);
    this._eraseTextInputContent();
    this._focusOnTextInput();
    this._updateEmptyState();
  }

  async _onDoneTodo(id) {
    this._hideTodoEditInputById(id);
    const isDone = await this.model.updateTodoDoneState(id);
    this._toggleDoneTodoById(id, isDone);
  }

  async _onDeleteDoto(id) {
    this._hideTodoEditInputById(id);
    await this.model.deleteTodoById(id);
    this._deleteTodoById(id);
    this._updateEmptyState();
  }

  _onEditTodoBtnClick(id) {
    const todo = this.model.getTodoItemById(id);
    this._showTodoEditInputById(todo);
  }

  async _onEditTodo({ id, content }) {
    await this.model.editTodoContentById({ id, content });
    this._hideTodoEditInputById(id);
    this._updateTodoContent({ id, content });
  }

  _updateEmptyState() {
    const todos = Object.entries(this.model.getTodos()).map(todoEntry=>todoEntry[1]);
    if (!todos.length) {
      this._updateEmptyStateVisibility(eShowHide.SHOW);
    } else {
      this._updateEmptyStateVisibility(eShowHide.HIDE);
    }
  }

  _getTodoTemplate({ content, id, isDone }) {
    return getTodoItem({ content, id, isDone });
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
