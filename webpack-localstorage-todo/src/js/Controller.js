import { eShowHide } from './constants';

export class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.initTodosIfLocalStorageExists();
    this.updateEmptyState();
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
