import { eventManager } from './EventManager';
import { eShowHide } from './constants';

export class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    eventManager.setController(this);
    this.initTodosIfLocalStorageExists();
    this.updateEmptyState();
  }

  handleAddActionTodo() {
    const textInputContent = this.view.getTextInputContent();
    if (!textInputContent) {
      return;
    }

    const todo = this.model.addTodo(textInputContent);
    this.view.addTodo(todo);
    this.view.eraseTextInputContent();
    this.view.focusOnTextInput();
    this.refreshLocalStorage();
    this.updateEmptyState();
  }

  handleTODODoneActionClick(id) {
    this.view.hideTODOEditInputById(id);
    this.view.toggleDoneTodoById(id);
  }

  handleTODODeleteActionClick(id) {
    this.view.hideTODOEditInputById(id);
    this.model.deleteTodoById(id);
    this.view.deleteTodoById(id);
    this.refreshLocalStorage();
    this.updateEmptyState();
  }

  handleTODOEditActionClick(id) {
    const todo = this.model.getTodoItemById(id);
    this.view.showTODOEditInputById(todo);
  }

  handleTODOEditAction({ id, content }) {
    this.model.editTodoContentById({ id, content });
    this.view.hideTODOEditInputById(id);
    this.view.reRenderTodoContentById({ id, content });
    this.refreshLocalStorage();
  }

  refreshLocalStorage() {
    const todos = this.model.getTodos();
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  initTodosIfLocalStorageExists() {
    const todosJSON = localStorage.getItem("todos");
    if (todosJSON) {
      const todos = JSON.parse(todosJSON);
      for (const todo of todos) {
        this.view.addTodo(todo);
      }

      this.model.setTodos(todos);
    }
  }

  updateEmptyState(){
      const todos = this.model.getTodos();
      if(!todos.length){
        this.view.updateEmptyState(eShowHide.SHOW);
      }
      else{
        this.view.updateEmptyState(eShowHide.HIDE);
      }
  }
}
