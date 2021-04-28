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

  _addTodo({ content, _id, isDone }) {
    const todoHTMLList = elementSelectors.todoList();
    todoHTMLList.insertAdjacentHTML(
      'beforeend',
      this._getTodoTemplate({ content, _id, isDone })
    );
    this._addEventListenersForTodoItem(_id);
  }

  _deleteTodoById(_id) {
    const todoList = elementSelectors.todoList();
    const todoItem = elementSelectors.getTodoItemById(_id);
    todoList.removeChild(todoItem);
  }

  _updateTodoContent({ content, _id }) {
    const contentElement = elementSelectors.getTodoContentElementById(_id);
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

  _toggleDoneTodoById(_id, isDone) {
    const contentElement = elementSelectors.getTodoContentElementById(_id);
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

  _showTodoEditInputById({ _id, content }) {
    const inputElement = elementSelectors.getEditInputElementOfTodoById(_id);
    inputElement.value = content;
    inputElement.classList.add(helperClasses.displayBlock);
    inputElement.focus();

    const contentElement = elementSelectors.getTodoContentElementById(_id);
    contentElement.classList.add(helperClasses.displayNone);
  }

  _hideTodoEditInputById(_id) {
    const inputElement = elementSelectors.getEditInputElementOfTodoById(_id);
    inputElement.classList.remove(helperClasses.displayBlock);

    const contentElement = elementSelectors.getTodoContentElementById(_id);
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

  async _onDoneTodo(_id) {
    this._hideTodoEditInputById(_id);
    const isDone = await this.model.updateTodoDoneState(_id);
    this._toggleDoneTodoById(_id, isDone);
  }

  async _onDeleteDoto(_id) {
    this._hideTodoEditInputById(_id);
    await this.model.deleteTodoById(_id);
    this._deleteTodoById(_id);
    this._updateEmptyState();
  }

  _onEditTodoBtnClick(_id) {
    const todo = this.model.getTodoItemById(_id);
    this._showTodoEditInputById(todo);
  }

  async _onEditTodo({ _id, content }) {
    await this.model.editTodoContentById({ _id, content });
    this._hideTodoEditInputById(_id);
    this._updateTodoContent({ _id, content });
  }

  _updateEmptyState() {
    const todos = Object.entries(this.model.getTodos()).map(todoEntry=>todoEntry[1]);
    if (!todos.length) {
      this._updateEmptyStateVisibility(eShowHide.SHOW);
    } else {
      this._updateEmptyStateVisibility(eShowHide.HIDE);
    }
  }

  _getTodoTemplate({ content, _id, isDone }) {
    return getTodoItem({ content, _id, isDone });
  }

  _addEventListenersForTodoItem(_id) {
    const doneSVG = elementSelectors.getDoneSVGElementOfTodoById(_id);
    const deleteSVG = elementSelectors.getDeleteSVGElementOfTodoById(_id);
    const editSVG = elementSelectors.getEditSVGElementOfTodoById(_id);
    const inputElement = elementSelectors.getEditInputElementOfTodoById(_id);

    doneSVG.addEventListener('click', () => {
      this._onDoneTodo(_id);
    });

    deleteSVG.addEventListener('click', () => {
      this._onDeleteDoto(_id);
    });

    editSVG.addEventListener('click', () => {
      this._onEditTodoBtnClick(_id);
    });

    inputElement.addEventListener('focusout', () => {
      const editedContent = inputElement.value;
      this._onEditTodo({
        _id,
        content: editedContent,
      });
    });

    inputElement.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        const editedContent = inputElement.value;
        this._onEditTodo({
          _id,
          content: editedContent,
        });
      }
    });
  }
}
